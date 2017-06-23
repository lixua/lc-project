(function () {
    angular
        .module('OnlineWebStore')
        .factory('orderService', function ($http) {
            return {
                "createOrder" : function (order) {
                    var url = '/api/order/create'
                    return $http.post(url, order)
                                .then(function (response) {
                                    console.log("I'm orderCreate")
                                })
                },
                "findOrderById" : function (id) {
                    var url = '/api/order/' + id
                    return $http.get(url)
                                .then(function (response) {
                                    console.log("I'm findOrderbyId")
                                })
                },
                "findOrderBySellerId" : function (id) {
                    var url = '/api/order/seller/' + id
                    return $http.get(url)
                                .then(function (response) {
                                    console.log("im findOrdersellerId")
                                })
                },
                "findOrderByBuyerId" : function (id) {
                    var url = '/api/order/buyer/' + id
                    return $http.get(url)
                                .then(function (response) {
                                    console.log('im findOrderByBuyerId')
                                })
                },
                "findAll" : function () {
                    var url = '/api/admin/order/all'
                    return $http.get(url)
                                .then(function (response) {
                                    console.log('Im findAllOrders')
                                })
                }
            }
        })
})()
