# Prepare the Provider Subaccount

In this chapter, you will learn how to prepare your SAP BTP Provider Subaccount for the deployment of the SaaS solution by assigning the required entitlements for the **Advanced Scope**.

1. [Prerequisites for Provider Subaccount](#1-Prerequisites-for-Provider-Subaccount)
2. [Entitlements for Provider Subaccount](#2-Entitlements-for-Provider-Subaccount)
3. [SAP NetWeaver System](#3-SAP-Netweaver-System)
4. [SAP HANA Cloud prerequiste](#4-sap-hana-cloud-prerequisite)
5. [SAP Alert Notification Technical User](#5-sap-alert-notification-technical-user)
6. [Limitations of free service plans](#6-limitations-of-free-services-plans)
7. [Further Information](#7-Further-Information)


## 1. Prerequisites for Provider Subaccount

As already mentioned, you can set up the **Advanced Scope** in any SAP BTP environment using **Free (Tier) service plans** of your own **Pay-as-you-Go** (PAYG) or **CPEA** account. A tutorial how to setup a PAYG account (allowing you to use all Free Tier service plans) can be found in the [Tutorial Navigator](https://developers.sap.com/tutorials/btp-free-tier-account.html). 

> **Hint** - The Advanced Scope cannot be deployed to **Trial** accounts!

After provisioning of your SAP BTP account (which might take a few hours after placing your free order in SAP Store), please continue with the following steps.

* Enable the SAP BTP Cloud Foundry environment using the **free** service plan (assign in Entitlements if not visible!)
* Create an SAP BTP Cloud Foundry Space and name it e.g., dev.
* Set up a SAP HANA Cloud instance using the **hana-free** service plan.

> **Important** - Make sure to create the Cloud Foundry environment using the **free** plan and not the **Standard** plan. Otherwise, you will be charged from the first GB of runtime used. 

Please check the limitations mentioned below when it comes to the usage of some SAP BTP service plans like e.g., hana-free. Furthermore, please note that the hana-free service plan is not available in all SAP BTP regions. You can check the availability in SAP Discovery Center ([click here](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?region=all&tab=service_plan&service_plan=free&commercialModel=cloud)).


## 2. Required Entitlements for Provider Subaccount

The application requires the following set of SAP BTP entitlements in the Provider Subaccount:

**Required Basic Scope components**

| Service                           | Free (Tier)  Plans  | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| [SAP Alert Notification service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/alert-notification?region=all) | Free  |     1    |
| [Application Autoscaler](https://discovery-center.cloud.sap/serviceCatalog/application-autoscaler/?service_plan=standard&region=all&commercialModel=cloud) | Standard |     1    |
| [SAP Application Logging Service](https://discovery-center.cloud.sap/serviceCatalog/application-logging-service/?region=all) | Lite |     1    |
| [SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)| Broker <br> Application |     1 <br> 1    |
| [SAP BTP, Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) | Free  |    1    |
| [SAP Cloud Management Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/cloud-management-service/?region=all) | Central |     1    |
| [SAP Credential Store](https://discovery-center.cloud.sap/serviceCatalog/credential-store?region=all) | Free  |     1    |
| [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=cloud) | Lite |     1    |
| [SAP HTML5 Application Repository Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) | App-host <br>App-runtime |    1 <br> 1   |
| [SAP SaaS Provisioning Service](https://discovery-center.cloud.sap/serviceCatalog/saas-provisioning-service?service_plan=application&region=all&commercialModel=cloud) | Application |    1    |
| [SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all) | Free |    1    |
| [SAP HANA Schemas & HDI Containers](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/e28abca91a004683845805efc2bf967c.html?version=2.0.04&locale=en-US) | hdi-shared |    1    |
| [SAP Service Manager](https://discovery-center.cloud.sap/serviceCatalog/service-manager/?region=all) | Container |    1    |
| | |

<br>**Required Advanced Scope components**

| Service | Free (Tier) Plans | Number of Instances |
|---|---|:---:|
| [SAP Integration Suite](https://discovery-center.cloud.sap/serviceCatalog/integration-suite?region=all) | Free  |     1    |
| [SAP API Management, API portal](https://help.sap.com/docs/SAP_CLOUD_PLATFORM_API_MANAGEMENT/66d066d903c2473f81ec33acfe2ccdb4/e609a3efe6d64e1781cbf81ae5592071.html?locale=en-US)         | apim-as-route-service                |     1    |
| [SAP Identity Authentication](https://discovery-center.cloud.sap/serviceCatalog/identity-authentication?region=all&tab=feature) | Free test/prod tenant |  |
| SAP NetWeaver System | |
| | |

> **SAP Integration Suite** - The **free service plan** is usable for 90 days only. Your tenant will be decommissioned after 90 days and you need to set up a new tenant if you wish to do further validations. 

> **SAP Identity Authentication** - When signing up for a PAYG or CPEA account, you're entitled for a free test and productive SAP Identity Authentication Service tenant. Any further tenant can be licensed as **Aditional Tenant** and will be charged according to your account type. Please also check the official SAP Help documentation ([click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/93160ebd2dcb40e98aadcbb9a970f2b9.html?locale=en-US#loio93160ebd2dcb40e98aadcbb9a970f2b9__licensing_section)) and the following blog post ([click here](https://blogs.sap.com/2021/10/26/is-sap-cloud-identity-services-for-free/)) for further information.

> **SAP NetWeaver System** - An SAP NetWeaver system is only required if you want to test the automated data push feature from an existing SAP solution. You can use all **SAP S/4HANA** releases and also any other SAP systems which has an SAP NetWeaver stack version higher than 7.3.


## 3. SAP NetWeaver System

If you want to test the automated data push feature from an existing SAP solution, the sample setup requires a SAP solution that contains the Enterprise Procurement Model (EPM) model. The EPM is a demo application that integrates many SAP NetWeaver technologies that are used by SAP S/4HANA applications. It is based on a common business process model and follows the business object (BO) paradigm to support well-defined business logic.

In this sample application you will learn how to [push data from the EPM module to the SaaS API](../7-push-data-s4hana-system/README.md) to migrate your business data to the multitenant business application for the sustainability calculations.

You can use all **SAP S/4HANA** releases and also any other SAP systems which has an **SAP NetWeaver** stack version higher than 7.3. since these versions, all contain the EPM module by default.

> **Hint** - If you want to check your systems SAP NetWeaver version you can refer [here](https://answers.sap.com/questions/12097568/how-to-check-version-of-netweaver.html).


## 4. SAP HANA Cloud prerequisite

Make sure that you have a SAP HANA Cloud instance in the Cloud Foundry Space of your provider subaccount. Alternatively, you you can share an existing SAP HANA Cloud instance with your provider Cloud Foundry Organization or Space. For more details see - [Create an SAP HANA Database Instance Using SAP HANA Cloud Central](https://developers.sap.com/tutorials/hana-cloud-mission-trial-2.html).


## 5. SAP Alert Notification Technical User

Please add a dedicated Technical User as a Space Auditor to the Cloud Foundry Space of your Provider Subaccount. This user is required by SAP Alert Notification to inform you about lifecycle events of your SaaS application. You can find a list of users per region in the official SAP Help documentaton ([click here](https://help.sap.com/docs/ALERT_NOTIFICATION/5967a369d4b74f7a9c2b91f5df8e6ab6/4255e6064ea44f20a540c5ae0804500d.html?locale=en-US)).

For **us10** region, please add for example **sap_cp_us10_ans@sap.com** as a Space Auditor. 

[<img src="./images/Space_TechUser.png" width="500"/>](./images/Space_TechUser.png)


## 6. Limitations of free services plans

When using SAP BTP Free (Tier) services plans like **hana-free** for SAP HANA Cloud, please be aware of the following limitations:

- Free **SAP HANA Cloud** instances will be stopped on a daily base to reduce resource consumption. Check and if necessary restart your SAP HANA Cloud instance before using your SaaS subscription. 
- Your application instances will be stopped on a daily base to reduce memory consumption. Make sure to check your applications and restart them if necessary before using the application. 


## 7. Further information

Please also use the details provided in the **Basic Scope** ([click here](../../2-basic/2-prepare-provider-subaccount/README.md#7-further-information)) to find further information on the topics above. 

* [SAP Help - SAP Integration Suite](https://help.sap.com/docs/SAP_INTEGRATION_SUITE?locale=en-US)
* [SAP Help - SAP Integration Suite - Using Free Service Plans](https://help.sap.com/docs/SAP_INTEGRATION_SUITE/51ab953548be4459bfe8539ecaeee98d/ddf66923270b4078ac6b88026553d068.html?locale=en-US)
* [SAP Help - SAP Cloud Identity Services](https://help.sap.com/docs/SAP_CLOUD_IDENTITY?&locale=en-US)
* [SAP Cloud Identity Services - Identity Authentication](https://help.sap.com/docs/IDENTITY_AUTHENTICATION?locale=en-US)
* [SAP Help - Enterprise Procurement Model](https://help.sap.com/docs/ABAP_PLATFORM_NEW/a602ff71a47c441bb3000504ec938fea/124a3cf203d64d3198b5bcc9570f31ac.html?locale=en-US)
* [SAP Help - ABAP Platform and SAP NetWeaver](https://help.sap.com/docs/SAP_NETWEAVER?locale=en-US)
* [SAP Help - SAP NetWeaver Application Server for ABAP 7.52](https://help.sap.com/docs/SAP_NETWEAVER_AS_ABAP_752?locale=en-US)