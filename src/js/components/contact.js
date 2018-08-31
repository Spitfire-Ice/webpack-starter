import 'bootstrap-validator/js/validator';

$(() => {
  $('#contact-form').validator();

  $('#contact-form').on('submit', (e) => {
    if (e.isDefaultPrevented()) {
      const url = 'contact.php';

      $.ajax({
        type: 'POST',
        url,
        data: $(this).serialize(),
        success(data) {
          const alertType = `alert-${data.type}`;
          const messageText = data.message;
          const alertTemplate = `<div class="alert ${alertType} alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>${messageText}</div>`;

          if (alertType && messageText) {
            $('#contact-form').find('.messages').html(alertTemplate);
            // empty the form
            $('#contact-form')[0].reset();
          }
        },
      });
      return true;
    }
    return false;
  });
});
