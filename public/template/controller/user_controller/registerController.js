(function () {
    angular
        .module('OnlineWebStore')
        .controller('registerController', registerController)
    function registerController($location, userService,currentUser) {
        var user = currentUser;
        var model = this;
        if(currentUser !== '0'){
            $location.url('/user/profile');
        }
        model.register = register;
        function searchUser(input) {
            var url = '/s/ulist?input=' + input;
            $location.url(url);
        }

        function register(username, firstName, lastName, password, password2, email, phone, dob, role) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            if (password === password.toUpperCase()) {
                model.error = "password must have lower case"
                return;
            }

            if (password === password.toLowerCase()) {
                model.error = "password must have upper case"
                return;
            }

            if (password.length < 6) {
                model.error = "password must have at least 6 digits"
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
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone,
                        dob: dob,
                        role: role
                    };
                    return userService
                        .register(newUser)
                        .then(function (user) {
                            $location.url('/');
                        });
                } else {
                    model.error = "sorry, that username is taken";
                }
            }
        }
    }
})();
