const cds = require('@sap/cds');
const log = require('cf-nodejs-logging-support');
log.setLoggingLevel('info');
log.registerCustomFields(["country", "amount"]);
const UserManagement = require("./utils/user-management-utils");

const modifiedEndpoint = (endpoint, prefix) => {
    return endpoint.replace(/(^https:\/\/)([^.]+)(\..+$)/, '$1' + prefix + '$3')
}
module.exports = cds.service.impl(async function () {
    const {
        Users,
        Roles
    } = this.entities;

    // Scope check for local development
    if (cds.env.profiles.includes('production')) {
        this.before("SAVE", Users, async (req) => {
            let tenantSubdomain = req._.req.authInfo.getSubdomain();
            let vcapApplication = JSON.parse(process.env.VCAP_APPLICATION);
            let approuterUrl = modifiedEndpoint(vcapApplication.application_uris[0],`${tenantSubdomain}-${vcapApplication.space_name}`)
            let loggedInUserToken = req._.req.authInfo.getTokenInfo().getTokenValue();
            let user = req.data;
            let userManagement = new UserManagement(loggedInUserToken);
            try {
                await userManagement.validateRoleCollection(req.data.role_ID);
            } catch (error) {
                req.reject(400, error.message);
            }

            try{
                if (req.event !== 'UPDATE') {
                
                    let shadowUser = await userManagement.createShadowUser(user.firstName, user.lastName, user.email);
    
                    req.data.shadowId = shadowUser.id;
                    let roleCollection = await userManagement.assignRoleCollectionToUser(req.data.role_ID, shadowUser.id);
                } else {
                    let diff = await req.diff();
                    if (diff.ID) {
                        let users = await cds.run(SELECT.from("susaas.db.Users").where({ ID: diff.ID }));
                        let user = users[0];
                        await userManagement.removeRoleCollectionFromUser(user.role_ID, user.shadowId);
                        await userManagement.assignRoleCollectionToUser(req.data.role_ID, user.shadowId);
                    }
    
                }
            } catch(error){
                req.reject(500,error.message)
            }
        })
    }
    // Scope check for local development
    if (cds.env.profiles.includes('production')) {
        this.on("READ", 'Roles', async (req) => {
            let loggedInUserToken = req.req.authInfo.getTokenInfo().getTokenValue()
            let userManagement = new UserManagement(loggedInUserToken);
            let pagination = {
                startIndex: req.query.SELECT.limit.offset.val + 1,
                count: req.query.SELECT.limit.rows.val + 1,
                sortOrder: 'ascending',
                sortBy: 'displayName'
            }
            let roleCollections = await userManagement.getRoleCollections("Susaas", pagination);

            let response = [];

            if (req.query.SELECT.count) {
                response.$count = roleCollections.length
            }
            if (req.query.SELECT.search) {
                let searchValue = req.query.SELECT.search[0].val;
                roleCollections = roleCollections.filter((resource) => resource.id.includes(searchValue) || resource.description.includes(searchValue))
            }
            roleCollections.map((roleCollection) => {
                response.push({ ID: roleCollection.id, description: roleCollection.description });
            })

            return response;
        })
    }

    // Scope check for local development
    if (cds.env.profiles.includes('production')) {
        this.before("DELETE", 'Users', async (req) => {
            let loggedInUserToken = req.req.authInfo.getTokenInfo().getTokenValue()
            let users = await cds.run(SELECT.from("susaas.db.Users").where({ ID: req.data.ID }))
            let user = users[0];
            let userManagement = new UserManagement(loggedInUserToken);
            await userManagement.deleteShadowUser(user.shadowId);
        })
    }
});