# Understand the Repository Structure

This part of the mission will briefly outline the structure of the **Basic Scope** branch so you're comfortable navigating through the provided repository. The following screenshots and explanations will give you an idea of the respective branch. 

1. [Overview](#1-overview)
2. [Application Router](#2-application-router)
3. [API Broker](#3-api-broker)
4. [Deployment Configurations](#4-deployment-configurations)
5. [Tenant Database Container](#5-tenant-database-container)
6. [Shared Database Container](#6-shared-database-container)
7. [HTTP Test Files](#7-http-test-files)
8. [Annotation Files](#8-annotation-files)
9. [Business Application Service](#9-business-application-service)
10. [API Service](#10-api-service)

Also check out the **Explore the application** part of this mission which describes various components and their tasks in greater detail ([click here](../7-explore-the-components/README.MD)).

## 1. Overview

The repository consists of several directories containing the API (service) broker, the API service and the application layers like User Interface, the business application service layer and the data models deployed in a tenant-specific and shared database container.

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_All.png" width="350"/>](./images/Repo_Structure_All.png) | <br> <br> **app -** Approuter and Fiori Elements <br> **broker -** Service broker configuration <br> **configs -** Deployment configurations (e.g. XSUAA) <br> **db -** Tenant data model <br> **db-com -** Shared data model <br> **http -** Http files for API testing <br> **srv -** Application service (OData & Onboarding) <br> **srv-api -** API service <br> **test -** Unit tests and sample csv files <br> **mta.yaml -** Descriptor for .mtar deployment <br> **package.json -** CDS related configs (e.g. mtxs, build settings) |

## 2. Application Router

Besides the **Approuter** instance, the **app** directory contains all SAP Fiori Elements user interface definitions which are dynamically generated based on the business application service annotations.

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_App.png" width="350"/>](./images/Repo_Structure_App.png) |  <br><br> **approuter -** AppRouter default instance <br><br> **uimodule -** UI development content <br><br> **modes -** Local development configs <br><br> **webapp -** Fiori Elements app definitions <br>&nbsp;**admin -** Admin apps <br>&nbsp;**appconfig -** Fiori Launchpad config <br>&nbsp;**public -** User apps <br><br><br> **multi-tenant.js -** Required for local development |


## 3. API Broker

The **broker** directory contains the API service broker related development objects.

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_Broker.png" width="350"/>](./images/Repo_Structure_Broker.png) |  <br><br> **catalog.json -** Service broker definition |


## 4. Deployment Configurations

In the **configs** directory, deployment related configuration files are stored and linked in the deployment descriptor (mta.yaml). 

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_Configs.png" width="350"/>](./images/Repo_Structure_Configs.png) | <br><br> **alert-notif.json -** Alert Notification configuration <br> **xs-security.json -** XSUAA configuration |


## 5. Tenant Database Container

The **db** directory contains the definition of the tenant specific data model, which is deployed to a new isolated database container for each and every SaaS tenant upon subscription. 

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_Tenant_Db.png" width="275"/>](./images/Repo_Structure_Tenant_Db.png) | <br><br> **cfg -** Configuration files for shared database container access <br><br> **src -** Native SAP HANA database objects <br>&nbsp; **functions -** Functions <br>&nbsp; **procedures -** Stored Procedures <br>&nbsp; **roles -** Schema Roles <br>&nbsp; **synonyms -** Synonyms <br><br> **data-models.cds -** Tenant data model definition <br> **data-types.cds -** Tenant data model types <br>|


## 6. Shared Database Container

The **db_com** directory contains the definition of the shared data model, which is accessible from all tenant database containers. It is used for data required by all consumer tenants (e.g. master data like Currencies, Languages or Countries).

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_Shared_Db.png" width="350"/>](./images/Repo_Structure_Shared_Db.png) |   **src -** Native SAP HANA database objects <br><p style='padding-left:1em'> **data -** Sample data csv files for Countries, Languages and Currencies <br> **\*_ACCESS.hdbrole -** Roles for external access by tenant database containers </p>  **data-model.cds -** Shared data model definition |


## 7. HTTP Test Files

The **http** directory contains http files allowing you to test the SaaS API endpoints from a SaaS consumer perspective. Further details on how to use these HTTP files can be found in a separate part of this mission ([click here](../5-push-data-to-saas-api/README.MD)).

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_Http.png" width="500"/>](./images/Repo_Structure_Http.png) |  **api\*.http -** HTTP files for testing the API from a SaaS consumer perspective used to provide sample data. |


## 8. Annotation Files

The **annotations** directory in the **srv** directory contains all 
business application service related annotations. These annotations define the capabilites and features of the OData services but also define the layouts of the SAP Fiori Elements interfaces. 

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_Annotations.png" width="300"/>](./images/Repo_Structure_Annotations.png) |  **admin -** Admin service annotations <br> **public -** User service annotations <br><p style='padding-left:1em'> **capabilities.cds -** Service capability annotations <br>**fieldControls.cds -** Service field control annotations <br>**layouts_\*.cds -** Fiori Elements layout annotations </p> **labels.cds -** Label annotations <br> **valueHelp.cds -** Value help annotations  <br> |


## 9. Business Application Service

The rest of the **srv** directory contains the implementation of all business application service related features. This includes the OData services for the user interfaces (Admin and User service) as well as the automation logic executed on subscription of new consumer-tenants. A lot of onboarding steps have been automated using different Cloud Foundry APIs and SAP BTP services. 

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_Service.png" width="300"/>](./images/Repo_Structure_Service.png) | <br><br> **utils -** Service utilities (mainly for automation purpose) <br>&nbsp;**automator.js -** Automation scripts <br>&nbsp;**cf-utils.js -** Cloud Foundry utilities <br>&nbsp;**cis-central.js -** Cloud Management Service utilities <br>&nbsp;**credStore.js -** Credential Store utilities <br>&nbsp;**destination.js -** Destination Service utilities <br>&nbsp;**service-manager.js -** Service Manager utilities <br>&nbsp;**token-utils.js -** Token helper utilities <br>&nbsp;**user-management.js -** User management utilities <br><br> **admin-service.cds -** Admin service definition <br>**admin-service.js -** Admin service handler <br> **annotations.cds -** Annotation file collector <br><br> **provisioning.js -** Provisioning handler <br> **public-service.cds -** User service definition <br> **public-service.js -** User service handler <br> **server.js -** Custom server.js  |


## 10. API Service

The **srv-api** directory contains the implementation of the API Service which can be used by SaaS consumers to provide or maintain data in their tenant database containers. Further details can be found in a separate part of this mission ([click here](../5-push-data-to-saas-api/README.MD)).

| | |
|:--: | :--- |
| [<img src="./images/Repo_Structure_API.png" width="300"/>](./images/Repo_Structure_API.png) | <br><br> **api-capabilities.cds -** API service capabilities <br> **api-service.cds -** API service definition <br> **api-service.js -** API service handler <br> |