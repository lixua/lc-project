(function () {
    angular
        .module('OnlineWebStore')
        .config(Config)

    function Config ($routeProvider) {
        $routeProvider
                //User pages
                .when('/', {
                    templateUrl: 'template/view/user_pages/homepage.view.client.html',
                    controller: 'homepageController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser : checkLoggedIn2
                    }
                })//NO LOGIN
                .when('/login', {
                    templateUrl: 'template/view/user_pages/login.view.client.html',
                    controller: 'loginController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser : checkLoggedIn2
                    }
                })//NO LOGIN
                .when('/user/profile', {
                    templateUrl: 'template/view/user_pages/profile.view.client.html',
                    controller: 'profileController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }
                })
                .when('/user/o/profile/:val', {
                    templateUrl: 'template/view/user_pages/others_profile.view.client.html',
                    controller: 'otherProfileController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }

                })
                .when('/register', {
                    templateUrl: 'template/view/user_pages/register.view.client.html',
                    controller: 'registerController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser : checkLoggedIn2
                    }
                })//NO LOGIN
                .when('/s/ulist/:val', {
                    templateUrl: 'template/view/user_pages/list-users.view.client.html',
                    controller: 'userListController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }
                })
                .when('/user/cart', {
                    templateUrl: 'template/view/user_pages/shoppingCart.view.client.html',
                    controller: 'cartController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }
                })

                // Admin pages
                .when('/admin', {
                    templateUrl: 'template/view/admin_pages/admin-login.view.client.html',
                    controller: 'adminLoginController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId', {
                    templateUrl: 'template/view/admin_pages/admin-home.view.client.html',
                    controller: 'adminHomepageController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId/users', {
                    templateUrl: 'template/view/admin_pages/admin-list-user.view.client.html',
                    controller: 'adminUserlistController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId/orders', {
                    templateUrl: 'template/view/admin_pages/admin-list-orders.view.client.html',
                    controller: 'adminOrderlistController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId/items', {
                    templateUrl: 'template/view/admin_pages/admin-list-item.view.client.html',
                    controller: 'adminItemlistController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId/createUser', {
                    templateUrl: 'template/view/admin_pages/admin-createUser.view.client.html',
                    controller: 'adminCreateUserController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId/createItem', {
                    templateUrl: 'template/view/admin_pages/admin-createItem.view.client.html',
                    controller: 'adminCreateItemController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId/item/:itemId', {
                    templateUrl: 'template/view/admin_pages/admin-edit-item.view.client.html',
                    controller: 'adminEditItemController',
                    controllerAs: 'model'
                })
                .when('/admin/:adminId/user/:userId', {
                    templateUrl: 'template/view/admin_pages/admin-edit-user.view.client.html',
                    controller: 'adminEditUserController',
                    controllerAs: 'model'
                })

                //Item pages
                .when('/s/:itemName', {
                    templateUrl: 'template/view/item_pages/list-item.view.client.html',
                    controller: 'itemListController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn2
                    }
                })//NO LOGIN
                .when('/cp/:itemId', {
                    templateUrl: 'template/view/item_pages/price-compare.view.client.html',
                    controller: 'itemCompareController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }
                })//NO LOGIN
                .when('/i/:itemId', {
                    templateUrl: 'template/view/item_pages/item-detail.view.client.html',
                    controller: 'itemDetailController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn2
                    }
                })//NO LOGIN
                .when('/user/i/create', {
                    templateUrl: 'template/view/item_pages/createItem.view.client.html',
                    controller: 'itemCreateController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }
                })
                .when('/user/i/edit/:itemId', {
                    templateUrl: 'template/view/item_pages/editItem.view.client.html',
                    controller: 'itemEditController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }
                })
                // Order pages
                .when('/user/olist', {
                    templateUrl: 'template/view/order_pages/order-list.view.client.html',
                    controller: 'orderListController',
                    controllerAs: 'model',
                    resolve:{
                        currentUser: checkLoggedIn
                    }
                })
    }
    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(user){
                if(user ==='0'){
                    deferred.reject();
                    $location.url('/login')
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
    function checkLoggedIn2(userService, $q, $location){
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(user){
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

})();
