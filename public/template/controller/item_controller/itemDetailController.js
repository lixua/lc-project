(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemDetailController', function ($http, $sce, $routeParams,currentUser,$location,userService,itemService) {
           var model = this;
        var user = currentUser;
        model.itemId = $routeParams['itemId'];
        model.item = itemService
            .findItemById(model.itemId)
            .then(function(item){
                findItemsByKeywords(item.name);
                model.item = item;
            });
        if (user === '0'){
            model.addCart = redirect;
        } else {
            model.addCart = addCart;
        }

        function redirect(){
            $location.url('/login');
        }

        function addCart(){
            userService
                .addCart(user._id,model.item);
        }
       model.findItemsByKeywords = findItemsByKeywords;

       function findItemsByKeywords(keywords) {
           return $http.jsonp($sce.trustAsResourceUrl('https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=wenbinch-WenbinXu-PRD-47a8f6fab-de043d20&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + keywords + '&paginationInput.entriesPerPage=10'))
                       .then(function (response) {
                           if(typeof response.data.findItemsByKeywordsResponse[0].searchResult === 'undefined'){
                               model.error = "Cannot find this on ebay!"
                               return;
                           } else {

                               model.items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item
                               return response.data
                           }

                       })
       }

       // Fields: currency / name / price / price_with_shipping / shipping_costs / shop_id / shop_name / shop_url / source_id / url
        })
})()
