(function () {

    angular
        .module('OnlineWebStore')
        .controller('userListController', userListController);
    function userListController(currentUser, $location, userService, $routeParams) {
        var model = this;
        model.user = currentUser;
        model.input = $routeParams['val'];
        model.chooseUser = chooseUser;
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

        function logout() {
                userService
                    .logout()
                    .then(function () {
                        $location.url('/login')
                    })

        }

        if (model.input === 'followedBy') {
            model.searchGroup = "Followers:"
            model.list = userService.findByListId(currentUser.followedList)
                .then(function (result) {
                    model.list = result;
                })

        }
        if (model.input === 'blackList') {
            model.searchGroup = "Blacklist:"
            model.list = userService.findByListId(currentUser.blockList)
                .then(function (result) {
                    model.list = result;
                })
        }
        function chooseUser(userId) {
            $location.url('/user/o/profile/' + userId);
        }


    }
})();
