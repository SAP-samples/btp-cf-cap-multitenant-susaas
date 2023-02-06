# Shared Database Container

To have the ability to share data among your consumer tenants, a shared database container is set up for this sample scenario. This allows you as a provider to maintain e.g., master data like **Languages**, **Countries**, or **Currencies** in a central place and update it for all consumer tenants. 

1. [Deployment descriptor](#1-Deployment-descriptor)
2. [Tenant Database Container](#2-Tenant-Database-Container)
3. [Keep in mind](#3-keep-in-mind)
4. [Further information](#4-further-information)

This concept is building on the cross-container-access capabilities of SAP HANA Cloud HDI database containers. In this sample scenario, the shared database container is used to share a sample table and master data along the tenant database containers.

![<img src="./images/CD_Flow.png" width="500"/>](./images/CD_Flow.png?raw=true)


## 1. Deployment descriptor

The HDI container required for the shared data is defined in the mta.yaml file and created during the deployment of the SaaS application to the provider subaccount. For the tenant database container instances, SAP Service Manager (container plan) takes care of the container lifecycle. For that reason, there is no need to specify any resources for these tenant-specific containers in the mta.yaml file. 

![<img src="./images/CD_MtaRes.png" width="500"/>](./images/CD_MtaRes.png?raw=true)

To deploy content (like tables and views) to your shared database container, an additional module definition is required resulting in a Node.js application responsible for the deployment of your shared database artifacts.

![<img src="./images/CD_MtaMod.png" width="500"/>](./images/CD_MtaMod.png?raw=true)

To allow access from your tenant-specific database containers to the shared database container, it needs to be added as a dependency to the SaaS service module. This is a prerequisite as the required dependency between new tenant database containers and the shared database container needs to be resolved upon subscription of each new consumer tenant. As the subscription is handled by the SaaS Service module, it is essential to provide the binding in form of a so/called **Service Replacement**. 

![<img src="./images/CD_MtaReq.png" width="500"/>](./images/CD_MtaReq.png?raw=true)


## 2. Tenant Database Container

The concept of cross-container-access is based on a trusted relation between containers. Still, to make the shared database container accessible from your tenant-specific database containers, some prerequisites need to be fulfilled. 

>**Important** - The concept of cross-container-access is very powerful but not trivial. Please refer to the official documentation in SAP Help to learn more ([click here](https://help.sap.com/docs/HANA_CLOUD_DATABASE/b9902c314aef4afb8f7a29bf8c5b37b3/4adba34bd86544a880db8f9f1e32efb7.html?&locale=en-US)).

**db-com/data-model.cds**
```json
context susaas.common {
    entity Shared : cuid {
        value : String;
    };
}
```

First of all, you need to assign the technical users of your tenant containers dedicated access roles defined in the shared database container. Therefore, a role **COM_EXTERNAL_ACCESS** is defined in the shared database container, providing **READ** access to a shared sample table called **SUSAAS_COMMON_SHARED** (see definition above). The same applies to the shared tables containing master data like **Countries** or **Currencies**. For the so-called **Object Owner(s)** of the accessing tenant database containers, a similar role **COM_EXTERNAL_ACCESS#** is required, which includes the same permissions **including grant option**. 

**db-com/src/COM_EXTERNAL_ACCESS.hdbrole**

```json
{
    "role": {
        "name": "COM_EXTERNAL_ACCESS",
        "object_privileges": [
            { 
                "name":"SUSAAS_COMMON_SHARED", 
                "type":"TABLE", 
                "privileges":[ "SELECT" ], 
                "privileges_with_grant_option":[] 
            },
            { 
                "name":"SAP_COMMON_COUNTRIES", 
                "type":"TABLE", 
                "privileges":[ "SELECT" ], 
                "privileges_with_grant_option":[] 
            }
            ...
        ]
    }
}
```

These roles can now be used in the tenant database containers, where they need to be assigned to the **Object Owner(s)** and **Application User(s)** using a so-called **.hdbgrants** file. This file is processed before the deployment of a new tenant database container starts. It ensures, that the technical users used during creation of new tenant database container (but also during runtime access) have the required permissions to access the shared database container. 

**db/cfg/COM.hdbgrants**
```json
{
    "susaas-com-hdi-container": {
        "object_owner": {
            "container_roles": [
                "COM_EXTERNAL_ACCESS#"
            ]
        },
        "application_user": {
            "container_roles": [
                "COM_EXTERNAL_ACCESS"
            ]
        }
    }
}
```

After ensuring the technical users of new tenant database containers are assigned the required roles to access the shared database container, you need to define so-called **synonyms** for the shared target objects (e.g., tables or views). Therefore, two files are required. A so-called **.hdbsynonymconfig** and a **.hdbsynonym** file. 


**db/cfg/COM.hdbsynonymconfig**
```json
{
    "SUSAAS_COMMON_SHARED": {
        "target": {
            "object": "SUSAAS_COMMON_SHARED",
            "schema.configure": "susaas-com-hdi-container/schema"
        }
    },
    "SAP_COMMON_COUNTRIES": {
        "target": {
            "object": "SAP_COMMON_COUNTRIES",
            "schema.configure": "susaas-com-hdi-container/schema"
        }
    },
    ...
}
```

**db/src/COM.hdbsynonym**
```json
{
    "SUSAAS_COMMON_SHARED": {},
    "SAP_COMMON_COUNTRIES": {},
    ...
}
```

Whereas the hdbsynonym file defines your synonym database object, the hdbsynonymconfig file is processed before the provisioning of a new tenant database container and provides configuration information to the Node.js deployer. In this case, the deployer is advised to dynamically read the schema name of the shared database container from the container service details. As no fixed schema name is defined for the shared database container (e.g., in the mta.yaml), the schema name is automatically generated upon deployment of the SaaS application. That's why for required references in the tenant database containers, we need to read the schema name dynamically from the container service binding details. See it as some kind of dynamic replacement instead of providing the unique schema name which could be something like ABC123XYZ987DEF456UVW.... 

The synonyms can now be used in CDS model definitions or other native SAP HANA database objects like Views or Calculation Views. Just make sure to use `@cds.persistence.exists` annotation in case of CDS usage, to prevent the CDS compiler from creating a new database artifact for the existing synonym.  

**db/data-model.cds**
```json
context susaas.common {
      @cds.persistence.exists
      entity Shared : cuid {
            value  : String;
      }
}

@cds.persistence.exists
extend sap.common.Countries {} 
```


## 3. Keep in mind

Please keep in mind that for database container backups, cross-container-access requirements cause some additional complexity. If you export a tenant database container and plan to import it again, you first need to ensure that the technical users of the new target database container (which you're planning to import the backup in) need to have the correct shared database container roles assigned (see hdbgrants details above) before applying the backup. 

> **Hint** - The hdbgrants files will not be applied in this case and you need to assign roles manually using the HDI Container APIs of the shared database container ([click here](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/40ba784dcaf44989b23f7eda316b4a0b.html?locale=en-US)). 


## 4. Further information

Please use the following links to find further information on the topics above:

* [SAP Help - Application Router](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/01c5f9ba7d6847aaaf069d153b981b51.html?locale=en-US)

* [SAP Help - SAP HANA Cloud, SAP HANA Database Deployment Infrastructure Reference](https://help.sap.com/docs/HANA_CLOUD_DATABASE/c2cc2e43458d4abda6788049c58143dc/4077972509f5437c85d6a03e01509417.html?locale=en-US)
* [Youtube - HANA Cloud: HDI - Under the Hood](https://www.youtube.com/watch?v=UmOkjPxE6Us)
* [SAP Help - Enable Access to Objects in Another HDI Container](https://help.sap.com/docs/HANA_CLOUD_DATABASE/b9902c314aef4afb8f7a29bf8c5b37b3/4adba34bd86544a880db8f9f1e32efb7.html?locale=en-US)
* [SAP Help - Database Synonyms in SAP HANA Cloud](https://help.sap.com/docs/HANA_CLOUD_DATABASE/c2b99f19e9264c4d9ae9221b22f6f589/556452cac83f423597d3a38a6f225e4b.html?locale=en-US)
* [SAP Help - Syntax Options in the hdbgrants File](https://help.sap.com/docs/HANA_CLOUD_DATABASE/c2b99f19e9264c4d9ae9221b22f6f589/f49c1f5c72ee453788bf79f113d83bf9.html?locale=en-US)
* [Youtube - SAP HANA Academy - HANACloud: Intra-HDI Container Access](https://www.youtube.com/watch?v=5duW3MUoKEQ)

