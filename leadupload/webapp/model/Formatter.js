sap.ui.define([

], function () {
    "use strict";
    return {
        fnSplitFileName: function (sText) {
            var aFinalText = sText.split("/"),
                sFinalText = "";
            if (aFinalText[1] !== undefined) {
                sFinalText = aFinalText[1];
            } else {
                sFinalText = aFinalText[0];
            }
            return sFinalText;
        }
    }
});