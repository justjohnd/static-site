// import bootstrap from 'bootstrap';
import ScrollOut from 'scroll-out';

import renderGalleryItem from './helpers/randomImg.js';

// //Add random unsplash images for development
renderGalleryItem(
  'js-random-img-1',
  'js-random-img-2',
  'js-random-img-3',
  'js-random-img-4'
);

//Confirm jquery is loaded (if necessary, delete for production)
// console.log($);

//This is for the Scroll Out package to properly function. This package makes elements appear on the screen when they come into view on scroll
ScrollOut({
  threshold: 0.2,
  once: true,
});

/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function ($) {
  var $window = $(window),
    $body = $('body'),
    $wrapper = $('#wrapper');

  // Play initial animations on page load.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });
})(jQuery);

//Waypoints. This code is used to change navbar on scroll past banner.
const waypoint = new Waypoint({
  element: document.getElementById('js-navbar'),
  handler: function () {
    document.getElementById('nav').classList.add('bg-white');
    document.getElementById('nav').classList.remove('bg-transparent');

    let elements = document.getElementsByClassName('nav-link'); // get all elements
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('text-white');
      elements[i].classList.add('text-dark');
    }
  },
});

// Multiple Carousel slides
$('#carousel-multi-image').on('slide.bs.carousel', function (e) {
  /*
        CC 2.0 License Iatek LLC 2018 - Attribution required
    */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  console.log(idx);
  var itemsPerSlide = 4;
  var totalItems = $('#carousel-multi-image .carousel-item').length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == 'left') {
        $('#carousel-multi-image .carousel-item')
          .eq(i)
          .appendTo('#carousel-multi-image .carousel-inner');
      } else {
        $('#carousel-multi-image .carousel-item')
          .eq(0)
          .appendTo('#carousel-multi-image .carousel-inner');
      }
    }
  }
});
