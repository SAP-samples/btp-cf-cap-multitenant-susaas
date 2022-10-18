# Subscribe Consumer Subaccount

In this part of the mission, you will learn how to subscribe your first consumer tenant. The process is fairly simple if you followed the previous steps and also configured the Credential Store with the correct values. 

1. [SaaS application subscription](#1-SaaS-application-subscription)
2. [API Service Broker instance](#2-API-Service-Broker-instance)
3. [Initialize the SaaS application](#3-Initialize-the-SaaS-application)
4. [Improvement options](#4-Improvement-options)
5. [Troubleshooting](#5-Troubleshooting)

In case you already completed the Basic Scope, the following steps will be familiar to you. Still, you can see it as a good exercise. 


## 1. SaaS application subscription

Please continue with the steps described in the corresponding part of the **Basic Scope** ([click here](../../2-basic/4-subscribe-consumer-subaccount/README.MD#1-saas-application-subscription)). 


## 2. API Service Broker instance

Please continue with the steps described in the corresponding part of the **Basic Scope** ([click here](../../2-basic/4-subscribe-consumer-subaccount/README.MD#2-api-service-broker-instance)). 


## 3. Initialize the SaaS application

### Basic Steps 

Please continue with the steps described in the corresponding part of the **Basic Scope** ([click here](../../2-basic/4-subscribe-consumer-subaccount/README.MD#3-initialize-the-saas-application)). 

### Additional Steps 

As the **Advanced Scope** contains a sample integration with SAP Identity Authentication Service, there are a few more steps required before the new consumer tenant administrator can access the consumer tenant instance. 

3.11. First, in your **consumer subaccount** please disable the login using the default SAP ID Service in your **Trust Configuration** settings. Keeping this setting enabled, will confuse the consumer tenant users as for each login they need to choose which Identity Provider they want to use for authentication (SAP IAS vs. SAP ID Service). 

> **Important** - Please keep in mind, changing this setting that the **Provider administrator** cannot log in to the tenant subscription instance anymore.

[<img src="./images/IAS_DisableLogon01.png" width="500" />](./images/IAS_DisableLogon01.png)
[<img src="./images/IAS_DisableLogon02.png" width="280" />](./images/IAS_DisableLogon02.png)

3.12. Once the **Tenant administrator** is created by the **Provider administrator** using the in-app user management, he or she will receive an e-mail from the central SAP Identity Authentication Service instance. If not, please make sure you've correctly configured the Trust Configuration in the consumer subaccount ([click here](../3-central-user-management-ias/README.MD)) and check the error logs of the susaas-srv application!

[<img src="./images/IAS_CreateUser01.png" width="240" />](./images/IAS_CreateUser01.png)
[<img src="./images/IAS_CreateUser02.png" width="300" />](./images/IAS_CreateUser02.png)

3.13. In the e-mail, the Tenant administrator will be asked to sign-up for the *Susaas-dev* application. The style and content of this e-mail can be modified for each application registration in SAP Identity Authentication Service ([click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/b2afbcdccdf7410f8953e1e833e77de0.html?locale=en-US)). 

[<img src="./images/IAS_Email01.png" width="390" />](./images/IAS_Email01.png)

3.14. Clicking on the provided link, the **Tenant administrator** reaches the registration form in which he or she can change her first and last name if required and set a password for the SAP Identity Authentication account. 

[<img src="./images/IAS_Registration.png" width="390" />](./images/IAS_Registration.png)

3.15. Once the Tenant administrator completed the registration, a success message is displayed and the page can be closed. 

[<img src="./images/IAS_RegSuccess.png" width="390" />](./images/IAS_RegSuccess.png)

3.16. Now the new **Tenant administrator** can log in to the consumer tenant instance using the new credentials.

[<img src="./images/IAS_LoginSubscr.png" width="390" />](./images/IAS_LoginSubscr.png)

> **Hint** - You will not see the name of the SaaS application registration (*Susaas-Dev*) in the authentication screen but the name of the application registration created by the XSUAA - SAP IAS trust setup. This relates to the [Architecture Setup](../3-central-user-management-ias/README.MD#5-architecture-and-flow) described in chapter *Central user management using SAP Identity Authentication Service*. This screen can also be customized in SAP Identity Authentication Service ([click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/32f8d337f0894d269f5f89956803efac.html?locale=en-US)).

3.17. As a **Provider administrator** you will see the new **Tenant administrator** in your XSUAA user management using the SAP BTP Cockpit. In the following screenshot, you can see that the Provider administrator (using the Default Platform Identity Provider -> SAP ID Service) has set up the Tenant administrator (now assigned to the Custom Identity Provider -> SAP Identity Authentication). 

[<img src="./images/IAS_XSUAAUsers.png" width="390" />](./images/IAS_XSUAAUsers.png)

3.18. As a Provider Administrator, log in to SAP Identity Authentication - Administration Console and you can see the new **Tenant administrator** in the User Management section of SAP IAS. Switching to the **Applications** tab you will notice that the user has been **registered** by the *Susaas-dev* application but authenticates using the consumer-specific *XSUAA_<Subaccount-Name>* application.

[<img src="./images/IAS_UserDetails.png" width="390" />](./images/IAS_UserDetails.png)


## 4. Improvement options

Concerning the automation of onboarding processes, some further aspects of the previous steps could be automated:

- Automation of consumer subaccount onboarding
- Further subscription process automation
- Automation of first tenant administrator setup
- ...

These aspects have not been covered in the sample application but feel free to add further features to this sample using a pull request. 

## 5. Troubleshooting

For troubleshooting please check the separate **Troubleshooting** section of the **Basic Scope** ([click here](../../2-basic/10-troubleshooting/README.MD)) and **Advanced Scope** ([click here](../9-troubleshooting/README.MD)).


## 6. Further information

Please use the details provided in the **Basic Scope** ([click here](../../2-basic/4-subscribe-consumer-subaccount/README.MD#6-Further-information)) to find further information on the topics above. 