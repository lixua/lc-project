(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemListController',itemListController);
    function itemListController($routeParams,currentUser,$location,itemService) {

            var model = this;
            model.user = currentUser;
            model.input = $routeParams['itemName'];
            model.list = itemService.findItems(model.input)
                .then(function(found){
                    model.list = found;
                });
            model.selectItem = selectItem;
            function selectItem(item){
                console.log(item)
                $location.url('/i/' + item)
            }
        }
})();
