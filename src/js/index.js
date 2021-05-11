import bootstrap from 'bootstrap';

import renderGalleryItem from './helpers/randomImg.js';

//Add random unsplash images for development
renderGalleryItem(
  'js-random-img-1',
  'js-random-img-2',
  'js-random-img-3',
  'js-random-img-4'
);

//Confirm jquery is loaded (if necessary, delete for production)
console.log($);

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
