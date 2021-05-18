import ScrollOut from 'scroll-out';
import '../../node_modules/waypoints/lib/jquery.waypoints.min.js';
// import bootstrap from 'bootstrap';

import './helpers/carousel-multi-image.js';
import './helpers/navbar.js';

//Set up ScrollOut module. This module makes elements appear on the screen when they come into view on scroll
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
