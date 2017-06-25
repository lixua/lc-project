(function () {
    angular
        .module('OnlineWebStore')
        .controller('cartController', cartController);
    function cartController($location,userService,currentUser,orderService,itemService) {
            var model = this;
            model.user = currentUser;
            model.removeCart = removeCart;
            model.addCart = addCart;
            model.checkOut = checkOut;
            model.list = itemService
                .findByListId(model.user.cartList)
                .then(function (results){
                    model.list = results;
                });

            function removeCart(item){
                userService.removeCart(item._id)
                    .then(function(status){
                        var index = model.user.cartList.indexOf(item._id);
                        model.user.cartList.splice(index, 1);
                        model.list = itemService
                            .findByListId(model.user.cartList)
                            .then(function (results){
                                model.list = results;
                            })
                    })
            }

            function addCart(item){
                userService.addCart(item._id)
                    .then(function(status){
                        model.user.cartList.push(item._id);
                        model.list = itemService
                            .findByListId(model.user.cartList)
                            .then(function (results){
                                model.list = results;
                            })
                    })
            }
            function checkOut(){
                for(var i in model.list){
                    var order = {
                        itemId:model.list[i]._id,
                        sellerId:model.list[i].postBy,
                        buyerId: model.user._id,
                        price:model.list[i].price,
                        count:model.list[i].count
                    };
                    orderService.createOrder(order)
                        .then(function (order){
                            itemService.checkOut(model.list[i]._id,model.list[i].count)
                                .then(function (status){
                                        model.user.orderList.push(order._id);
                                        model.user.cartList.splice(i,1);
                                        userService.updateUser(model.user._id,model.user);


                                })

                        });
                }
            }
        }
})();
