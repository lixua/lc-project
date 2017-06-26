(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemListController', itemListController);
    function itemListController($routeParams, currentUser, $location, itemService) {
        var model = this;
        model.search = search;
        model.goto = goto;
        model.logout = logout;

        function goto(){
            if(currentUser ==='0'){
                $location.url('/login');
            } else {
                $location.url('/user/profile')
            }
        }
        function logout(){
            if(currentUser ==='0'){
                $location.url('/login');
            } else {
                userService
                    .logout()
                    .then(function () {
                        $location.url('/login')
                    })
            }
        }
        function search(input){
            if(typeof input === 'undefined'){
                var url = '/'
            } else {
                url = '/s/'+input;
                $location.url(url);
            }
        }

        model.user = currentUser;
        model.input = $routeParams['itemName'];
        model.list = itemService.findItems(model.input)
            .then(function (found) {
                model.list = found;
            });
        model.selectItem = selectItem;
        function selectItem(item) {
            console.log(item)
            $location.url('/i/' + item)
        }
    }
})();
