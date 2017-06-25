(function () {

    angular
        .module('OnlineWebStore')
        .controller('userListController', userListController);
    function userListController(currentUser, $location, userService, $routeParams) {
            var model = this;
            model.user = currentUser;
            model.input = $routeParams['val'];
            model.chooseUser = chooseUser;

            console.log(model.user.blockList)
            if(model.input === 'followedBy'){
                model.list = userService.findByListId(currentUser.followedList)
                    .then(function (result){
                        model.list = result;
                    })

            }
            if(model.input === 'blackList'){
                model.list = userService.findByListId(currentUser.blockList)
                    .then(function (result){
                        model.list = result;
                        console.log(result)
                    })
            }
            console.log(model.list)
            function chooseUser(userId){
                $location.url('/user/o/profile/' + userId);
            }


        }
})();
