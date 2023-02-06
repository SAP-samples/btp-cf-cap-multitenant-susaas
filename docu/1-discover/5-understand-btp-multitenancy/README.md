# Understand SAP BTP Multitenancy

In SAP BTP, you can develop and run multitenant applications that can be accessed by multiple consumers (tenants) through a dedicated URL. In this sample scenario, we decided to implement the solution based on a standardized toolset including the SAP Cloud Application Programming (CAP) Model.

Check SAP Help and linked Discovery Center Missions for further details on how to develop multitenant SaaS applications in the different SAP BTP environments. 

* [Cloud Foundry Environment - Developing Multitenant Applications](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/5e8a2b74e4f2442b8257c850ed912f48.html?locale=en-US)
* [Kyma Environment - Develop a Multitenant Extension Application](https://discovery-center.cloud.sap/missiondetail/3683/3726/)
* [ABAP Environment - Multitenancy and SaaS Applications](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/81659c0f5a2b4ca0999329b5b6c60548.html?locale=en-US)


## 1. Context
When developing tenant-aware applications in the Cloud Foundry environment, keep in mind the following general programming guidelines.

- Shared in-memory data is available to all tenants
- Avoid any possibility that application users can execute custom code in the application JVM, as this may give them access to data of other tenants
- Avoid any possibility that application users can access a file system, as this may give them access to data of other tenants
- To perform internal tenant onboarding activities, such as creating a database schema for tenants, you must implement the Subscription callbacks of the *SAP SaaS Provisioning Service* (saas-registry) and use the information provided in the subscription event. You can also implement the getDependencies callback to obtain the dependencies of any SAP reuse services by your application. 

Check out the following content in SAP Help for further information ([click here](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/ff540477f5404e3da2a8ce23dcee602a.html)).


## 2. SAP BTP Multitenancy Model

In this tutorial, we are using some keywords like provider (sub)account, consumer/tenant subaccount, provisioning, onboarding, and data isolation. 

**Provider (sub)account** 
The provider is the vendor of the SaaS application. This is the company that is going to build, deliver, and operate the multitenant SaaS solution for all consumers. The vendor has a **provider account**, a global account in SAP BTP.

**Consumer/Tenant subaccount** 
A consumer or tenant is the user of the SaaS application. This can be another team or company that is going to use the multitenant SaaS solution. This consumer subscribes to the SaaS solution from their **consumer subaccount** which is a subaccount of the vendor's global account in SAP BTP.

> **Hint** - It's important to differentiate between *consumer* and *tenant*. While a consumer can consume multiple SaaS applications, a tenant is a specific instance of a SaaS application of a dedicated consumer. Still, a *tenant subaccount* and a *consumer subaccount* refer to the same entity, meaning a dedicated subaccount in which one or multiple tenant instances of a consumer are subscribed. 
> 
>Subaccount (1..1) Consumer - For each subaccount, there can only be one consumer assignment<br>
>Subaccount (1..1) Tenant - For each subaccount, there can only be one tenant per SaaS application<br>
>Consumer (1..1) Tenant - For each consumer, there can only be one tenant per SaaS application<br>

**Onboarding**
This is the end-to-end process of creating a subaccount for a new SaaS consumer in the vendor's global account in SAP BTP and giving him access to the actual consumer tenant SaaS application instance. 

**Provisioning** 
This is the process of onboarding new consumers to the multitenant SaaS solution. During the provisioning process, a tenant database schema is created and dependencies are injected into the consumer subaccount.


## 3. Provider's Point of View

Putting together the general account model of an SAP BTP SaaS solution results in the following structure:

![<img src="./images/account-model.png" width="500" />](./images/account-model.png?raw=true)


## 4. SAP CAP (MTXS)

The sample application has been developed using the SAP Cloud Application Programming (CAP) Model. This framework offers a dedicated npm package for handling multitenancy which is called **cap-mtxs** ([click here](https://www.npmjs.com/package/@sap/cds-mtxs)). The **@sap/cds-mtxs** package provides a set of services that implement **m**ultitenancy, features **t**oggles, and e**x**tensibility (‘MTX’ stands for these three features). 

Please refer to the official CAP MTXS documentation for further details ([click here](https://cap.cloud.sap/docs/guides/multitenancy/mtxs)).
