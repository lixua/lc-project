(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminEditUserController', adminEditUserController)
    function adminEditUserController($location, $routeParams, adminService, userService) {
        var model = this;
        model.adminId = $routeParams['adminId'];
        model.userId = $routeParams['userId'];
        model.user = userService
            .findUserById(model.userId)
            .then(function (found) {
                model.user = found;
                var date = model.user.dob.substring(0, model.user.dob.indexOf('T'))
                model.user.dob = new Date(date.split("/"))
            })
        model.admin = adminService
            .findAdminById(model.adminId)
            .then(function (found) {
                model.admin = found;
            })


        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        function updateUser(username, firstName, lastName,password, dob,email,phone,role){
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password === null || typeof password === 'undefined') {
                model.error = "must have passwords";
                return;
            }

            var found = userService
                .findUserByUsername(username)
                .then(function (get) {
                    found = get;
                });
            if (typeof(found._id) === 'undefined' || found._id === model.userId) {
                var newUser = {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob,
                    email: email,
                    phone: phone,
                    role: role
                };
                userService.updateUser(model.userId, newUser);
                $location.url('/admin/' + model.adminId)

            } else {
                model.error = "sorry, that username is taken";

            }


        }

        function deleteUser(){
            userService
                .deleteUser(model.userId)
                .then(function(status){
                    $location.url('/admin/' + model.adminId)
                })
        }
    }
})();
