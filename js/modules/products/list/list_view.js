Products.module("ProductsApp.List",function(List,Products,Backbone,Mariontte,$,_){

    List.ProductItem = Marionette.ItemView.extend({
        initialize: function(){
            this.listenTo(this.model, "change:discontinued", this.modelChanged);
        },
        template: '#js-product-item-template',
        tagName:"div",
        className:"js-product-item-block col-xs-12 col-md-4",
        ui:{
            xmark:"img.js-product-img",
            xgrayscale:"img.js-product-img"
        },
        events:{
            "click @ui.xmark":"hideProductImage",
            "mouseover @ui.xgrayscale":"removeGrayScale"
        },
        modelEvents: {
            "change": "render"
        },
        removeGrayScale:function(){
            var children = $(this.$el).children();
            $(children[1]).children().removeClass('blackwhite');
        },
        hideProductImage: function(){
            this.model.set("discontinued", true);
            this.filter(this.model.collection);
        },
        filter:function(collection){

                collection.each(function(item, index){
                    if(item.attributes.discontinued == true){
                        collection.remove(item);
                    }
                });

                collection.each(function(item, index){
                    item.set('productOrderIndex', index + 1);
                });

        }
    });

    List.ProductItemColllection = Marionette.CompositeView.extend({
        tagName:"div",
        template:"#js-product-container-template",
        childView:List.ProductItem
    });

});