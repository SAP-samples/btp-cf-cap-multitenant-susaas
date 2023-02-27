const axios = require('axios');
const xsenv = require('@sap/xsenv');
const uaa = require('./token-utils');

let services = new Object();

if (cds.env.profiles.includes('production')) {
    services = xsenv.getServices({ cisCentral: { label: 'cis' } });
}

class CloudManagementCentral{
    constructor(username, password) {
        this.uaa = uaa;
        this.username = username;
        this.password = password;
        this.tokenStore = new Object();
    }

    async createServiceManager(subaccountId) {
        try {

            console.log("Subaccount ID:",subaccountId)
            let clientid = services.cisCentral.uaa.clientid;
            let clientsecret = services.cisCentral.uaa.clientsecret;
            let tokenEndpoint = services.cisCentral.uaa.url + '/oauth/token'
            let token = await this.uaa.getTokenWithPassword(tokenEndpoint, clientid, clientsecret, this.username, this.password);
            let authOptions = {
                method: 'POST',
                url: services.cisCentral.endpoints.accounts_service_url + `/accounts/v1/subaccounts/${subaccountId}/serviceManagementBinding`,
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
            console.log(`Service manager in tenant subaccount ${subaccountId} successfully created`);
            return response.data;
        } catch (error) {
            console.error(`Error: Service manager can not be created in tenant subaccount ${subaccountId}`);
            console.error("Error: Broker automation is skipped");
            throw error;
        }
    }

    async deleteServiceManager(subaccountId) {
        try {
            let clientid = services.cisCentral.uaa.clientid;
            let clientsecret = services.cisCentral.uaa.clientsecret;
            let tokenEndpoint = services.cisCentral.uaa.url + '/oauth/token'
            let token = await this.uaa.getTokenWithPassword(tokenEndpoint, clientid, clientsecret, this.username, this.password);
            let authOptions = {
                method: 'DELETE',
                url: services.cisCentral.endpoints.accounts_service_url + `/accounts/v1/subaccounts/${subaccountId}/serviceManagementBinding`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(authOptions);
            console.log(`Service manager in tenant subaccount ${subaccountId} successfully deleted`);
            return response.data;
        } catch (error) {
            console.error(`Error: Service manager can not be deleted from tenant subaccount ${subaccountId}`);
            throw error;
        }
    }
}

module.exports = CloudManagementCentral