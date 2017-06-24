(function () {
    angular
        .module('OnlineWebStore')
        .factory('itemService', itemService);

    function itemService($http){
        return {
            createItem : createItem,
            findItemById : findItemById,
            findItems: findItems,
            updateItem: updateItem,
            deleteItem: deleteItem
        };

        function createItem(item) {
            var url = "/api/item/create";
            return $http.post(url, item)
                .then(function (response) {
                    return response.data;
                })
        }

        function findItemById(itemId){
            var url = '/api/item/' + itemId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }

        function findItems(input){
            var url = '/api/item?input=' + input;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function updateItem(itemId, item) {
            var url = "/api/item/update/" + itemId;
            return $http.put(url, item)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteItem(itemId) {
            var url = "/api/item/delete/" + itemId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();
