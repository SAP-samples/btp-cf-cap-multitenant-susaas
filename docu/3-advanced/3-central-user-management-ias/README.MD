# Central user management using SAP Identity Authentication Service

In this part of the mission you will learn how you as a SaaS provider can setup a central user management using SAP Identity Authentication Service (SAP IAS). This makes your solution independent from SAP ID Service, which requires users of your SaaS consumers to sign up for an SAP account. Using SAP IAS you can manage (register, unregister, reset passwords, ...) all SaaS consumer users on an application base in a central place. 

The following tutorial will start with the technical setup requirements of the **Advanced Scope** when it comes to the usage of SAP IAS before explaining the architecture and concepts in greater detail! We recommend to go throught the whole tutorial to understand what's happening under the hood! 

> **Important** - To complete this mission part from a technical perspective, please ensure to finish at least the steps 3, 4 and 5 of the following topic list. Doing so, you will setup an SAP Identity Authentication Service tenant (if not there yet), establish the required trust to your provider and consumer subaccounts and ensure your overall trust setup is configured properly. 

1. [SAP Identitiy Authentication](#1-SAP-Identitiy-Authentication)
2. [Advantages of using SAP IAS](#2-Advantages-of-using-SAP-IAS)
3. [SAP IAS tenant and trust configuration](#3-SAP-IAS-tenant-and-trust-configuration)
4. [Disable Automatic Shadow User Creation](#4-Disable-Automatic-Shadow-User-Creation)
5. [Architecture and flow](#5-Architecture-and-flow)
6. [Why that complicated?!](#6-Why-that-complicated?!)
7. [Possible enhancement scenarios](#7-Possible-enhancement-scenarios)
8. [Further Information](#8-Further-Information)


## 1. SAP Identitiy Authentication

What is SAP Identity Authentication Service? A crisp description can be found in the official SAP Community page on SAP Identity Authentication service [click here](https://community.sap.com/topics/cloud-identity-services/identity-authentication). 

>Identity Authentication is a cloud service for authentication, single sign-on, and user management in SAP cloud and on-premise applications. It can act as an identity provider itself or be used as a proxy to integrate with an existing single sign-on infrastructure.*

So while SAP IAS **can** be used for user management and authentication like in our sample use-case, it can also act as proxy and forward authentication requests to Identity Providers like an Active Directory. This feature allows you, to offer your SaaS consumers the option to integrate their own IdPs. This requirement will be briefly covered in the Expert Scope of the mission. 

For further information on SAP Identity Authentication Service please also check the official SAP Help documentation [click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION?locale=en-US).


## 2. Advantages of using SAP IAS

The usage of SAP IAS provides great advantages for your SaaS application with some of them listed below:
- Centrally manage (e.g., register, unregister) all consumer users on an SaaS application base.
  > Each SaaS application registered in SAP IAS can manage it's own SaaS consumer user assignements.
- Customize the onboarding process (e.g., welcome emails) and the user experience (e.g., login screens).
- Set login procedures like social login or secure multi-factor authentication on a consumer subaccount basis.
- Include your consumer's Identity Provider and setup custom login logic for each consumer subaccount.
- Automate the SAP IAS instance, user and application management using existing and upcoming APIs.
- Simple integration with consumer subaccounts using OpenID Connect (OIDC).


## 3. SAP IAS tenant and trust configuration

In case you already have configured a trust between your provider subaccount and your SAP IAS tenant (!prerequisite!), there is only three additional steps to take when setting up a new consumer account.

* Setup your SAP IAS tenant as trusted OIDC IdP in your consumer subaccounts. <br>
* Disable the automated creation of shadow users for the SAP IAS trust. <br>

> **Important** - Make sure that the automated shadow user creation is **also disabled in your provider subaccount**! 

In case you don't have an SAP IAS tenant or you haven't configured it as trusted Identity Provider in your provider and consumer subaccounts yet, please follow the steps below:

3.1. There are multiple ways to get an SAP IAS tenant. Usually an SAP customer is supposed to have one productive IAS instance in his SAP cloud landscape. An SAP IAS instance can either be created right from within the SAP BTP cockpit or a customer/partner gets it in a bundle together with solutions like SAP SuccessFactors. 

3.2. To check whether there's already an SAP IAS tenant available which can be re-used for this scenario, please go to your provider subaccount and switch to the **Trust Configuration** in the **Security** section. In here click on **Establish Trust**. If there is an SAP IAS tenant available in your landscape and a mapping between your SAP BTP global account and your SAP CRM customer number exists, you should be able to select it from the list. In that case please repeat the same process in each consumer subaccount and you're done with the trust setup and you can skip 3.3 to 3.6. 

> **Important** - Don't forget to continue with steps *6 - Disable Automatic Shadow User Creation* and *7 - Disable the login using SAP ID Service* to finish the technical setup.

3.3. If there is no SAP IAS teant available in the dropdown, you can create a new tenant right away from your provider subaccount or any other subaccount. Therefore, please switch to **Instances and Subscriptions** in the **Services** section and create a new service instance of type **Cloud Identity Service** with service plan **default**. If you're missing this service or service plan, please make sure to add it in your subaccount entitlements. 

> Important - We used the same service type but a different service plan in the sample flow described above. While the **default** plan will create a new SAP IAS tenant, the **application** plan will create a new application registration in an SAP IAS tenant connected as trusted IdP to the respective subaccount. 

3.4. Decide if you want to setup a productive or test tenant of SAP Identity Authentication and click on **Create** to trigger the setup. 

3.5. You or your SAP BTP global account administrator will receive a mail with instructions on hwo to login to your new SAP IAS tenant once it is provisioned. The initial admin user can create further users or admins in SAP IAS. 

[<img src="./images/IAS_ActivationMail.png" width="300" />](./images/IAS_ActivationMail.png)

3.6. Once the IAS tenant is available, it should also appear in the dropdown list of your **Trust Configuration** and you can finish the trust setup in your consumer and provider subaccounts.

For further information on how to setup SAP Identity Authentication and the different licensing variants please check the official SAP Help documentation [click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION?locale=en-US).


## 4. Disable Automatic Shadow User Creation

Right after setting up the trust between your SAP IAS instance and your **provider** and **consumer** subaccounts, please disable the following setting in the **Trust Configuration** of your SAP IAS tenant trust settings. 

[<img src="./images/IAS_ShadowUser01.png" width="300" />](./images/IAS_ShadowUser01.png)

[<img src="./images/IAS_ShadowUser02.png" width="300" />](./images/IAS_ShadowUser02.png)

An automated creation of shadow users, leads to a setup in which each and every SAP IAS user can authenticate to each consumer subaccount. As your central SAP IAS instance contains the users of all consumers, this is not desirable! Instead, we will create the consumer subaccount specific XSUAA shadow users upon creation in the SaaS in-app user management. 


## 5. Architecture and flow

See the following screenshots to get an idea of the user management architecture and to understand how authentication works in the sample application including SAP IAS. 

[<img src="./images/APP_Architecture.png" width="550" />](./images/APP_Architecture.png)
[<img src="./images/IAS_Architecture.png" width="400" />](./images/IAS_Architecture.png)

Compared to the Basic Scope, the Advanced Scope relies on the usage of a central SAP Identity Authentication. This central IAS instance is managed by the SaaS provider and added to each consumer subaccount as a trusted IdP. This allows all IAS users to authenticate against consumer subaccounts using SAP IAS instead of the default SAP ID Service. 

As you've learned in the Basic Scope of the mission, the intention of the sample application is to offer an in-app user management. For that reason also SAP IAS has to be part of this automation. So whenever a user is created or deleted in the SaaS application, it needs to be registered or unregistered from the corresponding SAP IAS application registration.

So let's have a closer look on the registration and authentication process in case of new user being created in the SaaS in-app user management. 

5.1. Let's assume the admin Jane of SaaS consumer **ABC** creates a new user **Chuck** in the in-app user management of their SaaS instance. Consequently a new user in SAP IAS has to be *registered* and a so called **shadow user** in XSUAA has to be *created*. 

You might ask yourself - Why do we need to manage users in SAP IAS and in XSUAA? In this sample we decided to maintain the shadow users on the XSUAA side manually. While SAP IAS is used as a central user store **for all SaaS consumers**, this approach ensures that only the users that exist as shadow users in the corresponding consumer subaccount can access the application. 

In the sample flow, **James** exists as a user in SAP IAS and is also maintained as a **shadow user** in the XYZ consumer subaccount. This gives him access to the SaaS consumer tenant in subaccount XYZ. Chuck or Jane will not be able to access these SaaS consumer tenants, because no corresponding shadow users exist in the respective consumer subaccount.


5.2. Understanding the basic idea of SAP IAS and XSUAA shadow users, let's check how the actual flow continues once Jane creates Chuck within the SaaS in-app user management. 

Using a binding to a service instance of type **Cloud Identity Service** (application plan) defined in the mta.yaml of the **Advanced Scope**, the SaaS backend is able to interact with SAP IAS. A Cloud Identity Service instance can be created in subaccounts with an SAP IAS instance configured as trusted OpenID Connect (OIDC) IdP. 

[<img src="./images/IAS_ServiceInstance.png" width="300" />](./images/IAS_ServiceInstance.png)

Important - When setting up this trust in the SAP BTP **Trust Configuration**, an application registration in SAP IAS is created, which is used for authentication of all XSUAA protected applications in the subaccount. 

[<img src="./images/IAS_ProviderTrust.png" width="300" />](./images/IAS_ProviderTrust.png)

The Cloud Identity Service instance defined in the mta.yaml of our sample application creates another application registration in SAP IAS  during deployment. This service instance can be bound to the SaaS backend and is used to programatically interact with SAP IAS (e.g., to register or unregister users)

[<img src="./images/IAS_ServiceAppReg01.png" width="300" />](./images/IAS_ServiceAppReg01.png)

[<img src="./images/IAS_ServiceAppReg02.png" width="300" />](./images/IAS_ServiceAppReg02.png)

Binding such a service instance to the SaaS backend will give you access to an X.509 certificate. Using this X.509 certificate, the SaaS backend can call SAP IAS APIs (e.g. to register or unregister users) on-behalf of the application registration which was created in SAP IAS by the service instance.

[<img src="./images/IAS_BindingCert01.png" width="300" />](./images/IAS_BindingCert01.png)

As you can see in the screenshot below, the X.509 certificate generated during the binding process, allows you to manage the application registration in SAP IAS and manage (register, unregister) users on behalf of the application registration in SAP IAS. Keep in mind, this application registration in SAP IAS is created during deployment of the SaaS application and is independent of the application registrations created by the trust setups between XSUAA and SAP IAS for each subaccount. 

[<img src="./images/IAS_BindingCert02.png" width="300" />](./images/IAS_BindingCert02.png)

Being able to interact programatically with SAP IAS, the SaaS backend can now create a new user in SAP IAS on behalf of this SaaS app specific application registration. Once the user **Chuck** is registered in SAP IAS, he will receive an automated email, asking him to sign up for SAP Identity Authentication. This email can be customized by the SaaS provider for each application registration so in case the SaaS provider offers several SaaS applications, style and content of the registration mail can be changed accordingly. 

> **Note** - For all consumer subaccounts there will be a separate application registration in SAP IAS (created by the trust setup between XSUAA and SAP IAS). These application registrations are used for authentication to the XSUAA protected SaaS instances in the different consumer subaccounts! 
> Additionally, for each SaaS application, one dedicated application registration is created in SAP IAS which is **only** being used to register and unregister users in SAP IAS accross all SaaS consumers in an automated fashion!


5.3. While the user registration process is triggered in SAP IAS, **Chuck** is also created as a **shadow user** in the dedicated XSUAA user-base of the ABC consumer subaccount and the respective **role collection** is assigned. For this shadow user, the central SAP IAS tenant (*Custom IAS tenant* managed by the provider) is chosen as **Identity Provider** instead of the default SAP ID Service. 

[<img src="./images/IAS_UserCustomIdP.png" width="300" />](./images/IAS_UserCustomIdP.png)

Based on the XSUAA - SAP IAS trust setup and a dedicated shadow user in XSUAA user-base of the consumer subaccount, SAP IAS (acting as IdP) can now be used to authenticate requests to SAP XSUAA based applications like the SaaS sample application. As long as the shadow user exists and has the required role collections assigned. 


5.4. After successful registration, **Chuck** can now authenticate to the SaaS tenant of consumer ABC. This is where things are a bit tricky to understand, so please excuse if some explanations are repeated again. 

As explained - while we're using a dedicated SAP IAS application registration for user management (register, unregister, ...), we cannot use the same application registration for authentication processes. 
    
SaaS users have to authenticate to the application registration created when the trust between a consumer subaccount and SAP IAS is initiated - as XSUAA will propagate the authentication to SAP IAS (acting as IdP) using this subaccount specific application registration. 

[<img src="./images/IAS_SubscriberTrust.png" width="300" />](./images/IAS_SubscriberTrust.png)

Until a native integration of SAP IAS into CAP (incl. role management in SAP IAS) is in place, the authentication using the consumer subaccount specific application registration has to be used. This application registration can unfortunately not be used for automated user management at the same time, as it does not manifest in a bindable service instance on the SAP BTP side. 

Okay wow, that was a lot of information to digest. Let's summarize the steps again!

- A new user is created from within the SaaS in-app user management by a tenant administrator.
- It is registered in SAP IAS, using the X.509 certificate of a Cloud Identity service binding.
- In the consumer subaccount, a shadow user is created and role collections are assigned.
- The user registers in SAP IAS after retrieving an automated invitation mail.
- The user can now authenticate using the app registration created by the XSUAA - SAP IAS trust.


## 6. Why that complicated?!

Yes, we have to admit, the setup is a bit complicated. Still, it offers certain advantages that we want to highlight here. 

6.1. Why not using the XSUAA - SAP IAS trust application registration for the SAP IAS API access?
    - While technically this is a possible option, it is currently not automatable and has some further drawbacks outlined below! As described, in our setup we're using the X.509 certificate of the Cloud Identity service binding to access SAP IAS APIs from the SaaS backend application. Setting up the trust between XSUAA and SAP IAS **does not** result in a bindable service instance. Therefore, the certificate or client credentials need to be manually created and rotated in SAP IAS and stored on the SAP BTP side. Not ideal! 

6.2. Why is a separate application registration used to register users in SAP IAS?
  - Besides the automation goodie described above, this approach has also other good reasons. First of all it allows you to customize the email templates and forms of each application that a SaaS provider is offering. Furthermore, this setup supports scenarios in which a user is supposed to use multiple SaaS apps in a consumer subaccount. 

    Let's assume that only one single app registration (e.g. the XSUAA - SAP IAS trust) is used to register and unregister the users of multiple SaaS applications. If you now unregister a user from that single app registration, it will be automatically removed from the SAP IAS user store. This happens because SAP IAS removes a user from the user store, once he's unregistered from the last application registration. 
    
    Having multiple application registrations for each SaaS app and registering a user against each of them, will mitigate this issue. The user will still be able to authenticate to the remaining SaaS apps as long as he's not removed from all application registrations. 

6.3. Isn't there a way to manage SAP IAS users differently using an API endpoint?
  - Sure, there is a way to do that. SAP IAS provides an API endpoint which allows you to create new users in the user store instead of registering them on behalf of an application registration. Nevertheless, to use that API endpoint an additional step requires you to create a manual technical user in SAP IAS and to store and rotate its credentials on the SAP BTP side. Furthermore, you will miss the nice feature of registering users to an application, which will e.g. trigger an email to the new user which you can customize per application registration. 

6.4. Does that mean we can customize the login behaviour (screens or flows like social login) for each SaaS application?
  - No, this is currently not possible as the SaaS application specific application registrations are only used for (un-)registering users in SAP IAS but not for authentication. As of today, if a user wants to authenticate to an SaaS app protected by XSUAA, he has to authenticate to the application registration created by the XSUAA - SAP IAS trust. As explained, this means one application registration is used for authentication of **all applications** in a certain consumer subaccount. While this is a minor downside as e.g. certain applications might have stricter authentication requirements than others, it still allows you to define different authentication flows per consumer subaccount. 

6.5. Will this setup be simplified / enhanced in the future? 
  - Probably yes - but there is no concrete timeline yet. Once there is an end-to-end intergration (incl. role managment) between SAP IAS and frameworks like CAP (currently XSUAA-based), a dedicated application registration for each SaaS application might be a viable option for future authentication and user management. This will allow users to directly authenticate against the same application registration which is also used for managing the users in SAP IAS. 


## 7. Possible enhancement scenarios

This setup is a valid way to approach a central user store using a SAP BTP product like SAP Identity Authentication Service. Still, there are further ways to enhance or modify this scenario depending on your requirements. Let's check out some of them. 

7.1. Provide a separate SAP IAS tenant to each and every consumer. In case one of yours consumers wants to have the ownership and management capabilities of its user base, you can provide him access to a separate SAP IAS tenant. In this case you need to ensure, that you setup the trust between your the consumer subaccount and that dedicated SAP IAS instance. 

An in-app user management will not work out-of-the-box in this case, as the SaaS backend application (running in the provider subaccount) will not be able to create an application registration within the SAP IAS consumer tenant. In that case you need to modify the implementation to support the following scenarios:

  * Manually create an application registration for user management in the SAP IAS consumer tenant and store the respective credentials on the consumer subaccount side (e.g., in a destination). Use the subaccount destination details in the SaaS app to allow in-app user management again. 
  * Make use of group assignments in the dedicated SAP IAS consumer tenant. Applying the a corresponding XSUAA group mapping in the consumer subaccount, will make the role assignment work again. This approach requires more changes in the coding, as you will need to implement additional API calls to SAP IAS for the respective group assignment. In case of a dedicated SAP IAS tenant, you can enable the automatic creation of shadow users, skipping the user creation on XSUAA side.

7.2. Allow consumers to bring their own IdP. For large SaaS consumers, this might be a preferred option, as they don't need to manage users manually in the SaaS application but access will be granted based on group memberships. 

  * An in-app user management will either not be required or needs to be modified in this case. The SaaS application needs to be enhanced in a way that supports the consumer's IdP APIs for user creation and/or group assignment. While this is not necessarily impossible, it cannot be covered by this sample application. Integration of a custom Identity Provider can either happen on XSUAA level, which let's you skip  SAP IAS, or within SAP IAS. SAP IAS will act as a proxy and forward the authentication to the consumer's IdP.

7.3. Use SAP IAS as a central user store and switch to an authentication approach based on user group mappings. This will allow you to skip the assignment of role collections to shadow users on the XSUAA side but will cause more management effort on the SAP IAS side. 

  * Using dedicated user groups in SAP IAS like "Admin_ConsumerABC" and "Admin_ConsumerXYZ", you can setup a corresponding group mapping in the respective subaccounts of consumer ABC and consumer XYZ. Instead of manually assigning role collections to your XSUAA shadow suers, the only thing that needs to be done now is to map the role collections of the SaaS application to the consumer specific user groups. Certain changes in the code will be required to automate the creation of consumer specific user groups in SAP IAS and connect your in-app user management with the group assignment logic of SAP IAS. In this scenario you need to ensure, that users in SAP IAS are assigned to the correct user group.

## 8. Further information

Please use the following links to find further information on the topics above:

* [SAP Help - SAP Cloud Identity Services](https://help.sap.com/docs/SAP_CLOUD_IDENTITY?locale=en-US)
* [SAP Community - SAP Cloud Identity Services - Identity Authentication](https://community.sap.com/topics/cloud-identity-services/identity-authentication)
* [SAP Help - SAP Cloud Identity Services - Identity Authentication](https://help.sap.com/docs/IDENTITY_AUTHENTICATION?locale=en-US)
* [SAP Help - SAP Authorization and Trust Management Service in the Cloud Foundry Environment](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/6373bb7a96114d619bfdfdc6f505d1b9.html?locale=en-US)
* [SAP Help - Trust and Federation with Identity Providers](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/cb1bc8f1bd5c482e891063960d7acd78.html)
* [SAP Help - Establish Trust and Federation Between UAA and Identity Authentication](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/161f8f0cfac64c4fa2d973bc5f08a894.html?locale=en-US)
* [SAP Help - Switch Off Automatic Creation of Shadow Users](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/d8525671e8b14147b96ef497e1e1af80.html)
