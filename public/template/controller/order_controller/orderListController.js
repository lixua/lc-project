(function () {
    angular
        .module('OnlineWebStore')
        .controller('orderListController', function () {
            var model = this
            var student = {
                name : "a"
            }
            var student1 = {
                name : "a"
            }
            model.orders = [student, student1]

            model.expand = function (order, foo) {
                if (order.isExpand === null || order.isExpand === undefined) {
                    order.isExpand = true
                } else {
                    order.isExpand = !order.isExpand
                }

            }
        })
})()
