# Develop a multitenant Software as a Service app in SAP BTP, Cloud Foundry Environment

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/btp-cf-cap-multitenant-susaas)](https://api.reuse.software/info/github.com/SAP-samples/btp-cf-cap-multitenant-susaas)

> Note: The content of this GitHub repository has been created as source for the SAP Discovery Center Mission [Develop a multitenant Software as a Service app in SAP BTP, Cloud Foundry Environment](available soon). We advise using the mission in the SAP Discovery Center directly.

## Description

The **Sustainable SaaS (SusaaS)** sample application has been build in a partner collaboration to help interested developers, partners and customers in developing multitenant Software as a Service applications running in the Cloud Foundry environment of the SAP Business Technology Platform (SAP BTP).

The example focuses on using standard frameworks and SAP BTP services for developing, deploying and monitoring the solution like the CAP framework, SAP API Management, CI/CD Service, Alert Notification, Autoscaler and many more. 

The sample application has a focus on the topic of sustainability and is therefore called **Sustainable SaaS** (SuSaaS) app. It allows customers (**consumer tenants**) of the SaaS application to extend their SAP solutions like S/4HANA with additional features developed by the SaaS vendor (**provider**). 

Due to the technical and theoretical complexity of the topic, the sample application shall not be seen or used in any kind for productive scenarios. It is supposed to present ideas and approaches for putting your personal scenario into practice. Our goal is to cover as many topics as we can, but not in the greatest depth that might justify a productive usability.  

Below you can find an solution architecture diagram of the sample application. As you can see, the app contains a lot of services and tools which you will use during the course of this mission (click to enlarge).

[<img src="./images/App_Architecture.png" width="600" />](./images/App_Architecture.png)

## Content

As stated above, the documentation content of this GitHub repository has been created for consumption in [SAP Discovery Center](https://discovery-center.cloud.sap/missiondetail/4064/4275), so the table of content follows the structure of the Disocvery Center scopes. While we highly recommend to start your own personal mission instance in SAP Discovery Center,  you can also follow along the steps here in GitHub using the linked README documents below.

Besides the documentation residing in the [main](github.com/SAP-samples/btp-cf-cap-multitenant-susaas) branch of this GitHub repository, you can find two more branches:

- the [basic](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/tree/basic) branch
- the [advanced](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/tree/advanced) branch 

Both contain codelines for the deployment of the basic and Advanced Scopes described in the mission target. The Expert Scope does not have it's own codeline. Instead, the main branch provides the respective code snippets and explanations to setup the different scenarios. 

To get started, we recommend to go through the **Discover** part first. This will introduce you to the basics of this scenario, the concepts of multitenancy and Software as a Service applications. 

**Discover**
- [Discover the mission target](./docu/1-discover/1-discover-mission-target/README.MD)
- [Learn the basics of SAP BTP](./docu/1-discover/2-learn-basics-sap-btp/README.MD)
- [Partners in SAP BTP ecosystem](./docu/1-discover/3-partners-sap-btp-ecosystem/README.MD)
- [Get the idea of SaaS applications](./docu/1-discover/4-get-idea-saas-applications/README.MD)
- [Understand SAP BTP multitenancy](./docu/1-discover/5-understand-btp-multitenancy/README.MD)
- [What's New](./docu/1-discover/6-whats-new/README.MD)

Deploy the **Basic Scope** of the SusaaS sample application after preparing your provider subaccount by assigning the required entitlements. Learn about the different components used in the comprehensive SaaS sample app running in your environment now and subscribe your first consumer tenant. 

**Basic Scope**
- [Introduction Basic Scope](./docu/2-basic/0-introduction-basic-scope/README.MD)
- [Repository structure](./docu/2-basic/1-understand-repo-structure/README.MD)
- [Prepare your Provider Subaccount](./docu/2-basic/2-prepare-provider-subaccount/README.MD)
- [Build and deploy the SaaS application](./docu/2-basic/3-build-deploy-saas-application/README.MD)
- [Subscribe a consumer subaccount](./docu/2-basic/4-subscribe-consumer-subaccount/README.MD)
- [Test the application](./docu/2-basic/6-test-the-application/README.MD)
- [Explore the components](./docu/2-basic/7-explore-the-components/README.MD)  
- [Push data to the SaaS API](./docu/2-basic/5-push-data-to-saas-api/README.MD)  
- [Unsubscribe a consumer subaccount](./docu/2-basic/8-unsubscribe-consumer-subaccount/README.MD)
- [Undeploy the SaaS application](./docu/2-basic/9-undeploy-saas-application/README.MD)
- [Troubleshooting](./docu/2-basic/10-troubleshooting/README.MD)

Enhance your SaaS sample app with **Advanced Scope** features like API Management to monitor and manage your SaaS API endpoints or SAP Identity Authentication to provide a central user management without relying on SAP ID service. Furthermore, you will learn and see a sample of how to integrate a backend system like SAP S/4HANA from a SaaS consumer perspective. 

> **Important** - The Advanced Scope is still Work-in-Progress. The code and documentation is subject to change. 

**Advanced Scope (WIP)**
- [Introduction Advanced Scope](./docu/3-advanced/0-introduction-advanced-scope/README.MD)
- [Repository structure](./docu/3-advanced/1-understand-repo-structure/README.MD)
- [Prepare the provider subaccount](./docu/3-advanced/2-prepare-provider-subaccount/README.MD)
- [Central user management with SAP IAS](./docu/3-advanced/3-central-user-management-ias/README.MD)
- [Build and deploy the SaaS application](./docu/3-advanced/4-build-deploy-saas-application/README.MD)
- [Subscribe a consumer subaccount](./docu/3-advanced/5-subscribe-consumer-subaccount/README.MD)
- [Test the application](./docu/3-advanced/6-test-the-application/README.MD)
- [Push data from SAP S/4HANA system](./docu/3-advanced/7-push-data-s4hana-system/README.MD)
- [Integrate with SAP API Management](./docu/3-advanced/8-integrate-sap-api-management/README.MD)
- [Troubleshooting](./docu/3-advanced/9-troubleshooting/README.MD)

The **Expert Scope** contains a variety of different topics which will make your application and life as a SaaS developer even more convenient. This reaches from the usage of CI/CD tools and SAP Transport Management for a continuous deployment to the management and backup of your tenant database containers. You will learn about multi-region deployments of SaaS applications and how to tackle topics like Custom Domain usage. 

> **Important** - The Expert Scope is still Work-in-Progress. The code and documentation is subject to change. 

**Expert Scope (WIP)**
- [Introduction Expert Scope](./docu/4-expert/0-introduction-expert-scope/README.MD)
- [Setup SAP CI/CD for your project](./docu/4-expert/setup-cicd-for-project/README.MD)
- [Configure SAP Transport Management](./docu/4-expert/configure-transport-management/README.MD)
- [How to do local/hybrid development](./docu/4-expert/local-hybrid-development/README.MD)
- [Manage tenant database containers](./docu/4-expert/manage-tenant-containers/README.MD)
- [Backup database containers](./docu/4-expert/backup-database-containers/README.MD)
- [Update tenant database containers](./docu/4-expert/update-tenant-containers/README.MD)
- [Setup custom domain usage](./docu/4-expert/custom-domain-usage/README.MD)
- [Custom domain for SAP IAS](./docu/4-expert/custom-domain-for-ias/README.MD)
- [Integrate a consumer's IdP](./docu/4-expert/integrate-consumers-idp/README.MD)
- [Deploy to multiple regions](./docu/4-expert/deploy-multiple-regions/README.MD)
- [Send email using Microsoft Graph API](./docu/4-expert/send-emails-graph-api/README.MD)
- [Using the SAP Theme Designer](./docu/4-expert/using-sap-theme-designer/README.MD)
- [Troubleshooting](./docu/4-expert/troubleshooting/README.MD)


## Requirements

The technical requirements for setting up this sample SaaS application can also be found in the different scope tutorials. Please find more details in the respective mission documentation [**Prepare your Provider Subaccount**](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/tree/main/docu/2-basic/2-prepare-provider-subaccount/README.MD).

**Basic Scope**
The Basic Scope of the sample application requires the following set of SAP BTP entitlements in the provider subaccount. 

> **Important** - If you want to test the sample SaaS application in a SAP BTP Trial account, please make sure to use either **eu10** or **us10** as region of your choice! SAP HANA Cloud is not available in the Singapore Trial environment!


| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| [SAP Alert Notification service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/alert-notification?region=all)                        | standard      |     1    |
| [Application Autoscaler](https://discovery-center.cloud.sap/serviceCatalog/application-autoscaler/?service_plan=standard&region=all&commercialModel=cloud)                   | standard      |     1    |
| [SAP Application Logging Service](https://discovery-center.cloud.sap/serviceCatalog/application-logging-service/?region=all)              | lite          |     1    |
| [SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)| broker        |     1    |
| [SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)| application   |     1    |
| [SAP BTP, Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all)                     | MEMORY        |     2    |
| [SAP Cloud Management Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/cloud-management-service/?region=all)                 | central       |     1    |
| [SAP Credential Store](https://discovery-center.cloud.sap/serviceCatalog/credential-store?region=all)                        | trial         |     1    |
| [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=cloud)                    | lite          |     1    |
| [SAP HTML5 Application Repository Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) | app-host      |     1    |
| [SAP HTML5 Application Repository Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) | app-runtime   |     1    |
| [SAP Software-as-a-Service Provisioning service](https://discovery-center.cloud.sap/serviceCatalog/saas-provisioning-service?service_plan=application&region=all&commercialModel=cloud)                 | application   |     1    |
| [SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all)                            | hana          |     1    |
| [SAP HANA Schemas & HDI Containers](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/e28abca91a004683845805efc2bf967c.html?version=2.0.04&locale=en-US)       | hdi-shared    |     1    |
| [SAP Service Manager](https://discovery-center.cloud.sap/serviceCatalog/service-manager/?region=all)                      | container     |     1    |

**Advanced Scope**
The Advanced Scope will require some more service and software components which are listed below depending which of the scenarios you want to run.

> **Important** - Some of the required services like SAP Identity Authentication are not available in the SAP BTP Trial environment. Make sure to either use a SAP BTP Free Tier or Enterprise account.

| Service                                | Plan                                 | Number of Instances |
|----------------------------------------|--------------------------------------|:-------------------:|
| [SAP Credential Store](https://discovery-center.cloud.sap/serviceCatalog/credential-store?region=all)| standard | 1 |
| SAP NetWeaver system incl. EPM model (*) |                                      |          |
| [SAP Integration Suite (**)](https://discovery-center.cloud.sap/serviceCatalog/integration-suite?region=all)                     | trial (***) or standard (Application)   |     1    |
| [SAP API Management, API portal (**)](https://help.sap.com/docs/SAP_CLOUD_PLATFORM_API_MANAGEMENT/66d066d903c2473f81ec33acfe2ccdb4/e609a3efe6d64e1781cbf81ae5592071.html?locale=en-US)         | apim-as-route-service                |     1    |
| [SAP Cloud Identity Services](https://discovery-center.cloud.sap/serviceCatalog/identity-authentication?region=all&tab=feature)                   | default (Application) |     1    |
| [SAP Cloud Identity Services](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/d5cd80c6928e4ac98586025170efdf08.html?locale=en-US)             | application   |     1    |

> (*) A SAP NetWeaver system is required ff you want to test the automated data push feature from an existing SAP solution. You can use all **SAP S/4HANA** releases and also any other SAP systems which has a **SAP NetWeaver** stack version higher than 7.3.

> (**) SAP Integration Suite is required if you want to integrate your SaaS API with [SAP API Management](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/tree/main/docu/3-advanced/8-integrate-sap-api-management/README.MD).

> (***) Please keep in mind - The SAP Integration Suite *trial plan* is valid for 90 days only. Your tenant will be decommissioned after 90 days and you need to setup a new tenant if you wish to do further validations with a trial tenant. 


**Expert Scope**
The Expert Scope will require the following additional service and software components which are listed below depending which of the scenarios you want to run:

| Service                               | Plan                               | Number of Instances |
|---------------------------------------|------------------------------------|:-------------------:|
| [SAP Continuous Integration and Delivery](https://discovery-center.cloud.sap/serviceCatalog/continuous-integration--delivery?region=all) | default (Application)                           |          1          |
| SAP Continuous Integration and Delivery | default                           |          1          |
| [SAP Cloud Transport Management](https://discovery-center.cloud.sap/serviceCatalog/cloud-transport-management?region=all)            | standard (Application) / lite (Application)      |          1          |
| SAP Cloud Transport Management           | standard                          |          1          |
| [SAP Custom Domain Service](https://discovery-center.cloud.sap/serviceCatalog/custom-domain?service_plan=custom-domain&region=all)                 | standard (Application)             |          1          |


## Deployment

The deployment is described in the **Basic Scope** of the mission documentation ([click here](./docu/2-basic/3-build-deploy-saas-application/README.MD)). 

## Known Issues
 - Chart destroy issue
   - **Problem**: Trying to open the Assessments not possible after it is been successfully opened before
   - **Issue**: If the charts in the Assessments app have not been rendered because you haven't loaded the object page subsections, some chart related components are not destroyed properly when leaving the Assessments app. 
   - **Workaround**: Refresh the page and open the Assessments app again. Open all Object Page Sections at least once before leaving the Assessments app.
   - **Solution**: Fix to be released in the near future. 


## How to obtain support
[Create an issue](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing
If you wish to contribute code, offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
