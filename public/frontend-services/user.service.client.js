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
            isBlock: isBlock
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

    }
});