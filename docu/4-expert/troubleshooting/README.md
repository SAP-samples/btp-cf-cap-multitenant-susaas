# Troubleshooting

> **Important** - ! Available soon !

In this part of the mission we will provide information on troubleshooting approaches that might help you doing your own development.


## 1. Introduction


## 2. Destination Handling

```json
{
    "cds":{
        "requires": {
            "API_S4_SALES_ORDER_SRV": {
                "kind": "odata-v2",
                "model": "srv/external/API_SALES_ORDER_SRV",
                "credentials": {
                    "[production]": {
                        "destination": "SUSAAS_S4HANA_CLOUD",
                        "path": "s4hanacloud/sap/opu/odata/sap/API_SALES_ORDER_SRV"
                    },
                    "[development]": {
                        "url": "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_SALES_ORDER_SRV"
                    }
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
                    "[production]": {
                        "destination": "SUSAAS_NORTHWIND",
                        "path": "Invoices"
                    },
                    "[development]": {
                        "url": "https://services.odata.org/v4/Northwind/Northwind.svc/Invoices"
                    }
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