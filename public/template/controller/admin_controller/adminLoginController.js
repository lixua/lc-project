(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminLoginController', function ($location, adminService) {
            var model = this

            model.login = (function (username, password) {
                adminService
                    .findAdminByCredentials(username, password)
                    .then(login);
                function login(found) {
                    if (found !== "NotFound") {
                        $location.url('/admin/' + found._id);
                    } else {
                        model.error = "sorry, please check username and password. please try again!";
                    }
                }
            })
        })
})()
