sap.ui.define(["sap/ui/core/mvc/ControllerExtension"], function(ControllerExtension) {
	"use strict";

	return ControllerExtension.extend("susaas.assessments.mainApp.ext.controller.OPExtend", {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		// https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.ControllerExtension
		// See all subclasses to find relevant methods additional to standard lifecycle methods

		override: {
			onInit: function() {
				// Access the Fiori elements extensionAPI via this.base.getExtensionAPI
				const oExtensionAPI = this.base.getExtensionAPI();
			},

			onBeforeRendering : function() {},
		
			onAfterRendering : function() {
				let oTableMaterialSplits = this.getView().byId("fe::table::materialSplits::LineItem");
			},

			onExit : function(){},

			routing: {
				onAfterBinding: function() {}
			},

			paginator: {
				onContextUpdate: function() {}
			},

			routing: {
				onBeforeBinding : function() {}
			},

			share: {
				adaptShareMetadata : function() {}
			},

			editFlow: {
				onBeforeSave: function() {
					return new Promise(function(fnResolve, fnReject) {
						fnResolve();
					});
				},
				onBeforeEdit: function() {},
				onBeforeDiscard: function() {},
				onBeforeCreate: function() {},
				onBeforeDelete: function() {}
			},

			viewState: {
				onSuspend: function() {},
			},

			intentBasedNavigation : {
				adaptNavigationContext : function() {}
			}
		}
	});
});