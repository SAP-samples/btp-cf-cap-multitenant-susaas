const axios = require("axios");
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

class CloudFoundryCli {
    constructor() {
    }
    async login(username, password) {
        try {
            let optionsInfo = {
                method: 'GET',
                url: appEnv.app.cf_api + '/info'
            };

            let cfInfo = await axios(optionsInfo);

            let loginEndpoint = cfInfo.data.authorization_endpoint;
            let tokenEndpoint = loginEndpoint + '/oauth/token';
            let optionsLogin = {
                method: 'POST',
                url: tokenEndpoint,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic Y2Y6'
                },
                data: new URLSearchParams({
                    grant_type: 'password',
                    username: username,
                    password: password
                }).toString()
            }
            let loginResponse = await axios(optionsLogin);
            this.token = loginResponse.data.access_token
            return loginResponse.data.access_token;
        } catch (error) {
            console.error("Can not login to CF!");
        }
    }

    async getAppDomainInfo(appname) {
        try {
            let options1 = {
                method: 'GET',
                url: appEnv.app.cf_api + '/v3/apps?organization_guids=' + appEnv.app.organization_id + '&space_guids=' + appEnv.app.space_id + '&names=' + appname,
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            };
            let res1 = await axios(options1);

            let options2 = {
                method: 'GET',
                url: appEnv.app.cf_api + '/v3/domains?names=' + /\.(.*)/gm.exec(appEnv.app.application_uris[0])[1],
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            };
            // get domain GUID
            let res2 = await axios(options2);
            let results = {
                'app_id': res1.data.resources[0].guid,
                'domain_id': res2.data.resources[0].guid
            };
            return results;
        } catch (err) {
            console.log(err.stack);
            return err.message;
        }
    };
    async createRoute(tenantHost, appname) {
        try {
            let appDomainInfo = await this.getAppDomainInfo(appname);
            let options = {
                method: 'POST',
                url: appEnv.app.cf_api + '/v3/routes',
                headers: {
                    'Authorization': 'Bearer ' + this.token
                },
                data: {
                    'host': tenantHost,
                    'relationships': {
                        'space': {
                            'data': {
                                'guid': appEnv.app.space_id
                            }
                        },
                        'domain': {
                            'data': {
                                'guid': appDomainInfo.domain_id
                            }
                        }
                    }
                }
            }
            let res1 = await axios(options);

            let optionsApp = {
                method: 'POST',
                url: appEnv.app.cf_api + '/v3/routes/' + res1.data.guid + '/destinations',
                headers: {
                    'Authorization': 'Bearer ' + this.token
                },
                data: {
                    'destinations': [{
                        'app': {
                            'guid': appDomainInfo.app_id
                        }
                    }]
                }
            }

            let res2 = await axios(optionsApp)
            console.log('Route created for ' + tenantHost);
            return res2.data;


        } catch (error) {
            console.log("Route can not be created for:", tenantHost);
        }
    };

    async deleteRoute(tenantHost, appname) {
        try {
            let appDomainInfo = await this.getAppDomainInfo(appname);
            let route = await this.getAppRoute(appDomainInfo.app_id, tenantHost);
            let options = {
                method: 'DELETE',
                url: appEnv.app.cf_api + '/v3/routes/' + route.resources[0].guid,
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            };
            let response = await axios(options)
            return response.data;
        } catch (error) {
            console.log("Route can not be deleted!");
        }
    }
    async getAppRoute(appId, tenantHost) {
        try {
            let options = {
                method: 'GET',
                url: appEnv.app.cf_api + '/v3/apps/' + appId + '/routes',
                headers: {
                    'Authorization': 'Bearer ' + this.token
                },
                params: {
                    hosts : tenantHost
                }
            };
            let response = await axios(options);
            if (response.data.pagination.total_results === 1) {
                return response.data;
            } else {
                console.log(`Route for app ${appId} and host ${tenantHost} can not be found!`);
                throw new Error(`Route for app ${appId} and host ${tenantHost} can not be found!`)
            }

        } catch (error) {
            console.log("Can not find the route!")
        }
    }
}
module.exports = CloudFoundryCli 