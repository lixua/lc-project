(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminUserlistController', function ($location, adminService,$routeParams) {
            var model = this
            function init () {
                model.adminId = $routeParams['adminId'];
                model.admin = adminService
                    .findAdminById(model.adminId)
                    .then(function(found){
                        model.admin = found;
                    })
                model.users = adminService
                    .findAllUser()
                    .then(function (result) {
                        model.users = result
                    })
            }
            init();

            model.clickPanel = (function (user) {
                $location.url('/admin/'+model.adminId+'/user/' + user._id)
            })
        })
})()
