(function () {
    angular
        .module('OnlineWebStore')
        .controller('cartController', cartController);
    function cartController($location, $window, userService, currentUser, orderService, itemService, paypalService) {
        var model = this;
        model.user = currentUser;
        model.removeCart = removeCart;
        model.addCart = addCart;
        model.checkOut = checkOut;

        model.list = itemService
            .findByListId(model.user.cartList)
            .then(function (results) {
                model.list = results;

                for(var i in model.list){
                    model.list[i].count = count(model.user.cartList, model.list[i]._id)
                }
            });

        model.orderList = orderService
            .findByListId(model.user.orderList)
            .then(function (results) {
                var rebuylist = [];
                for (var i in results) {
                    var reItemId = results[i].itemId;
                    rebuylist.push(reItemId);
                }
                itemService
                    .findByListId(rebuylist)
                    .then(function (got) {
                        model.orderList = got;
                    })
            });
        model.logout = logout;
        model.search = search;
        function search(input) {
            if (typeof input === 'undefined') {
                var url = '/'
            } else {
                url = '/s/' + input;
                $location.url(url);
            }
        }
        function count(array, find){
            var result = 0;
            for(var i = 0; i < array.length; ++i){
                if(array[i] === find)
                    result++;
            }
            return result;
        }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })

        }

    model.paypal = (function () {
    if (model.list.length === 0) {
        model.error = "Buy something first, then check out!";
        return;
    }
    return paypalService.paypalCheckout(model.list[0])
        .then(function (result) {
            console.log(result)
            $window.location = "" + result.redirectUrl
        })
})

        function removeCart(item) {
            model.list.splice(model.list.indexOf(item), 1);
            for(var x = 0; x < item.count; x++){
                userService.removeCart(model.user._id, item)
            }

        }
        function addCart(item) {
            userService.addCart(model.user._id, item)
                .then(function (status) {

                    model.user.cartList.push(item._id);
                    model.list = itemService
                        .findByListId(model.user.cartList)
                        .then(function (results) {
                            model.list = results;

                            for(var i in model.list){
                                model.list[i].count = count(model.user.cartList, model.list[i]._id)
                            }
                        });
                })

        }

        function checkOut() {
            if (model.list.length === 0) {
                model.error = "Buy something first, then check out!";
                return;
            }
            for (var i in model.list) {
                var order = {
                    itemId: model.list[i]._id,
                    sellerId: model.list[i].postBy,
                    buyerId: model.user._id,
                    price: model.list[i].price,
                    count: model.list[i].count,
                    name: model.list[i].name,
                    buyerUsername: model.user.username,
                    image: model.list[i].image
                };
                userService
                    .findUserById(model.list[i].postBy)
                    .then(function(found){
                        order.sellerUsername = found;
                        orderService.createOrder(order)
                            .then(function (order) {
                                itemService.checkOut(model.list[i]._id, model.list[i].count)
                                    .then(function (status) {
                                        model.user.orderList.push(order._id);
                                        userService.updateUser(model.user._id, model.user);
                                    })

                            });
                    })

            }
            model.user.cartList = [];
            userService.updateUser(model.user._id, model.user);
            $location.url('/user/profile')
        }
    }
})();
