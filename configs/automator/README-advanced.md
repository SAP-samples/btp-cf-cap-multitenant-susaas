# Instructions for running this use-case in the Setup Automator for SAP Business Technology Platform

> **Important** - The required usecase and parameter files will be available in the btp-setup-automator repository soon! 

The deployment of this use-case can be executed by the [Setup Automator for SAP Business Technology Platform](https://github.com/SAP-samples/btp-setup-automator).

The [Setup Automator for SAP Business Technology Platform](https://github.com/SAP-samples/btp-setup-automator) is an open source project to help developers setting-up their SAP BTP accounts quickly via various command line interfaces. The current script is designed to setup a SaaS provider subaccount and to spin up the application. Afterwards, an initial consumer subaccount including a SaaS subscription and an SaaS API Service Broker instance is created. 

The script will create a subaccount with the necessary entitlements and deploy the Sustainable SaaS (SusaaS) application to SAP BTP. Furthermore, a Consumer Subaccount will be created and the SusaaS application will be subscribed. Check the documentation ([click here](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/)) to find out about the service instances and subscriptions created by SAP BTP Automator in the different scopes.


## Prerequisites

To use the tooling you first need to finish the following tasks:

* Get a [productive SAP BTP account](https://account.hana.ondemand.com/#/home/welcome) where you can make use of Free (Tier) and paid service plans.
* [Install a Docker engine](https://docs.docker.com/desktop/)

> **Important** - Be aware of the terms of Docker for usage in an enterprise context. For details see this [link](https://www.docker.com/blog/updating-product-subscriptions/).


## Change the configuration

Currently the **Advanced Scope** of this use-case is optimized for Free (Tier) service plans only and requires a productive SAP BTP account (PAYG or CPEA). Before you start the SAP BTP Automator, please update the parameters.json and usecase_free_tier.json files as described in the **Instructions**. The following placeholders need to be replaced:

**parameters.json**

* \<susaas-consumer-subaccount-name\> - Subaccount name of the Consumer Subaccount created by the SAP BTP Automator (e.g., SusaaS-Consumer).
* \<btp-global-admin-user-email\> - E-mail address of a Global Account Administrator in your SAP BTP landscape that will be injected automatically to the SusaaS Credential Store instance as *btp-admin-user* and is required for automation purposes when subscribing a new tenant.
* \<btp-global-admin-user-password\> - Password of a Global Account Administrator in your SAP BTP landscape that will be injected automatically to the SusaaS Credential Store as *btp-admin-user* instance and is required for automation purposes when subscribing a new tenant.

    > **Important** - Automating the creation of these SAP BTP Global Account Administrator credential values in the Credential Store should only be done in development or test environments! Please note, the respective values will be written to the logs of your SAP BTP Automator Container instance. So please **delete the environment variables** lines for BTP_ADMIN_USER and BTP_ADMIN_PASSWORD in the parameters.json file **in a production scenario**. Either maintain the required values manually in the Credential Store manually as explained in the documentation or read the values from an external secure source by adjusting the init-cred-store.js file!

* \<admin-email-address-??\> - E-mail addresses of Subaccount Admins and Cloud Foundry Org/Space Managers.
* \<developer-email-address-??\> - E-mail addresses of Cloud Foundry Space Developers.
* \<auditor-email-address-??\> - E-mail addresses of Cloud Foundry Space Auditors.

    > **Important** - Make sure to add the SAP Alert Notification technical user as an Auditor for your dedicated region here (e.g.,  sap_cp_us10_ans@sap.com for the us10 region). Find further details in SAP Help ([click here](https://help.sap.com/docs/ALERT_NOTIFICATION/5967a369d4b74f7a9c2b91f5df8e6ab6/4255e6064ea44f20a540c5ae0804500d.html?locale=en-US)).

* \<susaas-consumer-admin-email-address-??\> - E-mail addresses of SusaaaS Consumer Admins.
* \<susaas-consumer-member-email-address-??\> - E-mail addresses of SusaaaS Consumer Members.
* \<susaas-consumer-extension-dev-email-address-??\> - E-mail addresses of SusaaaS Consumer Extension Developers.

**uscase_advanced_free_tier.json**

* <your-HANA-Cloud-password> - DBADMIN user password of the SAP HANA Cloud instance setup by SAP BTP Automator.

Furthermore, the name of the Provider Subaccount is preconfigured to **SusaaS-Provider** and the SAP BTP Automator will deploy the use-case to the **us10** region (see parameters.json file). In case you need to adapt some of these standard SAP BTP Automator parameters (like target region) you can also parse them via command line parameters when you call the script, for example to change the region it would look like this:

```bash
./btpsa -parameterfile 'usecases/released/discoverycenter/4064-cf-cap-saas/parameters.json' -usecasefile 'usecases/released/discoverycenter/4064-cf-cap-saas/usecase_advanced_free_tier.json' -globalaccount '<your global account subdomain as shown in the SAP BTP cockpit>' -myemail '<your email address>' -region 'region for your subaccount'
```

If you want to make changes to the actual **usecase json files**, you can either attach Visual Studio Code directly to your running container. Then you can perform the changes (it works as well with the parameters.json) and run the script as described above. You should be aware that the changes are not persisted if you terminate the docker container. 

In case you need to perform permanent changes to either the usecase json-files or the parameter.json file you need to create your own docker image containing the changes as described [in the documentation](../../../../README.md#option-2-start-docker-container-with-self-built-image) for more details.

**Usecase files**

For the **Advanced Scope**, we only provide a usecase file for SAP BTP accounts supporting **Free (Tier)** service plans  ([usecase_advanced_free_tier.json](usecase_advanced_free_tier.json)). 

> **Important** - Please note, for the Advanced Scope you first need to configure a SAP Identity Authentication Service tenant in one of your existing subaccounts. This is described in detail in the provided documentation. Afterwards, you can run the SAP BTP Automator including the **-iashost** parameter providing your SAP Identity Authentication tenant hostname.


**Region Change**

Be aware in case you change the region for the use case you need to have a look at the [Available Regions here](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/557ec3adc3174ed4914ec9d6d13487cf.html?locale=en-US&version=Cloud). In order to make sure the the use case is executable you need to check if the [SAP HANA Cloud availability](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?region=all&tab=service_plan) is given.


## Instructions

Open a command line terminal on your machine or from within Visual Studio Code (recommended and also described [here](https://github.com/SAP-samples/btp-setup-automator#option-1-start-docker-container-via-pre-built-image-recommended)).

> **Hint** - In case you don't know how to do it, here are the instructions for [MS Windows](https://www.wikihow.com/Open-Terminal-in-Windows), [Mac OS](https://www.wikihow.com/Open-a-Terminal-Window-in-Mac) and [Ubuntu Linux](https://www.wikihow.com/Open-a-Terminal-Window-in-Ubuntu).

Enter the following command into the terminal and press the `ENTER` key.

```bash
docker container run --rm -it -d --name "btp-setup-automator" "ghcr.io/sap-samples/btp-setup-automator:main"
```

Attach to the running container in VS Code as described in the SAP BTP Automator documentation ([click here](https://github.com/SAP-samples/btp-setup-automator#get-the-docker-container-up-and-running)). Alternatively, you can also remove the **-d** parameter in the above command and execute the next steps (updating the parameters and usecase file) using your command line. 

Once you attached to the container instance, please start updating the parameters.json and uscase_advanced_free_tier.json files as described in **Change the configuration**. You can find both files in the /home/user/usecases/released/discoverycenter/4064-cf-cap-saas/ directory of your container. After updating the files, you can run the main script `btpsa` with the following command (in case of **Advanced Scope** deployment to **Free Tier**).

```bash
./btpsa -parameterfile 'usecases/released/discoverycenter/4064-cf-cap-saas/parameters.json' -usecasefile 'usecases/released/discoverycenter/4064-cf-cap-saas/usecase_advanced_free_tier.json' -globalaccount '<your global account subdomain as shown in the SAP BTP cockpit>' -myemail '<your email address>'
```

The btp-setup-automator script will now prepare your SAP BTP account to cover the use-case. You can have a look at the usecase json-files and [parameters.json](parameters.json) for more details about the used services and configuration parameters (e.g. DB Password for SAP HANA Cloud).


## Troubleshooting

### How can I use an existing subaccount?

If you already have an existing subaccount you can either change the name in the parameter file directly in the running container or you can add it via the commandline when you run the script: 

```bash
./btpsa -subaccountname <Display Name of your existing subaccount>  
```