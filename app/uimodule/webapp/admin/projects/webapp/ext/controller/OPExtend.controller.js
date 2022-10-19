sap.ui.define(
	["sap/ui/core/mvc/ControllerExtension","sap/m/MessageBox"],
	function (ControllerExtension, MessageBox) {
		"use strict";

		return ControllerExtension.extend("susaas.admin.projects.mainApp.ext.controller.OPExtend", {
			override: {
				intentBasedNavigation: {
					adaptNavigationContext: function (oSelectionVariant) {
						oSelectionVariant.getSelectOptionsPropertyNames().forEach(function (sSelectOptionName) {
							if (sSelectOptionName !== "ID") {
								oSelectionVariant.removeSelectOption(sSelectOptionName);
							}
						});
					}
				}
			}
		});
	});