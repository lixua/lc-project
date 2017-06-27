(function () {
    angular
        .module('OnlineWebStore')
        .factory('adminService', adminService);
    function adminService($http){
        return {
            findAdminByCredentials : findAdminByCredentials,
            findAllOrder: findAllOrder,
            findAllUser: findAllUser,
            findAllItem: findAllItem,
            findAdminById: findAdminById

        };

        function findAdminById(adminId){
            var url = "/api/adminfindid/" + adminId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }
        function findAdminByCredentials(username, password) {
            var url = "/api/admin?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllOrder(){
            var url = '/api/admin/allorder';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function findAllUser(){
            var url = '/api/admin/alluser';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function findAllItem(){
            var url = '/api/admin/allitem';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
