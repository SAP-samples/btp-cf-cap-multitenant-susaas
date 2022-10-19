const axios = require('axios');
const xsenv = require('@sap/xsenv');
const uaa = require('./token-utils');

let services = new Object();

if (cds.env.profiles.includes('production')) {
    services = xsenv.getServices({cisCentral: { name: 'susaas-cis-central' }});
}

class CloudManagementCentral{
    constructor(username, password) {
        this.uaa = uaa;
        this.username = username;
        this.password = password;
        this.tokenStore = new Object();
    }
    async createServiceManager(tenant) {
        try {
            let clientid = services.cisCentral.uaa.clientid;
            let clientsecret = services.cisCentral.uaa.clientsecret;
            let tokenEndpoint = services.cisCentral.uaa.url + '/oauth/token'
            let token = await this.uaa.getTokenWithPassword(tokenEndpoint, clientid, clientsecret, this.username, this.password);
            let authOptions = {
                method: 'POST',
                url: services.cisCentral.endpoints.accounts_service_url + `/accounts/v1/subaccounts/${tenant}/serviceManagementBinding`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: JSON.stringify({
                    labels: {
                        createdBy: ["susaas-automator"]
                    }
                })
            };
            let response = await axios(authOptions);
            return response.data;

        } catch (error) {
            console.error("Service manager can not be created, broker automation will be skipped")
            throw error;
        }
    }

    async getServiceManager(tenant) {
        try {
            let clientid = services.cisCentral.uaa.clientid;
            let clientsecret = services.cisCentral.uaa.clientsecret;
            let tokenEndpoint = services.cisCentral.uaa.url + '/oauth/token'
            let token = await this.uaa.getTokenWithPassword(tokenEndpoint, clientid, clientsecret, this.username, this.password);
            let authOptions = {
                method: 'GET',
                url: services.cisCentral.endpoints.accounts_service_url + `/accounts/v1/subaccounts/${tenant}/serviceManagementBinding`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(authOptions);
            return response.data;

        } catch (error) {
            console.error("Service manager can not found in tenant subaccount, deletion should be handled manually!")
            throw error;
        }
    }

    async deleteServiceManager(tenant) {
        try {
            let clientid = services.cisCentral.uaa.clientid;
            let clientsecret = services.cisCentral.uaa.clientsecret;
            let tokenEndpoint = services.cisCentral.uaa.url + '/oauth/token'
            let token = await this.uaa.getTokenWithPassword(tokenEndpoint, clientid, clientsecret, this.username, this.password);
            let authOptions = {
                method: 'DELETE',
                url: services.cisCentral.endpoints.accounts_service_url + `/accounts/v1/subaccounts/${tenant}/serviceManagementBinding`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(authOptions);
            return response.data;

        } catch (error) {
            console.error("Service manager can not found in tenant subaccount, deletion should be handled manually!")
            throw error;
        }
    }

    async getToken() {
        try {
            if (!this.tokenStore.token) {
                let tokenEndpoint = this.creds.uaa.url + '/oauth/token';
                this.tokenStore.token = await this.uaa.getTokenWithPassword(tokenEndpoint, this.creds.uaa.clientid, this.creds.uaa.clientsecret, this.username, this.password);
            }
            return this.tokenStore.token;
        } catch (error) {
           console.error("Unable to get the token for CMS-LOCAL.. Error..");
           throw error(error.message);
        }
    }

}
module.exports = CloudManagementCentral