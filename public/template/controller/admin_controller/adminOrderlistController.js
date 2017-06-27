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
                    .findAllItem()
                    .then(function (result) {
                        for (var u in result) {
                            result[u].createDate = result[u].createDate.substring(0, result[u].createDate.indexOf('T'))
                        }
                        model.items = result
                    })
            }
            init()
        })
})()
