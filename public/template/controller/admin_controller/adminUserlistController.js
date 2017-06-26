(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminUserlistController', function ($location, adminService) {
            var model = this
            function init () {
                adminService
                    .findAllUser()
                    .then(function (result) {
                        for (var u in result) {
                            result[u].dob = result[u].dob.substring(0, result[u].dob.indexOf('T'))
                            result[u].createDate = result[u].createDate.substring(0, result[u].createDate.indexOf('T'))
                        }
                        model.users = result
                    })
            }
            init()

            model.clickPanel = (function (user) {
                $location.url('/admin/user/' + user._id)
            })
        })
})()
