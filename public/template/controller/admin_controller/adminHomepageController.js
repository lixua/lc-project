(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminHomepageController',adminHomepageController);
    function adminHomepageController(adminService,$routeParams) {
            var model = this;
            model.adminId = $routeParams['adminId'];
            model.admin = adminService
                .findAdminById(model.adminId)
                .then(function (found) {
                    model.admin = found;
                })
        }
})()
