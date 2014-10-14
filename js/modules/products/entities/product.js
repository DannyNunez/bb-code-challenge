Products.module("Entities",function(Entities,Products,Backbone,Marionette,$,_){

    // Models
    Entities.Product = Backbone.Model.extend({
        template:"#js-product-template",
        defaults:{
            id:"",
            name:"",
            type:"",
            description:"",
            entityType:"",
            productUrl:"",
            rating:"",
            reviewUrl:"",
            white130PxImgUrl:"",
            white70PxImgUrl:"",
            black70PxImgUrl:"",
            black130PxImgUrl:"",
            black450PxImgUrl:"",
            white450PxImgUrl:"",
            largeImageUrl:"",
            solrId:"",
            brandId:"",
            brandProductName:"",
            mainIngredientName:"",
            numberSoldInLast30Days:"",
            productNotSellableStore:"",
            skuIds:"",
            supportedGoalName:"",
            discontinued:""
        }
    });

    // Collections
    Entities.ProductCollection = Backbone.Collection.extend({
        url:"http://api.bodybuilding.com/api-proxy/commerce/products",
        model:Entities.Product,
        comparator:function(product) {
            return -product.get("numberSoldInLast30Days");
        },
        parse:function(data){
            if(data.data){
                return this.filter(data.data);
            } else {
                return this.filter(data);
            }
        },
        filter:function(data){
           var filteredData =  _.sortBy(data,'numberSoldInLast30Days').reverse();
           return _.each(_.filter(filteredData,function(item){return item.discontinued == false;}),function(item,index){item.productOrderIndex = index + 1;});
        }
    });

    var productItems;
    var initializeProducts = function(){
        productItems = new Entities.ProductCollection();
        productItems.fetch({dataType: 'jsonp'});
    };

    var API = {
        getProductEntities:function(){

            if(productItems == undefined){
                initializeProducts();
            }

            return productItems;
        }
    };

    Products.reqres.setHandler("products:entities",function(){
        return API.getProductEntities();
    });

});