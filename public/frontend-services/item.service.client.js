(function () {
    angular
        .module('OnlineWebStore')
        .factory('itemService', function ($http) {
            return {
                "createItem" : function (item) {
                    var url = '/api/item/create'
                    return $http.post(url, item)
                                .then(function (response) {
                                    console.log('im createItem')
                                })

                },
                "findItemById" : function (id) {
                    var url = '/api/item/' + id
                    return $http.get(url)
                                .then(function (response) {
                                    console.log('im findItemById')
                                })
                },
                "searchItem" : function (input) {
                    var url = '/api/item/' + input
                    return $http.get(url)
                                .then(function (response) {
                                    console.log('im searchItem')
                                })
                },
                "updateItem" : function (id, item) {
                    var url = '/api/item/' + id
                    return $http.put(url, item)
                                .then(function (response) {
                                    console.log('im updateItem')
                                })
                },
                "deleteItem" : function (id) {
                    var url = '/api/item/' + id
                    return $http.delete(url)
                                .then(function (response) {
                                    console.log('im deleteItem')
                                })
                },
                "findAll" : function () {
                    var url = '/api/admin/item/all'
                    return $http.get(url)
                                .then(function (response) {
                                    console.log('im findAll')
                                })
                },
            }
        })
})()
