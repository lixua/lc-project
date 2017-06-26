(function () {
    angular
        .module('OnlineWebStore')
        .controller('loginController', loginController);
    function loginController(currentUser,$location, userService) {
        var model = this;
        var user = currentUser;
        model.login = login;
        model.search = search;
        function search(input) {
            if (typeof input === 'undefined') {
                var url = '/'
            } else {
                url = '/s/' + input;
                $location.url(url);
            }


        }

        function login(username, password) {
            userService
                .login(username, password)
                .then(renderLogin, handleError);
            function handleError(error) {
                model.message = "Username or password does not match, please try again!";
            }

            function renderLogin(found) {
                if (found !== null) {
                    $location.url('/');
                } else {
                    handleError();
                }

            }
        }
    }
})();
