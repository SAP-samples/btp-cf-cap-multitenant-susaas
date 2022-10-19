const axios = require('axios');
const xsenv = require('@sap/xsenv');
const https = require('https')
xsenv.loadEnv();

let services = new Object()
let xsuaa = new Object(); 

if (cds.env.profiles.includes('production')) {
    services = xsenv.getServices({
        xsuaa: { tag: 'xsuaa' },
        ias: { label: 'identity' }
    });
    xsuaa = services.xsuaa;
}

class UserManagement {
    constructor(token) {
        this.token = token;
    }

    async getShadowUsers() {
        try {
            let token = await this.getToken();
            let authOptions = {
                method: 'GET',
                url: xsuaa.apiurl + `/Users`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(authOptions);
            return response.data;
        } catch (error) {
            console.error("Error: Role collections can not be retrieved from subaccount..")
            throw error;
        }
    }

    async createShadowUser(firstName, lastName, email) {
        let body = {
            userName: email,
            externalId: email,
            origin: "sap.custom",
            schemas: [
                "urn:scim:schemas:core:1.0"
            ],
            name: {
                givenName: firstName,
                familyName: lastName
            },
            emails: [
                {
                    "type": "string",
                    "value": email,
                    "primary": true
                }
            ]
        }
        try {
            let token = await this.getToken();
            let authOptions = {
                method: 'POST',
                url: xsuaa.apiurl + `/Users`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: body
            };
            let response = await axios(authOptions);
            console.log("Shadow user successfully created in subaccount..");
            return response.data;
        } catch (error) {
            console.error("Error: Shadow user can not be created!")
            throw error;
        }
    }
    async deleteShadowUser(id) {
        try {
            let token = await this.getToken();
            let options = {
                method: 'DELETE',
                url: xsuaa.apiurl + `/Users/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(options);
            console.log(`Shadow user with ID: ${id} has been deleted.`)
            return response.data;
        } catch (error) {
            console.error(`Error! Shadow user with ID: ${id} can not be deleted!`)
            throw error;
        }
    }
    async getIASUser(email) {
        try {
            let query = new URLSearchParams({ name_id: email }).toString()
            let options = {
                method: 'GET',
                url: `${services.ias.url}/service/users?${query}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                httpsAgent: new https.Agent({
                    cert: services.ias.certificate,
                    key: services.ias.key
                })
            };
            let response = await axios(options);
            return response.headers.location;
        } catch (error) {
            console.error("Can not get user with email:", email);
        }
    }

    async createIASUser(userInfo) {
        try {
            let options = {
                method: 'POST',
                url: `${services.ias.url}/service/users`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: new URLSearchParams({ ...userInfo, name_id: userInfo.email }).toString(),
                httpsAgent: new https.Agent({
                    cert: services.ias.certificate,
                    key: services.ias.key
                })
            };
            let response = await axios(options);
            console.log("User has been created on IAS Side", JSON.stringify(userInfo))
            console.log("IAS",JSON.stringify(services.ias));
            return response.headers.location;
        } catch (error) {
            console.log("User can not be created on IAS Side!")
            console.error("Error:",error.message);
            throw error;
        }
    }

    async deleteIASUser(location) {
        try {
            let options = {
                method: 'DELETE',
                url: location,
                headers: {
                    'Content-Type': 'application/vnd.sap-id-service.sp-user-id+xml',
                },
                httpsAgent: new https.Agent({
                    cert: services.ias.certificate,
                    key: services.ias.key
                })
            };
            let response = await axios(options);
            console.log("IAS User is deleted");
        } catch (error) {
            console.log("IAS User can not be deleted");
        }
    }

    async resetIASPassword(email) {
        try {
            let options = {
                method: 'POST',
                url: `${services.ias.url}/service/users/forgotPassword`,
                headers: {
                    'Content-Type': 'application/',
                },
                httpsAgent: new https.Agent({
                    cert: services.ias.certificate,
                    key: services.ias.key
                }),
                data: {
                    identifier: email
                }
            };

            let response = await axios(options);
            console.log("User password has been reset:", JSON.stringify(email))
        } catch (error) {
            console.log("User password can not be reset!", email)
        }
    }

    async getRoleCollection(roleId) {
        try {
            let roleIdEncoded = encodeURIComponent(roleId);
            let token = await this.getToken();
            let authOptions = {
                method: 'GET',
                url: xsuaa.apiurl + `/Groups/${roleIdEncoded}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(authOptions);
            return response.data;
        } catch (error) {
            console.error("Error: Role collections can not be retrieved from subaccount..")
            throw error;
        }
    }

    async updateRoleCollection(roleCollection) {
        try {
            let roleIdEncoded = encodeURIComponent(roleCollection.id);
            let token = await this.getToken();
            let authOptions = {
                method: 'PUT',
                url: xsuaa.apiurl + `/Groups/${roleIdEncoded}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'If-Match': 5
                },
                data: roleCollection
            };
            let response = await axios(authOptions);
            console.log("Role assigned to shadow user");
            return response.data;
        } catch (error) {
            console.error("Role can not be assigned to user!")
            throw error;
        }
    }

    async assignRoleCollectionToUser(roleId, shadowId) {
        try {
            let roleCollection = await this.getRoleCollection(roleId);
            roleCollection.members.push({
                origin: "sap.custom",
                "type": "USER",
                "value": shadowId
            })
            await this.updateRoleCollection(roleCollection)
        } catch (error) {
            console.log("Role collection can not be assigned to user");
        }
    }

    async removeRoleCollectionFromUser(roleId, shadowId) {
        let roleCollection = await this.getRoleCollection(roleId);

        roleCollection.members = roleCollection.members.filter(function (member) {
            return member.value !== shadowId;
        })
        await this.updateRoleCollection(roleCollection)
    }

    async getRoleCollections(searchValue, pagination) {
        try {
            let query = new URLSearchParams({
                sortBy: `displayName`,
                ...pagination
            }).toString()

            let token = await this.getToken();
            let authOptions = {
                method: 'GET',
                url: xsuaa.apiurl + `/Groups?${query}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(authOptions);
            if (searchValue) {
                return response.data.resources.filter((resource) => resource.id.includes(searchValue))
            } else {
                return response.data.resources;
            }
        } catch (error) {
            console.error("Error: Role collections can not be retrieved from subaccount..")
            throw error;
        }
    }

    async validateRoleCollection(roleId) {
        try {
            let token = await this.getToken();
            let authOptions = {
                method: 'GET',
                url: xsuaa.apiurl + `/sap/rest/authorization/v2/rolecollections`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            let response = await axios(authOptions);
            let collections = response.data;
            let roleCollection = collections.find((collection) => collection.name === roleId);

            // Checking here if the user trying to assign the role which is not allowed
            let notAllowed = roleCollection.roleReferences.find((roleReference) => roleReference.roleTemplateAppId !== services.xsuaa.xsappname)
            if (notAllowed) {
                throw new Error(`Role collection ${roleId} is not created by this application, therefore cannot be assigned!`)
            }

        } catch (error) {
            throw error
        }
    }
    async getToken() {
        return this.token
    }
}

module.exports = UserManagement;