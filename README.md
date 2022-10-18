# Develop a multitenant Software as a Service app in SAP BTP, Cloud Foundry environment

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/btp-cf-cap-multitenant-susaas)](https://api.reuse.software/info/github.com/SAP-samples/btp-cf-cap-multitenant-susaas)

> Note: The content of this GitHub repository has been created as source for the SAP Discovery Center Mission [Develop a multitenant Software as a Service app in SAP BTP, Cloud Foundry environment](https://discovery-center.cloud.sap/missiondetail/4064/4275). We advise using the mission in the SAP Discovery Center directly.

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

Both contain codelines for the deployment of the basic and Advanced Scopes described in the mission target. The Expert Scope does not have it's own codeline. Instead, the main branch provides the respective code snippets and explanations  to setup the different scenarios. 

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
- [Introduction basic scenario](./docu/2-basic/0-introduction-basic-scope/README.MD)
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

**Advanced Scope**
- [Introduction advanced scenario](./docu/3-advanced/0-introduction-advanced-scope/README.MD)
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

**Expert Scope**
- [Introduction expert scenario](./docu/4-expert/0-introduction-expert-scope/README.MD)
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

The technical requirements for setting up this sample SaaS application can also be found in the different scope tutorials.

**Basic Scope**
The Basic Scope of the sample application requires the following set of SAP BTP entitlements in the provider subaccount. 

| Service                                   | Plan          | Number of Instances |
|-------------------------------------------|---------------|:-------------------:|
| Alert Notification                        | standard      |     1    |
| Application Autoscaler                    | standard      |     1    |
| Application Logging Service               | lite          |     1    |
| Authorization and Trust Management Service| broker        |     1    |
| Authorization and Trust Management Service| application   |     1    |
| Cloud Foundry Runtime                     | MEMORY        |     2    |
| Cloud Management Service                  | central       |     1    |
| Cloud Management Service                  | local         |     1    |
| Credential Store                          | trial         |     1    |
| Destination Service                       | lite          |     1    |
| HTML5 Application Repository Service      | app-host      |     1    |
| HTML5 Application Repository Service      | app-runtime   |     1    |
| SaaS Provisioning Service                 | application   |     1    |
| SAP HANA Schemas & HDI Containers         | hdi-shared    |     1    |
| SAP HANA Cloud                            | hana          |     1    |
| Service Manager                           | container     |     1    |

**Advanced Scope**
The Advanced Scope will require some more service and software components which are listed below depending which of the scenarios you want to run:

| Service                               | Plan                              | Number of Instances |
|---------------------------------------|-----------------------------------|:-------------------:|
| API Management, API portal            | apim-as-route-service             |     1    |
| Cloud Identity Service                | default                           |     1    |
| Cloud Identity Service                | appplication                      |     1    |
| Credential Store                      | standard                          |     1    |
| Netweaver System incl. EPM model      |                                   |          |
| SAP Integration Suite                 | trial* **or**<br>standard_edition |     1    |

*SAP Integration Suite **trial** plan is valid for 90 days only! 

**Expert Scope**
The Expert Scope will require the following additional service and software components which are listed below depending which of the scenarios you want to run:

| Service                               | Plan                               | Number of Instances |
|---------------------------------------|------------------------------------|:-------------------:|
| Continuous Integration & Delivery     | default                            |          1          |
| Cloud Transport Management            | standard                           |          1          |
| Cloud Transport Management            | standard / lite (Application)      |          1          |
| Custom Domain Service                 | standard (Application)             |          1          |


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
