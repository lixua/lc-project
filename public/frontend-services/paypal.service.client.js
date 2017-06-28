(function () {
    angular
    .module('OnlineWebStore')
    .factory('paypalService', paypalService)

    function paypalService ($http) {
        return {
            paypalCheckout : paypalCheckout
        }

        function paypalCheckout(order) {
            var url = '/pay'
            console.log('api')
            return $http.post(url, order)
                        .then(function (response) {
                            console.log(response)
                            return response.data
                        })
        }
    }
})()
