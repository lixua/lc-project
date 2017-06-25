(function () {
    angular
        .module('OnlineWebStore')
        .controller('profileController', profileController);
    function profileController(currentUser,$location, userService){
        var model = this;
        model.user = currentUser;
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.findUser = findUser;
        model.followList = currentUser.followList;
        model.orderList = currentUser.orderList;
        model.itemList = userService.itemList;
        function updateUser(username,firstName, lastName, dob, password, email, phone ) {
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
                .then(function(get){
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
                    phone: phone
                };
                userService.updateUser(model.userId, newUser)
                $location.url('/')

            } else {
                model.error = "sorry, that username is taken";

            }

        }
        function deleteUser(password1, password2){
            if (password1 !== password2){
                model.error = "passwords must be verified to delete account";
                return;
            } else {
                userService.deleteUser(model.userId);
                $location.url('/login');
            }

        }
        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login')
                })
        }

        function findUser(input){
            if(input === model.user.username){
                model.error = "The user you find is yourself";
            }  else {
                var found = userService
                    .findUserByUsername(input)
                    .then(function (find){
                        found = find;
                        if(found === null){
                            model.error = 'User does not exist';
                        } else {
                            $location.url('/user/o/profile/' + found._id);
                        }
                    });
            }



        }
    }


})();
