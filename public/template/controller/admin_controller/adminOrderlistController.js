(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminOrderlistController', function ($location, adminService,$routeParams) {
            var model = this;
            model.adminId = $routeParams['adminId'];
            model.admin = adminService
                .findAdminById(model.adminId)
                .then(function(found){
                    model.admin = found;
                })

                function init () {
                    adminService
                        .findAllOrder()
                        .then(function (result) {
                            for (var u in result) {
                                result[u].createDate = result[u].createDate.substring(0, result[u].createDate.indexOf('T'))
                                // result[u].sendDate = result[u].sendDate.substring(0, result[u].sendDate.indexOf('T'))
                                // result[u].deliveryDate = result[u].deliveryDate.substring(0, result[u].deliveryDate.indexOf('T'))
                            }
                            model.orders = result
                        })
                }
            init()
        })
})()
