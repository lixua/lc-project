(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemListController',itemListController)
    function itemListController($routeParams,currentUser, itemSerivce,$location) {
            var model = this;
            model.user = currentUser;
            model.input = $routeParams['itemName'];
            model.list = itemSerivce.findItems(model.input);
            model.selectItem = selectItem;
            function selectItem(item){
                $location.url('/i/' + item._id)
            }
        }
})();
