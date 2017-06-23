(function () {
    angular
        .module('OnlineWebStore')
        .controller('homepageController', homepageController)

    function homepageController () {
        var model = this
        model.fk = (function () {
            console.log("dgdgsfads")
        })
        // model.currentSlide = function (n) {
        //     showSlides(slideIndex = n);
        // }
        model.error = "agasdfasdfasdfa"
        console.log('here')
        // var slideIndex = 1
        // showSlides(1)
        //
        // function showSlides (n) {
        //     var i;
        //     var slides = document.getElementsByClassName("mySlides")
        //     console.log(slides)
        //     // var dots = document.getElementsByClassName("dot")
        //
        //     if (n > slides.length) {
        //         slideIndex = 1
        //     }
        //     if (n < 1) {
        //         console.log(slides.length)
        //         slideIndex = slides.length
        //     }
        //     for (i = 0; i < slides.length; i++) {
        //         slides[i].style.display = "none"
        //     }
        //     // for (i = 0; i < dots.length; i++) {
        //     //     dots[i].className = dots[i].className.replace(" active", "")
        //     // }
        //     slides[slideIndex-1].style.display = "block"
        //     // dots[slideIndex-1].className += " active"
        // }
    }
})()
