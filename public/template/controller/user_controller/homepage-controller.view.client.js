(function () {
    angular
        .module('OnlineWebStore')
        .controller('homepageController', homepageController)
    function homepageController(currentUser, $location){
        var model = this;
        model.plusSlides = plusSlides;
        model.search = search;
        var user = currentUser;
        var userId = user._id;
        if(user ==='0'){
            model.ifLoggedin = "Login";
            model.goto = '#!/login'
        } else {
            model.ifLoggedin = user.username;
            model.goto = '#!/user/profile'
        }
        function search(input){

            if(typeof input === 'undefined'){
                var url = '/'
            } else {
                console.log(input)
                url = '/s/'+input;
                console.log(url)
                $location.url(url);
            }


        }

        function plusSlides(n) {
            showSlides(slideIndex += n)
        }
        function showSlides(n) {
            var slides = document.getElementsByClassName("mySlides")
            if (n > slides.length) {
                slideIndex = 1
            }
            if (n < 1) {
                slideIndex = slides.length
            }
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.display = "none"
            }
            slides[slideIndex-1].style.display = "block"
        }
        var slideIndex = 1;
        showSlides(slideIndex)
    }

})();