(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemDetailController', function ($http, $sce) {
           var model = this

       model.findItemsByKeywords = findItemsByKeywords

       function findItemsByKeywords(keywords) {
           return $http.jsonp($sce.trustAsResourceUrl('https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=wenbinch-WenbinXu-PRD-47a8f6fab-de043d20&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + keywords + '&paginationInput.entriesPerPage=10'))
                       .then(function (response) {
                           model.items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item
                           return response.data
                       })
       }
       findItemsByKeywords("Dean's milk")
       // Fields: currency / name / price / price_with_shipping / shipping_costs / shop_id / shop_name / shop_url / source_id / url
        })
})()
