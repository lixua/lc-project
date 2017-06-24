(function () {
    angular
        .module('OnlineWebStore')
        .controller('loginController', loginController);
    function loginController($location, userService) {
            var model = this;
            model.login = login;
            function login(username, password){
                console.log(username, password);
                userService
                    .login(username, password)
                    .then(renderLogin, handleError);
                function handleError(error){
                    model.message = "Username or password does not match, please try again!";
                }
                function renderLogin(found){
                    console.log(found)
                    if(found !== null){
                        $location.url('/');
                    } else{
                        handleError();
                    }

                }
            }
    }
})();
