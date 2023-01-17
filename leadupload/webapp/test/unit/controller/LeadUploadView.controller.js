/*global QUnit*/

sap.ui.define([
	"comsapbmi/zc4c_ui5_lead_upload/controller/LeadUploadView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("LeadUploadView Controller");

	QUnit.test("I should test the LeadUploadView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
