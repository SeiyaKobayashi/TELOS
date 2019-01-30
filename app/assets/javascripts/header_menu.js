$('.fa-bars').click(function() {
  if ($(this).parent().siblings().css('display') == 'none') {
    $(this).parent().siblings().slideDown();
  } else {
    $(this).parent().siblings().slideUp();
  }
});
