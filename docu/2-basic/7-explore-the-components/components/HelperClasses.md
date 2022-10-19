# Deep Dive into Helper Classes

In this part of the mission, you will learn about the different helper classes implemented in the business application service. These classes mainly support the automation of the tenant subscription process. Furthermore, they contain the logic of the in-app user management.  

1. [Overview](#1-Overview)
2. [Automator](#2-Automator)
3. [Cloud Management Helper](#3-Cloud-Management-Helper)
4. [Service Manager Helper](#4-Service-Manager-Helper)
5. [Token Helper](#5-Token-Helper)
6. [Destination Helper](#6-Destination-Helper)
7. [Credential Store Helper](#7-Credential-Store-Helper)
8. [User Management Helper](#8-User-Management-Helper)


## 1. Overview

The table below shows all helper classes used by the Sustainable SaaS business application service:

| Util          | Source Code                | Description                                                           | 
| ------------- | -------------------------- | --------------------------------------------------------------------- |
| [Automator](#22-Automator)     | [automator.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/automator.js)| Helper class for automatic creation and deletion of artifacts on tenant (un-)subscription | 
| [Cloud-Management-Helper](#23-Cloud-Management-Helper) | [cis-central.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/cis-central.js) | Helper class interacting with Cloud Management Service (central plan) |
| [Service-Manager-Helper](#24-Service-Manager-Helper) | [service-manager.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/service-manager.js) | Helper class interacting with Service Manager Subaccount (admin plan) |
| [Token-Helper](#25-Token-Helper)  | [token-utils.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/token-utils.js) | Helper class retrieving tokens from relevant OAuth2 servers |
| [Destination-Helper](#26-Destination-Helper)  | [destination.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/destination.js) | Helper module interacting with the SAP Destination Service |
| [Credential-Store-Helper](#27-Credential-Store-Helper)  | [credStore.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/credStore.js) | Helper module interacting with SAP Credential Store instance |
| [User-Management-Helper](#28-User-Management-Helper)  | [user-management.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/user-management-utils.js) | Helper class for User and Role management interacting with SAP Identity Authentication and XSUAA |


## 2. Automator

For effortless tenant on-offboarding in the SaaS context, it is essential to automate the process of onboarding as much as it can be automated. Therefore, the sample application automates as many steps as possible during the subscription of the SaaS tenant instance. The [Automator](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/automator.js) module helps to provide a fully automated, self-service (un-) subscription experience.

The Automator is responsible for the following topics:
- Creation of destinations in a consumer subaccount on subscription with the help of [destination.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/destination.js).
- Deletion of destinations from consumer subaccount on unsubscription with the help of [destination.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/destination.js).
- Creation of a service manager service instance & binding within a consumer subaccount with the help of [cis-central.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/cis-central.js).
- Deletion of a service manager service instance & binding from a consumer subaccount with the help of [cis-central.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/cis-central.js).
- Registering of a service broker in a consumer subaccount on subscription with the help of [service-manager.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/service-manager.js).
- Unregistering of a service broker from a consumer subaccount on unsubscription with the help of [service-manager.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/service-manager.js).

When a tenant subscribes to the Sustainable SaaS app,
1. A new Service Manager instance will be created in the consumer subaccount by Cloud Management Service - Central Plan.
2. The API Broker will be registered by the Service Manager instance created in step 1.
3. A destination called **susaas-api** will be created.
4. The Service Manager instance created in step 1 will be deleted again.

When a tenant unsubscribes from the Sustainable SaaS app,
1. A new Service Manager instance will be created in the consumer subaccount by Cloud Management Service - Central Plan.
2. The API Broker will be unregistered by the Service Manager instance created in Step 1.
3. The **susaas-api** destination will be deleted.
4. The Service Manager instance created in Step 1 will be deleted.


## 3. Cloud Management Helper
[SAP BTP Cloud Management Service](#https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/17b6a171552544a6804f12ea83112a3f.html?locale=en-US&q=Cloud%20Management%20Central) enables SAP BTP administrators to handle administrative tasks via APIs.

In this Sustainable SaaS application context, we are using **SAP BTP Cloud Management Service** to create and delete Service Manager instances in consumer subaccounts.

## 4. Service Manager Helper

Service Manager is a central registry for service brokers and platforms. It tracks service instances creation and allows sharing of services and service instances between different platform instances. The Service Manager allows an application to use services and service instances of multiple platforms.

The [Service Manager helper](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/service-manager.js) module is used for (un-)registering the API Broker in the Sustainable SaaS App context by interacting with the [Service Manager service instance](https://api.sap.com/api/APIServiceManagment/overview).

## 5. Token Helper
The [Token helper](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/token-utils.js) module is used for retrieving tokens from OAuth2 servers using password and client credentials type.

## 6. Credential Store Helper
The [Credential Store helper](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/credStore.js) module is used to interact with the [SAP Credential Store](https://api.sap.com/package/CredentialStore/rest) service in the provider subaccount.

## 7. User Management Helper
The [User Management Helper](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/srv/utils/user-management-utils.js) module is used for handling users and role assignments on both SAP IAS and XSUAA. For this use-case, it is required to allow in-app user management for consumers.

**Requirements**
1. A tenant administrator should be able to create users without accessing the SAP BTP consumer subaccount.
2. A tenant administrator should be able to assign role collections to users without accessing the SAP BTP consumer subaccount.
3. A tenant administrator should be able to delete users without accessing the SAP BTP consumer subaccount.

**How does the creation of a user work?**
1. A User is created in [SAP IAS](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/d17a116432d24470930ebea41977a888.html?version=Cloud&locale=en-US) (**Only in advanced scope!**).
2. An XSUAA shadow user is created in the SAP BTP consumer subaccount.
3. The chosen role is assigned to the Shadow User for authorization purposes.

**How does the deletion of a user work?**
1. The user is deleted from the tenant subaccount.
2. The User is deleted from SAP IAS (**Only in advanced scope**).

To be able to provide this functionality, the User-Management-Helper interacts with SAP IAS APIs as well as XSUAA APIs.

## 8. Destination Helper
[Destination Helper Module](./user-management.js) is used for retrieving, creating, and deleting destinations in any given subaccount.