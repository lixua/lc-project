(function () {
    angular
        .module('OnlineWebStore')
        .factory('userService', function ($http) {
            return {
                "findById" : function (id) {
                    var url = "/api/user/" + id
                    return $http.get(url)
                                .then(function (response) {
                                    console.log('Im userFindId')
                                })
                },
                "findUserByCredentials" : function (username, password) {
                    var url = "/api/user/findUserByCredentials"
                    var user = {
                        username : username,
                        password : password
                    }
                    return $http.post(url, user)
                                .then(function (response) {
                                    console.log("im findUserByCredentials")
                                })
                },
                "createUser" : function (user) {
                    var url = "/api/user/create"
                    return $http.post(url, user)
                                .then(function (response) {
                                    console.log('im createUser')
                                })
                },
                "deleteUser" : function (id) {
                    var url = "/api/user/delete/" + id
                    return $http.delete(url)
                                .then(function (response) {
                                    console.log('im deleteUser')
                                })
                },
                "updateUser" : function (id, user) {
                    var url = "/api/user/update/" + id
                    return $http.put(url)
                                .then(function (response) {
                                    console.log('im updateUser')
                                })
                },
                "follow" : function (userId, followedId) {
                    var url = "/api/user/follow/" + userId
                    return $http.post(url, followedId)
                                .then(function (response) {
                                    console.log('im follow')
                                })
                },
                "unfollow" : function (userId, followedId) {
                    var url = "/api/user/unfollow/" + userId
                    return $http.post(url, followedId)
                                .then(function (response) {
                                    console.log('im unfollow')
                                })
                },
                "block" : function (userId, blockId) {
                    var url = "/api/user/block/" + userId
                    return $http.post(url, blockId)
                                .then(function (response) {
                                    console.log('block')
                                })
                },
                "unblock" : function (userId, unblockId) {
                    var url = "/api/user/unblock/" + userId
                    return $http.post(url, unblockId)
                                .then(function (response) {
                                    console.log('unblock')
                                })
                },
                "isFollow" : function (userId, checkId) {
                    var url = "/api/user/isFollow/" + userId
                    return $http.post(url, checkId)
                                .then(function (response) {
                                    console.log('im isFollow')
                                })
                },
                "isBlock" : function (userId, checkId) {
                    var url = "/api/user/isBlock/" + userId
                    return $http.post(url, checkId)
                                .then(function (response) {
                                    console.log('im isBlock')
                                })
                },
                "findAll" : function () {
                    var url = "/api/admin/findAllUser"
                    return $http.get(url)
                                .then(function (response) {
                                    console.log('im findall')
                                })
                }
            }
        })
})()
