using { PublicService } from './extension';

annotate PublicService.Assessments:x_contact with @(
    Common : {
      ValueList: {
        CollectionPath: 'Users',
        Parameters:[
          { 
            $Type               : 'Common.ValueListParameterInOut', 
            LocalDataProperty   : x_contact_ID, 
            ValueListProperty   : 'ID' 
          },
          { 
            $Type               : 'Common.ValueListParameterDisplayOnly', 
            ValueListProperty   : 'ID' 
          },
          {
            $Type               : 'Common.ValueListParameterDisplayOnly',
            ValueListProperty   : 'firstName'
          },
          {
            $Type               : 'Common.ValueListParameterDisplayOnly',
            ValueListProperty   : 'lastName'
          }
        ]
      }
    }
);



annotate PublicService.Assessments:x_status with @(
    Common : {
      ValueListWithFixedValues : true,
      ValueList: {
        CollectionPath: 'x_Status',
        Parameters:[
          { 
            $Type               : 'Common.ValueListParameterInOut', 
            LocalDataProperty   : x_status_code, 
            ValueListProperty   : 'code' 
          }
        ]
      }
    }
);



annotate PublicService.Assessments:x_priority with @(
    Common : {
      ValueListWithFixedValues : true,
      ValueList: {
        CollectionPath: 'x_Priority',
        Parameters:[
          { 
            $Type               : 'Common.ValueListParameterInOut', 
            LocalDataProperty   : x_priority_code, 
            ValueListProperty   : 'code' 
          }
        ]
      }
    }
);


annotate PublicService.Assessments with @(
    UI.LineItem: [
        ... up to { Value: description },
        { 
          Value : x_contact_ID,
          ![$Type] : 'UI.DataField',
          Label : 'Contact', 
          ![@UI.Importance] : #High
        },
        ...
    ],
    UI.FieldGroup #x_DetailInformation : {
        Data : [
            { Value : x_contact_ID },
            { Value : x_notes },
            { Value : x_priority_code },
            { Value : x_status_code },
            { Value : x_validFrom },
            { Value : x_validTo },
        ]
    },
);

annotate PublicService.Assessments with @(
    UI.Facets : [
        {
          $Type  : 'UI.CollectionFacet',
          ID     : 'collectionFacetSectionGeneral',
          Label  : 'Assessment Information',
          Facets : [
            {
              $Type   : 'UI.CollectionFacet',
              ID     : 'collectionFacetSectionGeneralInformation',
              Label  : '{i18n>generalInformation}',
              Facets  : [
                {
                    $Type  : 'UI.ReferenceFacet',
                    ID     : 'referenceFacetGeneralInformation',
                    Target : '@UI.FieldGroup#GeneralInformation'
                },
              ],
            },
            {
              $Type   : 'UI.CollectionFacet',
              ID     : 'collectionFacetSectionDetailedInformation',
              Label  : 'Detailed Information',
              Facets  : [
                {
                    $Type  : 'UI.ReferenceFacet',
                    ID     : 'referenceFacetDetailedInformation',
                    Target : '@UI.FieldGroup#x_DetailInformation'
                },
              ],
            },
          ],
        },{
            $Type   : 'UI.CollectionFacet',
            ID     : 'collectionFacetSectionCircularityMetrics',
            Label  : '{i18n>circularityMetric.typeNamePlural}',
            Facets  : [
                {
                    $Type   : 'UI.CollectionFacet',
                    Label  : '{i18n>eolProductDesign}',
                    ID     : 'collectionFacetSubSections1CircularityMetrics',
                    Facets  : [
                    {
                        $Type  : 'UI.ReferenceFacet',
                        Target : '@UI.FieldGroup#CircularityMetrics',
                        Label  : '{i18n>eolProductDesign}',
                        ID     : 'collectionFacetSubSections1Facet1'
                    }]
                },{
                    $Type   : 'UI.CollectionFacet',
                    Label  : '{i18n>circularityMetric.typeNamePlural}',
                    ID     : 'collectionFacetSubSections2CircularityMetrics',
                    Facets  : [
                    {
                        $Type  : 'UI.ReferenceFacet',
                        Target : 'circularityMetrics/@UI.LineItem',
                        ID     : 'collectionFacetSubSections2Facet1'
                    },
                    ]
                },{
                    $Type   : 'UI.CollectionFacet',
                    Label  : '{i18n>chart}',
                    ID     : 'collectionFacetSubSections3CircularityMetrics',
                    Facets  : [
                    {
                
                        $Type : 'UI.ReferenceFacet',
                        ID     : 'collectionFacetSubSection3CircularityMetricsChart',
                        Target : 'circularityMetrics/@UI.PresentationVariant#Chart',
                        ![@UI.PartOfPreview] : false
                    }],
                    ![@UI.Hidden] : { 
                        $edmJson : {$If : [ { $Eq : [ { $Path : 'IsActiveEntity'}, true ]}, false, true ]}
                    }
                }
            ],
        },
        {
            $Type   : 'UI.CollectionFacet',
            ID     : 'collectionFacetSectionSalesSplits',
            Label  : '{i18n>salesSplit.typeNamePlural}',
            Facets  : [{
                $Type   : 'UI.CollectionFacet',
                Label  : '{i18n>salesSplit.typeNamePlural}',
                ID     : 'collectionFacetSubSections1SalesSplits',
                Facets  : [{
                    $Type  : 'UI.ReferenceFacet',
                    Target : 'salesSplits/@UI.LineItem',
                }],
            },{
                $Type   : 'UI.CollectionFacet',
                Label  : '{i18n>chart}',
                ID     : 'collectionFacetSubSections2SalesSplits',
                Facets  : [{
                    $Type : 'UI.ReferenceFacet',
                    Target : 'salesSplits/@UI.PresentationVariant'
                }],
                ![@UI.Hidden] : { 
                    $edmJson : {$If : [ { $Eq : [ { $Path : 'IsActiveEntity'}, true ]}, false, true ]}
                }
            }]
        },{
            $Type   : 'UI.CollectionFacet',
            ID     : 'collectionFacetSectionMaterialSplits',
            Label  : '{i18n>materialSplit.typeNamePlural}',
            Facets  : [{
                $Type   : 'UI.CollectionFacet',
                ID     : 'collectionFacetSubSection1MaterialSplits',
                Label  : '{i18n>materialSplit.typeNamePlural}',
                Facets  : [{
                    $Type  : 'UI.ReferenceFacet',
                    ID     : 'collectionFacetSubSectionMaterialSplitsLineItems',
                    Target : 'materialSplits/@UI.LineItem'
                }]
            }]
        }
    ]
);

