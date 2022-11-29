# Troubleshooting

In this part of the mission we will provide information on troubleshooting approaches that can help you doing your own development.

1. [Destination Resolution](#1-Destination-Resolution)


## 1. Destination Resolution

If you ever wondered, how to tell your SaaS application whether you would like to use the destination from either the provider or consumer subaccount, you can find two sample destinations taken from a package.json file. The **selectionStrategy** setting is the central parameter allowing you to define a concrete behavior if the default is not working for you. Check the official CAP documentation ([click here](https://cap.cloud.sap/docs/guides/using-services#destination-resolution)), to learn more about the topic of destination resolution. 

Also, read the SAP Approuter documentation ([click here](https://www.npmjs.com/package/@sap/approuter#Routes)), which allows you to make use of the so-called **preferLocal** parameter for your routes. This can be helpful in case of destinations that have to be resolved on the Approuter level already. 

```json
{
    "cds":{
        "requires": {
            "API_S4_SALES_ORDER_SRV": {
                "kind": "odata-v2",
                "model": "srv/external/API_SALES_ORDER_SRV",
                "credentials": {
                    ...
                },
                "destinationOptions": {
                    "[production]": {
                        "selectionStrategy": "alwaysSubscriber"
                    }
                }
            },
            "API_NW_INVOICE_SRV": {
                "kind": "odata",
                "model": "srv/external/NorthWind",
                "credentials": {
                    ...
                },
                "destinationOptions": {
                    "[production]": {
                        "selectionStrategy": "alwaysProvider"
                    }
                }
            }
        }
    }
}
```