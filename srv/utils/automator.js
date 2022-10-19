const CisCentral = require('./cis-central')

const ServiceManager = require("./service-manager");
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
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
    modifiedEndpoint(endpoint, prefix) {
        return endpoint.replace(/(^https:\/\/)([^.]+)(\..+$)/, '$1' + prefix + '$3')
    }
    async deployTenantArtifacts(subscribingTenant, subscribingSubdomain, subscribingUser) {
        try {
            await this.initialize(subscribingTenant, subscribingSubdomain);
            await this.createDestination(subscribingSubdomain)
            await this.createRoute(subscribingSubdomain);
            await this.registerBTPServiceBroker(subscribingSubdomain);
            await this.cleanUpCreatedServices(subscribingTenant);
            console.log("Automation: Deployment has been completed successfully!")
        } catch (error) {
            throw error;
        }
    }

    async undeployTenantArtifacts(unsubscribingTenant, unsubscribingSubdomain) {
        try {
            await this.initialize(unsubscribingTenant, unsubscribingSubdomain);
            await this.deleteDestination(unsubscribingSubdomain, "susaas_api")
            await this.deleteRoute(unsubscribingSubdomain);
            await this.unregisterBTPServiceBroker(unsubscribingTenant);
            await this.cleanUpCreatedServices(unsubscribingTenant);
            console.log("Automation: Undeployment has been completed successfully!")
        } catch (error) {
            console.error("Tenant artifacts cannot be undeployed!")
            throw error;
        }
    }

    async initialize(subscribingTenant, subscribingSubdomain) {
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
            let credMap = new Map();
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
    async registerBTPServiceBroker(subscribedSubdomain) {
        try {
            let sbCreds = this.credentials.get(`susaas-broker-credentials`);
            let sbUrl = await this.getServiceBrokerUrl();
            await this.serviceManager.createServiceBroker(`susaas-api-broker-${appEnv.app.space_name}`,
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
            let sb = await this.serviceManager.getServiceBroker(`susaas-api-broker-${appEnv.app.space_name}-${tenant}`)
            await this.serviceManager.deleteServiceBroker(sb.id)
            console.log(`Service Broker susaas-api-broker-${appEnv.app.space_name} deleted`);
        } catch (error) {
            console.log(`Service Broker susaas-api-broker-${appEnv.app.space_name} can not be deleted`);
        }
    }

    async createDestination(subscribedSubdomain) {
        try {
            let url = 'https://' + appEnv.app.application_uris[0];
            var destConfig = [{
                "Name": "susaas_api",
                "Type": "HTTP",
                "URL": url,
                "Authentication": "NoAuthentication",
                "ProxyType": "Internet",
                "HTML5.ForwardAuthToken": 'true'
            }];
            await this.destination.subscriberCreate(subscribedSubdomain, destConfig)
            console.log("Destination susaas_api is created");
        } catch (error) {
            console.log("Destination(s) can not be created.")
        }

    }
    async deleteDestination(unsubscribingSubdomain, name) {
        try {
            await this.destination.subscriberDelete(unsubscribingSubdomain, name)
            console.log("Destination susaas_api is deleted");
        } catch (error) {
            console.log(`Destination ${name} can not be deleted`);
        }
    }

    async createRoute(subscribedSubdomain) {
        try {
            let btpAdmin = this.credentials.get("btp-admin-user");
            await this.cf.createRoute(`${subscribedSubdomain}-${appEnv.app.space_name}-susaas`, 'susaas');
        } catch (error) {

        }
    }
    async deleteRoute(unsubscribedSubdomain) {
        try {
            let btpAdmin = this.credentials.get("btp-admin-user");
            await this.cf.deleteRoute(`${unsubscribedSubdomain}-${appEnv.app.space_name}-susaas`, 'susaas');
        } catch (error) {

        }
    }

    async getServiceBrokerUrl() {
        try {
           console.log("Broker endpoint to be registered:",process.env.brokerUrl);
           return process.env.brokerUrl;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

module.exports = TenantAutomator;