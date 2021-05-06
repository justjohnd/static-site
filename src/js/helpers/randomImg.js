function renderGalleryItem(id) {
  let randomNumber = Math.floor(Math.random() * 242);
  fetch(
    `https://source.unsplash.com/collection/1163637/480x480/?sig=${randomNumber}`
  ).then((response) => {
    document.getElementById('id').src = response.url;
  });
}

export default renderGalleryItem;
