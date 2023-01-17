/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsapbmi/zc4c_ui5_lead_upload/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
