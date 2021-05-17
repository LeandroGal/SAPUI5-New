// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (Controller, History, UIComponent) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.Details", {

            _onObjectMatch: function(oEvent) {
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"
                });
            },

            onInit: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
            },
            
            onNavBack: function() {
                const oHistory = History.getInstance(); // Obtiene la instancia del historial
                const sPrevioushash = oHistory.getPreviousHash();

                if(sPrevioushash !== undefined){
                    window.history.go(-1); // Si obtengo el sPrevioushash vuelvo una pagina atras.
                } else {
                    const oRouter = UIComponent.getRouterFor(this); // Caso contrario, obtengo la ruta de la app
                    oRouter.navTo("RouteApp", {}, true); // RouteApp es la que se encuentra en el OverView (El Worklist inicial) | Con un objeto vacio ya que no nos interesa pasar parametros | Con true realiza la llamada a la navegacion
                }
            }
        });
    });
