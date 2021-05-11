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
