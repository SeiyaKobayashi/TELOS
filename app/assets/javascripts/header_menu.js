$('.fa-bars').click(function() {
  if ($(this).prev().css('display') == 'none') {
    $(this).prev().slideDown();
  } else {
    $(this).prev().slideUp();
  }
});
