(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemListController', itemListController);
    function itemListController($routeParams, currentUser, $location, itemService, userService) {
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

        model.loggedIn = (function () {
            if (currentUser ==='0') {
                return false
            }
            return true
        })

        function getTerm () {
            var term = $routeParams['itemName']
            var listOfTypes = ['HOME', 'ELECTRONICS', 'FOOD', 'SPORT', 'MEDIA', 'OTHER']
            if (listOfTypes.includes(term)) {
                model.searchGroup = 'Welcome come to catagory: ' + term
                return term
            } else {
                model.searchGroup = 'Search result for: ' + term
                return term
            }
        }

        getTerm()

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })
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
            $location.url('/i/' + item)
        }
    }
})();
