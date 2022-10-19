using { susaas.db as db } from '../db/data-model';
using { sap.common as common } from '@sap/cds/common';

@path : '/odata/api'
service ApiService  {

     // Sample entities for CREATE, READ, UPDATE, DELETE
     entity Products as projection on db.Products;
     entity SalesOrders as projection on db.SalesOrders;
     entity RecyclingCountries as projection on db.RecyclingCountries;
     entity RecyclingMaterials as projection on db.RecyclingMaterials;
     
     // Sample actions for bulk DELETE and consecutive INSERT
     action bulkInsertProducts( products : many Products ) returns String;
     action bulkInsertSalesOrders( salesOrders : many SalesOrders ) returns String;
     action bulkInsertRecyclingCountries( recyclingCountries : many RecyclingCountries ) returns String;
     action bulkInsertRecyclingMaterials( recyclingMaterials : many RecyclingMaterials ) returns String;

      // Sample action for bulk UPDATE
     action bulkUpdateProducts( products : many Products ) returns String;

     // Sample action for bulk UPSERT using HANA stored procedure
     // Not working during local development using sqlite!
     action bulkUpsertSalesOrders( salesOrders : many SalesOrders ) returns String;
}
