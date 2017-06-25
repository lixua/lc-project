(function (){
    angular
        .module('OnlineWebStore')
        .factory('orderService', orderService);

    function orderService($http){
        return {
            createOrder: createOrder,
            findOrderById : findOrderById,
            findOrderBySellerId: findOrderBySellerId,
            findOrderByBuyerId : findOrderByBuyerId,
            sendOut : sendOut,
            delivery : delivery,
            findByListId: findByListId
        };

        function createOrder(order) {
            var url = "/api/order/create";
            return $http.post(url, order)
                .then(function (response) {
                    return response.data;
                })
        }

        function findOrderById(orderId){
            var url = '/api/order/' + orderId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function findOrderBySellerId(sellerId){
            var url = '/api/orderseller/' + sellerId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function findOrderByBuyerId(buyerId){
            var url = '/api/orderbuyer/' + buyerId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function sendOut(orderId){
            var url = '/api/ordersend/' + orderId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function delivery(orderId){
            var url = '/api/orderdelivery/' + orderId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }
        function findByListId(list){
            var url = '/api/orderlist';
            var orderlist = {
                list:list
            };
            return $http.post(url, orderlist)
                .then(function (response){
                    return response.data;
                })
        }

    }
})();