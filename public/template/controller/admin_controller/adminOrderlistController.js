(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminOrderlistController', function ($location, adminService) {
            var model = this

            function init () {
                adminService
                    .findAllItem()
                    .then(function (result) {
                        for (var u in result) {
                            result[u].createDate = result[u].createDate.substring(0, result[u].createDate.indexOf('T'))
                        }
                        console.log(result)
                        model.items = result
                    })
            }
            init()
        })
})()
