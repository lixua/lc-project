(function () {
    angular
        .module('OnlineWebStore')
        .controller('homepageController', homepageController)
    function homepageController (currentUser, $location,userService) {
        var model = this;
        model.plusSlides = plusSlides;
        model.search = search;
        model.goto = goto;
        model.logout = logout;

        model.loggedIn = (function () {
            if (currentUser ==='0') {
                return false
            }
            return true
        })

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
