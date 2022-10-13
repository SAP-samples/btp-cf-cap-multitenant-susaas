# Introduction to the Basic Scope

The **Basic Scope** of the mission will provide you with the core elements required for a Software as a Service (SaaS) application on SAP Business Technology Platform (SAP BTP). 

1. [Step-by-Step](#1-Step-by-Step)
2. [Scope Features](#2-Scope-Features)
3. [Scope Result](#3-Scope-Result)

You can setup the Basic Scope in any kind of SAP BTP environment so even **Trial** or **Free Tier** users can deploy this version of the SaaS application. See the following screenshot to get an idea of the Basic Scope architecture.

![Basic Architecture](./images/App_Architecture_Basic.png)

## 1. Step-by-Step

For completing the **Basic Scope** please follow the respective cards or check out the linked Readme documents. 

1. Start with **Understanding the repo structure**. ➜ ([click here](../1-understand-repo-structure/README.MD))
2. **Prepare your provider subaccount** for deployment. ➜ ([click here](../2-prepare-provider-subaccount/README.MD))
3. Next, **build and deploy** your SaaS application. ➜ ([click here](../3-build-deploy-saas-application/README.MD))
4. After deployment **subscribe a consumer subaccount**. ➜ ([click here](../4-subscribe-consumer-subaccount/README.MD))
5. **Explore the application** and its different components. ➜ ([click here](../7-explore-the-components/README.MD))
6. Provide sample content by **pushing data to the SaaS API**. ➜ ([click here](../5-push-data-to-saas-api/README.MD))
7. Learn how to **unsubscribe the consumer account**. ➜ ([click here](../7-unsubscribe-consumer-subaccount/README.MD))
8. **Undeploy the SaaS applicaction** if required. ➜ ([click here](../8-undeploy-saas-application/README.MD))

## 2. Scope Features

The **Basic Scope** provides the sample implementation of a CAP based multitenant SaaS application containing features like a

- **SAP HANA Cloud** database model to store the application or API data of all tenants and a data model shared among all tenants.
- **CAP OData service** providing an OData v4 service for the application layer including annotations (Service Engine).
- **Fiori Elements** application based on various annotations and samples for extension options (UI Component).
- **CAP API service** providing all tenants an interface to provide data from solutions like SAP S/4HANA (SaaS API).
- **Service Broker** allowing tenants to create a service broker instance to access the application's API (API Broker).

Furthermore, the **Basic Scope** provides sample integrations and usage scenarios of SAP BTP services including 

- basic enterprise application features like
    - **Alert Notification Service** informing you about issues with your application like a crash or errors during tenant onboarding.
    - **Autoscaler Service** which is scaling your SaaS application components in case of increased workload by your SaaS tenants.
    - **Logging Service** allowing you to track and access and analyze logs of your SaaS application.
    - **Credential Store** which is used to securely store secret like powerful technical platform administrator credentials.
    - **HTML5 Application Repository** storing and serving your static application content making your app much more resilient.
- important components for SaaS usage like
    - **SAP HANA Cloud** allowing you to use the powerful container concept for tenant separation on the same database.
    - **Service Manager** which is responsible of handling and secure communication with the tenant database containers. 
    - **Application Router** which is one of the key players in handling the multitenancy features of your SaaS application.
- Authorization & Trust Management service instances of
    - **application** plan which handles the XSUAA-based application authentication and authorization of all tenants.
    - **broker** plan which takes care of the XSUAA-based API access security requirements for all tenants.

As the setup includes a lot of different services and components, only the elements which are not self-explainatory will be covered in detail by this mission scope. We highly recommend to check SAP Help or related documentations of the components (e.g. in the npm packages) in case you want to learn more. 


## 3. Scope Result

The result of this scope will be a SaaS application running in a subaccount of your own SAP BTP global account which 

- offers your tenants an user interface to
    - **manage** the tenant specific **users** of the SaaS application.
    - create **projects** and assign users as **members** to different projects.
    - setup **assessments** for analyzing product circularity metrics.
- provides an SAP HANA Cloud HDI container based **data separation** for all tenants.
- can be subscribed from subaccounts (**consumers**) in the same global account.
- creates a dedicated **service broker instance** for **API access** during subscription.
- allows your tenants to read and **update data** using a multitenant **API** endpoint.
- let's tenants **prefill** their assessments with data uploaded through the API.

*HDI - HANA Deployment Infrastructure

See the following screenshots will give you an idea of the Basic Scope results (click to enlarge).

| [<img src="./images/App_Sample01.png" width="300" alt="Main Menu"/>](./images/App_Sample01.png) | [<img src="./images/App_Sample02.png" width="300" alt="Project List"/>](./images/App_Sample02.png)
|:----------: | :------------: |
| *Main Menu* | *Project List* |

| [<img src="./images/App_Sample03.png" width="300" alt="Project Details"/>](./images/App_Sample03.png) | [<img src="./images/App_Sample04.png" width="300" alt="Project Assessments"/>](./images/App_Sample04.png)
|:----------------: | :-------------------: |
| *Project Details* | *Project Assessments* |

| [<img src="./images/App_Sample05.png" width="300" alt="Project Members"/>](./images/App_Sample05.png) | [<img src="./images/App_Sample06.png" width="300" alt="Add Project Member"/>](./images/App_Sample06.png)
|:----------------: | :------------------: |
| *Project Members* | *Add Project Member* |

| [<img src="./images/App_Sample07.png" width="300" alt="User List"/>](./images/App_Sample07.png) | [<img src="./images/App_Sample08.png" width="300" alt="User Details"/>](./images/App_Sample08.png)
|:----------: | :------------: |
| *User List* | *User Details* |

| [<img src="./images/App_Sample09.png" width="300" alt="Assessment List"/>](./images/App_Sample09.png) | [<img src="./images/App_Sample10.png" width="300" alt="Assessment Details"/>](./images/App_Sample10.png)
|:----------------: | :------------------: |
| *Assessment List* | *Assessment Details* |

| [<img src="./images/App_Sample11.png" width="300" alt="Circularity Metrics"/>](./images/App_Sample11.png) | [<img src="./images/App_Sample12.png" width="300" alt="Circularity Charts"/>](./images/App_Sample12.png)
|:--------------------: | :------------------: |
| *Circularity Metrics* | *Circularity Charts* |

| [<img src="./images/App_Sample13.png" width="300" alt="Sales Splits"/>](./images/App_Sample13.png) | [<img src="./images/App_Sample14.png" width="300" alt="Prefill Sales Splits"/>](./images/App_Sample14.png)
|:-------------: | :--------------------: |
| *Sales Splits* | *Prefill Sales Splits* |

| [<img src="./images/App_Sample15.png" width="300" alt="Material Splits"/>](./images/App_Sample15.png) | [<img src="./images/App_Sample16.png" width="300" alt="Modify Material Splits"/>](./images/App_Sample16.png)
|:----------------: | :----------------------: |
| *Material Splits* | *Modify Material Splits* |

| [<img src="./images/App_Sample17.png" width="300" alt="Material Splits"/>](./images/App_Sample17.png) 
|:----------------: |
| *Material Splits* |