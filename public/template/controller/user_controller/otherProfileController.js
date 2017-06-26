(function () {
    angular
        .module('OnlineWebStore')
        .controller('otherProfileController', otherProfileController)
    function otherProfileController($location,currentUser, $routeParams, userService) {
        // OK
        var model = this;
        model.userId = $routeParams['val'];
        model.from = currentUser;
        model.user = userService
            .findUserById(model.userId)
            .then(function (found) {
                model.user = found;
            });

        model.isBlock = isBlock();
        function isBlock() {
            return model.from.blockList.indexOf(model.userId) !== -1;
        }

        model.isFollow = isFollow();
        function isFollow() {
            return model.from.followList.indexOf(model.userId) !== -1;
        }

        model.follow = follow;
        model.unfollow = unfollow;
        model.block = block;
        model.unblock = unblock;
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

        function follow() {
                model.isFollow = true;
                userService
                    .follow(currentUser._id, model.user._id)
                    .then(function (found) {
                        //$location.url('/user/profile')
                    })
        }

        function unfollow() {
                model.isFollow = false;
                userService
                    .unfollow(currentUser._id, model.user._id)
                    .then(function (found) {
                       // $location.url('/user/profile')
                    })
        }

        function block() {
                model.isBlock = true;
                userService
                    .block(currentUser._id, model.user._id)
                    .then(function (found) {
                        //$location.url('/user/profile')
                    })
        }

        function unblock() {
                model.isBlock = false;
                userService
                    .unblock(currentUser._id, model.user._id)
                    .then(function (found) {
                       // $location.url('/user/profile')
                    })
        }


    }
})();
