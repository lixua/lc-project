(function (){
    angular
        .module('OnlineWebStore')
        .factory('userService',userService);

    function userService($http){
        return {
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            follow: follow,
            unfollow: unfollow,
            block: block,
            unblock: unblock,
            isFollow: isFollow,
            isBlock: isBlock,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register
        };

        function findUserById(userId){
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user/findUserByCredentials?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser(user) {
            var url = "/api/user/create";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url = "/api/user/delete/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/update/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function follow(userId, followId) {
            var url = "/api/user/follow/" + userId;
            return $http.put(url, followId)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollow(userId, unfollowId){
            var url = "/api/user/unfollow/" + userId;
            return $http.put(url, unfollowId)
                .then(function (response) {
                    return response.data;
                });
        }

        function block(userId, blockId){
            var url = "/api/user/block/" + userId;
            return $http.put(url, blockId)
                .then(function (response) {
                    return response.data;
                });
        }

        function unblock(userId, unblockId){
            var url = "/api/user/unblock/" + userId;
            return $http.put(url, unblockId)
                .then(function (response) {
                    return response.data;
                });
        }

        function isFollow(userId, checkId){
            var url = '/api/userIsFollow/' + userId;
            return $http.get(url, checkId)
                .then(function (response){
                    return response.data;
                })
        }

        function isBlock(userId, checkId){
            var url = '/api/userIsBlock/' + userId;
            return $http.get(url, checkId)
                .then(function (response){
                    return response.data;
                })
        }
        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }
        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function register(user) {
            var url = "/api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();