sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.training.controller.Main", {

		onInit: function() {

			// JSON Model with application data
			var oModel = new JSONModel();
			oModel.loadData("json/data.json");
			this.getView().setModel(oModel);

			// Instantiating a Resource Model programmatically (instead of using
			// the attributes resourceBundleName and resourceBundleAlias
			// of the view tag)
			//var i18nModel = new sap.ui.model.resource.ResourceModel({
			//	bundleName: "sap.training.i18n.messageBundle"
			//});
			//sap.ui.getCore().setModel(i18nModel, "i18n");

			var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();

			var sText = "Current Language Code / Locale: " + sCurrentLocale;
			this.getView().byId("myTextView1").setText(sText);

			var oBundle = jQuery.sap.resources({
				url: "i18n/messageBundle.properties",
				locale: sCurrentLocale
			});

			//or retrieve the bundle from the model
			//var oBundle = this.getView().getModel("i18n").getResourceBundle();

			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				style: "long"
			});

			var sDate = oDateFormat.format(new Date());

			var sDateText = oBundle.getText("mainTextDate", [sDate]);
			this.getView().byId("myTextView2").setText(sDateText);

		}

	});

});