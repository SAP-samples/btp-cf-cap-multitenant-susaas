# Prepare the Provider Subaccount

In this chapter you will learn how to prepare your SAP BTP Provider Subaccount for deployment of the SaaS solution by assigning the required entitlements for the **Advanced Scope**.

1. [Prerequisites for Provider Subaccount](#1-Prerequisites-for-Provider-Subaccount)
2. [Entitlements for Provider Subaccount](#2-Entitlements-for-Provider-Subaccount)
3. [SAP NetWeaver System](#3-SAP-Netweaver-System)
4. [SAP HANA Cloud prerequisite](#4-SAP-HANA-Cloud-prerequisite)
5. [Further Information](#5-Further-Information)


## 1. Prerequisites for Provider Subaccount

As already mentioned, a **Free Tier (Pay As You Go)** or **Enterprise (CPEA)** account is essential for the deployment of the **Advanced Scope**. 

Please check the pricing and SAP BTP account types [here](https://store.sap.com/dcp/en/product/display-9999951781_live_v1/SAP%20Business%20Technology%20Platform#pricing). Please use the given estimators to calculate the monthly costs.

If not yet done as part of the **Basic Scope** please

* Enable the SAP BTP Cloud Foundry environment
* Create a SAP BTP Cloud Foundry Space and name it e.g., dev


## 2. Required Entitlements for Provider Subaccount

The application requires the following set of SAP BTP entitlements in the Provider Subaccount:

| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| [Alert Notification](https://discovery-center.cloud.sap/serviceCatalog/alert-notification?region=all)  | standard  |  1  |
| [Application Autoscaler](https://discovery-center.cloud.sap/serviceCatalog/application-autoscaler/?service_plan=standard&region=all&commercialModel=cloud) | standard | 1 |
| [Application Logging Service](https://discovery-center.cloud.sap/serviceCatalog/application-logging-service/?region=all) | lite  | 1 |
| [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)|broker|1|
| [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)|application|1|
| [Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) | MEMORY | 2 |
| [Cloud Management Service](https://discovery-center.cloud.sap/serviceCatalog/cloud-management-service/?region=all)| central | 1 |
| [Credential Store](https://discovery-center.cloud.sap/serviceCatalog/credential-store?region=all)| standard | 1 |
| [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=cloud)| lite | 1 |
| [HTML5 Application Repository Service](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) |app-host|1|
| [HTML5 Application Repository Service](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all)      | app-runtime   |     1    |
| [SaaS Provisioning Service](https://discovery-center.cloud.sap/serviceCatalog/saas-provisioning-service?service_plan=application&region=all&commercialModel=cloud)           | application   |     1    |
| [SAP HANA Schemas & HDI Containers](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/e28abca91a004683845805efc2bf967c.html?version=2.0.04&locale=en-US)| hdi-shared | 1 |
| [SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all)                            | hana          |     1    |
| [Service Manager](https://discovery-center.cloud.sap/serviceCatalog/service-manager/?region=all)                           | container     |     1    |
| [SAP Integration Suite (*)](https://discovery-center.cloud.sap/serviceCatalog/integration-suite?region=all)                     | trial(**) or standard   |     1    |
| [Cloud Identity Services](https://discovery-center.cloud.sap/serviceCatalog/identity-authentication?region=all&tab=feature)                   | default |     1    |
| [Cloud Identity Services](https://discovery-center.cloud.sap/serviceCatalog/identity-authentication?region=all&tab=feature)                   | application   |     1    |

> (*) SAP Integration Suite is optional. It is only required if you want to integrate your SaaS API with [SAP API Management](../8-integrate-sap-api-management/README.MD).

> (**) Please keep in mind - The SAP Integration Suite trial plan is valid for 90 days only. Your tenant will be decommissioned after 90 days and you need to setup a new tenant if you wish to do further validations with a trial tenant. 


## 3. SAP NetWeaver System

If you want to test the automated data push feature from an existing SAP solution, the sample setup requires an SAP system which contains Enterprise Procurement Model (EPM) module. The EPM is a demo application which integrates many SAP NetWeaver technologies that are used by SAP S/4HANA applications. It is based on a common business process model and follows the business object (BO) paradigm to support a well-defined business logic.

In this sample application you will learn how to [push data from the EPM module to the SaaS API](../7-push-data-s4hana-system/README.MD) to migrate your business data to the multitenant business application for the sustainability calculations.

You can use all **SAP S/4HANA** releases and also any other SAP systems which has a **SAP NetWeaver** stack version higher than 7.3. since these versions all contain the EPM module by default.

> **Hint** - If you want to check your systems SAP NetWeaver version you can refer [here](https://answers.sap.com/questions/12097568/how-to-check-version-of-netweaver.html).


## 4. SAP HANA Cloud prerequisite

Make sure that you have an instance of SAP HANA Cloud in your development Space or you share an existing SAP HANA Cloud instance with your Cloud Foundry Organization or dedicated Cloud Foundry Space (see Further Information). 

For more details see [Create an SAP HANA Database Instance Using SAP HANA Cloud Central](https://developers.sap.com/tutorials/hana-cloud-mission-trial-2.html).


## 5. Further information

Please also use the details provided in the **Basic Scope** ([click here](../../2-basic/2-prepare-provider-subaccount/README.MD#6-further-information)) to find further information on the topics above. 

* [SAP Help - SAP Integration Suite](https://help.sap.com/docs/SAP_INTEGRATION_SUITE?locale=en-US)
* [SAP Help - SAP Integration Suite - Using Free Service Plans](https://help.sap.com/docs/SAP_INTEGRATION_SUITE/51ab953548be4459bfe8539ecaeee98d/ddf66923270b4078ac6b88026553d068.html?locale=en-US)
* [SAP Help - SAP Cloud Identity Services](https://help.sap.com/docs/SAP_CLOUD_IDENTITY?&locale=en-US)
* [SAP Cloud Identity Services - Identity Authentication](https://help.sap.com/docs/IDENTITY_AUTHENTICATION?locale=en-US)
* [SAP Help - Enterprise Procurement Model](https://help.sap.com/docs/ABAP_PLATFORM_NEW/a602ff71a47c441bb3000504ec938fea/124a3cf203d64d3198b5bcc9570f31ac.html?locale=en-US)
* [SAP Help - ABAP Platform and SAP NetWeaver](https://help.sap.com/docs/SAP_NETWEAVER?locale=en-US)
* [SAP Help - SAP NetWeaver Application Server for ABAP 7.52](https://help.sap.com/docs/SAP_NETWEAVER_AS_ABAP_752?locale=en-US)