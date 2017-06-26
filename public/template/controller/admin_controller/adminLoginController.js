(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminLoginController', function ($location, adminService) {
            var model = this

            model.login = (function (username, password) {
                adminService
                        .findAdminByCredentials(username, password)
                        .then(function (result) {
                            if (result !== null) {
                                $location.url('admin/home')
                            }
                        },
                    function(error) {
                        model.error = 'Sorry this is an admin account'
                    })
            })
        })
})()
