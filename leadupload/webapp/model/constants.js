/*handles all constants of this app */
sap.ui.define([], function () {
	"use strict";

	var constants = {
        HTTP_METHOD: {
            FETCH: "Fetch",
            GET: "GET",
            POST: "POST",
            DELETE: "DELETE"
        },
        FILE_EXTENSION: ".csv",
        VERSION: "-0.0.1",
        APP_ROUTER: "ZBMIC4CLeads.",
        APP_ID: "comsapbmizc4cui5leadupload",
        PROJECT_PREFIX: "/comsapbmizc4cui5leadupload/",
        DESTINATION_NAME: "CPI_BMI_AZURE_SERVICE",
        DESTINATION_NAME_RT400: "CPI_BMI_AZURE_SERVICE_RT400",
        DESTINATION_NAME_RT410: "CPI_BMI_AZURE_SERVICE_RT410",
        DESTINATION_NAME_BQ400: "CPI_BMI_AZURE_SERVICE_BQC400",
        DESTINATION_NAME_RT420: "CPI_BMI_AZURE_SERVICE_RT420",
        DESTINATION_NAME_BD310: "CPI_BMI_AZURE_SERVICE_BD310",
        DESTINATION_NAME_BT410: "CPI_BMI_AZURE_SERVICE_BT410",
        DESTINATION_NAME_BU400: "CPI_BMI_AZURE_SERVICE_BU400",
        DESTINATION_NAME_TT400: "CPI_BMI_AZURE_SERVICE_TT400",
        END_POINT_RTC410: "/RTC410",
        END_POINT_BQC400: "/BQC400",
        END_POINT_RTC400: "/RTC400",
        END_POINT_RTC420: "/RT4420",
        END_POINT_BDC310: "",
        END_POINT_BTC410: "",
        END_POINT_BUC400: "",
        END_POINT_TT400: "/TT4",
        DESTINATION_PROXY: "CPI_PROXY_BMI_API_DEV",
        CPI_SERVICES: {
            EXPORT_LEADS: "/http/Fiori/Azure/ExportLeads",
            IMPORT_FILES: "/http/Fiori/Azure/ImportFiles",
            IMPORT_LEADS: "/http/Fiori/Azure/ImportLeads",
            UPLOAD_LEADS: "/http/Fiori/C4C/UploadLeads"
        },
        COLUMN_FIELDS: {
            External_Key: "External_Key",
            Name: "Name",
            Qualification_Level: "Qualification_Level",
            Status: "Status",
            Source: "Source",
            Category: "Category",
            Owner_Party_ID: "Owner_Party_ID",
            Company: "Company",
            Address_1: "Address_1",
            Address_2: "Address_2",
            Customer_Information_City: "Customer_Information_City",
            Account_Information_Postal_Code: "Account_Information_Postal_Code",
            Account_Information_Country: "Account_Information_Country",
            Contact_Information_Title: "Contact_Information_Title",
            Contact_First_Name: "Contact_First_Name",
            Contact_Middle_Name: "Contact_Middle_Name",
            Contact_Last_Name: "Contact_Last_Name",
            Contact_Information_Phone: "Contact_Information_Phone",
            Contact_Information_Email: "Contact_Information_Email",
            Contact_Information_Mobile: "Contact_Information_Mobile",
            Individual_Customer_Information_Country: "Individual_Customer_Information_Country",
            LM_BR_Reference_Number: "LM_BR_Reference_Number",
            Gross_Roof_Area: "Gross_Roof_Area",
            Gross_Roof_AreaUnitCode: "Gross_Roof_AreaUnitCode",
            Brand: "Brand",
            Segment_Specialization_2: "Segment_Specialization_2",
            Notes: "Notes",
            Start_of_Construction: "Start_of_Construction",
            End_of_Construction: "End_of_Construction",
            Building_Cost: "Building_Cost",
            Building_Cost_Currency: "Building_Cost_Currency",
            Reference_1: "Reference_1",
            Probability: "Probability",
            Specialisation_FR_PR: "Specialisation_FR_PR"          
        },
        FILTER_BY: {
            TotalLeads: "TotalLeads",
            TotalSuccessLeads: "TotalSuccessLeads",
            TotalErrorLeads: "TotalErrorLeads",
            Mandatory: "Mandatory",
            MissingQualLevel: "MissingQualLevel",
            InvalidQualLevel: "InvalidQualLevel",
        },
        PREFIXES: {
            Err_ND_: "Err_ND_",
            Err_INV_: "Err_INV_",
            Err_FRMT_: "Err_FRMT_",
            Fld_VS_: "Fld_VS_",
            Fld_VST_: "Fld_VST_",
        },
        FORMAT_VALIDATION_FIELDS: {
            Contact_Information_Phone: "Contact_Information_Phone",
            Contact_Information_Email: "Contact_Information_Email",
            Contact_Information_Mobile: "Contact_Information_Mobile",
            Building_Cost: "Building_Cost",
            Gross_Roof_Area: "Gross_Roof_Area"
        },
        MANDATORY_FIELDS: {
            External_Key: "External_Key",
            Name: "Name",
            Status: "Status",
            Source: "Source",
            Owner_Party_ID: "Owner_Party_ID",
            Company: "Company"
        },
        PARTIAL_MANDATORY_FIELDS: {
            Gross_Roof_AreaUnitCode: "Gross_Roof_AreaUnitCode",
            Building_Cost_Currency: "Building_Cost_Currency"
        },
        COLLECTION_FIELDS: {
            Status: "Status",
            Source: "Source"
        },
        DROPDOWN_FIELDS: {
            Qualification_Level: "Qualification_Level",
            Status: "Status",
            Source: "Source",
            Category: "Category",
            Account_Information_Country: "Account_Information_Country",
            Contact_Information_Title: "Contact_Information_Title",
            Individual_Customer_Information_Country: "Individual_Customer_Information_Country",
            Gross_Roof_AreaUnitCode: "Gross_Roof_AreaUnitCode",
            Segment_SpecialisationTarget_Group: "Segment_SpecialisationTarget_Group",
            Segment_Specialization_2: "Segment_Specialization_2",
            Specialisation_FR_PR: "Specialisation_FR_PR",
            Building_Cost_Currency: "Building_Cost_Currency",
            Brand: "Brand"
        }
    };
	return constants;

});
