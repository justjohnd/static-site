import ScrollOut from 'scroll-out';
import '../../node_modules/waypoints/lib/jquery.waypoints.min.js';

import './helpers/carousel-multi-image.js';
import './helpers/navbar.js';

//Set up ScrollOut module. This module makes elements appear on the screen when they come into view on scroll
ScrollOut({
  threshold: 0.2,
  once: true,
});
