# Understand the Repository Structure

This part of the mission will briefly outline the repository structure of the **Advanced Scope** [branch](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/tree/advanced). The general file structure is same as in the **Basic Scope** [branch](../../2-basic/1-understand-repo-structure/README.md), but the **Advanced Scope** has some relevant source code differences.


## Differences in the Advanced Scope codebase

| **Filename** | **Difference** | **Description**  |
| :---        |    :----:   |          :--- |
| [mta.yaml](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/advanced/mta.yaml)  | ![<img src="./images/ias-instance.png" width="400"/>](./images/ias-instance.png?raw=true) | A Cloud Identity service instance (application plan) is added to be able to communicate with SAP IAS APIs for user management ((un-)registration). |
| [mta.yaml](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/advanced/mta.yaml) | ![<img src="./images/ias-binding.png" width="400"/>](./images/ias-binding.png?raw=true) | The Cloud Identity service instance (application plan) is bound to the business application service (**srv**) to be able to communicate with SAP IAS for user management. |
| [srv/admin-service.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/advanced/srv/admin-service.js)  | ![<img src="./images/create-ias-user.png" width="400"/>](./images/create-ias-user.png?raw=true) | This code is added to the SAVE event to create a user in SAP IAS in addition to the shadow user. |
| [srv/admin-service.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/advanced/srv/admin-service.js)   | ![<img src="./images/delete-ias-user.png" width="400"/>](./images/delete-ias-user.png?raw=true) | This code is added to the before DELETE event to delete the user also from SAP IAS in addition to the shadow user deletion. |
| [srv/utils/user-management-utils.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/advanced/srv/utils/user-management-utils.js)  | ![<img src="./images/ias-methods.png" width="400"/>](./images/ias-methods.png?raw=true) | This code provides the actual implementation of SAP IAS API calls for user creation and deletion by the in-app user-management. |
| [srv/utils/user-management-utils.js](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas/blob/advanced/srv/utils/user-management-utils.js)  | ![<img src="./images/idp-origin.png" width="400"/>](./images/idp-origin.png?raw=true) | The origins in XSUAA API calls have been changed to **sap.custom** from **sap.default** since we are not using the default IDP but SAP IAS on this scope. |


> **Hint** - To see all the differences between the advanced and basic branches, you can fork this repository and create a pull request with **basic** as base branch and **advanced** as compare branch.