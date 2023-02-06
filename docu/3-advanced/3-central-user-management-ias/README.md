# Central user management using SAP Identity Authentication Service

In this part of the mission, you will learn how you as a SaaS provider can set up a central user management using SAP Identity Authentication Service (SAP IAS). This makes your solution independent from SAP ID Service, which requires users of your SaaS consumers to sign up for an SAP-managed user account. Using SAP IAS you can manage (register, unregister, reset passwords, ...) all SaaS consumer users in a central place. 

1. [SAP Identity Authentication](#1-SAP-Identity-Authentication)
2. [Advantages of using SAP IAS](#2-Advantages-of-using-SAP-IAS)
3. [SAP IAS tenant and trust configuration](#3-SAP-IAS-tenant-and-trust-configuration)
4. [Disable Automatic Shadow User Creation](#4-Disable-Automatic-Shadow-User-Creation)
5. [Set trusted domain in SAP IAS](#5-Set-trusted-domain-in-SAP-IAS)
6. [Architecture and flow](#6-Architecture-and-flow)
7. [Why that complicated?!](#7-Why-that-complicated?!)
8. [Possible enhancement scenarios](#8-Possible-enhancement-scenarios)
9. [Further Information](#9-Further-Information)

The following tutorial will start with the technical setup requirements of the **Advanced Scope** when it comes to the usage of SAP IAS before explaining the architecture and concepts in greater detail! We recommend going through the whole tutorial to understand what's happening under the hood! 

## Step-by-Step

To integrate SAP Identity Authentication Service as a central user management tool, please follow the upcoming chapters.

1. Understand the basics of SAP Identity Authentication Service.
2. Learn which advantages SAP IAS provides for the sample scenario.
3. If required, set up a new SAP IAS tenant and
    * configure the trust between SAP IAS and your provider subaccount.
    * configure the trust between SAP IAS and your consumer subaccounts.
4. Disable the creation of Shadow Users for security purposes.
5. Ensure you understand the architecture and flow using SAP IAS.
6. Understand the reasons and complexity of the current setup.
7. Check out the possible enhancement scenarios of this setup.


## 1. SAP Identity Authentication

What is SAP Identity Authentication Service? A crisp description can be found on the official SAP Community page on SAP Identity Authentication service [click here](https://community.sap.com/topics/cloud-identity-services/identity-authentication). 

> *"Identity Authentication is a cloud service for authentication, single sign-on, and user management in SAP cloud and on-premise applications. It can act as an identity provider itself or be used as a proxy to integrate with an existing single sign-on infrastructure."*

So while SAP IAS **can** be used for user management and authentication like in our sample use-case, it can also act as a proxy and forward authentication requests to Identity Providers like an Active Directory. This feature allows you, to offer your SaaS consumers the option to integrate their own IdPs. This requirement will be briefly covered in the Expert Scope of the mission. 

For further information on SAP Identity Authentication Service please also check the official SAP Help documentation [click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION?locale=en-US).


## 2. Advantages of using SAP IAS

The usage of SAP IAS provides signification advantages for your SaaS application and for you as a SaaS provider with some of them listed below:
- Centrally manage (e.g., register, unregister) all consumer users for each SaaS application.
  > Each SaaS application registered in SAP IAS can manage its own SaaS consumer users.
- Customize the onboarding process (e.g., registration) and the user experience (e.g., login screens).
- Define login procedures like social login or secure multi-factor authentication on a consumer basis.
- Include your consumer's Identity Provider and set up custom login logic for each consumer subaccount.
- Automate the SAP IAS instance, user, and application management using existing and upcoming APIs.
- Simple integration / trust set up with consumer subaccounts using OpenID Connect (OIDC).


## 3. SAP IAS tenant and trust configuration

In case you already have configured a trust between your provider subaccount and your SAP IAS tenant (prerequisite), there are only a few additional steps to take when setting up a new consumer account.

* Set up your central SAP IAS tenant as a trusted IdP in your consumer subaccounts. <br>
* Disable the creation of shadow users in the SAP IAS trust configurations. <br>

> **Important** - Make sure that the shadow user creation is **also disabled in your provider subaccount**! 

In case you don't have an SAP IAS tenant or you haven't configured it as a trusted Identity Provider in your **provider and consumer** subaccounts yet, please follow the steps below:

3.1. There are multiple ways to get an SAP IAS instance. Usually an SAP customer is supposed to have one productive SAP IAS instance in his SAP landscape. An SAP IAS instance can either be created right from within the SAP BTP Cockpit or a customer/partner gets it in a bundle with solutions like SAP SuccessFactors. 

3.2. To check whether there's already an SAP IAS tenant available which can be used for this scenario, please go to your provider subaccount and switch to the **Trust Configuration** in the **Security** section. Click on **Establish Trust**. If there is an SAP IAS tenant available in your landscape and a mapping between your SAP BTP global account and your SAP CRM customer number exists, you should be able to select it from the list. In that case please repeat the same process in each consumer subaccount and you're done with the trust set up and you can skip steps 3.3 to 3.6. 

> **Important** - Don't forget to continue with steps *4 - Disable Automatic Shadow User Creation* to finish the technical setup in your **provider and consumer subaccounts**.

3.3. If there is no SAP IAS tenant available in the dropdown, you can create a new tenant from your provider subaccount or any other subaccount. Please switch to **Instances and Subscriptions** in the **Services** section and create a new service instance of type **Cloud Identity Service** with service plan **default**. 

> **Important** - If you're missing this service or service plan, please make sure to add it to your subaccount entitlements. 

> **Hint** - While the **default** service plan will create a new SAP IAS tenant, the **application** service plan will create a new application registration in an SAP IAS tenant configured as a trusted IdP to the respective subaccount. 

3.4. Decide if you want to set up a productive or test tenant of SAP Identity Authentication and click on **Create** to trigger the setup. 

3.5. You or your SAP BTP global account administrator will receive a mail with instructions on how to initialize your new SAP IAS tenant once it is provisioned. The initial admin user can create further users or admins in SAP IAS. 

![<img src="./images/IAS_ActivationMail.png" width="300" />](./images/IAS_ActivationMail.png?raw=true)

3.6. Once the IAS tenant is provisioned, it will also appear in the dropdown list of your **Trust Configuration** and you can finish the trust set up in your consumer and provider subaccounts.

3.7. Please make sure you're able to log in to the SAP IAS Adminostration Console as an Administrator user by either initializing the SAP IAS tenant yourself or by requesting a respective user from your administrator.


## 4. Disable Automatic Shadow User Creation

Right after setting up the trust between your SAP IAS instance and your **provider** and **consumer** subaccounts, please disable the following setting in the **Trust Configuration** of your SAP IAS trust settings. 

![<img src="./images/IAS_ShadowUser01.png" width="300" />](./images/IAS_ShadowUser01.png?raw=true)

![<img src="./images/IAS_ShadowUser02.png" width="300" />](./images/IAS_ShadowUser02.png?raw=true)

Automated creation of shadow users results in a setup in which each and every SAP IAS user can authenticate to each consumer subaccount. As your central SAP IAS instance contains the users of all consumers, this is not desirable! Instead, we will create the subaccount-specific shadow users upon creation in the SaaS in-app user management. 


## 5. Set trusted domain in SAP IAS

To allow an automated forwarding of consumer users to the respective tenant instance after registration in SAP IAS, you need to add your SaaS application domain as a trusted domain. Therefore, please login to SAP Identity Authentication service as an Administrator and follow the screenshots below. Make sure to replace the region *eu10* with your own region if required. 

![<img src="./images/IAS_TrustedDomain01.png" width="300" />](./images/IAS_TrustedDomain01.png?raw=true)
![<img src="./images/IAS_TrustedDomain02.png" width="500" />](./images/IAS_TrustedDomain02.png?raw=true)

For a more secure setup, don't use the default cfapps domain with a wildcard, but specify the full qualified hostname including the different tenant-identifiers. Alternatively you can use your own custom domain. For information can be found in SAP Help ([click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/08fa1fe816704d99a6bcab245158ebca.html?locale=en-US)).


## 6. Architecture and flow

See the following screenshots to get an idea of the user management architecture and to understand how authentication works in the sample application including SAP IAS (click to enlarge). 

![<img src="./images/APP_Architecture.png" width="550" />](./images/APP_Architecture.png?raw=true)
![<img src="./images/IAS_Architecture.png" width="400" />](./images/IAS_Architecture.png?raw=true)

Compared to the Basic Scope, the **Advanced Scope** relies on the usage of a central SAP Identity Authentication tenant. This central SAP IAS instance is managed by the SaaS provider and added to each consumer subaccount as a trusted IdP. This allows all SAP IAS users to authenticate against consumer subaccounts using SAP IAS instead of the default SAP ID Service. 

As you've learned in the Basic Scope of the mission, the intention of the sample application is to offer in-app user management. For that reason also SAP IAS has to be part of the existing automation. So whenever a user is created or deleted in the SaaS application, it now also needs to be registered or unregistered from the corresponding SAP IAS application registration.

So let's have a closer look at the registration and authentication process in case of the new user being added to the SaaS in-app user management. 

5.1. Let's assume the admin Jane of SaaS consumer **ABC** creates a new user **Chuck** in the in-app user management of their consumer SaaS instance. Consequently, a new user in SAP IAS has to be *registered/created* and a so-called **shadow user** in XSUAA has to be *created*. 

> You might ask yourself - Why do we need to manage users in SAP IAS and in XSUAA? In this sample, we decided to maintain the shadow users on the XSUAA side manually. While SAP IAS is used as a central user store **for all SaaS consumers**, this manual approach ensures that only the users that exist as shadow users in the corresponding consumer subaccount can access the application. In the sample flow (see above), **James** exists as a user in SAP IAS and as a **shadow user** in the XYZ consumer subaccount. This gives him access to the consumer SaaS instance in subaccount XYZ. On the other side, Chuck and Jane of consumer ABC will not be able to access XYZ's SaaS instances, because no corresponding shadow users exist for them in the respective subaccount.

5.2. Understanding the basic idea of SAP IAS and XSUAA shadow users, let's check how the actual flow continues once Jane added the new user Chuck within ABC's SaaS in-app user management. 

Using a binding to a service instance of type **Cloud Identity Service** (application plan) defined in the mta.yaml of the **Advanced Scope**, the SaaS backend is able to interact with the central SAP IAS tenant. A Cloud Identity Service instance with service plan *application* can only be created in subaccounts with an SAP IAS instance configured as a trusted Identity Provider. 

![<img src="./images/IAS_ServiceInstance.png" width="300" />](./images/IAS_ServiceInstance.png?raw=true)

> **Important** - When setting up the SAP IAS trust in the SAP BTP **Trust Configuration**, an application registration in SAP IAS is created, which is used for authentication to all XSUAA-protected applications in the subaccount. 

![<img src="./images/IAS_ProviderTrust.png" width="300" />](./images/IAS_ProviderTrust.png?raw=true)

Additionally, the Cloud Identity Service instance (application plan) defined in the mta.yaml of our sample application creates another application registration in SAP IAS during deployment. This service instance is bound to the SaaS backend and is used to programmatically interact with SAP IAS (e.g., to register or unregister users)

![<img src="./images/IAS_ServiceAppReg01.png" width="300" />](./images/IAS_ServiceAppReg01.png?raw=true)

![<img src="./images/IAS_ServiceAppReg02.png" width="300" />](./images/IAS_ServiceAppReg02.png?raw=true)

Binding such a service instance to the SaaS backend will give you access to an X.509 certificate. Using this X.509 certificate, the SaaS backend can call SAP IAS APIs (e.g. to register or unregister users) on behalf of the application registration which is created in SAP IAS by the service broker.

![<img src="./images/IAS_BindingCert01.png" width="300" />](./images/IAS_BindingCert01.png?raw=true)

As you can see in the screenshot below, the X.509 certificate generated during the binding process, allows you to manage the application registration in SAP IAS and manage (register, unregister) users on behalf of the application registration. Keep in mind, this application registration in SAP IAS is created during the deployment of the SaaS application and is independent of the various application registrations created by trust setups between XSUAA and SAP IAS for each subaccount. 

![<img src="./images/IAS_BindingCert02.png" width="300" />](./images/IAS_BindingCert02.png?raw=true)

Being able to programmatically interact with SAP IAS, the SaaS backend can create a new user in SAP IAS on behalf of the app-specific application registration. Once the user **Chuck** is registered in SAP IAS, he receives an automated email, asking him to complete the SAP Identity Authentication registration. This e-mail (style and content) can be customized by the SaaS provider. 

> **Summary** - For **all consumer subaccounts** there is a separate application registration in SAP IAS (created by the trust between XSUAA and SAP IAS). These application registrations are **used for authentication** to the XSUAA-protected SaaS instances in the different consumer subaccounts! 
> Additionally, for **each SaaS application**, one dedicated application registration is created in SAP IAS which is being **used to register and unregister users** in SAP IAS across all SaaS consumers in an automated fashion!

5.3. While the user registration process is triggered in SAP IAS, **Chuck** is also created as a **shadow user** in the dedicated XSUAA user base of the ABC consumer subaccount and the respective **role collection** is assigned. For this shadow user, the central SAP IAS tenant (*Custom IAS tenant* managed by the provider) is chosen as **Identity Provider** instead of the default SAP ID Service (**Basic Scope**). 

![<img src="./images/IAS_UserCustomIdP.png" width="300" />](./images/IAS_UserCustomIdP.png?raw=true)

Based on the XSUAA - SAP IAS trust setup and a dedicated shadow user in XSUAA of the consumer subaccount, SAP IAS (acting as IdP) can now be used to authenticate requests to XSUAA-based applications like the SaaS sample application - As long as the shadow user exists and has the required role collections assigned. 

5.4. After successful registration, **Chuck** can now authenticate to the SaaS tenant of consumer ABC using SAP IAS as trusted IdP. This is where things are a bit tricky to understand, so please excuse if some explanations are repeated. 

As explained - while we're using a dedicated SAP IAS application registration for user management (register, unregister, ...), we cannot use the same application registration for authentication processes. 

SaaS users have to authenticate using the application registration created when the trust between a consumer subaccount and SAP IAS is initiated - as XSUAA will propagate the authentication to SAP IAS (acting as IdP) using this consumer subaccount-specific application registration. 

![<img src="./images/IAS_SubscriberTrust.png" width="300" />](./images/IAS_SubscriberTrust.png?raw=true)

Until a native integration of SAP IAS into CAP (incl. role management in SAP IAS) is in place, the authentication using the consumer subaccount-specific application registration has to be used. This application registration can unfortunately not be used for automated user management at the same time, as it does not manifest in a service instance on the SAP BTP side. 

Okay wow, that was a lot of information to digest. Let's summarize the steps again!

- A new user is created from within the SaaS in-app user management by a consumer administrator.
- It is registered in SAP IAS, using the X.509 certificate of a Cloud Identity service binding.
- In the consumer subaccount, an XSUAA shadow user is created and role collections are assigned.
- The user registers himself in SAP IAS after retrieving an automated invitation mail.
- The user can now authenticate using the application registration created by the consumer subaccount XSUAA - SAP IAS trust.


## 7. Why that complicated?!

Yes, we have to admit, the setup is a bit complicated and not easy to understand at first glance. Still, it offers certain advantages that we want to highlight here. 

6.1. Why not use the existing XSUAA - SAP IAS trust application registration for the SAP IAS API access?
    - While technically this is a possible option, it is currently not automatable and has some further drawbacks outlined below! As described, in our setup we're using the X.509 certificate of the Cloud Identity service binding (application plan) to access SAP IAS APIs from the SaaS backend application. Setting up the trust between XSUAA and SAP IAS **does not** result in a bindable service instance. Therefore, the certificate or client credentials need to be manually created and rotated in SAP IAS and stored on the SAP BTP side. Not ideal! 

6.2. Why is a separate application registration used for each SaaS application to register users in SAP IAS?
  - Besides the automation goodie described above, this approach has also other good reasons. First of all, it allows you to customize e-mail templates and forms of each SaaS application that a SaaS provider is offering. Furthermore, this setup supports scenarios in which a user is supposed to use multiple SaaS apps in a consumer subaccount. What does that mean?

    Let's assume that only one single application registration (e.g. the one of the XSUAA - SAP IAS trust) is used to register and unregister the users of multiple SaaS applications. If you unregister a user from that application registration, it will be instantly removed from the SAP IAS user store. This happens because SAP IAS removes a user from the user store, once he's unregistered from the last application registration. Result - The user cannot log in any more!
    
    Having multiple application registrations for each SaaS application and assigning a user separately to each of them, will mitigate this issue. The user will still be able to authenticate to the remaining SaaS apps as long as he's not removed from all application registrations. 

6.3. Isn't there a way to manage SAP IAS users using an SAP IAS administration API endpoint?
  - Sure, there is a way to do that. SAP IAS provides an API endpoint that allows you to create new users in the user store instead of registering them on behalf of an application registration. Nevertheless, to use that API endpoint an additional manual step requires you to create a technical user in SAP IAS and to store and rotate its credentials on the SAP BTP side. Furthermore, you will miss the nice feature of registering users to an application, which will trigger an e-mail to the new user that you can customize. 

6.4. Does that mean we can also customize the login behavior (screens or flows like social login) for each SaaS application?
  - No, this is currently not possible as these application registrations (unique per application and not per consumer) are only used for (un-)registering users in SAP IAS but not for authentication. As of today, if a user wants to authenticate to a SaaS application protected by XSUAA, he has to authenticate using application registration created by the XSUAA - SAP IAS trust. As explained, this means one SAP IAS application registration is used for the authentication of **all applications** in a consumer subaccount. While this is a minor downside as e.g. certain SaaS applications might have stricter authentication requirements than others, it still allows you to at least define different authentication flows per consumer subaccount. 

6.5. Will this setup be simplified/enhanced in the future? 
  - Probably yes - but there is no concrete timeline yet. Once there is an end-to-end integration (incl. role management) between SAP IAS and frameworks like CAP (currently XSUAA-based), a dedicated application registration for each SaaS application might be a viable option for future authentication and user management. This will allow users to directly authenticate against the same application registration which is also used for managing the users in SAP IAS. 


## 8. Possible enhancement scenarios

This setup is only one sample of how to approach a central user store using SAP Identity Authentication Service. Still, there are further options to enhance or modify this scenario depending on your own requirements. Let's check out some of them. 

7.1. Provide a separate SAP IAS tenant to each and every consumer. In case one of your consumers wants to have the ownership and management capabilities of its user base, you can provide access to a separate SAP IAS tenant. In this case, you need to ensure, that you set up the trust between the consumer subaccount and the dedicated consumer SAP IAS instance. 

In-app user management will not work out of the box in this case, as the SaaS backend application (running in the provider subaccount) will not be able to create an application registration within the consumer SAP IAS tenant. In that case, you need to modify the implementation to support the following scenarios:

  * Manually create an application registration for user management in the SAP IAS consumer tenant and store the respective credentials on the consumer subaccount side (e.g., in a Destination or Credential Store instance). Use the credentials in the SaaS application to allow in-app user management again. 
  * Make use of group assignments in the dedicated SAP IAS consumer tenant. Applying the corresponding XSUAA group mapping in the consumer subaccount will make the role assignment work again. Also, this approach requires changes in the coding, as you will need to implement additional API calls to SAP IAS for the respective group assignment. In the case of a dedicated SAP IAS tenant, you can enable the automatic creation of shadow users, skipping the manual user creation on the XSUAA side.

7.2. Allow consumers to bring their own Identity Providers. For large SaaS consumers, this might be a preferred option, as they don't need to manage users manually in the SaaS application but access will be granted based on group memberships. 

  * In-app user management will either not be required or needs to be modified in this case. If required, the SaaS application needs to be enhanced in a way that supports the consumer's IdP APIs for user creation and/or group assignment. While this is not necessarily impossible, it cannot be covered by this sample application. The integration of a custom Identity Provider can either happen on the XSUAA level, which lets you skip SAP IAS, or within SAP IAS. SAP IAS will act as a proxy and forward the authentication to the consumer's IdP (find more details in the **Expert Scope**).

7.3. Use SAP IAS as a central user store and switch to an authentication approach based on user group mappings. This will allow you to skip the assignment of role collections to shadow users on the XSUAA side but will cause more management effort on the SAP IAS side. 

  * Using dedicated user groups in SAP IAS like "Admin_ConsumerABC" and "Admin_ConsumerXYZ", you can set up a corresponding group mapping in the respective subaccounts of consumers ABC and XYZ. Instead of manually assigning role collections to your XSUAA shadow users, the only thing that needs to be done now is to map the role collections of the SaaS application to the consumer-specific user groups. Certain changes in the code will be required to automate the creation of consumer-specific user groups in SAP IAS and connect your in-app user management with the group assignment logic of SAP IAS. In this scenario, you need to ensure, that users in SAP IAS are assigned to the correct user group.
  

## 9. Further information

Please use the following links to find further information on the topics above:

* [SAP Help - SAP Cloud Identity Services](https://help.sap.com/docs/SAP_CLOUD_IDENTITY?locale=en-US)
* [SAP Community - SAP Cloud Identity Services - Identity Authentication](https://community.sap.com/topics/cloud-identity-services/identity-authentication)
* [SAP Help - SAP Cloud Identity Services - Identity Authentication](https://help.sap.com/docs/IDENTITY_AUTHENTICATION?locale=en-US)
* [SAP Help - SAP Authorization and Trust Management Service in the Cloud Foundry Environment](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/6373bb7a96114d619bfdfdc6f505d1b9.html?locale=en-US)
* [SAP Help - Trust and Federation with Identity Providers](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/cb1bc8f1bd5c482e891063960d7acd78.html)
* [SAP Help - Establish Trust and Federation Between UAA and Identity Authentication](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/161f8f0cfac64c4fa2d973bc5f08a894.html?locale=en-US)
* [SAP Help - Switch Off Automatic Creation of Shadow Users](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/d8525671e8b14147b96ef497e1e1af80.html)
* [SAP Help - Configure Trusted Domains](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/08fa1fe816704d99a6bcab245158ebca.html?locale=en-US)
