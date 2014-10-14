var Products = new Marionette.Application();

Products.addRegions({
    mainRegion:"#js-main-region"
});

Products.on("start",function(){
    Products.ProductsApp.List.Controller.listProducts();

    $(function() {
        $('.js-product-item-block-template').matchHeight();
    });
});