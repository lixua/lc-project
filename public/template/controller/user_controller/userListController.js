(function () {
    angular
        .module('OnlineWebStore')
        .controller('userListController', userListController)
    function userListController(currentUser, $location, userService, $routeParams) {
            var model = this;
            model.user = currentUser;
            model.input = $routeParams['val'];
            if(model.input === 'followed'){
                model.list = currentUser.followedList;
            } else if(model.input === 'blocked'){
                model.list = currentUser.blockList;
            } else {
                model.list = userService
                    .findUserByUsername
                    .then(function (user){
                        model.findUser = user;
                    })
            }

        }
})()
