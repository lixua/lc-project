(function () {
    angular
        .module('OnlineWebStore')
        .factory('adminService', function ($http) {
            return {
                "adminLogin" : function (username, password) {
                    var url = '/api/admin/login'
                    var user = {
                        username: username,
                        password: password
                    }
                    return $http.post(url, user)
                                .then(function (response) {
                                    console.log('im admin login')
                                })
                }
            }
        })
})()
