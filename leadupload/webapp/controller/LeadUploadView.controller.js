sap.ui.define([
    //"sap/ui/core/mvc/Controller"
    "com/sap/bmi/zc4cui5leadupload/controller/BaseController",
    "com/sap/bmi/zc4cui5leadupload/model/constants",
    "sap/m/MessageBox",
    "com/sap/bmi/zc4cui5leadupload/model/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, constants, MessageBox, formatter) {
        "use strict";

        return BaseController.extend("com.sap.bmi.zc4cui5leadupload.controller.LeadUploadView", {
            formatter: formatter,
            ArrColumns: [],
            DataCategory: {
                Tot_Leads: [],
                Tot_Sucs_Leads: [],
                Tot_Err_Leads: [],
                Miss_Mand_Field: [],
                Miss_Qual_Level: [],
                Inv_Qual_Level: [],
                Miss_Status: [],
                Inv_Status: [],
                Inv_Category: [],
                Miss_Ownr_PartyID: [],
            },
            ErrorFields: [],
            ErrorList: [],
            Notes: {
                OriginalRowData: {},
                ModifiedRowData: {},
            },

            /* ----- Lifecycle Hooks ----- */
            onInit: function () {
                /* !!! Setting the below methods setCurrentView() & setRouteMatched() are mandatory in each and every view !!! */
                this.setCurrentView(this.getView());
                this.initModels();
                this.setRouteMatched("TargetLeadUploadView", this.onRouteMatched, this);
            },

            onBeforeRendering: function () {

            },

            onAfterRendering: function () {

            },

            onExit: function () {

            },

            /* ----- Router Matched Methods ----- */
            onRouteMatched: function () {
                this.initializeModelValues();
                this.gModelRef.refresh();
            },

            /* ----- OData Service Call Methods ----- */
            initModels: function () {
                this.gModelRef = this.getModel("gModelRef");
                this.gModelRef.setProperty("/editable",true);
                this.gModelRef.setProperty("/enabled",true);
                this.gModelRef.refresh();
            },

            initializeModelValues: function () {
                this.gModelRef.getData().LeadList = {
                    rows: [],
                    columns: [],
                    linkVisible: false,
                    leadCount: {
                        totalLeads: 0,
                        totalSuccessLeads: 0,
                        totalErrorLeads: 0,
                        missingMandatoryFields: 0,
                        Err_ND_Qualification_Level: 0,
                        Err_INV_Qualification_Level: 0,
                    },
                    ProgressIndicator: {
                        percentValue: 0,
                        displayValue: "",
                    },
                    RunID: "",
                    UserID: "",
                    Timestamp: "",
                    FileName: "",
                    Template: [],
                    Notes: "",
                    Enabled: {
                        UploadToSalesCloud: false,
                    },
                    Files: {
                        rows: [],
                        count: 0,
                        value: ""
                    }
                };
                this.gModelRef.getData().DataTable = {
                    Qualification_Level: [
                        { code: "01", name: this.getLanguageText("Cold") },
                        { code: "02", name: this.getLanguageText("Warm") },
                        { code: "03", name: this.getLanguageText("Hot") },
                    ],
                    Status: [
                        { code: "01", name: this.getLanguageText("Open") },
                        { code: "02", name: this.getLanguageText("Qualified") },
                        { code: "Z0", name: this.getLanguageText("Contacted") },
                    ],
                    Source: [
                        { code: "001", name: this.getLanguageText("Tradefair") },
                        { code: "002", name: this.getLanguageText("Externalpartner") },
                        { code: "003", name: this.getLanguageText("Campaign") },
                        { code: "004", name: this.getLanguageText("Telephoneinquiry") },
                        { code: "005", name: this.getLanguageText("Roadshow") },
                        { code: "007", name: this.getLanguageText("DealRegistration") },
                        { code: "Z01", name: this.getLanguageText("ExternalDTAD") },
                        { code: "Z02", name: this.getLanguageText("Externalibau") },
                        { code: "Z03", name: this.getLanguageText("ExternalWendt") },
                        { code: "Z04", name: this.getLanguageText("ExternalBuildingRadar") },
                        { code: "Z05", name: this.getLanguageText("ExternalHeinze") },
                        { code: "Z06", name: this.getLanguageText("ExternalDAA") },
                        { code: "Z07", name: this.getLanguageText("ExternalAroundHome") },
                        { code: "Z08", name: this.getLanguageText("ExternalWLW") },
                        { code: "Z09", name: this.getLanguageText("External11880") },
                        { code: "Z10", name: this.getLanguageText("ExternalOther") },
                        { code: "Z11", name: this.getLanguageText("SalesEMail") },
                        { code: "Z12", name: this.getLanguageText("SalesPhone") },
                        { code: "Z13", name: this.getLanguageText("SalesTextmessage") },
                        { code: "Z14", name: this.getLanguageText("SalesDirect") },
                        { code: "Z15", name: this.getLanguageText("SalesOther") },
                        { code: "Z16", name: this.getLanguageText("OnlineContact") },
                        { code: "Z17", name: this.getLanguageText("OnlineWeb") },
                        { code: "Z18", name: this.getLanguageText("OnlineOther") },
                        { code: "Z19", name: this.getLanguageText("LMBuildingRadar") },
                        { code: "Z20", name: this.getLanguageText("LMDTAD") },
                        { code: "Z21", name: this.getLanguageText("LMWendt") },
                        { code: "Z22", name: this.getLanguageText("LMDirektmeldungen") },
                        { code: "Z23", name: this.getLanguageText("LMAndereSonstige") },
                        { code: "Z24", name: this.getLanguageText("LMAnnouncementAWT") },
                        { code: "Z25", name: this.getLanguageText("LMNeubaukompass") },
                        { code: "Z26", name: this.getLanguageText("ExternalExhibition") },
                        { code: "Z27", name: this.getLanguageText("ProjectAdvisors") },
                        { code: "Z28", name: this.getLanguageText("SalesSalesTeam") },
                        { code: "Z29", name: this.getLanguageText("DistrictManager") },
                        { code: "Z30", name: this.getLanguageText("ExternalTender") },
                        { code: "Z31", name: this.getLanguageText("ExternalByggfakta") },
                        { code: "Z32", name: this.getLanguageText("TeleAktiv") },
                        { code: "Z33", name: this.getLanguageText("SalesCampaign") },
                        { code: "Z34", name: this.getLanguageText("SalesRetailer") },
                        { code: "Z35", name: this.getLanguageText("SalesProfessional") },
                        { code: "Z36", name: this.getLanguageText("SalesHouseFactory") },
                        { code: "Z37", name: this.getLanguageText("SalesSocialMedia") },
                        { code: "Z38", name: this.getLanguageText("SalesHomeOwner") }, 
                        { code: "Z39", name: this.getLanguageText("SalesRep") },
                        { code: "Z40", name: this.getLanguageText("ExternalDocumedia") },
                        { code: "Z41", name: this.getLanguageText("Documedia") },
                        { code: "Z42", name: this.getLanguageText("LMVIPNetzwerk") },
                        { code: "Z43", name: this.getLanguageText("LMGlobalData") },
                        { code: "Z44", name: this.getLanguageText("LMibau") },
                        { code: "Z45", name: this.getLanguageText("LMWebseite") },
                        { code: "Z46", name: this.getLanguageText("LMAktion") },
                        { code: "Z47", name: this.getLanguageText("Marketing") }
                    ],
                    Category: [
                        { code: "Z010", name: this.getLanguageText("PitchedRoof") },
                        { code: "Z020", name: this.getLanguageText("FlatRoof") },
                        { code: "Z370", name: this.getLanguageText("NonRoof") }
                    ],
                    Country: [
                        { code: "DE", name: this.getLanguageText("Germany") },
                        { code: "GB", name: this.getLanguageText("UnitedKingdom") },
                        { code: "PL", name: this.getLanguageText("Poland") },
                        { code: "NO", name: this.getLanguageText("Norway") },
                        { code: "SE", name: this.getLanguageText("Sweden") },
                        { code: "DK", name: this.getLanguageText("Denmark") },
                        { code: "FI", name: this.getLanguageText("Finland") },
                        { code: "AT", name: this.getLanguageText("Austria") },
                        { code: "CH", name: this.getLanguageText("Switzerland") },
                        { code: "FR", name: this.getLanguageText("France") },
                        { code: "IE", name: this.getLanguageText("Ireland") },
                        { code: "BE", name: this.getLanguageText("Belgium") },
                        { code: "NL", name: this.getLanguageText("Netherlands") }
                    ],
                    Contact_Information_Title: [
                        { code: "0001", name: this.getLanguageText("Ms") },
                        { code: "0002", name: this.getLanguageText("Mr") },
                        { code: "Z003", name: this.getLanguageText("Mrs") },
                        { code: "Z004", name: this.getLanguageText("Madame") },
                        { code: "Z005", name: this.getLanguageText("Sir") },
                        { code: "Z006", name: this.getLanguageText("FAO") },
                        { code: "Z007", name: this.getLanguageText("Rev") },
                        { code: "Z008", name: this.getLanguageText("HRH") },
                        { code: "Z009", name: this.getLanguageText("Company") },
                        { code: "Z010", name: this.getLanguageText("MrandMrs") },
                        { code: "Z011", name: this.getLanguageText("MevrMs") },
                        { code: "Z012", name: this.getLanguageText("FrauMs") },
                        { code: "Z013", name: this.getLanguageText("HerrMR") },
                        { code: "Z014", name: this.getLanguageText("DhrMr") },
                        { code: "Z015", name: this.getLanguageText("MmeMs") },
                    ],
                    Brand: [
                        { code: "BRS", name: this.getLanguageText("BRS") },
                        { code: "ICO", name: this.getLanguageText("ICO") },
                        { code: "KLO", name: this.getLanguageText("KLO") },
                        { code: "MON", name: this.getLanguageText("MON") },
                        { code: "NEC", name: this.getLanguageText("NEC") },
                        { code: "ORM", name: this.getLanguageText("ORM") },
                        { code: "RED", name: this.getLanguageText("RED") },
                        { code: "SHI", name: this.getLanguageText("SHI") },
                        { code: "SIP", name: this.getLanguageText("SIP") },
                        { code: "VED", name: this.getLanguageText("VED") },
                        { code: "WOL", name: this.getLanguageText("WOL") },
                        { code: "ZAN", name: this.getLanguageText("ZAN") },
                        { code: "BRA", name: this.getLanguageText("BRA") },
                        { code: "GEN", name: this.getLanguageText("GEN") }
                    ],
                    Building_Cost_Currency: [
                        { code: "EUR", name: this.getLanguageText("Euro") },
                        { code: "GBP", name: this.getLanguageText("PoundSterling") },
                        { code: "NOK", name: this.getLanguageText("NorwegianKrone") },
                        { code: "SEK", name: this.getLanguageText("SwedishKrona") },
                        { code: "DKK", name: this.getLanguageText("DanishKrone") },
                    ],
                    Gross_Roof_AreaUnitCode: [
                        { code: "5B", name: this.getLanguageText("5B") },
                        { code: "ACT", name: this.getLanguageText("ACT") },
                        { code: "ANN", name: this.getLanguageText("ANN") },
                        { code: "C81", name: this.getLanguageText("C81") },
                        { code: "CMQ", name: this.getLanguageText("CMQ") },
                        { code: "CMT", name: this.getLanguageText("CMT") },
                        { code: "DAY", name: this.getLanguageText("DAY") },
                        { code: "DD", name: this.getLanguageText("DD") },
                        { code: "DMQ", name: this.getLanguageText("DMQ") },
                        { code: "DZN", name: this.getLanguageText("DZN") },
                        { code: "E49", name: this.getLanguageText("E49") },
                        { code: "EA", name: this.getLanguageText("EA") },
                        { code: "FOT", name: this.getLanguageText("FOT") },
                        { code: "FTQ", name: this.getLanguageText("FTQ") },
                        { code: "GLI", name: this.getLanguageText("GLI") },
                        { code: "GLL", name: this.getLanguageText("GLL") },
                        { code: "GRM", name: this.getLanguageText("GRM") },
                        { code: "HLT", name: this.getLanguageText("HLT") },
                        { code: "HUR", name: this.getLanguageText("HUR") },
                        { code: "INH", name: this.getLanguageText("INH") },
                        { code: "INQ", name: this.getLanguageText("INQ") },
                        { code: "KGM", name: this.getLanguageText("KGM") },
                        { code: "KMT", name: this.getLanguageText("KMT") },
                        { code: "LBR", name: this.getLanguageText("LBR") },
                        { code: "LR", name: this.getLanguageText("LR") },
                        { code: "LTN", name: this.getLanguageText("LTN") },
                        { code: "LTR", name: this.getLanguageText("LTR") },
                        { code: "MIN", name: this.getLanguageText("MIN") },
                        { code: "MLT", name: this.getLanguageText("MLT") },
                        { code: "MMT", name: this.getLanguageText("MMT") },
                        { code: "MON", name: this.getLanguageText("MON") },
                        { code: "MTK", name: this.getLanguageText("MTK") },
                        { code: "MTQ", name: this.getLanguageText("MTQ") },
                        { code: "MTR", name: this.getLanguageText("MTR") },
                        { code: "ONZ", name: this.getLanguageText("ONZ") },
                        { code: "OZA", name: this.getLanguageText("OZA") },
                        { code: "P1", name: this.getLanguageText("P1") },
                        { code: "PFL", name: this.getLanguageText("PFL") },
                        { code: "SEC", name: this.getLanguageText("SEC") },
                        { code: "SMI", name: this.getLanguageText("SMI") },
                        { code: "STN", name: this.getLanguageText("STN") },
                        { code: "TNE", name: this.getLanguageText("TNE") },
                        { code: "WEE", name: this.getLanguageText("WEE") },
                        { code: "XBG", name: this.getLanguageText("XBG") },
                        { code: "XBX", name: this.getLanguageText("XBX") },
                        { code: "XCI", name: this.getLanguageText("XCI") },
                        { code: "XCQ", name: this.getLanguageText("XCQ") },
                        { code: "XCR", name: this.getLanguageText("XCR") },
                        { code: "XCS", name: this.getLanguageText("XCS") },
                        { code: "XCT", name: this.getLanguageText("XCT") },
                        { code: "XDR", name: this.getLanguageText("XDR") },
                        { code: "XPK", name: this.getLanguageText("XPK") },
                        { code: "XPX", name: this.getLanguageText("XPX") },
                        { code: "XRO", name: this.getLanguageText("XRO") },
                        { code: "XSX", name: this.getLanguageText("XSX") },
                        { code: "YRD", name: this.getLanguageText("YRD") },
                        { code: "Z10", name: this.getLanguageText("Z10") },
                        { code: "Z20", name: this.getLanguageText("Z20") },
                        { code: "Z30", name: this.getLanguageText("Z30") },
                        { code: "Z40", name: this.getLanguageText("Z40") },
                        { code: "Z50", name: this.getLanguageText("Z50") },
                    ],
                    Segment_Specialization_2: [
                        { code: "Z49", name: this.getLanguageText("Z49") },
                        { code: "Z48", name: this.getLanguageText("Z48") },
                        { code: "Z37", name: this.getLanguageText("Z37") },
                        { code: "Z40", name: this.getLanguageText("ZZ40") },
                        { code: "Z35", name: this.getLanguageText("Z35") },
                        { code: "Z36", name: this.getLanguageText("Z36") },
                        { code: "Z34", name: this.getLanguageText("Z34") },
                        { code: "Z32", name: this.getLanguageText("Z32") },
                        { code: "Z33", name: this.getLanguageText("Z33") },
                        { code: "Z38", name: this.getLanguageText("Z38") },
                        { code: "Z39", name: this.getLanguageText("Z39") },
                        { code: "Z76", name: this.getLanguageText("Z76") },
                        { code: "Z41", name: this.getLanguageText("Z41") },
                        { code: "Z25", name: this.getLanguageText("Z25") },
                        { code: "Z23", name: this.getLanguageText("Z23") },
                        { code: "Z24", name: this.getLanguageText("Z24") },
                        { code: "Z29", name: this.getLanguageText("Z29") },
                        { code: "Z28", name: this.getLanguageText("Z28") },
                        { code: "Z26", name: this.getLanguageText("Z26") },
                        { code: "Z30", name: this.getLanguageText("ZZ30") },
                        { code: "Z77", name: this.getLanguageText("Z77") },
                        { code: "Z50", name: this.getLanguageText("ZZ50") },
                        { code: "Z78", name: this.getLanguageText("Z78") },
                        { code: "Z44", name: this.getLanguageText("Z44") },
                        { code: "Z47", name: this.getLanguageText("Z47") },
                        { code: "Z42", name: this.getLanguageText("Z42") },
                        { code: "Z43", name: this.getLanguageText("Z43") },
                        { code: "Z45", name: this.getLanguageText("Z45") },
                        { code: "Z46", name: this.getLanguageText("Z46") },
                        { code: "Z27", name: this.getLanguageText("Z27") },
                        { code: "Z31", name: this.getLanguageText("Z31") },
                        { code: "Z79", name: this.getLanguageText("Z79") },
                        { code: "Z91", name: this.getLanguageText("Z91") },
                        { code: "Z92", name: this.getLanguageText("Z92") },
                        { code: "Z51", name: this.getLanguageText("Z51") },
                        { code: "Z52", name: this.getLanguageText("Z52") },
                        { code: "Z53", name: this.getLanguageText("Z53") },
                        { code: "Z54", name: this.getLanguageText("Z54") },
                        { code: "Z55", name: this.getLanguageText("Z55") },
                        { code: "Z56", name: this.getLanguageText("Z56") },
                        { code: "Z57", name: this.getLanguageText("Z57") },
                        { code: "Z58", name: this.getLanguageText("Z58") },
                        { code: "Z63", name: this.getLanguageText("Z63") },
                        { code: "Z64", name: this.getLanguageText("Z64") },
                        { code: "Z65", name: this.getLanguageText("Z65") },
                        { code: "Z80", name: this.getLanguageText("Z80") },
                        { code: "Z81", name: this.getLanguageText("Z81") },
                        { code: "Z82", name: this.getLanguageText("Z82") },
                        { code: "Z83", name: this.getLanguageText("Z83") },
                        { code: "Z84", name: this.getLanguageText("Z84") },
                        { code: "Z85", name: this.getLanguageText("Z85") },
                        { code: "Z86", name: this.getLanguageText("Z86") },
                        { code: "Z87", name: this.getLanguageText("Z87") },
                        { code: "Z88", name: this.getLanguageText("Z88") },
                        { code: "Z89", name: this.getLanguageText("Z89") },
                        { code: "Z90", name: this.getLanguageText("Z90") }
                    ],
                    Specialisation_FR_PR: [
                        { code: "Z10", name: this.getLanguageText("Z10_FR_PR") },
                        { code: "Z100", name: this.getLanguageText("Z100_FR_PR") },
                        { code: "Z110", name: this.getLanguageText("Z110_FR_PR") },
                        { code: "Z20", name: this.getLanguageText("Z20_FR_PR") },
                        { code: "Z30", name: this.getLanguageText("Z30_FR_PR") },
                        { code: "Z40", name: this.getLanguageText("Z40_FR_PR") },
                        { code: "Z50", name: this.getLanguageText("Z50_FR_PR") },
                        { code: "Z60", name: this.getLanguageText("Z60_FR_PR") },
                        { code: "Z70", name: this.getLanguageText("Z70_FR_PR") },
                        { code: "Z80", name: this.getLanguageText("Z80_FR_PR") },
                        { code: "Z90", name: this.getLanguageText("Z90_FR_PR") },
                        { code: "Z91", name: this.getLanguageText("Z91_FR_PR") }
                    ]
                };
                this.gModelRef.refresh();
            },

            /* ----- Formatter Function Methods ----- */
            fnFormat_Qualification_Level: function (sArg) {
                if (this.hasValue(sArg))
                    return (sArg.toString().length > 1 ? `${sArg}` : `0${sArg}`);
                else
                    return "";
            },

            fnFormat_Status: function (sArg) {
                if (this.hasValue(sArg))
                    return (sArg.toString().length > 1 ? `${sArg}` : `0${sArg}`);
                else
                    return "";
            },

            fnFormat_Source: function (sArg) {
                if (this.hasValue(sArg))
                    if (sArg.toString().length == 1)
                        return `00${sArg}`;
                    else if (sArg.toString().length == 2)
                        return `0${sArg}`;
                    else
                        return `${sArg}`;
                else
                    return "";
            },

            fnFormat_Contact_Information_Title: function (sArg) {
                if (this.hasValue(sArg))
                    if (sArg.toString().length == 1)
                        return `000${sArg}`;
                    else if (sArg.toString().length == 2)
                        return `00${sArg}`;
                    else if (sArg.toString().length == 3)
                        return `0${sArg}`;
                    else
                        return `${sArg}`;
                else
                    return "";
            },

            /* ----- View Events & Methods ----- */
            resetModelValues: function () {
                this.ErrorFields = [];
                this.DataCategory.Tot_Sucs_Leads = [];
                this.gModelRef.getData().LeadList.leadCount.totalSuccessLeads = 0;
                this.DataCategory.Tot_Err_Leads = [];
                this.gModelRef.getData().LeadList.leadCount.totalErrorLeads = 0;
                this.DataCategory.Miss_Mand_Field = [];
                this.gModelRef.getData().LeadList.leadCount.missingMandatoryFields = 0;
                this.DataCategory.Inv_Qual_Level = [];
                this.gModelRef.getData().LeadList.leadCount.Err_ND_Qualification_Level = 0;
                this.gModelRef.getData().LeadList.leadCount.Err_INV_Qualification_Level = 0;
                this.gModelRef.getData().LeadList.linkVisible = false;
                this.gModelRef.refresh();
            },

            resetActualKeysForFields: function (aRows, that) {
                aRows.map(function (oItem) {
                    oItem.Status = that.fnFormat_Status(oItem.Status);
                    oItem.Qualification_Level = that.fnFormat_Qualification_Level(oItem.Qualification_Level);
                    oItem.Contact_Information_Title = that.fnFormat_Contact_Information_Title(oItem.Contact_Information_Title);
                });
                that.gModelRef.refresh();
            },

            resetDateTime:function(acRows){
                var finalRows = acRows;
                for (let i = 0; i < finalRows.length; i++) {
                    const element = finalRows[i].Start_of_Construction;
                    const element2 = finalRows[i].End_of_Construction;
                    if( element.length === 10 || element.length === 9 ){
                        finalRows[i].Start_of_Construction = element.concat("T00:00:00");
                    };
                    if(element2.length === 10 || element2.length === 9){
                        finalRows[i].End_of_Construction = element2.concat("T00:00:00");
                       }
                }
                return finalRows;
            },

            setChangedDropDownValues: function(oField, oRowData, oSelKey){
                if (oField === "Contact_Information_Title") {
                    oRowData[oField] = this.fnFormat_Contact_Information_Title(oSelKey);
                }
                else if (oField === "Qualification_Level") {
                    oRowData[oField] = this.fnFormat_Qualification_Level(oSelKey);
                }
                else if (oField === "Status") {
                    oRowData[oField] = this.fnFormat_Status(oSelKey);
                } else {
                    oRowData[oField] = oSelKey;
                }
                this.gModelRef.refresh();
            },

            handleOnChangeFU: function (oEvent) {
                this.gModelRef.setProperty("/editable",true);
                this.gModelRef.setProperty("/enabled",true);
                this.DataCategory.Tot_Leads = [];
                this.gModelRef.getData().LeadList.leadCount.totalLeads = 0;
                this.gModelRef.getData().LeadList.rows = [];
                this.gModelRef.getData().LeadList.columns = [];
                this.gModelRef.refresh();
                if (oEvent.getParameters("files") && oEvent.getParameters("files").files[0]) {
                    this.parseFile(oEvent.getParameter("files")[0]);
                }
                
            },

            parseFile: function (oFile) {
                var oFileReader = new FileReader();
                var aFileSplit = oFile.name.split('.');
                this.gModelRef.getData().LeadList.RunID = this.getRunID(aFileSplit[0]);
                this.gModelRef.refresh();
                sap.ui.core.BusyIndicator.show(0);
                if (aFileSplit[1] == "csv" || aFileSplit[1] == "CSV") {
                    oFileReader.onload = function (oEvt) {
                        var sCsvData = oEvt.target.result;
                        var aCsvData = sCsvData.match(/[\w .]+(?=,?)/g);
                        var aTextLines = sCsvData.split(/\r\n|\n/);
                        if (aTextLines.length > 0) {
                            this.ArrColumns = [];
                            for (var i = 0; i < aTextLines.length; i++) {
                                var aXlData = aTextLines[i].split(',');
                                this.populateTableData(i, aXlData);
                            }
                            this.validateLeads(false);
                        } else { }
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this);
                    oFileReader.readAsBinaryString(oFile);
                }
                if (aFileSplit[1] == "xlsx" || aFileSplit[1] == "XLSX") {
                    oFileReader.onload = function (oEvt) {
                        console.log(oEvt);
                    }.bind(this);
                    oFileReader.readAsText(oFile);
                }
                if (aFileSplit[1] == "xls" || aFileSplit[1] == "XLS") { }
            },

            populateTableData: function (iIndex, aXlData) {
                //var dataObj = { Row_State: "Success", ValueState: sap.ui.core.ValueState.None, ValueStateText: "", ErrorIdentifier: "" };
                var dataObj = { Row_State: "Success", RunID: this.gModelRef.getData().LeadList.RunID, Errors: "" };
                for (var i = 0; i < aXlData.length; i++) {
                    if (iIndex == 0) {
                        var colSetting = { field: aXlData[i], required: false, width: "100%", collection: false };
                        if (colSetting.field == "External_Key" || colSetting.field == "Name" ||
                            colSetting.field == "Status" ||
                            colSetting.field == "Source" || colSetting.field == "Owner_Party_ID" ||
                            colSetting.field == "Gross_Roof_AreaUnitCode" || 
                            colSetting.field == "Building_Cost_Currency" )
                            colSetting.required = true;
                        if (colSetting.field == "Qualification_Level" || colSetting.field == "Status" ||
                            colSetting.field == "Source" || colSetting.field == "Category" || colSetting.field == "Account_Information_Country" ||
                            colSetting.field == "Gross_Roof_AreaUnitCode" ||
                            colSetting.field == "Segment_Specialization_2" || colSetting.field == "Contact_Information_Title" || colSetting.field == "Specialisation_FR_PR" || 
                            colSetting.field == "Building_Cost_Currency")
                            colSetting.collection = true;
                        if (colSetting.field == "External_Key" || colSetting.field == "Account_Information_Postal_Code" || colSetting.field == "Contact_Information_Phone" ||
                            colSetting.field == "LM_BR_Reference_Number" ||
                            colSetting.field == "Gross_Roof_Area" || colSetting.field == "Gross_Roof_AreaUnitCode" ||
                            colSetting.field == "Segment_Specialization_2" || colSetting.field == "Specialisation_FR_PR" ||
                            colSetting.field == "Start_of_Construction" || colSetting.field == "End_of_Construction" || 
                            colSetting.field == "Building_Cost" || colSetting.field == "Building_Cost_Currency")
                            colSetting.width = "7rem";
                        else if (colSetting.field == "Contact_Information_Email")
                            colSetting.width = "9rem";
                        else if (colSetting.field == "Name")
                            colSetting.width = "20rem";
                        else if (colSetting.field == "Qualification_Level" || colSetting.field == "Status" || colSetting.field == "Source" ||
                            colSetting.field == "Category" || colSetting.field == "Owner_Party_ID")
                            colSetting.width = "10rem";
                        else if (colSetting.field == "Company" || colSetting.field == "Customer_Information_City" ||
                            colSetting.field == "Account_Information_Country" || colSetting.field == "Contact_Information_Title" || colSetting.field == "Contact_First_Name" ||
                            colSetting.field == "Contact_Middle_Name" || colSetting.field == "Contact_Last_Name" || 
                            colSetting.field == "Address_1" || colSetting.field == "Address_2")
                            colSetting.width = "15rem";
                        else if (colSetting.field == "Notes")
                            colSetting.width = "25rem";
                        this.ArrColumns.push(colSetting);
                        this.gModelRef.getData().LeadList.columns.push({
                            field: aXlData[i]
                        });
                    }
                    if (iIndex > 0) {
                        dataObj[this.ArrColumns[i].field] = aXlData[i];
                    }
                    this.gModelRef.refresh();
                }
                if (iIndex > 0) {
                    if (!this.hasValue(dataObj.External_Key) && !this.hasValue(dataObj.Name) && !this.hasValue(dataObj.Qualification_Level) &&
                        !this.hasValue(dataObj.Status) && !this.hasValue(dataObj.Source) && !this.hasValue(dataObj.Category) && !this.hasValue(dataObj.Owner_Party_ID) &&
                        !this.hasValue(dataObj.Company) && !this.hasValue(dataObj.Customer_Information_City) &&
                        !this.hasValue(dataObj.Address_1) && !this.hasValue(dataObj.Address_2) && !this.hasValue(dataObj.Contact_Information_Mobile) &&
                        !this.hasValue(dataObj.Account_Information_Postal_Code) && !this.hasValue(dataObj.Account_Information_Country) && !this.hasValue(dataObj.Contact_Information_Title) &&
                        !this.hasValue(dataObj.Contact_First_Name) && !this.hasValue(dataObj.Contact_Middle_Name) && !this.hasValue(dataObj.Contact_Last_Name) &&
                        !this.hasValue(dataObj.Contact_Information_Phone) && !this.hasValue(dataObj.Contact_Information_Email) && 
                        !this.hasValue(dataObj.LM_BR_Reference_Number) &&
                        !this.hasValue(dataObj.Gross_Roof_Area) && !this.hasValue(dataObj.Gross_Roof_AreaUnitCode) &&
                        !this.hasValue(dataObj.Segment_Specialization_2) && !this.hasValue(dataObj.Notes) && !this.hasValue(dataObj.Start_of_Construction) && !this.hasValue(dataObj.End_of_Construction) &&
                        !this.hasValue(dataObj.Building_Cost) && !this.hasValue(dataObj.Building_Cost_Currency) && !this.hasValue(dataObj.Reference_1) && !this.hasValue(dataObj.Probability) && !this.hasValue(dataObj.Specialisation_FR_PR)) {

                    } else
                        this.DataCategory.Tot_Leads.push(dataObj);
                }
                if (this.DataCategory.Tot_Leads.length > 0) {
                    this.gModelRef.getData().LeadList.rows = $.extend(true, [], this.DataCategory.Tot_Leads);
                    this.gModelRef.refresh();
                }
                var piPercent = 10;
                this.gModelRef.getData().LeadList.ProgressIndicator.percentValue = piPercent;
                this.gModelRef.getData().LeadList.ProgressIndicator.displayValue = `${piPercent}%`;
                this.gModelRef.refresh();
            },

            validateLeads: function (bValue) {                
                this.resetModelValues();
                this.resetActualKeysForFields(this.gModelRef.getData().LeadList.rows, this);
                this.DataCategory.Tot_Leads = $.extend(true, [], this.gModelRef.getData().LeadList.rows);
                if (this.DataCategory.Tot_Leads.length > 0) {
                    for (var i = 0; i < this.DataCategory.Tot_Leads.length; i++) {
                        $.each(constants.COLUMN_FIELDS, function (c, field) {
                            var bError = false;
                            this.DataCategory.Tot_Leads[i].Row_State = "Success";
                            this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}${field}`] = sap.ui.core.ValueState.None;
                            this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}${field}`] = "";
                        }.bind(this));
                        $.each(constants.MANDATORY_FIELDS, function (c, field) {
                            if (i == 0)
                                this.ErrorFields.push(`${constants.PREFIXES.Err_ND_}${field}`);
                            this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_ND_}${field}`] = (this.hasValue(this.DataCategory.Tot_Leads[i][field]) ? false : true);
                            if (this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_ND_}${field}`]) {
                                this.DataCategory.Tot_Leads[i].Row_State = "Error";
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}${field}`] = sap.ui.core.ValueState.Error;
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}${field}`] = this.getLanguageText(`${constants.PREFIXES.Err_ND_}${field}`);
                            }
                        }.bind(this));
                        $.each(constants.PARTIAL_MANDATORY_FIELDS, function (c, field) {
                            var bError = false;
                           
                            if (c.indexOf("Gross_Roof_AreaUnitCode") > -1) {
                                if (this.DataCategory.Tot_Leads[i].Gross_Roof_Area === "") {
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}Gross_Roof_AreaUnitCode`] = sap.ui.core.ValueState.None;
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}Gross_Roof_AreaUnitCode`] = "";
                                } else if (this.DataCategory.Tot_Leads[i].Gross_Roof_Area !== "" && this.DataCategory.Tot_Leads[i].Gross_Roof_AreaUnitCode === "") {
                                    bError = true;
                                    this.ErrorFields.push(`${constants.PREFIXES.Err_ND_}${field}`);
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}Gross_Roof_AreaUnitCode`] = sap.ui.core.ValueState.Error;
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}Gross_Roof_AreaUnitCode`] = this.getLanguageText(`${constants.PREFIXES.Err_ND_}Gross_Roof_AreaUnitCode`);
                                }
                            }

                            if (c.indexOf("Building_Cost_Currency") > -1) {
                                if (this.DataCategory.Tot_Leads[i].Building_Cost === "") {
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}Building_Cost_Currency`] = sap.ui.core.ValueState.None;
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}Building_Cost_Currency`] = "";
                                } else if (this.DataCategory.Tot_Leads[i].Building_Cost !== "" && this.DataCategory.Tot_Leads[i].Building_Cost_Currency === "") {
                                    bError = true;
                                    this.ErrorFields.push(`${constants.PREFIXES.Err_ND_}${field}`);
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}Building_Cost_Currency`] = sap.ui.core.ValueState.Error;
                                    this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}Building_Cost_Currency`] = this.getLanguageText(`${constants.PREFIXES.Err_ND_}Building_Cost_Currency` );
                                }
                            }

                            if (bError) {
                                this.DataCategory.Tot_Leads[i].Row_State = "Error";
                            }
                        }.bind(this));
                        $.each(constants.COLLECTION_FIELDS, function (c, field) {
                            var sValue = this.DataCategory.Tot_Leads[i][field];
                            if (i == 0)
                                this.ErrorFields.push(`${constants.PREFIXES.Err_INV_}${field}`);
                            if (field == "Qualification_Level")
                                sValue = this.fnFormat_Qualification_Level(this.DataCategory.Tot_Leads[i][field]);
                            this.gModelRef.getData().DataTable["Status"]
                            if (field == "Status")
                                sValue = this.fnFormat_Status(this.DataCategory.Tot_Leads[i][field]);
                            if (field == "Source")
                                sValue = this.fnFormat_Source(this.DataCategory.Tot_Leads[i][field]);
                            if (field == "Contact_Information_Title")
                                sValue = this.fnFormat_Contact_Information_Title(this.DataCategory.Tot_Leads[i][field]);
                            if (field == "Account_Information_Country") {
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_INV_}${field}`] = (this.gModelRef.getData().DataTable["Country"].some(function (itm) { return itm.code == sValue }) ? false : true);
                            } else {
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_INV_}${field}`] = (this.gModelRef.getData().DataTable[field].some(function (itm) { return itm.code == sValue }) ? false : true);
                            }
                            if (this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_INV_}${field}`]) {
                                this.DataCategory.Tot_Leads[i].Row_State = "Error";
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}${field}`] = sap.ui.core.ValueState.Error;
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}${field}`] = this.getLanguageText(`${constants.PREFIXES.Err_INV_}${field}`);
                            }
                        }.bind(this));
                        $.each(constants.FORMAT_VALIDATION_FIELDS, function (c, field) {
                            var sValue = this.DataCategory.Tot_Leads[i][field];
                            if (i == 0)
                                this.ErrorFields.push(`${constants.PREFIXES.Err_FRMT_}${field}`);
                            if (field == "Contact_Information_Phone") {
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_FRMT_}${field}`] = (this.hasValue(sValue) ? sValue.length == 10 && /^-?\d+\.?\d*$/.test(sValue) ? false : true : false);
                            }
                            if (field == "Contact_Information_Mobile") {
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_FRMT_}${field}`] = (this.hasValue(sValue) ? sValue.length == 10 && /^-?\d+\.?\d*$/.test(sValue) ? false : true : false);
                            }
                            if (field == "Contact_Information_Email") {
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_FRMT_}${field}`] = (this.hasValue(sValue) ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sValue) ? false : true : false);
                            }
                            if (field == "Building_Cost") {
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_FRMT_}${field}`] = (this.hasValue(sValue) ? /^\d+([.]\d{0,2})?$/.test(sValue) ? false : true : false);
                            }
                            if (field == "Gross_Roof_Area") {
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_FRMT_}${field}`] = (this.hasValue(sValue) ? /^\d+([.]\d{0,3})?$/.test(sValue) ? false : true : false);
                            }
                            if (this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Err_FRMT_}${field}`]) {
                                this.DataCategory.Tot_Leads[i].Row_State = "Error";
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VS_}${field}`] = sap.ui.core.ValueState.Error;
                                this.DataCategory.Tot_Leads[i][`${constants.PREFIXES.Fld_VST_}${field}`] = this.getLanguageText(`${constants.PREFIXES.Err_FRMT_}${field}`);
                            }
                        }.bind(this));
                    }
                    this.gModelRef.getData().LeadList.rows = $.extend(true, [], this.DataCategory.Tot_Leads);
                    this.gModelRef.refresh();
                }
                this.gModelRef.getData().LeadList.leadCount.totalLeads = this.DataCategory.Tot_Leads.length;
                this.gModelRef.getData().LeadList.leadCount.totalSuccessLeads = this.DataCategory.Tot_Leads.filter(function (itm) { return itm.Row_State == "Success" }).length;
                this.gModelRef.getData().LeadList.leadCount.totalErrorLeads = this.DataCategory.Tot_Leads.filter(function (itm) { return itm.Row_State == "Error" }).length;
                this.gModelRef.getData().LeadList.leadCount.missingMandatoryFields = this.DataCategory.Tot_Leads.filter(function (itm) {
                    var oFields = {};
                    if (itm.Gross_Roof_Area === 0 || itm.Gross_Roof_Area === undefined) {
                        oFields = (itm.Err_ND_External_Key || itm.Err_ND_Name || itm.Err_ND_Status || itm.Err_ND_Source ||
                            itm.Err_ND_Owner_Party_ID );
                    } else if (!(itm.Gross_Roof_Area === 0 || itm.Gross_Roof_Area === undefined)) {
                        oFields = (itm.Err_ND_External_Key || itm.Err_ND_Name || itm.Err_ND_Status || itm.Err_ND_Source ||
                            itm.Err_ND_Owner_Party_ID || itm.Err_ND_Gross_Roof_AreaUnitCode);
                    } else if (itm.Gross_Roof_Area === 0 || itm.Gross_Roof_Area === undefined) {
                        oFields = (itm.Err_ND_External_Key || itm.Err_ND_Name || itm.Err_ND_Status || itm.Err_ND_Source ||
                            itm.Err_ND_Owner_Party_ID);
                    } else {
                        oFields = (itm.Err_ND_External_Key || itm.Err_ND_Name || itm.Err_ND_Status || itm.Err_ND_Source ||
                            itm.Err_ND_Owner_Party_ID || itm.Err_ND_Gross_Roof_AreaUnitCode);
                    }
                    return oFields;
                }).length;
                // this.gModelRef.getData().LeadList.leadCount.Err_ND_Qualification_Level = this.DataCategory.Tot_Leads.filter(function (itm) { return (itm.Err_ND_Qualification_Level); }).length;
                // this.gModelRef.getData().LeadList.leadCount.Err_INV_Qualification_Level = this.DataCategory.Tot_Leads.filter(function (itm) { return (itm.Err_INV_Qualification_Level); }).length;
                this.gModelRef.getData().LeadList.linkVisible = true;
                this.gModelRef.refresh();
                this.renderControlLinks();
                this.getView().byId("idTableJ").getBinding("rows").filter([]);
            },

            getRunID: function (sFile) {
                return Math.floor(Math.random() * Date.now());
            },

            getUserID: function () {
                return (this.hasValue(sap.ushell.Container) ? sap.ushell.Container.getService("UserInfo").getEmail() : "");
            },

            getFileName: function (sFile) {
                var sDate = this.getDateNowAsString(Date.now());
                return `${this.gModelRef.getData().LeadList.RunID}_${sDate}_${sFile}`;
            },

            getDateNowAsString: function (utcDatum) {
                var sDay = `${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(utcDatum)}`;
                var sMonth = `${new Intl.DateTimeFormat('en', { month: 'short' }).format(utcDatum)}`;
                var sYear = `${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(utcDatum)}`;
                var sHour = `${new Intl.DateTimeFormat('en', { hour12: false, hour: '2-digit' }).format(utcDatum)}`;
                var sMinute = `${new Intl.DateTimeFormat('en', { hour12: false, minute: '2-digit' }).format(utcDatum)}`;
                var sSecond = `${new Intl.DateTimeFormat('en', { hour12: false, second: '2-digit' }).format(utcDatum)}`;
                return `${sDay}${sMonth}${sYear}_${sHour}${sMinute}${sSecond}`;
            },

            renderControlLinks: function () {
                if (this.ErrorFields.length > 0) {
                    this.ErrorList = [
                        { ErrField: "TotalSuccessLeads", ErrCount: this.DataCategory.Tot_Leads.filter(function (itm) { return itm.Row_State == "Success" }).length },
                        { ErrField: "TotalErrorLeads", ErrCount: this.DataCategory.Tot_Leads.filter(function (itm) { return itm.Row_State == "Error" }).length },
                    ];
                    for (var i = 0; i < this.ErrorFields.length; i++) {
                        var aError = this.DataCategory.Tot_Leads.filter(function (itm) { return (itm[this.ErrorFields[i]]); }.bind(this));
                        if (aError.length != 0) {
                            this.ErrorList.push({ ErrField: this.ErrorFields[i], ErrCount: aError.length });
                        }
                    }
                    if (this.ErrorList.length > 0) {
                        var placedFieldCount = 0, ctrlToolbar;
                        this.getView().byId("idPanelLinks").destroyContent();
                        for (var i = 0; i < this.ErrorList.length; i++) {
                            placedFieldCount++;
                            if (placedFieldCount == 1) {
                                ctrlToolbar = new sap.m.Toolbar();
                                this.getView().byId("idPanelLinks").addContent(ctrlToolbar);
                            }
                            if (placedFieldCount <= 6) {
                                var mSettingsLabel = { text: this.getLanguageText(this.ErrorList[i].ErrField) + " : ", labelFor: `${this.ErrorList[i].ErrField}` };
                                var mSettingsLink = { text: this.ErrorList[i].ErrCount, press: this.handleLinkPress };
                                ctrlToolbar.addContent(new sap.m.Label(mSettingsLabel));
                                ctrlToolbar.addContent(new sap.m.Link(`${this.ErrorList[i].ErrField}`, mSettingsLink));
                            }
                            if (placedFieldCount == 6) {
                                ctrlToolbar.addContent(new sap.m.ToolbarSpacer({}));
                                placedFieldCount = 0;
                            }
                        }
                        var piPercent = Math.floor(10 + 0);
                        if (this.ErrorList[0].ErrCount != 0 && this.ErrorList[1].ErrCount != 0)
                            piPercent = Math.floor(10 + (80 - ((this.ErrorList[1].ErrCount / this.ErrorList[0].ErrCount) * 80))); //10 + ((this.ErrorList[0].ErrCount/this.ErrorList[1].ErrCount) * 80);
                        if (this.ErrorList[0].ErrCount != 0 && this.ErrorList[1].ErrCount == 0)
                            piPercent = Math.floor(10 + 80);
                        this.gModelRef.getData().LeadList.ProgressIndicator.percentValue = piPercent;
                        this.gModelRef.getData().LeadList.ProgressIndicator.displayValue = `${piPercent}%`;
                        this.gModelRef.refresh();
                    } else {
                        var piPercent = Math.floor(10 + 0);
                        this.gModelRef.getData().LeadList.ProgressIndicator.percentValue = piPercent;
                        this.gModelRef.getData().LeadList.ProgressIndicator.displayValue = `${piPercent}%`;
                        this.gModelRef.refresh();
                    }
                    if (this.ErrorList[1].ErrCount > 0)
                        this.gModelRef.getData().LeadList.Enabled.UploadToSalesCloud = false;
                    else
                        this.gModelRef.getData().LeadList.Enabled.UploadToSalesCloud = true;
                    this.gModelRef.refresh();
                }
            },

            handleLinkPress: function (oEvent) {
                var aFilter = [];
                if (oEvent.getSource().getId() == "TotalSuccessLeads")
                    aFilter.push(new sap.ui.model.Filter("Row_State", sap.ui.model.FilterOperator.EQ, "Success"));
                else if (oEvent.getSource().getId() == "TotalErrorLeads")
                    aFilter.push(new sap.ui.model.Filter("Row_State", sap.ui.model.FilterOperator.EQ, "Error"));
                else
                    aFilter.push(new sap.ui.model.Filter(oEvent.getSource().getId(), sap.ui.model.FilterOperator.EQ, true));
                this.getParent().getParent().getParent().getParent().byId("idTableJ").getBinding("rows").filter(aFilter);
            },

            handleChangeTitle: function (oEvent) {
                var oSelKey = oEvent.getParameter("selectedItem").getKey();
                var oTblIndex = oEvent.getSource().getParent().getIndex();
                var aErr = this.ErrorList.filter(function (itm) { return (itm.ErrField.includes("Contact_Information_Title")); });
                if (aErr.length > 0) {
                    //if (this.gModelRef.getData().LeadList.leadCount.totalErrorLeads > 1) {
                    this.showMessageBox("",
                        this.getLanguageText("Confirmation"),
                        this.getLanguageText("ConfirmOnTitle"), [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        function (oAction) {
                            if (oAction == "YES") {
                                var aErrRecord = this.gModelRef.getData().LeadList.rows.filter(function (itm) { return (itm.Row_State == "Error" && itm.Err_INV_Contact_Information_Title == true); });
                                for (var i = 0; i < aErrRecord.length; i++) {
                                    aErrRecord[i].Contact_Information_Title = oSelKey;
                                    this.gModelRef.refresh();
                                }
                            } else {
                                var oRowData = this.gModelRef.getData().LeadList.rows[oTblIndex];
                                oRowData.Contact_Information_Title = oSelKey;
                                this.gModelRef.refresh();
                            }
                        }.bind(this));
                }
            },

            handleChangeSelect: function (oEvent) {
                oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
                var isThr = false, aErr = [], aErrRecord = [];
                var oSelKey = oEvent.getParameter("selectedItem").getKey();
                var oTblPath = oEvent.getSource().getParent().getRowBindingContext().getPath();
                var that = this;
                var oTblIndex = parseInt(oTblPath.split('/')[3]);
                $.each(constants.DROPDOWN_FIELDS, function (c, field) {
                    isThr = oEvent.getSource().getId().includes(field);
                    if (isThr) {
                        aErr = this.ErrorList.filter(function (itm) { return (itm.ErrField.includes(field)); });
                        if (aErr.length > 0) {
                            this.showMessageBox("",
                                this.getLanguageText("Confirmation"),
                                this.getLanguageText("ConfirmOnTitle"), [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                                function (oAction) {
                                    if (oAction == "YES") {
                                        aErrRecord = this.gModelRef.getData().LeadList.rows.filter(function (itm) { return (itm.Row_State == "Error" && itm[`Err_INV_${field}`] == true); });
                                        for (var i = 0; i < aErrRecord.length; i++) {
                                            if (field === "Contact_Information_Title") {
                                                aErrRecord[i][field] = that.fnFormat_Contact_Information_Title(oSelKey);
                                            }
                                            else if (field === "Qualification_Level") {
                                                aErrRecord[i][field] = that.fnFormat_Qualification_Level(oSelKey);
                                            }
                                            else if (field === "Status") {
                                                aErrRecord[i][field] = that.fnFormat_Status(oSelKey);
                                            } else {
                                                aErrRecord[i][field] = oSelKey;
                                            }
                                            this.gModelRef.refresh();
                                        }
                                    } else {
                                        var oRowData = this.gModelRef.getData().LeadList.rows[oTblIndex];
                                        this.setChangedDropDownValues(field, oRowData, oSelKey);
                                        // if (field === "Contact_Information_Title") {
                                        //     oRowData[field] = that.fnFormat_Contact_Information_Title(oSelKey);
                                        // }
                                        // else if (field === "Qualification_Level") {
                                        //     oRowData[field] = that.fnFormat_Qualification_Level(oSelKey);
                                        // }
                                        // else if (field === "Status") {
                                        //     oRowData[field] = that.fnFormat_Status(oSelKey);
                                        // } else {
                                        //     oRowData[field] = oSelKey;
                                        // }
                                        // this.gModelRef.refresh();
                                    }
                                }.bind(this));
                        }else if(aErr.length === 0){
                            var oRowData = this.gModelRef.getData().LeadList.rows[oTblIndex];
                            this.setChangedDropDownValues(field, oRowData, oSelKey);
                        }
                        return false;
                    }
                }.bind(this));
                this.validateLeads(false);
            },

            getFilters: function (sFilter) {
                var aFilter = [];
                switch (sFilter) {
                    case constants.FILTER_BY.Mandatory:
                        var oFilter = [];
                        oFilter.push(new sap.ui.model.Filter("External_Key", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Qualification_Level", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Source", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Owner_Party_ID", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Account_Information_Country", sap.ui.model.FilterOperator.EQ, ""));
                        // oFilter.push(new sap.ui.model.Filter("Contact_Last_Name", sap.ui.model.FilterOperator.EQ, ""));
                        // oFilter.push(new sap.ui.model.Filter("Individual_Customer_Information_Country", sap.ui.model.FilterOperator.EQ, ""));
                        // oFilter.push(new sap.ui.model.Filter("Expected_Revenue_Amount_Currency", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Building_Cost_Currency", sap.ui.model.FilterOperator.EQ, ""));
                        oFilter.push(new sap.ui.model.Filter("Gross_Roof_AreaUnitCode", sap.ui.model.FilterOperator.EQ, ""));
                        aFilter.push(new sap.ui.model.Filter({
                            filters: oFilter,
                            and: false,
                        }));
                        break;
                    case constants.FILTER_BY.TotalSuccessLeads:
                        aFilter.push(new sap.ui.model.Filter("Row_State", sap.ui.model.FilterOperator.EQ, "Success"));
                        break;
                    case constants.FILTER_BY.TotalErrorLeads:
                        aFilter.push(new sap.ui.model.Filter("Row_State", sap.ui.model.FilterOperator.EQ, "Error"));
                        break;
                    // case constants.FILTER_BY.MissingQualLevel:
                    //     aFilter.push(new sap.ui.model.Filter("Err_ND_Qualification_Level", sap.ui.model.FilterOperator.EQ, true));
                    //     break;
                    case constants.FILTER_BY.InvalidQualLevel:
                        aFilter.push(new sap.ui.model.Filter("Err_INV_Qualification_Level", sap.ui.model.FilterOperator.EQ, true));
                        break;
                    case constants.FILTER_BY.TotalLeads:
                    default:
                        aFilter = [];
                        break;
                }
                return aFilter;
            },

            handleTotalLeadsPress: function (oEvent) {
                var aFilter = this.getFilters(constants.FILTER_BY.TotalLeads);
                this.getView().byId("idTableJ").getBinding("rows").filter(aFilter);
            },

            handleTotalSuccessLeadsPress: function (oEvent) {
                var aFilter = this.getFilters(constants.FILTER_BY.TotalSuccessLeads);
                this.getView().byId("idTableJ").getBinding("rows").filter(aFilter);
            },

            handleTotalErrorLeadsPress: function (oEvent) {
                var aFilter = this.getFilters(constants.FILTER_BY.TotalErrorLeads);
                this.getView().byId("idTableJ").getBinding("rows").filter(aFilter);
            },

            handleMisMandatryFieldsPress: function (oEvent) {
                var aFilter = this.getFilters(constants.FILTER_BY.Mandatory);
                this.getView().byId("idTableJ").getBinding("rows").filter(aFilter);
            },

            handleInvalidQualLevelPress: function (oEvent) {
                var aFilter = this.getFilters(constants.FILTER_BY.InvalidQualLevel);
                this.getView().byId("idTableJ").getBinding("rows").filter(aFilter);
            },

            handleMissingQualLevelPress: function (oEvent) {
                var aFilter = this.getFilters(constants.FILTER_BY.MissingQualLevel);
                this.getView().byId("idTableJ").getBinding("rows").filter(aFilter);
            },

            handleUploadComplete: function (oEvent) {
                this.gModelRef.setProperty("/editable",true);
                this.gModelRef.setProperty("/enabled",true);
            },

            handleOnDownloadTemplate: function (oEvent) {
                var sColumnsCSV = "";
                $.each(constants.COLUMN_FIELDS, function (c, field) {
                    if (!this.hasValue(sColumnsCSV))
                        sColumnsCSV = sColumnsCSV + field;
                    else
                        sColumnsCSV = sColumnsCSV + "," + field;
                }.bind(this));
                sColumnsCSV = sColumnsCSV + "\n";
                console.log(sColumnsCSV);

                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(sColumnsCSV);
                hiddenElement.target = '_blank';
                hiddenElement.download = this.getLanguageText("LeadUploadTemplate") + '.csv';
                hiddenElement.click();
            },

            

            handleOnValidateLeads: function (oEvent) {
                if (this.gModelRef.getData().LeadList.rows.length > 0) {
                    this.DataCategory.Tot_Leads = $.extend(true, [], this.gModelRef.getData().LeadList.rows);
                    this.gModelRef.refresh();
                    this.validateLeads(false);
                } else {
                    this.showToast(this.getLanguageText("NoLeadsToValidate"), true);
                }
            },

            hanldeOnLinkPress: function (oEvent) {
                console.log("Pressed");
                //this.getView().byId("idTB2").removeContent();
            },

            _getFileSelection: function () {
                if (!this.oFileSelection) {
                    this.oFileSelection = sap.ui.xmlfragment("idFileSelection", "com.sap.bmi.zc4cui5leadupload.fragment.Files", this);
                    this.getView().addDependent(this.oFileSelection);
                }
                return this.oFileSelection;
            },

            handleCancel: function (oEvent) {
                this._getFileSelection().close(oEvent.getSource());
            },

            handleFileSelection: function (oEvent) {
                if (this.hasValue(oEvent.getParameter("rowContext"))) {
                    var selFileName = oEvent.getParameter("rowContext").getObject().Name;
                    if (this.hasValue(selFileName)) {
                        this._doImportLeads(selFileName);
                    }
                    this._getFileSelection().close(oEvent.getSource());
                }
            },

            handleOnImport: function (oEvent) {
                this._doImportFiles(oEvent.getSource());
            },

            async _doFetchToken(sUrl, bCallFrom) {
                sap.ui.core.BusyIndicator.show();
                var that = this;
                var mParameters = {};
                var oI18Model = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                mParameters.async = true;
                mParameters.cache = true;
                mParameters.method = constants.HTTP_METHOD.GET;
                mParameters.headers = {
                    "X-CSRF-Token": constants.HTTP_METHOD.FETCH,
                };
                mParameters.url = sUrl;
                mParameters.success = function (result, xhr, data) {
                    var sToken = data.getResponseHeader("x-csrf-token");
                    if (bCallFrom) {
                        var aLeadRows = this.eliminateUnwantedFields($.extend(true, [], this.gModelRef.getData().LeadList.rows), false);
                        this._doExportLeads(aLeadRows, sToken);
                    } else {
                        var aLeadRows = this.eliminateUnwantedFields($.extend(true, [], this.gModelRef.getData().LeadList.rows), true);
                        // Adding logic for Date
                        this.resetDateTime(aLeadRows);
                        this._doUploadSalesLeads(aLeadRows, sToken);
                        this.DataCategory.Tot_Leads = $.extend(true, [], aLeadRows /*this.gModelRef.getData().LeadList.rows*/);
                    }
                }.bind(this);
                mParameters.error = function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    that.showErrorMessageBox(oI18Model.getText("titleError"), oError.responseText);
                }.bind(this);
                $.ajax(mParameters);
            },

            async _doImportFiles(oSource) {
                var mParameters = {};
                var that = this;
                var oI18Model = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                mParameters.async = true;
                mParameters.cache = true;
                mParameters.method = constants.HTTP_METHOD.GET;
                mParameters.headers = {
                    // "X-CSRF-Token": constants.HTTP_METHOD.FETCH,
                    "UserID": this.getUserID()
                };
                mParameters.url = `/${constants.APP_ROUTER}${constants.APP_ID}${constants.VERSION}/${this._getDestinationName()}${constants.CPI_SERVICES.IMPORT_FILES}${this._getEndPoint()}?UserID='${this.getUserID()}'`;
                sap.ui.core.BusyIndicator.show();
                mParameters.success = function (result, xhr, data) {
                    sap.ui.core.BusyIndicator.hide();
                    this.gModelRef.getData().LeadList.Files.rows = [];
                    this.gModelRef.getData().LeadList.Files.count = this.gModelRef.getData().LeadList.Files.rows.length;
                    this.gModelRef.refresh();
                    this._getFileSelection().open(oSource);
                    sap.ui.core.Fragment.byId("idFileSelection", "idTable").getBinding("rows").filter([]);
                }.bind(this);
                mParameters.error = function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    if (oError.status === 200) {
                        var oJSONParse = JSON.parse(oError.responseText);
                        var oBlobResponse = oJSONParse.EnumerationResults.Blobs.Blob;
                        this.gModelRef.getData().LeadList.Files.rows = oBlobResponse;
                        this.gModelRef.getData().LeadList.Files.count = oBlobResponse.length;
                        this.gModelRef.refresh();
                        this._getFileSelection().open(oSource);
                        sap.ui.core.Fragment.byId("idFileSelection", "idTable").getBinding("rows").filter([]);
                    } else {
                        that.showErrorMessageBox(oI18Model.getText("titleError"), oError.responseText);
                    }
                }.bind(this);
                $.ajax(mParameters);
            },

            async _doImportLeads(sFileName) {
                var mParameters = {};
                var that = this;
                var oI18Model = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                mParameters.async = true;
                mParameters.method = constants.HTTP_METHOD.GET;
                mParameters.headers = {
                    "X-CSRF-Token": constants.HTTP_METHOD.FETCH,
                    "UserID": this.getUserID(),
                    "FileName": sFileName
                };
                mParameters.url = `/${constants.APP_ROUTER}${constants.APP_ID}${constants.VERSION}/${this._getDestinationName()}${constants.CPI_SERVICES.IMPORT_LEADS}${this._getEndPoint()}`;
                sap.ui.core.BusyIndicator.show();
                mParameters.success = function (result, xhr, data) {
                    var oResponseText = data.responseText;
                    if (oResponseText !== null) {
                        that.showSuccessMessageBox(oI18Model.getText("titleSuccess"), oI18Model.getText("SuccessMessageAfterImport"));
                        var aRows = JSON.parse(oResponseText);
                        that.gModelRef.getData().LeadList.rows = aRows;
                        that.gModelRef.getData().LeadList.RunID = aRows[0].RunID;
                        that.gModelRef.refresh();
                        sap.ui.core.BusyIndicator.hide();
                    }
                }.bind(this);
                mParameters.error = function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    that.showErrorMessageBox(oI18Model.getText("titleError"), oError.responseText);
                }.bind(this);
                $.ajax(mParameters);
            },

            handleOnExport: function (oEvent) {
                this.gModelRef.getData().LeadList.FileName = this.getFileName(this.getView().byId("idFileUploader").getValue());
                this.gModelRef.refresh();
                this._doFetchToken(`/${constants.APP_ROUTER}${constants.APP_ID}${constants.VERSION}/${this._getDestinationName()}${constants.CPI_SERVICES.EXPORT_LEADS}${this._getEndPoint()}`, true);
            },

            async _doExportLeads(aLeadRows, sToken) {
                var mParameters = {}, aCalls = [];
                var oI18Model = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                var that = this;
                mParameters.method = constants.HTTP_METHOD.POST;
                mParameters.url = `/${constants.APP_ROUTER}${constants.APP_ID}${constants.VERSION}/${this._getDestinationName()}${constants.CPI_SERVICES.EXPORT_LEADS}${this._getEndPoint()}`;
                mParameters.data = JSON.stringify(aLeadRows);
                mParameters.headers = {
                    "Content-Type": "application/json",
                    "x-csrf-token": sToken, //constants.HTTP_METHOD.FETCH,
                    "RunID": this.gModelRef.getData().LeadList.RunID,
                    "UserID": this.getUserID(),
                    "FileName": this.gModelRef.getData().LeadList.FileName,
                };
                mParameters.success = function (result, xhr, data) {
                    that.showSuccessMessageBox(oI18Model.getText("titleSuccess"), oI18Model.getText("SuccessMessageAfterExport"));
                    sap.ui.core.BusyIndicator.hide();
                };
                mParameters.error = function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    that.showErrorMessageBox(oI18Model.getText("titleError"), oError.responseText);
                };
                $.ajax(mParameters);
            },

            handleOnUploadToSalesCloud: function (oEvent) {
                
                this._doFetchToken(`/${constants.APP_ROUTER}${constants.APP_ID}${constants.VERSION}/${this._getDestinationName()}${constants.CPI_SERVICES.UPLOAD_LEADS}${this._getEndPoint()}`, false);
                // var aLeadRows = this.eliminateUnwantedFields($.extend(true, [], this.gModelRef.getData().LeadList.rows), true); 
                // var sToken = "";
                // this._doUploadSalesLeads(aLeadRows, sToken);
                
            },

            async _doUploadSalesLeads(aLeadRows, sToken) {
                var mParameters = {}, aCalls = [];
                var oI18Model = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                this.gModelRef.getData().LeadList.FileName = this.getFileName(this.getView().byId("idFileUploader").getValue());
                var that = this;
                mParameters.method = constants.HTTP_METHOD.POST;
                mParameters.url = `/${constants.APP_ROUTER}${constants.APP_ID}${constants.VERSION}/${this._getDestinationName()}${constants.CPI_SERVICES.UPLOAD_LEADS}${this._getEndPoint()}`;
                mParameters.timeout = 5000000;
                mParameters.data = JSON.stringify(aLeadRows);
                mParameters.headers = {
                    "Content-Type": "application/json",
                    "x-csrf-token": sToken,
                    "RunID": this.gModelRef.getData().LeadList.RunID,
                    "UserID": this.getUserID(),
                    "FileName": this.gModelRef.getData().LeadList.FileName
                };
                mParameters.success = function (result, xhr, data) {
                    that.showSuccessMessageBox(oI18Model.getText("titleSuccess"), oI18Model.getText("UploadToSalesCloudSuccess"));
                    that.gModelRef.getData().LeadList.ProgressIndicator.percentValue = 100;
                    that.gModelRef.getData().LeadList.ProgressIndicator.displayValue = `${100}%`;
                    that.gModelRef.setProperty("/editable",false);
                    that.gModelRef.setProperty("/enabled",false);
                    that.gModelRef.refresh();
                    sap.ui.core.BusyIndicator.hide();
                };
                mParameters.error = function (jqXHR, errorCode, error) {
                    sap.ui.core.BusyIndicator.hide();
                    var sResponseText = jqXHR.responseText;
                    if (jqXHR.status === 500 && sResponseText.indexOf("Gateway Timeout") > -1 ) {
                        that.showSuccessMessageBox(oI18Model.getText("titleSuccess"), oI18Model.getText("UploadToSalesCloudSuccess"));
                        that.gModelRef.getData().LeadList.ProgressIndicator.percentValue = 100;
                        that.gModelRef.getData().LeadList.ProgressIndicator.displayValue = `${100}%`;
                        that.gModelRef.setProperty("/editable",false);
                        that.gModelRef.setProperty("/enabled",false);
                        that.gModelRef.refresh();
                    } else if(jqXHR.status === 200){
                        that.showSuccessMessageBox(oI18Model.getText("titleSuccess"), oI18Model.getText("UploadToSalesCloudSuccess"));
                        that.gModelRef.getData().LeadList.ProgressIndicator.percentValue = 100;
                        that.gModelRef.getData().LeadList.ProgressIndicator.displayValue = `${100}%`;
                        that.gModelRef.setProperty("/editable",false);
                        that.gModelRef.setProperty("/enabled",false);
                        that.gModelRef.refresh();
                    }                
                    else {
                        that.showErrorMessageBox(oI18Model.getText("titleError"), jqXHR.responseText);
                    }
                };
                $.ajax(mParameters);
            },

            eliminateUnwantedFields: function (aLeadRows, bIsSalesCloudUpld) {
                if (aLeadRows.length > 0) {
                    for (var i = 0; i < aLeadRows.length; i++) {
                        delete aLeadRows[i].Row_State;
                        if (bIsSalesCloudUpld)
                            delete aLeadRows[i].Errors;
                        $.each(constants.COLUMN_FIELDS, function (c, field) {
                            delete aLeadRows[i][`${constants.PREFIXES.Fld_VS_}${field}`];
                            delete aLeadRows[i][`${constants.PREFIXES.Fld_VST_}${field}`];
                        }.bind(this));
                        $.each(constants.MANDATORY_FIELDS, function (c, field) {
                            delete aLeadRows[i][`${constants.PREFIXES.Err_ND_}${field}`];
                        }.bind(this));
                        $.each(constants.COLLECTION_FIELDS, function (c, field) {
                            delete aLeadRows[i][`${constants.PREFIXES.Err_INV_}${field}`];
                        }.bind(this));
                        $.each(constants.FORMAT_VALIDATION_FIELDS, function (c, field) {
                            delete aLeadRows[i][`${constants.PREFIXES.Err_FRMT_}${field}`];
                        }.bind(this));
                    }
                }
                return aLeadRows;
            },

            handleOnNotes: function (oEvent) {
                var oTblIndex = oEvent.getSource().getParent().getIndex();
                var rowPath = this.getView().byId("idTableJ").getContextByIndex(oTblIndex);
                this.Notes.OriginalRowData = $.extend(true, {}, this.getView().byId("idTableJ").getContextByIndex(oTblIndex).getObject());
                this.gModelRef.getData().LeadList.Notes = this.Notes.OriginalRowData.Notes;
                this.gModelRef.refresh();
                this._getNotesViewer().open(oEvent.getSource());
            },

            _getNotesViewer: function () {
                if (!this.oNotesViewer) {
                    this.oNotesViewer = sap.ui.xmlfragment("idNotesViewer", "com.sap.bmi.zc4cui5leadupload.fragment.Notes", this);
                    this.getView().addDependent(this.oNotesViewer);
                }
                return this.oNotesViewer;
            },

            handleProceed: function (oEvent) {
                this.gModelRef.getData().LeadList.rows.filter(function (itm) {
                    return (itm.External_Key == this.Notes.OriginalRowData.External_Key);
                }.bind(this))[0].Notes = this.gModelRef.getData().LeadList.Notes;
                this.gModelRef.refresh();
                this._getNotesViewer().close(oEvent.getSource());
            },

            handleClose: function (oEvent) {
                this.gModelRef.getData().LeadList.rows.filter(function (itm) {
                    return (itm.External_Key == this.Notes.OriginalRowData.External_Key);
                }.bind(this))[0].Notes = this.Notes.OriginalRowData.Notes;
                this.gModelRef.refresh();
                this._getNotesViewer().close(oEvent.getSource());
            },

            handleRowSelectionChange: function (oEvent) {
                console.log(oEvent);
            },

            deleteSelectedRecords: function () {
                var idTableSelected = this.getView().byId("idTableJ").getSelectedIndices();
                for (var i = idTableSelected.length - 1; i >= 0; i--) {
                    var rowPath = this.getView().byId("idTableJ").getContextByIndex(idTableSelected[i]).getPath();
                    var index = parseInt(rowPath.split('/')[3]);
                    this.gModelRef.getData().LeadList.rows.splice(index, 1);
                    this.gModelRef.refresh();
                }
                this.DataCategory.Tot_Leads = $.extend(true, [], this.gModelRef.getData().LeadList.rows);
                this.gModelRef.getData().LeadList.leadCount.totalLeads = this.DataCategory.Tot_Leads.length;
                this.gModelRef.refresh();
                if (this.gModelRef.getData().LeadList.rows.length > 0) {
                    this.validateLeads(false);
                }
                if (this.gModelRef.getData().LeadList.rows.length == 0)
                    this.getView().byId("idPanelLinks").destroyContent();
                console.log(this.gModelRef.getData().LeadList.rows);
            },

            handleOnDelete: function (oEvent) {
                if (this.getView().byId("idTableJ").getSelectedIndices().length > 0) {
                    this.showMessageBox("",
                        this.getLanguageText("Confirmation"),
                        this.getLanguageText("DeleteConfirm"), [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                        function (oAction) {
                            if (oAction == "OK") {
                                this.deleteSelectedRecords();
                            } else {
                                return;
                            }
                        }.bind(this));
                } else {
                    this.showToast(this.getLanguageText("InfoPlsSelAtleastOneForDelete"), true);
                }
            },

            handleOnDeleteAll: function (oEvent) {
                this.showMessageBox("",
                    this.getLanguageText("Confirmation"),
                    this.getLanguageText("DeleteAllConfirm"), [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    function (oAction) {
                        if (oAction == "OK") {
                            this.DataCategory.Tot_Leads = [];
                            this.gModelRef.getData().LeadList.rows = $.extend(true, [], this.DataCategory.Tot_Leads);
                            this.gModelRef.getData().LeadList.leadCount.totalLeads = this.DataCategory.Tot_Leads.length;
                            this.gModelRef.refresh();
                            this.getView().byId("idPanelLinks").destroyContent();
                        } else {
                            return;
                        }
                    }.bind(this));
            },

            populateColumns: function (sId, oContext) {
                var aFieldSettings = this.ArrColumns.filter(function (itm) { return itm.field == oContext.getObject().field });
                var colAlign = sap.ui.core.HorizontalAlign.Begin,
                    colWidth = "100%",
                    colTemplate;
                if (oContext.getObject().field == "Notes") {
                    colTemplate = new sap.m.Button({
                        icon: "sap-icon://notes",
                        //text: "{i18n>Notes}"
                    });
                } else {
                    colTemplate = new sap.m.Input({
                        type: "Text",
                        value: "{gModelRef>" + oContext.getObject().field + "}"
                    });
                }
                return new sap.ui.table.Column({
                    label: new sap.m.Label({
                        text: this.getLanguageText(oContext.getObject().field),
                        wrapping: false,
                        required: aFieldSettings[0].required
                    }),
                    template: colTemplate,
                    width: aFieldSettings[0].width,
                    sortProperty: oContext.getObject().field,
                    filterProperty: oContext.getObject().field,
                    hAlign: colAlign
                });
            },

            populateRows: function (sId, oContext) {
                var aCells = [];
                for (var i = 0; i < oContext.getModel('gModelRef').getData().aColumns.length; i++) {
                    aCells.push(new sap.m.Text({
                        text: "{gModelRef>" + oContext.getModel('gModelRef').getData().aColumns[i].field + "}"
                    }));
                }
                return new sap.m.ColumnListItem(sId, {
                    type: "Active",
                    cells: aCells
                });
            },

            _getDestinationName: function(){
                var sUrl = window.location.href;
                var sDestination = "";
                if(sUrl.indexOf("C4CSystem=RT400") > -1){
                    sDestination = constants.DESTINATION_NAME_RT400;
                }else if(sUrl.indexOf("C4CSystem=RT410") > -1){
                    sDestination = constants.DESTINATION_NAME_RT410;
                }else if(sUrl.indexOf("C4CSystem=RT420") > -1){
                    sDestination = constants.DESTINATION_NAME_RT420;
                }else if(sUrl.indexOf("C4CSystem=BQ400") > -1){
                    sDestination = constants.DESTINATION_NAME_BQ400;
                }else if(sUrl.indexOf("C4CSystem=TT400") > -1){
                    sDestination = constants.DESTINATION_NAME_TT400;
                }else if(sUrl.indexOf("C4CSystem=BD310") > -1){
                    sDestination = constants.DESTINATION_NAME_BD310;
                }else if(sUrl.indexOf("C4CSystem=BT410") > -1){
                    sDestination = constants.DESTINATION_NAME_BT410;
                }else if(sUrl.indexOf("C4CSystem=BU400") > -1){
                    sDestination = constants.DESTINATION_NAME_BU400;
                }else{
                    sDestination = constants.DESTINATION_NAME;
                }
                return sDestination;
            },

            _getEndPoint: function(){
                var sUrl = window.location.href;
                var sDestination = "";
                if(sUrl.indexOf("RT410") > -1){
                    sDestination = constants.END_POINT_RTC410;
                }else if(sUrl.indexOf("RT400") > -1){
                    sDestination = "";
                }else if(sUrl.indexOf("RT420") > -1){
                    sDestination = constants.END_POINT_RTC420;
                }else if(sUrl.indexOf("BQ400") > -1){
                    sDestination = constants.END_POINT_BQC400;  
                }else if(sUrl.indexOf("BD310") > -1){
                    sDestination = "";  
                }else if(sUrl.indexOf("BT410") > -1){
                    sDestination = "";  
                }else if(sUrl.indexOf("BU400") > -1){
                    sDestination = "";  
                }else if(sUrl.indexOf("TT400") > -1){
                    sDestination = "constants.END_POINT_TT400";  
                }else {
                    sDestination = "";
                }
                return sDestination;
            }
        });
    });