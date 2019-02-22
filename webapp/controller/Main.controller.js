sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/core/format/DateFormat", "sap/ui/model/json/JSONModel", "sap/ui/model/resource/ResourceModel"
], function (Controller, DateFormat, JSONModel, ResourceModel) {
	"use strict";

	return Controller.extend("sap.training.controller.Main", {

		onInit: function () {

			// JSON Model with application data
			var oModel = new JSONModel();
			oModel.loadData("model/data.json");
			this.getView().setModel(oModel);

			// Instantiating a Resource Model programmatically
			var i18nModel = new ResourceModel({
				bundleName: "sap.training.i18n.i18n"
			});
			this.getView().setModel(i18nModel, "i18n");

			var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();

			var sText = "Current Language Code / Locale: " + sCurrentLocale;
			this.getView().byId("idText1").setText(sText);

			var oBundle = jQuery.sap.resources({
				url: "i18n/i18n.properties",
				locale: sCurrentLocale
			});

			//or retrieve the bundle from the model
			//var oBundle = i18nModel.getResourceBundle();

			var oDateFormat = DateFormat.getDateInstance({
				style: "long"
			});

			var sDate = oDateFormat.format(new Date());

			var sDateText = oBundle.getText("mainTextDate", [sDate]);
			this.getView().byId("idText2").setText(sDateText);

		}

	});

});