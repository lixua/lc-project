(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemCompareController', function ($http, $interval, $sce) {
            var model = this
            model.name = "mname"
           model.type = "us"
           model.price = "3.00"

           function getJobId (form_data) {
               return $http.post('https://api.priceapi.com/jobs', form_data)
                   .then(function (response) {
                       return response.data
                    })
           }

           function submitRequest(data) {
               return $http.get('https://api.priceapi.com/jobs/' + data.job_id + '?token=' + form_data.token)
                           .then(function (response) {
                               return response.data
                           })
           }

           function wait(ms){
              var start = new Date().getTime();
              var end = start;
              while(end < start + ms) {
                end = new Date().getTime();
             }
           }

           function getJsonData(data) {
               return $http.get('https://api.priceapi.com/products/bulk/' + data.job_id + '.json?token=' + form_data.token)
                           .then(function (response) {
                               return response.data
                           })
           }

       model.getFinalList = getFinalList
       model.findItemsByKeywords = findItemsByKeywords

       function getFinalList(values) {
           form_data = {token: 'CRSZOTSKLJQPKWOIJWYONSQXAPGYMSSXDEJXFRVJWOOHIFYUEUDUADALIZVJZSGZ',
                        country: 'us',
                        source: 'ebay',
                        completeness: 'one_page',
                        key: 'keyword',
                        values: values}
           getJobId(form_data)
               .then(function (data) {
                   submitRequest(data)
                       .then(function (data) {
                           wait(13000)
                           getJsonData(data)
                               .then(function (data) {
                                   model.products = data.products[0].offers
                               })
                       })
               })
       }

       function findItemsByKeywords(keywords) {
           return $http.jsonp($sce.trustAsResourceUrl('https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=wenbinch-WenbinXu-PRD-47a8f6fab-de043d20&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + keywords + '&paginationInput.entriesPerPage=10'))
                       .then(function (response) {
                           model.items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item
                           return response.data
                       })
       }
       // getFinalList("beef")
       // Fields: currency / name / price / price_with_shipping / shipping_costs / shop_id / shop_name / shop_url / source_id / url

        })
})()
