const cds = require('@sap/cds');
const debug = require('debug')('srv:provisioning');
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const xsenv = require('@sap/xsenv');
const alertNotification = require('./utils/alertNotification');
xsenv.loadEnv();


module.exports = (service) => {

    service.on('UPDATE', 'tenant', async (req, next) => {
        console.log("Subscription data:",JSON.stringify(req.data));
        const Automator = require("./utils/automator");
        
        let tenantSubdomain = req.data.subscribedSubdomain;
        let tenant = req.data.subscribedTenantId;
        let tenantSubaccountId = req.data.subscribedSubaccountId;
        // subscriber-a16ef7 (Custom Domain)
        // subscriber-a16ef7-susaas-dev (Default Domain Dev)
        // subscriber-a16ef7-susaas (Default Domain Prod)
        const tenantHost = tenantSubdomain;

        // Custom Domain Samples
        // https://subscriber-a16ef7.eu10.susaas.org
        // https://subscriber-a16ef7.susaas.org

        // Default Domain Samples
        // https://subscriber-a16ef7-susaas-dev.cfapps.eu10.hana.ondemand.com 
        // https://subscriber-a16ef7-susaas.cfapps.eu10.hana.ondemand.com 

        // appDomain - susaas.org / eu10.susaas.org / susaas-dev.cfapps.eu10... / susaas.cfapps.eu10....
        // tenantSeparator - . / -
        // tenantHost - subscriber-a16ef7 / subscriber-a16ef7-susaas-dev /subscriber-a16ef7-susaas
        const tenantURL = `https://${tenantHost}${process.env.tenantSeparator}${process.env.appDomain}`;
        
        await next();
        // Trigger tenant broker deployment on background
        cds.spawn({ tenant: tenant }, async (tx) => {
            try {
                let automator = new Automator();
                await automator.deployTenantArtifacts(tenantSubdomain,tenantSubaccountId);
            } catch (error) {
                console.error("Error: Automation skipped because of error during subscription");
                console.error(`Error: ${error.message}`);
            }
        })
        return tenantURL;
    });

    service.on('DELETE', 'tenant', async (req, next) => {
        const Automator = require("./utils/automator");
        let tenantSubdomain = req.data.subscribedSubdomain;
        let tenantSubaccountId = req.data.subscribedSubaccountId;
        console.log('Unsubscribe Data: ', JSON.stringify(req.data));
        await next();
        try {
            let automator = new Automator();
            await automator.undeployTenantArtifacts(tenantSubaccountId,tenantSubdomain);
        } catch (error) {
            console.error("Error: Automation skipped because of error during unsubscription");
            console.error(`Error: ${error.message}`);
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