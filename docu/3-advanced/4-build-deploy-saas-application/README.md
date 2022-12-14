# Build and deploy the SaaS application

Before the deployment of the **Advanced Scope** sample application, you need to build the project and do some basic steps which are required for security purposes. After deployment, make sure that the required credential values are maintained in the SAP Credential Store instance created during deployment. 

**Important** - In case you want to deploy the **Advanced Scope** to the same Cloud Foundry Space which you already used for the **Basic Scope**, please make sure to **unsubscribe** all consumer tenants and to **undeploy** the existing Basic Scope application first! The steps for undeploying the SaaS application can be found in the **Basic Scope** ([click here](../../2-basic/9-undeploy-saas-application/README.md)).

1. [Prepare the SaaS Application for deployment](#1-Prepare-the-SaaS-Application-for-deployment)
2. [Setup the Credential Store](#2-Setup-the-Credential-Store)
3. [Troubleshooting](#3-Troubleshooting)
4. [Further Information](#4-Further-Information)

Before working on the next steps, please make sure you successfully completed the last parts of the **Advanced Scope**. Especially the trust configuration in your provider and consumer subaccount has to be configured before the deployment! In case you already completed the Basic Scope, the following steps might be very familiar to you. Still, you can see it as a good exercise. 


## 1. Prepare the SaaS Application for deployment

Let's get started with the preparation of the codebase in which a few customizations need to be undertaken before you can start the build and deployment to your provider subaccount. Please continue with the steps described in the corresponding part of the **Basic Scope** ([click here](../../2-basic/3-build-deploy-saas-application/README.md#1-prepare-the-saas-application-for-deployment)) after reading the following considerations! 

**Important considerations**

* Make sure to checkout the **advanced** instead of the basic branch.

    ```sh
    $ git checkout advanced
    ```

* Make sure to use the correct mtaext Deployment Descriptor Extension file for the **Advanced Scope** when building or deploying your application! The repository contains different mtaext files in the Advanced Scope. For this tutorial please use again the **free-tier.mtaext** file and create a private copy (**free-tier-private.mtaext**). 

    > **Hint** - Please note, the Advanced Scope cannot be deployed to Trial environments. 

    ```sh
    $ mbt build -e ./configs/deployment/free-tier-private.mtaext
    $ cf deploy mta_archives/susaas_0.0.1.mtar
    ```

    The other mtaext files will be covered in detail in the **Expert Scope**.
    
    * **free-tier-prod.mtaext** let's you deploy the application without Cloud Foundry Space pre/suffixes in the service names, application names and role collections. 
    * **free-tier-domain.mtaext** let's you deploy the SaaS sample application with a custom domain of your own like **example.org** instead of the default SAP domain.


## 2. Setup the Credential Store

Before you learn how to subscribe new consumer tenants in the next part of the mission, you need to maintain two credential values in the Credential Store. These credential values are essential for some parts of the automated subscription process. Please continue with the steps described in the corresponding part of the **Basic Scope** ([click here](../../2-basic/3-build-deploy-saas-application/README.md#2-setup-the-credential-store)).


## 3. Troubleshooting

For troubleshooting please check the separate **Troubleshooting** section of the **Basic Scope** ([click here](../../2-basic/10-troubleshooting/README.md)) and **Advanced Scope** ([click here](../9-troubleshooting/README.md)).


## 4. Further information

Please use the details provided in the **Basic Scope** ([click here](../../2-basic/3-build-deploy-saas-application/README.md#4-Further-information)) to find further information on the topics above. 