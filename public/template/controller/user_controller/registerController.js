(function () {
    angular
        .module('OnlineWebStore')
        .controller('registerController', registerController)
    function registerController($location, userService) {
        var model = this;
        model.register = register;
        model.search = search;
        function search(input) {
            var url = '/s/ulist?input=' + input;
            $location.url(url);
        }

        function register(username, password, password2, email, phone, dob, role) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            if(typeof email === 'undefined'){
                model.error = 'please input a valid email';
                return;
            }
            if(typeof role === 'undefined'){
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
                        email: email,
                        phone: phone,
                        dob: dob,
                        role: role
                    };
                    return userService
                        .register(newUser)
                        .then(function (user) {
                            console.log(user)
                            $location.url('/');
                        });
                } else {
                    model.error = "sorry, that username is taken";
                }
            }
        }
    }
})();
