const cds = require('@sap/cds');
const debug = require('debug')('srv:provisioning');
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const xsenv = require('@sap/xsenv');
const alertNotification = require('./utils/alertNotification');
xsenv.loadEnv();


module.exports = (service) => {

    service.on('UPDATE', 'tenant', async (req, next) => {
        const destination = require('./utils/destination.js')
        const Automator = require("./utils/automator");
        console.log("Subscription data:",JSON.stringify(req.data));
        let tenantSubdomain = req.data.subscribedSubdomain;
        let tenant = req.data.subscribedTenantId;
        let user = req.data.userId;
        let tenantURL = 'https:\/\/' + tenantSubdomain + `-${appEnv.app.space_name}-susaas` + /\.(.*)/gm.exec(appEnv.app.application_uris[0])[0];
        await next();
        // Trigger tenant broker deployment on background
        cds.spawn({ tenant: tenant }, async (tx) => {
            try {
                let automator = new Automator();
                await automator.deployTenantArtifacts(tenant, tenantSubdomain, user);
            } catch (error) {
                console.log("Automation skipped!");
                // Send generic alert using Alert Notification
                await alertNotification.sendEvent({
                    type : 'GENERIC',
                    data : {
                        body : JSON.stringify(error),
                        subject : 'Error during automation of tenant onboarding!',
                        eventType : 'alert.app.generic',
                        severity : 'FATAL',
                        category : 'ALERT'
                    }
                });
            }
        })
        return tenantURL;
    });

    service.on('DELETE', 'tenant', async (req, next) => {
        const destination = require('./utils/destination.js')
        const Automator = require("./utils/automator");
        let tenantSubdomain = req.data.subscribedSubdomain;
        let tenant = req.data.subscribedTenantId;
        let user = req.data.userId;
        console.log('Unsubscribe Data: ', JSON.stringify(req.data));
        await next();
        try {
            let automator = new Automator();
            await automator.undeployTenantArtifacts(tenant, tenantSubdomain, user);
        } catch (error) {
            console.log("Error!", JSON.stringify(error));
        }
        return req.data.subscribedTenantId;
    });

    service.on('upgradeTenant', async (req, next) => {
        await next();
        const { instanceData, deploymentOptions } = cds.context.req.body;
        console.log('UpgradeTenant: ', req.data.subscribedTenantId, req.data.subscribedSubdomain, instanceData, deploymentOptions);
    });

    service.on('dependencies', async (req, next) => {
        let dependencies = await next();
        const services = xsenv.getServices({
            registry: { tag: 'SaaS' },
            html5Runtime: { tag: 'html5-apps-repo-rt' },
            destination: { tag: 'destination' }
        });
        dependencies.push({ xsappname: services.html5Runtime.uaa.xsappname });
        dependencies.push({ xsappname: services.destination.xsappname });
        console.log("SaaS Dependencies:", JSON.stringify(dependencies));
        return dependencies;
    });

}