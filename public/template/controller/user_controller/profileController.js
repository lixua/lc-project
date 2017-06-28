(function () {
    angular
        .module('OnlineWebStore')
        .controller('profileController', profileController);
    function profileController(currentUser, $location, userService, itemService, orderService) {
        var model = this;
        model.user = currentUser;
        if(typeof model.user.dob !== 'undefined'){
            var date = model.user.dob.substring(0, model.user.dob.indexOf('T'))
            model.user.dob = new Date(date.split("/"))
        }


        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.findUser = findUser;
        model.followList = userService
            .findByListId(currentUser.followList)
            .then(function (found) {
                model.followList = found;
            });

        model.orderList = orderService
            .findByListId(currentUser.orderList)
            .then(function (found1) {
                model.orderList = found1;
            });
        model.itemList = itemService
            .findByListId(currentUser.itemList)
            .then(function (found2) {
                model.itemList = found2;
            });
        model.logout = logout;
        model.search = search;
        function search(input){
            if(typeof input === 'undefined'){
                var url = '/'
            } else {
                url = '/s/'+input;
                $location.url(url);
            }
        }

        function updateUser(username, firstName, lastName, dob, password, email, phone) {
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
                    phone: phone
                };
                userService.updateUser(model.userId, newUser);
                location.reload()
            } else {
                model.error = "sorry, that username is taken";
            }

        }

        function deleteUser() {
            userService.deleteUser(model.userId);
            $location.url('/login');
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })
        }

        function findUser(input) {
            if (input === model.user.username) {
                model.error = "The user you find is yourself";
            } else {
                var found = userService
                    .findUserByUsername(input)
                    .then(function (find) {
                        found = find;
                        if (found === null) {
                            model.error = 'User does not exist';
                        } else {
                            $location.url('/user/o/profile/' + found._id);
                        }
                    });
            }
        }

        model.itemClick = (function (item) {
            $location.url('/user/i/edit/' + item._id)
        })

        model.userClick = (function (user) {
            $location.url('/user/o/profile/' + user._id)
        })
    }


})();
