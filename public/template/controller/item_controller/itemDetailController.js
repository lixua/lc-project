(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemDetailController', function (orderService, $http, $sce, $routeParams, currentUser, $location, userService, itemService) {
            var model = this;
            var user = currentUser;
            model.search = search;
            model.goto = goto;
            model.logout = logout;

            function goto(){
                if(currentUser ==='0'){
                    $location.url('/login');
                } else {
                    $location.url('/user/profile')
                }
            }

            model.loggedIn = (function () {
                if (currentUser ==='0') {
                    return false
                }
                return true
            })
            
            function logout(){
                if(currentUser ==='0'){
                    $location.url('/login');
                } else {
                    userService
                        .logout()
                        .then(function () {
                            $location.url('/login')
                        })
                }
            }
            function search(input){
                if(typeof input === 'undefined'){
                    var url = '/'
                } else {
                    url = '/s/'+input;
                    $location.url(url);
                }
            }

            model.user = currentUser;
            model.itemId = $routeParams['itemId'];
            model.item = itemService
                .findItemById(model.itemId)
                .then(function (item) {
                    findItemsByKeywords(item.name);
                    model.item = item;
                });

            model.postby = userService
                .findUserById(model.item.postby)
                .then(function (found) {
                    model.postby = found;
                });
            if (model.user === '0') {
                model.addCart = redirect;
                model.reviewSubmit = redirect;
            } else {
                model.addCart = addCart;
                model.reviewSubmit = reviewSubmit;
            }
            function redirect() {
                $location.url('/login');
            }

            function reviewSubmit(input) {
                orderService
                    .findByListId(model.user.orderList)
                    .then(function (results) {
                        var rebuylist = [];
                        for (var i in results) {
                            var reItemId = results[i].itemId;
                            rebuylist.push(reItemId);
                        }
                        if (rebuylist.indexOf(model.itemId) === -1) {
                            model.error = "You did not buy this before!";
                            return
                        } else {
                            if (input === null || input === '' || typeof input === 'undefined') {
                                model.error = "Please put review first and then submit!"
                                return;
                            }

                            var item = model.item;
                            if (typeof item.comments === 'undefined') {
                                item.comments = [];
                            }

                            item.comments.push(currentUser.username + ": " + input);
                            itemService
                                .updateItem(item._id, item)
                        }


                    });


            }

            function addCart() {
                if(model.count > model.item.count){
                    model.error="The number you selected is more then in our website!"
                } else {
                    for (var i = 0; i < model.count; i++) {
                        userService
                            .addCart(model.user._id, model.item);
                    }

                }


            }

            model.findItemsByKeywords = findItemsByKeywords;

            function findItemsByKeywords(keywords) {
                return $http.jsonp($sce.trustAsResourceUrl('https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=wenbinch-WenbinXu-PRD-47a8f6fab-de043d20&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + keywords + '&paginationInput.entriesPerPage=10'))
                    .then(function (response) {
                        if (typeof response.data.findItemsByKeywordsResponse[0].searchResult === 'undefined') {
                            model.message = "ebay does not have this item";
                            return;
                        } else {

                            model.items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item
                            return response.data
                        }

                    })
            }

            // Fields: currency / name / price / price_with_shipping / shipping_costs / shop_id / shop_name / shop_url / source_id / url
        })
})();
