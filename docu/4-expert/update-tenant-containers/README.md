# Update tenant database containers

In this part of the mission, you will learn how to distribute data model changes to your tenant database containers using API calls.

 1. [Prerequisites](#1-prerequisites)
 2. [Introduction](#2-introduction)
 3. [Add a field to CDS Model](#3-add-a-field-to-cds-model)
 4. [Build and deploy your application with the new added column](#4-build-and-deploy-your-application-with-the-new-added-column)
 5. [Create and display a service key for your XSUAA instance](#5-create-and-display-a-service-key-for-your-xsuaa-instance)
 6. [Fill your HTTP file with the values and distribute the DB changes](#6-fill-your-http-file-with-the-values-and-distribute-the-changes)
 7. [Send DB Upgrade request for your tenant](#7-send-db-upgrade-request-for-your-tenant)
 8. [Access your tenant container to see your changes](#8-access-your-tenant-container-to-see-your-changes)


## 1. Prerequisites

1. You have followed [**basic**](../../2-basic/0-introduction-basic-scope/README.md) or [**advanced**](../../3-advanced/0-introduction-advanced-scope/README.md) scope. 
2. You have a [deployed and running multitenant application](../../2-basic/3-build-deploy-saas-application/README.md) on your SAP BTP Provider Subaccount.
3. You already have a [subscription from a consumer subaccount](../../2-basic/4-subscribe-consumer-subaccount/README.md) to your mulititenant SaaS application.


## 2. Introduction 
On your journey with your multitenant application, at some point, you will probably need to **update** your CDS model while you are having active subscribed consumer subaccounts to your application.

When you as a developer have added or removed a field from your CDS model, it is not automatically reflected to tenant's HDI container
automatically after deployment. You need to send a request to your multitenant CAP application re-deploy the latest changes to the tenant’s HDI container and that is what you will learn on this section.

> **Information** - You can follow these steps both in basic and advanced branches. This section will choose basic branch for demonstration.


## 3. Add a field to CDS model

Checkout to the basic branch.

> **Hint** - You might skip the checkout if you are already working on basic branch.

```sh
git checkout basic
```

Go to your [**Users**](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/db/data-model.cds) entity in your local environment and add a **dummy** column as shown below.

```js

context susaas.db {

...
      @assert.unique : {email : [email]}
      entity Users : cuid, managed {
            @Core.Computed:true
            fullName : String;
            firstName : String;
            lastName  : String;
            email     : String;
            shadowId  : UUID;
            iasLocation: String;
            dummy : String; // new added column
            // associations
            role : Association to Roles;
      }
...

```

## 4. Build and deploy your application with the new added column

Build your application in the root directory.

> **Important** - Don't forget to provide your mtaext file containing the hashed API Service Broker credentials during build or deployment. 

```sh
mbt build -e <path-to-your-mtaext-file>
cf deploy mta_archives/*
```


## 5. Create and display a service key for your XSUAA instance

Run the commands below.

```sh
cf create-service-key susaas-uaa my-key 
cf service-key susaas-uaa my-key
```

![<img src="./images/uaa-service-key.png" width="400"/>](./images/uaa-service-key.png?raw=true)


## 6. Fill your [HTTP file](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/http/tenantUpgrade.http) with the values and distribute the changes

> **Important** - You might want to copy that file and change the filename to **tenantUpgrade-private.http** first, to ensure that changes are not unintentionally committed to GitHub. 

Since you have created all the required credentials, now you can start filling the variables and send requests.

### 6.1. Get the values from your service key 

Run the command below to see your service key credentials.

```sh 
cf service-key susaas-uaa my-key
```

### 6.2. Put the values from service key into your [HTTP file](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/http/tenantUpgrade.http)

Replace the credentials from your service key with your http file  placeholders as shown below. 

![<img src="./images/credmapping.png" width="700"/>](./images/credmapping.png?raw=true)

### 6.3. Put **susaas-srv** url from your SAP BTP **Provider** Account to your [HTTP file](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/http/tenantUpgrade.http)

Go to your **provider subaccount**, into your CF Runtime and space and get **susaas-srv** application url. After that put the url into your relevant file placeholder in your http file.

![<img src="./images/srv-url-mapping.png" width="700"/>](./images/srv-url-mapping.png?raw=true)

### 6.4. Put the tenant id from **consumer subaccount** into your [HTTP file](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/http/tenantUpgrade.http)

Go to your **consumer subaccount** overview. After that put the **tenant** into your relevant file placeholder in your [http file](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/http/tenantUpgrade.http).

![<img src="./images/tenantid-mapping.png" width="700"/>](./images/tenantid-mapping.png?raw=true)


## 7. Send DB Upgrade request for your tenant

Since we have filled all the required information for a tenant DB model upgrade we might start sending requests.

### 7.1. Send token request

Go to your [http file](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/http/tenantUpgrade.http) and click send request as shown below. 

```http
##########################################
# Get SAP XSUAA token 
##########################################

# @name getXsuaaToken

POST {{xsuaaUrl}}/oauth/token
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {{xsuaaClientId}}:{{xsuaaClientSecret}}

?client_id={{xsuaaClientId}}
&client_secret={{xsuaaClientSecret}}
&grant_type=client_credentials

```

> **Hint** - If you are unableto retrieve the token from the request above, you should double check if your credentials are correctly placed into your [http file](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/basic/http/tenantUpgrade.http).

### 7.2. Upgrade the tenant schema

After retrieving the token, you should send the request to your multitenant application. This request will deploy the newest version of your DB model which contains **dummy** column from Step 1.

```http
################################################
# Call CAP endpoint (BTP) For DB Model Upgrade
################################################

@access_token = {{getXsuaaToken.response.body.$.access_token}}

# @name upgradeTenantDBModel
POST {{srvUrl}}/-/cds/deployment/upgrade
Authorization: Bearer {{access_token}}
Content-type: application/json

{ "tenant": "{{tenantId}}"  }

```
> **Hint** - Please note that this will deploy the new changes **only** for the tenant given in the request.
> If you want to upgrade tenant db model for more than one tenant, please send the request with those tenant id's as well.


## 8. Access your tenant container to see your changes

The last step is accessing the tenant container as it is described [here](../manage-tenant-containers/README.md). You should see your **dummy** column added to the  **Users** table as shown below.