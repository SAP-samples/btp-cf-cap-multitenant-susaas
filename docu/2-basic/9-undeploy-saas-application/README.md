# Undeploy the SaaS Application

If you want to undeploy the SaaS application and all related services please follow the steps below. This is a prerequisite in case you want to deploy the **Advanced Scope** to the same landscape.   

1. [Undeploy the application](#1-Undeploy-the-application)
2. [Check successful Undeployment](#2-Check-successful-Undeployment)
3. [Troubleshooting](#3-Troubleshooting)
4. [Further Information](#4-Further-Information)


## 1. Undeploy the SaaS application

1.1. Make sure you unsubscribed from the SaaS application in all **consumer subaccounts** before starting the undeployment. 

1.2. Delete all API Broker service instances from the **consumer subaccounts** before undeploying.

1.3. Ensure the API Broker is unregistered ([click here](../8-unsubscribe-consumer-subaccount/README.md#2-check-successful-unsubscription)) from all **consumer subaccounts**. 

1.4. Undeploy the SaaS application from your **provider subaccount**. 

```
$ cf login -a https://api.cf.<<region>>.hana.ondemand.com
$ cf undeploy susaas --delete-services --delete-service-keys
```

> **Warning** - Please make sure to have the latest version of the Cloud Foundry CLI installed and the multiapps plugin is up-to-date. In older versions of the Cloud Foundry multiapps plugin, the option --delete-service-keys did not exist yet! 


## 2. Check successful Undeployment

2.1. Go to your provider subaccount and check if all service instances, subscriptions, and applications are deleted. 

2.2. If there are still artifacts remaining on the provider subaccount, please make sure to delete them manually in the following sequence:
- Application instances
- Service keys
- Service instances


## 3. Troubleshooting

For troubleshooting please check the separate **Troubleshooting** section of this scope ([click here](../10-troubleshooting/README.md)).


## 4. Further Information

Please use the following links to find further information on the topics above:

* [SAP Help - Undeploy Content](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/fab96a603a004bd992822c83d4b01370.html?locale=en-US)
* [Cloud Foundry Documentation - Using the Cloud Foundry Command Line Interface (cf CLI)](https://docs.cloudfoundry.org/cf-cli/)
* [Cloud Foundry Documentation - CLI Reference Guide (v7)](https://cli.cloudfoundry.org/en-US/v7/)
* [Cloud Foundry Documentation - CLI Reference Guide (v8)](https://cli.cloudfoundry.org/en-US/v8/)