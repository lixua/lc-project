(function () {
    angular
        .module('OnlineWebStore')
        .controller('itemEditController', itemEditController);
    function itemEditController(currentUser, itemService, $location,$routeParams) {
        var model = this;
        if(currentUser.role === 'BUYER'){
            $location.url('/');
        } else {
            model.itemId = $routeParams['itemId'];
            model.user = currentUser;
            model.update = update;
            model.cancel = cancel;
            function update(name, price, description, quantity, category, image){
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
                };
                itemService
                    .updateItem(model.itemId,item)
                    .then(function (status){
                        $location.url('/')
                    })


            };
            function cancel(){
                $location.url('/')
            }
        }
    }
})();
