const axios = require('axios');
const uaa = require('./token-utils');

class ServiceManager {
    constructor(serviceCredentials, username, password) {
        this.creds = serviceCredentials;
        this.uaa = uaa;
        this.username = username;
        this.password = password;
        this.tokenStore = new Object();
    }

    async createServiceInstance(serviceName, serviceOffering, servicePlan) {
        try {
            let body = {
                name: serviceName,
                service_offering_name: serviceOffering,
                service_plan_name: servicePlan,
                labels: {
                    createdBy: ["susaas-automator"]
                }
            };
            let token = await this.getToken();
            let optionsInstance = {
                method: 'POST',
                url: this.creds.sm_url + `/v1/service_instances`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: JSON.stringify(body)
            };
            let response = await axios(optionsInstance);
            return response.data;
        } catch (error) {
            console.error(`Service instance can not be created for ${serviceOffering}-${servicePlan}`);
            console.error(error.message);
            throw error;
        }
    }

    async createServiceBinding(serviceInstanceId, subscribingSubdomain) {
        try {
            let token = await this.getToken();
            let options = {
                method: 'POST',
                url: this.creds.sm_url + `/v1/service_bindings`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: JSON.stringify({ name: subscribingSubdomain, service_instance_id: serviceInstanceId })
            };
            let response = await axios(options);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteServiceBinding(serviceBindingId) {
        try {
            let token = await this.getToken();
            let optionsInstance = {
                method: 'DELETE',
                url: this.creds.sm_url + `/v1/service_bindings/${serviceBindingId}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(optionsInstance);
            return response.data;
        } catch (error) {
            console.error(`Service binding can not be deleted!`);
            console.error(error.message);
            throw error.message;
        }
    }

    async deleteServiceInstance(serviceInstanceId) {
        try {
            let token = await this.getToken();
            let optionsInstance = {
                method: 'DELETE',
                url: this.creds.sm_url + `/v1/service_instances/${serviceInstanceId}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(optionsInstance);
            return response.data;
        } catch (error) {
            console.error(`Service binding can not be deleted!`);
            console.error(error.message);
            throw error.message;
        }
    }
    async getAllServiceBindings(tenant) {
        try {
            let token = await this.getToken();
            let bindingQuery = new URLSearchParams({ label: `subaccount_id eq '${tenant}'` }).toString();
            let optionsBinding = {
                method: 'GET',
                url: this.credss.sm_url + `/v1/service_bindings?${bindingQuery}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(optionsBinding);
            return response.data.items;
        } catch (error) {
            console.error("Can not retrieve service bindings!")
            throw error;
        }
    }
    async getToken() {
        try {
            if (!this.tokenStore.token) {
                let tokenEndpoint = this.creds.url + '/oauth/token';
                this.tokenStore.token = await this.uaa.getTokenWithClientCreds(tokenEndpoint, this.creds.clientid, this.creds.clientsecret);
            }
            return this.tokenStore.token;
        } catch (error) {
            console.error("Unable to get the token for Service Manager.. Error..");
            throw error.message;
        }
    }
    async createServiceBroker(name, url, description, user, password) {
        let body = {
            name: name,
            broker_url: url,
            description: description,
            credentials: {
                basic: {
                    username: user,
                    password: password
                }
            }
        }
        try {
            let token = await this.getToken();
            let options = {
                method: 'POST',
                url: this.creds.sm_url + `/v1/service_brokers`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: JSON.stringify(body)
            };
            let response = await axios(options);
            return response.data;
        } catch (error) {
            console.log("Service Broker can not be deleted");
        }
    }

    async deleteServiceBroker(serviceBrokerId) {
        try {
            let token = await this.getToken();
            let options = {
                method: 'DELETE',
                url: this.creds.sm_url + `/v1/service_brokers/${serviceBrokerId}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(options);
            return response.data;
        } catch (error) {
            console.log("Service Broker can not be deleted");
            throw error;
        }
    }
    async getServiceBroker(name){
        try {
            let query = encodeURIComponent(`fieldQuery=name eq '${name}'`);
            let token = await this.getToken();
            let options = {
                method: 'GET',
                url: this.creds.sm_url + `/v1/service_brokers/?${query}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(options);
            return response.data.items[0];
        } catch (error) {
            console.log("Service Broker can not be deleted");
            throw error;
        }
    }

}

module.exports = ServiceManager;