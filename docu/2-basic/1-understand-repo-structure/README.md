# Understand the Repository Structure

This part of the mission will briefly outline the structure of the **Basic Scope** branch so you're comfortable navigating through the provided repository. The following screenshots and explanations will give you an idea of the respective branch. 

1. [Overview](#1-overview)
2. [Application](#2-application)
3. [API Broker](#3-api-broker)
4. [Deployment Configurations](#4-deployment-configurations)
5. [Tenant Database Container](#5-tenant-database-container)
6. [Shared Database Container](#6-shared-database-container)
7. [Extension Files](#7-extension-files)
8. [HTTP Test Files](#8-http-test-files)
9. [Annotation Files](#9-annotation-files)
10. [Business Application Service](#10-business-application-service)
11. [API Service](#11-api-service)
12. [Test objects](#12-test-objects)

Also, check out the **Explore the application** part of this mission which describes various components and their tasks in greater detail ([click here](../7-explore-the-components/README.md)).


## 1. Overview

The repository consists of several directories containing the API (service) broker, the API service, and the application layers like User Interface, the business application service layer, and the data models deployed in a tenant-specific and shared database container.

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_All.png" width="350"/>](./images/Repo_Structure_All.png?raw=true) | <br> <br> **app -** Approuter and SAP Fiori Elements <br> **broker -** Service broker configuration <br> **configs -** Deployment configurations (e.g. XSUAA) <br> **db -** Tenant data model <br> **db-com -** Shared data model <br> **ext -** Extension files <br> **http -** Http files for API testing <br> **srv -** Business application service <br> **srv-api -** API service <br> **test -** Unit tests and sample data <br> **mta.yaml -** Descriptor for .mtar deployment <br> **package.json -** CDS related configs (e.g. mtxs, build settings) |


## 2. Application

Besides the **Approuter** instance, the **app** directory contains all SAP Fiori Elements user interface definitions which are dynamically generated based on the business application service annotations.

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_AppRouter.png" width="170"/>](./images/Repo_Structure_AppRouter.png?raw=true) ![<img src="./images/Repo_Structure_Apps.png" width="170"/>](./images/Repo_Structure_Apps.png?raw=true) |  **appconfig -** Configuration for local testing <br> **approuter -** AppRouter instance <p style='padding-left:1em'> **local-testing -** Config files for local testing <br> (e.g. authenticationType *none*) <br> **resources -** Static AppRouter resources <br> (e.g. index.html and Sandbox Launchpad configuration)<br> **xs-app.json -** Route definitions </p> **ui-admin-\* -** Admin UI modules <p style='padding-left:1em'> **xs-app.json -** Route definitions <br> **webapp -** SAPUI5 application resources </p> **ui-public-\* -** Public UI modules |


## 3. API Broker

The **broker** directory contains the API broker-related development objects.

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Broker.png" width="350"/>](./images/Repo_Structure_Broker.png?raw=true) |  **catalog.json -** Service broker definition |


## 4. Deployment Configurations

In the **configs** directory, deployment-related configuration files are stored and linked in the deployment descriptor (mta.yaml). 

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Configs.png" width="350"/>](./images/Repo_Structure_Configs.png?raw=true) | **automator -** SAP BTP Setup Automator resources <br> (check README for details) <p style='padding-left:1em'> **parameters.json -** Parameter file for setup <br> **usecase_\*.json -** Usecase definitions (environment specific) </p> **deployment -** MTA extensions for Free Tier and Trial <br> **alert-notif.json -** Alert Notification configuration <br> **xs-security.json -** XSUAA configuration |


## 5. Tenant Database Container

The **db** directory contains the definition of the tenant-specific data model, which is deployed to a new isolated database container for each and every SaaS tenant upon subscription. 

> **Important** - Based on the CDS profile used in cds watch or cds build, the tenant database model includes or excludes tables for Currencies, Languages, and Countries. For local testing targeting sqlite, those master data tables and sample values are part of the individual tenant database model. For a production build targeting SAP HANA Cloud, these tables are replaced by views and synonyms pointing to the shared database container. Also check the package.json profiles in "db-ext" to get a better understanding.

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Tenant_Db.png" width="350"/>](./images/Repo_Structure_Tenant_Db.png?raw=true) | <br><br> **cfg -** Configuration files for shared database container access <br> **hana -** Tenant data model extension for production build <br> **sqlite -** Tenant data model extension for local testing <br> **src -** Native SAP HANA database objects <br><p style='padding-left:1em'> **functions -** Functions <br> **procedures -** Stored Procedures <br> **roles -** Schema roles <br> **synonyms -** Synonyms </p> **data-models.cds -** Tenant data model <br> **data-types.cds -** Tenant data model types <br>|


## 6. Shared Database Container

The **db_com** directory contains the definition of the shared data model, which is accessible from all tenant database containers. It is used for data required by all consumer tenants (e.g. master data like Currencies, Languages, or Countries).

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Shared_Db.png" width="350" />](./images/Repo_Structure_Shared_Db.png?raw=true) | **src -** Native SAP HANA database objects <br><p style='padding-left:1em'> **data -** Sample csv files for Countries, Languages and Currencies <br> **\*_ACCESS.hdbrole -** Roles for external access by tenant database containers </p>  **data-model.cds -** Shared data model definition |

## 7. Extension files

The **ext** directory contains files for a sample extension project, which can be used by SaaS subscribers to extend an existing SaaS solution. Please check the Expert Scope for further details

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Ext.png" width="350" />](./images/Repo_Structure_Ext.png?raw=true) | **app -** CDS extensions for data model, services and SAP Fiori <br> **i18n -** Translations for extensions |


## 8. HTTP Test Files

The **http** directory contains HTTP files allowing you to test the SaaS API endpoints from a SaaS consumer perspective. Further details on how to use these HTTP files can be found in a separate part of this mission ([click here](../5-push-data-to-saas-api/README.md)). Furthermore, you can find a sample http file allowing you to upgrade your tenant databases in case of data model changes. 

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Http.png" width="350"/>](./images/Repo_Structure_Http.png?raw=true) |  **api-test-hybrid.http -** HTTP file for hybrid API testing <br> **api\*.http -** HTTP files for SAP BTP API testing <br> **tenantUpgrade.http -** HTTP file for tenant database updates <br> |


## 9. Annotation Files

The **annotations** directory in the **srv** directory contains all 
business application service-related annotations. These annotations define the capabilities and features of the OData services but also define the layouts of the SAP Fiori Elements interfaces. 

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Annotations.png" width="350"/>](./images/Repo_Structure_Annotations.png?raw=true) |  **admin -** Admin service annotations <br> **public -** User service annotations <br><p style='padding-left:1em'> **capabilities.cds -** Service capability annotations <br>**fieldControls.cds -** Service field control annotations <br>**layouts_\*.cds -** Fiori Elements layout annotations </p> **labels.cds -** Label annotations <br> **valueHelp.cds -** Value help annotations  <br> |


## 10. Business Application Service

The rest of the **srv** directory contains the implementation of all business application service-related features. This includes the OData services for the user interfaces (Admin and User service) as well as the automation logic executed on the subscription of new consumer-tenants. A lot of onboarding steps have been automated using different platform APIs and SAP BTP services. 

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Service.png" width="350"/>](./images/Repo_Structure_Service.png?raw=true) | **i18n -** Language files <br> **utils -** Service utilities (mainly for automation purpose) <br><p style='padding-left:1em'> **alertNotification.js -** Alert Notification utilities <br> **automator.js -** Automation scripts <br> **cf-utils.js -** Cloud Foundry utilities <br>**cis-central.js -** Cloud Management Service utilities <br>**credStore.js -** Credential Store utilities <br>**destination.js -** Destination Service utilities <br>**service-manager.js -** Service Manager utilities <br>**token-utils.js -** Token helper utilities <br>**user-management.js -** User management utilities </p> **admin-service.cds -** Admin service definition <br>**admin-service.js -** Admin service handler <br> **annotations.cds -** Annotation file collector <br>**provisioning.js -** Provisioning handler <br> **public-service.cds -** User service definition <br> **public-service.js -** User service handler <br> **server.js -** Custom server.js  |


## 11. API Service

The **srv-api** directory contains the implementation of the API Service which can be used by SaaS consumers to provide or maintain data in their tenant database containers. Further details can be found in a separate part of this mission ([click here](../5-push-data-to-saas-api/README.md)).

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_API.png" width="350"/>](./images/Repo_Structure_API.png?raw=true) |  **api-capabilities.cds -** API service capabilities <br> **api-service.cds -** API service definition <br> **api-service.js -** API service handler <br> **server.js -** Custom server.js to disable mtxs features <br> |


## 12. Test objects

The **test** directory contains sample data for local development and testing purposes as well as sample unit tests. 

| | |
|:--: | :--- |
| ![<img src="./images/Repo_Structure_Test.png" width="350"/>](./images/Repo_Structure_API.png?raw=true) | **data -** Sample data for tenant data model <br><br> **index.cds -** CDS file for builder <br> **test.js -** Sample unit tests <br> |