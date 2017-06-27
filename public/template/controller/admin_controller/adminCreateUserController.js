(function () {
        angular
            .module('OnlineWebStore')
            .controller('adminCreateUserController', adminCreateUserController)
        function adminCreateUserController(adminService, $routeParams, $location, userService) {
            var model = this;
            model.adminId = $routeParams['adminId']
            model.admin = adminService
                .findAdminById(model.adminId)
                .then(function (found) {
                    model.admin = found;
                })
            model.register = register;
            function register(username, firstname, lastname, dob, password, password2, email, phone, role) {
                if (username === null || username === '' || typeof username === 'undefined') {
                    model.error = 'username is required';
                    return;
                }

                if (password !== password2 || password === null || typeof password === 'undefined') {
                    model.error = "passwords must match";
                    return;
                }

                if (typeof email === 'undefined') {
                    model.error = 'please input a valid email';
                    return;
                }
                if (typeof role === 'undefined') {
                    model.error = 'please identify your role';
                    return;
                }

                userService
                    .findUserByUsername(username)
                    .then(renderUser);
                function renderUser(found) {
                    if (!found) {
                        var newUser = {
                            username: username,
                            password: password,
                            firstName: firstname,
                            lastName: lastname,
                            email: email,
                            phone: phone,
                            dob: dob,
                            role: role
                        };
                        return userService
                            .register(newUser)
                            .then(function (user) {
                                $location.url('/admin/' + model.adminId);
                            });
                    } else {
                        model.error = "sorry, that username is taken";
                    }
                }
            }
        }
    })()
