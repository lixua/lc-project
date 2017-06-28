(function (){
    angular
        .module('OnlineWebStore')
        .factory('userService',userService);

    function userService($http){
        return {
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            follow: follow,
            unfollow: unfollow,
            block: block,
            unblock: unblock,
            // isFollow: isFollow,
            // isBlock: isBlock,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            findUserFollowList: findUserFollowList,
            findUserFollowedList:findUserFollowedList,
            findUserBlockList:findUserBlockList,
            findUserItemList:findUserItemList,
            findUserOrderList:findUserOrderList,
            findUserCartList:findUserCartList,
            addCart: addCart,
            removeCart: removeCart,
            checkOut: checkOut,
            findByListId: findByListId,
            createItem: createItem,
            deleteItem: deleteItem

        };
        function createItem(userId, item){
            var url = '/api/userci/' + userId;
            return $http.put(url, item)
                .then(function (response){
                    return response.data;
                })
        }
        function deleteItem(userId, item){
            var url = '/api/userdi/' + userId;
            return $http.put(url, item)
                .then(function (response){
                    return response.data;
                })
        }
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
        function findUserByUsername(username) {
            var url = "/api/username?username="+username;
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
            var follow = {
                followId: followId
            }
            return $http.put(url, follow)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollow(userId, unfollowId){
            var url = "/api/user/unfollow/" + userId;
            var unfollow = {
                unfollowId : unfollowId
            }
            return $http.put(url, unfollow)
                .then(function (response) {
                    return response.data;
                });
        }

        function block(userId, blockId){
            var url = "/api/user/block/" + userId;
            var block = {
                blockId: blockId
            };
            return $http.put(url, block)
                .then(function (response) {
                    return response.data;
                });
        }

        function unblock(userId, unblockId){
            var url = "/api/user/unblock/" + userId;
            var unblock = {
                unblockId: unblockId
            }
            return $http.put(url, unblock)
                .then(function (response) {
                    return response.data;
                });
        }

        // function isFollow(userId, checkId){
        //     var url = '/api/userIsFollow/' + userId;
        //     return $http.get(url, checkId)
        //         .then(function (response){
        //             return response.data;
        //         })
        // }
        //
        // function isBlock(userId, checkId){
        //     var url = '/api/userIsBlock/' + userId;
        //     return $http.get(url, checkId)
        //         .then(function (response){
        //             return response.data;
        //         })
        // }
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

        function findUserFollowList(user){
            var results = [];
            for(var i in user.followList) {
                return findUserById(user.followList[i])
                    .then(function(result){
                        return(result)
                    })
            }
        }

        function findUserFollowedList(user){
            var results = [];
            for(var i in user.followedList){
                results.push(findUserById(user.followedList[i]));
            }
            return results;
        }
        function findUserBlockList(user){
            var results = [];
            for(var i in user.blockList){
                results.push(findUserById(user.blockList[i]));
            }
            return results;
        }
        function findUserItemList(user){
            var results = [];
            for(var i in user.itemList){
                results.push(findUserById(user.itemList[i]));
            }
            return results;
        }
        function findUserOrderList(user){
            var results = [];
            for(var i in user.orderList){
                results.push(findUserById(user.orderList[i]));
            }
            return results;
        }
        function findUserCartList(user){
            var results = [];
            for(var i in user.cartList){
                results.push(findUserById(user.cartList[i]));
            }
            return results;
        }
        function addCart(userId, item){
            var url = "/api/useraddcart/" + userId;
            return $http.put(url, item)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeCart(userId, item){
            var url = "/api/userremovecart/" + userId;
            return $http.put(url, item)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkOut(userId){
            var url = '/api/checkout/' + userId;
            return $http.put(url)
                .then(function (response){
                    return response.data;
                })
        }

        function findByListId(list){
            var url = '/api/userlist';
            var userlist = {
                list:list
            };
            return $http.post(url, userlist)
                .then(function (response){
                    return response.data;
                })
        }
    }
})();