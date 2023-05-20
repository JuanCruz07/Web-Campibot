$(document).ready(function () {
  $('.image-container').click(function () {
    var $image = $(this).find('img');
    var src = $image.attr('src');
    var alt = $image.attr('alt');
    $('body').append('<div id="overlay"></div><div id="image-popup"><img src="' + src + '" alt="' + alt + '"></div>');
    $('#overlay').fadeIn('fast');
    $('#image-popup').fadeIn('fast').css('top', ($(window).height() - $('#image-popup').height()) / 0);
  });

  $(document).on('click', '#overlay', function () {
    $('#overlay, #image-popup').fadeOut('fast', function () {
      $('#overlay, #image-popup').remove();
    });
  });
});

var video = document.getElementById('myVideo');

document.querySelector('.gallery2').addEventListener('click', function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});