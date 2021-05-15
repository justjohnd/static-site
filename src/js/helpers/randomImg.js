function renderGalleryItem() {
  for (let i = 0; i < arguments.length; i++) {
    let imageId = arguments[i];
    let randomNumber = Math.floor(Math.random() * 242);
    fetch(
      `https://source.unsplash.com/collection/1163637/1024x768/?sig=${randomNumber}`
    ).then((response) => {
      document.getElementById(imageId).src = response.url;
    });
  }
}

// export default test;
export default renderGalleryItem;

// Place this in index.js:
// import renderGalleryItem from './helpers/randomImg.js';

// //Add random unsplash images for development
// renderGalleryItem(
//   'js-random-img-1',
//   'js-random-img-2',
//   'js-random-img-3',
//   'js-random-img-4'
// );
