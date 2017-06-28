(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemCreateController', itemCreateController);
    function itemCreateController(currentUser, itemService, $location,userService) {
            var model = this;
        model.logout = logout;
        model.search = search;
        function search(input) {
            if (typeof input === 'undefined') {
                var url = '/'
            } else {
                url = '/s/' + input;
                $location.url(url);
            }
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })

        }

        if(currentUser.role === 'BUYER'){
                $location.url('/');
            } else {
                model.user = currentUser;
                model.create = create;
                model.cancel = cancel;
                function create(name, price, description, quantity, category, image){
                    if (name === null || name === '' || typeof name === 'undefined'){
                        model.error = "Name is required";
                        return;
                    }
                    if (price < 0.00 || price === null || price === '' || typeof price === 'undefined'){
                        model.error = 'You must input a valid price';
                        return;
                    }

                    if (description === null || description === '' || typeof description === 'undefined'){
                        model.error = "please input some description";
                        return;
                    }

                    if (quantity < 0 || Number.isInteger(quantity) || price === null || price === '' || typeof price === 'undefined'){
                        model.error = "please input a valid quantity";
                        return;
                    }
                    var types = ['HOME',"ELECTRONICS","MEDIA",'FOOD','SPORT','OTHER'];
                    if (types.indexOf(category) === -1){
                        model.error = "please identify item category (HOME,ELECTRONICS,MEDIA,FOOD,SPORT,OTHER)";
                        return;
                    }
                    if (image === null || image === '' || typeof image === 'undefined'){
                        model.error = "please input some images";
                        return;
                    }

                    var item = {
                        name : name,
                        price : parseFloat(price).toFixed(2),
                        description: description,
                        count: quantity,
                        category:category,
                        postBy: currentUser._id,
                        image: image
                    }
                    itemService
                        .createItem(item)
                        .then(function (got){
                            userService
                                .createItem(currentUser._id,got )
                                .then(function (status) {
                                    $location.url('/')
                                })

                        })


                };
                function cancel(){
                    $location.url('/')
                }
            }
        }
})();
