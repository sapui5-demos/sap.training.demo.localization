sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel", "sap/ui/core/format/DateFormat",
	"sap/base/i18n/ResourceBundle"
], function (Controller, JSONModel, ResourceModel, DateFormat, ResourceBundle) {
	"use strict";

	return Controller.extend("sap.training.controller.Main_async", {
		
		
	/*	
		As of SAPUI5 1.77, the fallback chain can be configured using a custom fallback locale and a list of supported locales.
		Supported Locales specifies a list of locales for which resource bundles may be requested. If this list is empty or not specified, all locales are supported.
		The supportedLocales work like a filter. Each locale in the fallback chain is checked against this list and only applied if it is contained there.
		The Fallback Locale specifies the custom fallback locale in the locale fallback chain. If not specified the fallbackLocale defaults to en.
		To skip the custom fallback locale, the empty string "" can be configured as fallbackLocale.
	*/


		onInit: function () {

			// JSON Model with application data
			var oModel = new JSONModel();
			oModel.loadData("model/data.json");
			var oView = this.getView();
			oView.setModel(oModel);

			var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
			var sText = "Current Language Code / Locale: " + sCurrentLocale;
			oView.byId("idText1").setText(sText);

			// Instantiate a Resource Model
			var i18nModel = new ResourceModel({
				bundleName: "sap.training.i18n.i18n",
				async: true
			});
			oView.setModel(i18nModel, "i18n");

			ResourceBundle.create({
				url: "i18n/i18n.properties",
				async: true
			}).then(function (oResourceBundle) {
				var oDateFormat = DateFormat.getDateInstance({
					style: "long"
				});

				var sDate = oDateFormat.format(new Date());

				var sDateText = oResourceBundle.getText("mainTextDate", [sDate]);
				oView.byId("idText2").setText(sDateText);
			});

			//or retrieve the bundle from the model
			// i18nModel.getResourceBundle().then(function (oResourceBundle) {
			// 	var oDateFormat = DateFormat.getDateInstance({
			// 		style: "long"
			// 	});

			// 	var sDate = oDateFormat.format(new Date());

			// 	var sDateText = oResourceBundle.getText("mainTextDate", [sDate]);
			// 	oView.byId("idText2").setText(sDateText);
			// });

		}

	});
});