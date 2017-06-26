(function () {
    angular
        .module('OnlineWebStore')
        .controller('adminItemlistController', function ($location, adminService) {
            var model = this
            function init () {
                adminService
                    .findAllOrder()
                    .then(function (result) {
                        for (var u in result) {
                            result[u].createDate = result[u].createDate.substring(0, result[u].createDate.indexOf('T'))
                            result[u].sendDate = result[u].sendDate.substring(0, result[u].sendDate.indexOf('T'))
                            result[u].deliveryDate = result[u].deliveryDate.substring(0, result[u].deliveryDate.indexOf('T'))
                        }
                        model.items = result
                    })
            }
            init()

            model.clickPanel = (function (item) {
                $location.url('/admin/item/' + item._id)
            })
        })
})()
