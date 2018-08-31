$(document).ready(($) => {
  const offset = 300;
  const offsetOpacity = 1200;
  const scrollTopDuration = 700;
  const $backToTop = $('.js-back-to-top');
  /* eslint-disable */
  $(window).scroll(function () {
    ($(this).scrollTop() > offset) ? $backToTop.addClass('back-to-top-is-visible') : $backToTop.removeClass('back-to-top-is-visible back-to-top-fade-out');
    if ($(this).scrollTop() > offsetOpacity) {
      $backToTop.addClass('back-to-top-fade-out');
    }
  });
  $backToTop.on('click', (event) => {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0,
    }, scrollTopDuration);
  });
});
