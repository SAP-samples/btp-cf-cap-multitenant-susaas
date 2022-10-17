# Prepare the Provider Subaccount

In this chapter you will learn how to prepare your SAP BTP Provider Subaccount for deployment of the SaaS solution by assigning the required entitlements. 

1. [Prerequisites for Provider Subaccount](#1-Prerequisites-for-Provider-Subaccount)
2. [Entitlements for Provider Subaccount](#2-Entitlements-for-Provider-Subaccount)
3. [SAP HANA Cloud prerequisite](#3-SAP-HANA-Cloud-prerequisite)
4. [Limitations of trial/free services](#4-Limitations-of-trial/free-services)
5. [Troubleshooting](#5-Troubleshooting)
6. [Further information](#6-Further-Information)


## 1. Prerequisites for Provider Subaccount

As already mentioned, a **Trial** account is sufficient for the deployment of the **Basic Scope**. 

> **Important** - As of today, please make sure to create a SAP BTP Trial Account in the **US East (VA)** region (us10) in case you want to test this use-case. The Singapore region does not offer the required SAP HANA Cloud database support for Trial accounts.

After setting up your SAP BTP Trial Account please continue with the following steps.

* Enable the SAP BTP Cloud Foundry environment.
* Create a SAP BTP Cloud Foundry Space and name it e.g., dev.

Please check the limitations mentioned below when it comes to usage of SAP BTP Trial accounts or free/trial service plans. 

## 2. Entitlements for Provider Subaccount

The application requires the following set of SAP BTP entitlements in the Provider Subaccount:

| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| [Alert Notification](https://discovery-center.cloud.sap/serviceCatalog/alert-notification?region=all)                        | standard      |     1    |
| [Application Autoscaler](https://discovery-center.cloud.sap/serviceCatalog/application-autoscaler/?service_plan=standard&region=all&commercialModel=cloud)                   | standard      |     1    |
| [Application Logging Service](https://discovery-center.cloud.sap/serviceCatalog/application-logging-service/?region=all)              | lite          |     1    |
| [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)| broker        |     1    |
| [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)| application   |     1    |
| [Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all)                     | MEMORY        |     2    |
|[Cloud Management Service](https://discovery-center.cloud.sap/serviceCatalog/cloud-management-service/?region=all)                 | central       |     1    |
| [Credential Store](https://discovery-center.cloud.sap/serviceCatalog/credential-store?region=all)                        | trial         |     1    |
| [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=cloud)                    | lite          |     1    |
| [HTML5 Application Repository Service](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) |app-host|1|      | app-host      |     1    |
| [HTML5 Application Repository Service](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) |app-host|1|     | app-runtime   |     1    |
| [SaaS Provisioning Service](https://discovery-center.cloud.sap/serviceCatalog/saas-provisioning-service?service_plan=application&region=all&commercialModel=cloud)                 | application   |     1    |
| [SAP HANA Schemas & HDI Containers](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/e28abca91a004683845805efc2bf967c.html?version=2.0.04&locale=en-US)       | hdi-shared    |     1    |
| [SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all)                            | hana          |     1    |
|[Service Manager](https://discovery-center.cloud.sap/serviceCatalog/service-manager/?region=all)                      |container     |     1    |

If you need help on assigning entitlements to your provider subaccount, you might find information [here](https://help.sap.com/docs/SERVICE_TICKET_INTELLIGENCE/fb95f4cf368448be94f0eaed1583f491/cda19c940bf5404c8e81770b0f879e82.html?locale=en-US).


## 3. SAP HANA Cloud prerequisite

Make sure that you have an instance of SAP HANA Cloud database in your space or you share an existing SAP HANA Cloud instance with your Cloud Foundry Org or dedicated Space. For more details see - [Create an SAP HANA Database Instance Using SAP HANA Cloud Central](https://developers.sap.com/tutorials/hana-cloud-mission-trial-2.html).


## 4. Limitations of trial/free services

If using a SAP BTP Trial account or trial/free services plans like e.g., for SAP HANA Cloud, please be aware of the following limitations:

- Free **SAP HANA Cloud** instances will be stopped on a daily base to recude resource consumption. Check and if necessary restart your SAP HANA Cloud instance before using your SaaS susbscription. 
- Your applications instances will be stopped on a daily base to reduce memory consumption. Make sure to check your applications and restart them if necessary before using the application in a Trial environment. 


## 5. Troubleshooting

For troubleshooting please check the separate **Troubleshooting** section of this scope ([click here](../10-troubleshooting/README.MD)).


## 6. Further information

Please use the following links to find further information on the topics above:

* [SAP Help - Trial Accounts and Free Tier](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/046f127f2a614438b616ccfc575fdb16.html?locale=en-US)
* [SAP Help - Enterprise Accounts](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/171511cc425c4e079d0684936486eee6.html)
* [SAP Help - Getting Started in the Cloud Foundry Environment](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/b328cc89ea14484d9655b8cfb8efb508.html?locale=en-US)
* [SAP Help - Account Administration in the Cockpit](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/8061ecc529d74465b2b9566a634943ec.html)
* [SAP Help - Create a Subaccount](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/05280a123d3044ae97457a25b3013918.html?locale=en-US)
* [SAP Help - Configure Entitlements and Quotas for Subaccounts](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/5ba357b4fa1e4de4b9fcc4ae771609da.html?locale=en-US)
* [SAP Help - Map an SAP HANA Database to a Cloud Foundry Space](https://help.sap.com/docs/HANA_CLOUD/9ae9104a46f74a6583ce5182e7fb20cb/1683421d02474567a54a81615e8e2c48.html?locale=en-US)
* [SAP Discovery Center](https://discovery-center.cloud.sap)