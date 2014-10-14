Products.module("ProductsApp.List",function(List,Products,Backbone,Mariontte,$,_){

    List.Controller = {
        listProducts: function(){
            var subGroupSelectListView = new List.ProductItemColllection({collection:Products.request("products:entities")});
            Products.mainRegion.show(subGroupSelectListView);
        }
    }

});