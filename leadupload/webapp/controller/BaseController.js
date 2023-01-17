sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    'sap/ui/export/Spreadsheet'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (UIComponent, Controller, History, MessageBox, MessageToast, Spreadsheet) {
        "use strict";

        return Controller.extend("com.sap.bmi.zc4cui5leadupload.controller.BaseController", {

            oView: null,

            onInit: function () {

            },

            /* ----- Component - Reusable Methods ----- */
            getComponent: function () {
                return this.getOwnerComponent();
            },

            getRootControl: function () {
                return this.getComponent().getRootControl();
            },

            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },

            setRouteMatched: function (sRoute, oRouteCallback, that) {
                this.getRouter().getRoute(sRoute).attachPatternMatched(oRouteCallback, that);
            },

            getModel: function (sModel) {
                return this.getComponent().getModel(sModel) || this.getView().getModel(sModel) || this.getView().getModel();
            },

            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            getResourceBundle: function () {
                return this.getComponent().getModel("i18n").getResourceBundle();
            },

            getLanguageText: function (sKey, aParameters) {
                if (aParameters === undefined || aParameters === null || aParameters === "") {
                    return this.getResourceBundle().getText(sKey)
                } else {
                    return this.getResourceBundle().getText(sKey, aParameters)
                }
            },

            /* ----- UI - Reusable Methods ----- */
            doCSVExport: function() {
                var oExport = new sap.ui.core.util.Export(mSettings);
                oExport.saveFile().catch(function(oError) {
                    console.log(oError);
                }).then(function() {
                    oExport.destroy();
                });
            },

            doExcelExport: function (mSettings, sEntityset, aFilters, aColumns) {
                sap.ui.core.BusyIndicator.show(0);
                mSettings.workbook.columns = getColumns(aColumns, this);
                if (sEntityset != "" && sEntityset != null && sEntityset != undefined) {
                    prepareData(mSettings, sEntityset, aFilters, this);
                } else {
                    writeToExcel(mSettings, this);
                }

                function prepareData(mSettings, sEntityset, aFilters, that) {
                    var excelPromise = $.Deferred();
                    that.getCurrentView().getModel().read(sEntityset, {
                        filters: aFilters,
                        //sorters: [new sap.ui.model.Sorter("CreatedDate", true)],
                        urlParameters: {},
                        async: false,
                        success: function (oData) {
                            mSettings.dataSource = oData.results;
                            excelPromise.resolve();
                        },
                        error: function (oError) {
                            sap.ui.core.BusyIndicator.hide();
                            that.showToast(that.getLanguageText("FileExportFailed"), true);
                        }
                    });
                    Promise.all([excelPromise]).then($.proxy(function () {
                        writeToExcel(mSettings, that);
                    }, that));
                };

                function writeToExcel(mSettings, that) {
                    var oSheet = new sap.ui.export.Spreadsheet(mSettings);
                    oSheet.build().then(function () {
                        sap.ui.core.BusyIndicator.hide();
                        that.showToast(that.getLanguageText("FileExportSuccess"), true);
                    }).finally(function () {
                        sap.ui.core.BusyIndicator.hide();
                        oSheet.destroy();
                    });
                };

                function getColumns(aColumns, that) {
                    var columns = [];
                    if (aColumns && aColumns.length > 0) {
                        for (var i = 0; i < aColumns.length; i++) {
                            columns.push({
                                label: that.getLanguageText(aColumns[i].toString()),
                                property: aColumns[i].toString()
                                //type: 'string'
                            });
                        }
                    }
                    return columns;
                };
            },

            showToast: function (message, sticky) {
                MessageToast.show(message, {
                    closeOnBrowserNavigation: !sticky ? false : true
                });
            },

            showMessageBox: function (icon, title, message, actions, onCloseCallback) {
                var bCompact = !!this.getCurrentView().$().closest(".sapUiSizeCompact").length;
                MessageBox.show(message, {
                    icon: icon,
                    title: title,
                    actions: actions,
                    //styleClass: bCompact ? "sapUiSizeCompact" : "",
                    onClose: onCloseCallback
                });
            },

            showSuccessMessageBox: function (title, message) {
                MessageBox.success(message, {
                    title: title,
                    actions: [MessageBox.Action.OK]
                });
            },

            showErrorMessageBox: function (title, message) {
                MessageBox.error(message, {
                    title: title,
                    actions: [MessageBox.Action.OK]
                });
            },

            showInformationMessageBox: function (title, message, onCloseCallback) {
                MessageBox.information(message, {
                    title: title,
                    actions: [MessageBox.Action.OK],
                    onClose: onCloseCallback
                });
            },

            getViewId: function () {
                return this.oView.getId();
            },

            getCurrentView: function () {
                return this.oView;
            },

            setCurrentView: function (oView) {
                this.oView = oView;
            },

            hasValue: function(oAny) {
                var bReturn = false;
                if (oAny != "" && oAny != null && oAny != undefined)
                    bReturn = true;
                return bReturn;
            },

            getDateString: function(Datum) {
                var Jahr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(Datum);
                var Monat = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(Datum);
                var Tag = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(Datum);
                return `${Jahr}${Monat}${Tag}`;
            },

            getDateAsString: function(oDate) {
                var datestr = "99991231";
                if (this.hasValue(oDate)) {
                    datestr = oDate.getFullYear().toString();
                    if (oDate.getMonth() >= 0 && oDate.getMonth() < 9)
                        datestr = datestr + "0" + (oDate.getMonth() + 1).toString();
                    else
                        datestr = datestr + (oDate.getMonth() + 1).toString();
                    if (oDate.getDate() > 0 && oDate.getDate() < 10)
                        datestr = datestr + "0" + oDate.getDate().toString();
                    else
                        datestr = datestr + oDate.getDate().toString();
                }
                return datestr;
            },

            /* ----- OData Service Call Methods ----- */
            returnData: function (resolve, reject, mParameters) {
                return {
                    urlParameters: !!mParameters ? mParameters.urlParameters : '',
                    filters: !!mParameters ? mParameters.filters : '',
                    sorters: !!mParameters ? mParameters.sorters : '',
                    async: !!mParameters ? mParameters.async : false,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (oError) {
                        reject(oError);
                    }
                };
            },

            create: function (oModel, sPath, payload, mParameters) {
                return new Promise(function (resolve, reject) {
                    oModel.create(sPath, payload, this.returnData(resolve, reject, mParameters));
                }.bind(this));
            },

            read: function (oModel, sPath, mParameters) {
                return new Promise(function (resolve, reject) {
                    oModel.read(sPath, this.returnData(resolve, reject, mParameters));
                    //this.model.read(sPath, this.returnData(resolve, reject, mParameters));
                }.bind(this));
            },

            update: function (oModel, sPath, payload) {
                return new Promise(function (resolve, reject) {
                    oModel.update(sPath, payload, this.returnData(resolve, reject));
                }.bind(this));
            },

            delete: function (oModel, sPath) {
                return new Promise(function (resolve, reject) {
                    oModel.remove(sPath, this.returnData(resolve, reject));
                }.bind(this));
            },

        });
    });
