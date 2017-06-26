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
                    console.log(model.list)
                    console.log(model.list.length)
                });

            model.orderList = orderService
                .findByListId(model.user.orderList)
                .then(function(results){
                    var rebuylist = [];
                    for(var i in results){
                        var reItemId = results[i].itemId;
                        rebuylist.push(reItemId);
                    }
                    itemService
                        .findByListId(rebuylist)
                        .then(function(got){
                            model.orderList = got;
                        })
                });
            function removeCart(item){
                model.list.splice(model.list.indexOf(item),1);
                userService.removeCart(model.user._id,item)


            }

            function addCart(item){
                userService.addCart(model.user._id,item)
                    .then(function(status){
                        model.user.cartList.push(item);
                        model.list = itemService
                            .findByListId(model.user.cartList)
                            .then(function (results){
                                model.list = results;
                            })
                    })
            }
            function checkOut(){
                if(model.list.length === 0){
                    model.error ="Buy something first, then check out!";
                    return;
                }
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
                                        $location.url('/user/profile')


                                })

                        });
                }
            }
        }
})();
