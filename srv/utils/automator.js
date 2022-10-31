const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();

const ServiceManager = require("./service-manager");
const CisCentral = require('./cis-central')
const destination = require('./destination')
const CFUtils = require("./cf-utils");
const credStore = require("./credStore");


class TenantAutomator {
    constructor() {
        this.credStore = credStore;
        this.credentials = new Map();
        this.destination = destination;
        this.cf = new CFUtils();
    }

    async deployTenantArtifacts(subscribingTenant, subscribingSubdomain) {
        try {
            await this.initialize(subscribingTenant, subscribingSubdomain);
            await this.createSampleDestination(subscribingSubdomain, `SUSAAS_S4HANA_CLOUD`)
            // Don't create route in case of '.' used as tenant separator - wildcard route used!
            process.env.tenantSeparator !== '.' ? await this.createRoute(subscribingSubdomain) : null;
            await this.registerBTPServiceBroker(subscribingSubdomain);
            await this.cleanUpCreatedServices(subscribingTenant);
            console.log("Automation: Deployment has been completed successfully!")
        } catch (error) {
            throw error;
        }
    }

    async undeployTenantArtifacts(unsubscribingTenant, unsubscribingSubdomain) {
        try {
            await this.initialize(unsubscribingTenant);
            await this.deleteSampleDestination(unsubscribingSubdomain, `SUSAAS_S4HANA_CLOUD`)
            // Don't delete route in case of '.' used as tenant separator - wildcard route used!
            process.env.tenantSeparator !== '.' ? await this.deleteRoute(unsubscribingSubdomain) : null;
            await this.unregisterBTPServiceBroker(unsubscribingTenant);
            await this.cleanUpCreatedServices(unsubscribingTenant);
            console.log("Automation: Undeployment has been completed successfully!")
        } catch (error) {
            console.error("Tenant artifacts cannot be undeployed!")
            throw error;
        }
    }

    async initialize(subscribingTenant) {
        try {
            await this.readCredentials();
            let btpAdmin = this.credentials.get("btp-admin-user")
            this.serviceManager = await this.createServiceManager(subscribingTenant);
            await this.cf.login(btpAdmin.username, btpAdmin.value);
            console.log("Automator successfully initialized!")
        } catch (error) {
            console.error("Automation can not be initialized!");
            throw error;
        }
    }

    async createServiceManager(subscribingTenant) {
        try {
            let btpAdmin = this.credentials.get("btp-admin-user")
            this.cisCentral = new CisCentral(btpAdmin.username, btpAdmin.value);
            let serviceManagerCredentials = await this.cisCentral.createServiceManager(subscribingTenant);
            console.log("Service manager has been created successfully!")
            return new ServiceManager(serviceManagerCredentials);
        } catch (error) {
            console.error("Service Manager can not be created!")
            throw error.message;
        }
    }

    async readCredentials() {
        try {
            let creds = await Promise.all([
                this.credStore.readCredential("susaas", "password", "btp-admin-user"),
                this.credStore.readCredential("susaas", "password", "susaas-broker-credentials")
            ]);
            creds.forEach((cred) => {
                this.credentials.set(cred.name, cred)
            })
            console.log("Credentials retrieved from credential store successfully");
        } catch (error) {
            console.error('Unable to retrieve credentials from cred store, please make sure that they are created! Automation skipped!');
            throw (error);
        }
    }

    async cleanUpCreatedServices(tenant) {
        try {
            await this.cisCentral.deleteServiceManager(tenant);
            console.log("Service Manager is deleted");
        } catch (error) {
            console.error("Clean up can not be completed!");
            throw error;
        }
    }
    
    async registerBTPServiceBroker() {
        try {
            let sbCreds = this.credentials.get(`susaas-broker-credentials`);
            let sbUrl = await this.getServiceBrokerUrl();
            await this.serviceManager.createServiceBroker(`${appEnv.app.brokerName}-${appEnv.app.space_name}`,
                sbUrl,
                "Sustainable SaaS API Broker",
                sbCreds.username,
                sbCreds.value
            );
            console.log("Susaas Inbound API Broker registered successfully!")
        } catch (error) {
            console.log("Service broker cannot be registered!")
        }
    }

    async unregisterBTPServiceBroker(tenant) {
        try {
            let sb = await this.serviceManager.getServiceBroker(`${appEnv.app.brokerName}-${tenant}`)
            await this.serviceManager.deleteServiceBroker(sb.id)
            console.log(`Service Broker ${appEnv.app.brokerName} deleted`);
        } catch (error) {
            console.log(`Service Broker ${appEnv.app.brokerName} can not be deleted`);
        }
    }

    async createSampleDestination(subscribedSubdomain, name) {
        try {
            var destConfig = [{
                "Name": name,
                "Type": "HTTP",
                "URL": "https://sandbox.api.sap.com",
                "Authentication": "NoAuthentication",
                "Description": "SusaaS S/4HANA Cloud",
                "ProxyType": "Internet",
                "HTML5.DynamicDestination": "true"
            }];
            await this.destination.subscriberCreate(subscribedSubdomain, destConfig)
            console.log(`Sample destination ${name} is created in tenant subaccount`);
        } catch (error) {
            console.log("Sample destination can not be created in tenant subaccount")
        }
    }
    
    async deleteSampleDestination(unsubscribingSubdomain, name) {
        try {
            await this.destination.subscriberDelete(unsubscribingSubdomain, name)
            console.log(`Sample destination ${name} is deleted from tenant subaccount`);
        } catch (error) {
            console.log(`Sample destination ${name} can not be deleted from tenant subaccount`);
        }
    }

    async createRoute(subscribedSubdomain) {
        try {
            await this.cf.createRoute(subscribedSubdomain + process.env.tenantSeparator + process.env.appName, process.env.appName);
        } catch (error) {
            console.error("Route could not be created!")
            throw error;
        }
    }

    async deleteRoute(unsubscribedSubdomain) {
        try {
            await this.cf.deleteRoute(unsubscribedSubdomain + process.env.tenantSeparator  + process.env.appName, process.env.appName);
        } catch (error) {
            console.error("Route could not be deleted!")
            throw error;
        }
    }

    async getServiceBrokerUrl() {
        try {
           console.log("Broker endpoint to be registered:", process.env.brokerUrl);
           return process.env.brokerUrl;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

module.exports = TenantAutomator;