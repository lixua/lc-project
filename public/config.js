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
                    controllAs: 'model'
                })//NO LOGIN
                .when('/login', {
                    templateUrl: 'template/view/user_pages/login.view.client.html',
                    controller: 'loginController',
                    controllAs: 'model'
                })//NO LOGIN
                .when('/user/profile', {
                    templateUrl: 'template/view/user_pages/profile.view.client.html',
                    controller: 'profileController',
                    controllAs: 'model'
                })
                .when('/user/o/profile', {
                    templateUrl: 'template/view/user_pages/others_profile.view.client.html',
                    controller: 'otherProfileController',
                    controllAs: 'model'
                })
                .when('/register', {
                    templateUrl: 'template/view/user_pages/register.view.client.html',
                    controller: 'registerController',
                    controllAs: 'model'
                })//NO LOGIN
                .when('/s/ulist', {
                    templateUrl: 'template/view/user_pages/list-users.view.client.html',
                    controller: 'userListController',
                    controllAs: 'model'
                })
                .when('/user/cart', {
                    templateUrl: 'template/view/user_pages/shoppingCart.view.client.html',
                    controller: 'cartController',
                    controllAs: 'model'
                })

                // Admin pages
                .when('/admin', {
                    templateUrl: 'template/view/admin_pages/admin-login.view.client.html',
                    controller: 'adminLoginController',
                    controllAs: 'model'
                })
                .when('/admin/home', {
                    templateUrl: 'template/view/admin_pages/admin-home.view.client.html',
                    controller: 'adminHomepageController',
                    controllAs: 'model'
                })
                .when('/admin/users', {
                    templateUrl: 'template/view/admin_pages/admin-list-user.view.client.html',
                    controller: 'adminUserlistController',
                    controllAs: 'model'
                })
                .when('/admin/orders', {
                    templateUrl: 'template/view/admin_pages/admin-list-orders.view.client.html',
                    controller: 'adminOrderlistController',
                    controllAs: 'model'
                })
                .when('/admin/items', {
                    templateUrl: 'template/view/admin_pages/admin-list-item.view.client.html',
                    controller: 'adminItemlistController',
                    controllAs: 'model'
                })
                .when('/admin/create', {
                    templateUrl: 'template/view/admin_pages/admin-create.view.client.html',
                    controller: 'adminCreateController',
                    controllAs: 'model'
                })
                .when('/admin/edit/:itemId', {
                    templateUrl: 'template/view/admin_pages/admin-edit-item.view.client.html',
                    controller: 'adminEditItemController',
                    controllAs: 'model'
                })
                .when('/admin/edit/:userId', {
                    templateUrl: 'template/view/admin_pages/admin-edit-user.view.client.html',
                    controller: 'adminEditUserController',
                    controllAs: 'model'
                })

                //Item pages
                .when('/s/:itemName', {
                    templateUrl: 'template/view/item_pages/list-item.view.client.html',
                    controller: 'itemListController',
                    controllAs: 'model'
                })//NO LOGIN
                .when('/cp/:itemId', {
                    templateUrl: 'template/view/item_pages/price-compare.view.client.html',
                    controller: 'itemCompareController',
                    controllAs: 'model'
                })//NO LOGIN
                .when('/i/:itemId', {
                    templateUrl: 'template/view/item_pages/item-detail.view.client.html',
                    controller: 'itemDetailController',
                    controllAs: 'model'
                })//NO LOGIN
                .when('/user/i/create', {
                    templateUrl: 'template/view/item_pages/createItem.view.client.html',
                    controller: 'itemCreateController',
                    controllAs: 'model'
                })
                .when('/user/i/edit/:itemId', {
                    templateUrl: 'template/view/item_pages/editItem.view.client.html',
                    controller: 'itemEditController',
                    controllAs: 'model'
                })

                // Order pages
                .when('/user/olist', {
                    templateUrl: 'template/view/order_pages/order-list.view.client.html',
                    controller: 'orderListController',
                    controllAs: 'model'
                })
                .when('/user/o/:orderId', {
                    templateUrl: 'template/view/order_pages/order-detail.view.client.html',
                    controller: 'orderDetailController',
                    controllAs: 'model'
                })
    }
})()
