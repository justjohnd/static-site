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
