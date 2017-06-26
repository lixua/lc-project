(function () {
    angular
        .module('OnlineWebStore')
        .controller('orderListController', orderListController);
    function orderListController($location,orderService,userService,currentUser) {
        var model = this;
        model.logout = logout;
        model.search = search;
        model.user = currentUser;
        model.orderList = orderService
            .findByListId(currentUser.orderList)
            .then(function (found){
                model.orderList = found;
            });

        function search(input) {
            if (typeof input === 'undefined') {
                var url = '/'
            } else {
                url = '/s/' + input;
                $location.url(url);
            }
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })

        }


        model.expand = function (order, foo) {
            if (order.isExpand === null || order.isExpand === undefined) {
                order.isExpand = true
            } else {
                order.isExpand = !order.isExpand
            }

        }
    }
})()
