# Explore the application components

After you have deployed the sample application the following components will be available in your provider account:

1. [Application Router](#1-application-router) for handling multitenancy authentication 
2. [UI Component](#2-ui-component) providing the user interface of the app
3. [Business Application Service](#3-business-application-service) for onboarding and providing OData services
4. [API Service](#4-api-service) for external data integration
5. [API Broker](#5-api-broker) for creating an API Service Broker
6. [Tenant database containers](#6-tenant-database-containers) for tenant specific data
7. [Shared database container](#7-shared-database-container) for data shared among all tenants

This part of the mission will provide deeper insights of the different components and let's you build up some expert knowledge about topics like **Service Brokers** or **Multitenancy**. The screenshot below shows the architecture of the **Basic Scope** which will run in the **trial** environment seamlessly.

[<img src="./images/basic-arch1.png" width="700"/>](./images/basic-arch1.png)

## 1. Application Router 

> **Important** - Find more details in the [Multitenancy Readme](./components/Multitenancy.MD) Reamde document!

The application router is the single point-of-entry for an application running in the Cloud Foundry environment on SAP BTP. An application router can be used to serve static content, authenticate users, rewrite URLs, and forward or proxy requests to other micro services while propagating user and tenant information.

Each multitenant application has to deploy its own application router, and the application router handles requests of all tenants to the application. The application router is able to determine the tenant identifier out of the URL and then forwards the authentication request to the tenant User Account and Authentication \(UAA\) service and the related identity zone.


## 2. UI Component

The user interface of this sample application has been developed using SAP Fiori Elements. SAP Fiori Elements based applications benefit from a template and metadata-driven approach. SAP Fiori Elements provides designs for UI patterns and predefined floorplans for common application use cases. App developers can use SAP Fiori Elements to create SAP Fiori applications based on OData services and annotations that don't need JavaScript UI coding. 

The resulting app uses predefined views and controllers that are provided centrally. This means no application-specific view instances are required. SAPUI5 interprets metadata and annotations of the underlying OData service and uses the corresponding views for the SAP Fiori app at startup. Still, SAP Fiori Elements based applications can be easily extended with minimal coding effort.


## 3. Business Application Service

> **Important** - Find more details in the [Helper Classes](./components/HelperClasses.MD) Reamde document!

The service layer of the sample application has been developed using the SAP CAP framework. It provides OData services for the UI component and has a built-in support for multitenancy with a SAP HANA Cloud database. Furthermore, it provides the (un-)subscription callbacks required for tenant onboarding. While the OData service definition and the custom handlers are straightforward, most of the interesting code snippets can be found in the helper classes used for the automation of subscription requirements. The Business Application Service also contains the annotations required by SAP Fiori Elements for automatically rendering a proper UI. 


## 4. API Service 

> **Important** - Find more information on how to use the SaaS API in the following part of this mission ([click here](../5-push-data-to-saas-api/README.MD))!


For consumers that want to push data to their database container instances of the SaaS solution, an API endpoint has been developed using CAP. Tenants can use this API to push data to their own HDI containers for calculation and analyzing purpose. The API is accessible using client credentials provided to consumer tenants using a service instance of the SaaS API (Service) Broker. Check out the next card to find out how to push data to this API as a SaaS consumer.

Below you can see the available entities of the SaaS API. Besides  application related data like Product information or Sales Order records, also master data like Currencies, Languages or Countries can be maintained using the API. 

[<img src="./images/API_Endpoints.png" width="700"/>](./images/API_Endpoints.png)

Besides the default CRUD methods for entity maintenance, also some sample actions are provided allowing a bulk-insert (delete & insert) for the major application entities. 

Finally, you can find samples for OData actions allowing you to bulk-update products using CAP CQL UPDATE feature and to bulk-upsert Sales Orders using a SAP HANA Stored procedure.


## 5. API Broker 

> **Important** - Find more details in the [Service Broker](./components/ServiceBroker.MD) Reamde document!

Service brokers manage instances of services used by applications running in the Cloud Foundry runtime.

In Cloud Foundry, the service broker is responsible for maintaining and managing instances of service brokers and all available services. Services can be bound to applications that require the services provided by a service instance. Developers can use the service broker to bind service instances to the application that wants to make use of the services.

In this application scenario, we have created an API for SaaS consumers as a backing service. Therefore, the service broker is responsible of creating [SaaS API](#saas-api) service instances in the tenant subaccounts. 


## 6. Tenant database containers

The application provides a sample data model, which supports a flexible usage of SAP Fiori Elements for OData v4 including features like Draft support. This data model is deployed upon subscription of a consumer tenant into a new SAP HANA HDI database container. Using the HANA Deployment Infrastructure (HDI) and associated containers, this allows a secure isolation of all tenant related data. As CAP is a great backing service for the usage of SAP Fiori Elements providing the required OData services and annotations, also the data model structure has to be compliant with an easy-to-consume user interface usage.

Furthermore, the requirement for a tenant-based SaaS API is fulfilled by dedicated tables which each consumer can maintain using the SaaS API. By decoupling these tables from draft enabled application tables, consumers can decide to prefill content into their assessments, but are also flexible in setting up their own scenarios using the manual data input. 

Below you can see an overview the tables deployed into new tenant database containers upon subscription.

[<img src="./images/DM_Tables.png" width="700"/>](./images/DM_Tables.png)

> **Hint** - The **Roles** table is only used for local development scenarios. If running the app in SAP BTP, the roles are automatically fetched from SAP XSUAA and no separate storage is required. 


## 7. Shared Database Container

> **Important** - Find more details in the [Shared Container](./components/SharedContainer.MD) Reamde document!

To have the ability to share data among your consumer tenants, a shared database container is setup for the sample scenario. This allows the provider to maintain e.g. master data (Languages, Countries, Currencies) in a central place and update it simultaneously for all consumer tenants. This concept is building on the cross-container access capabilities of database containers in the same Cloud Foundry Space. 
