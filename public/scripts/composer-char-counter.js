$(document).ready(() => {
  $('textarea').on('input', charCount);
});

// Update character count as user inputs something in the textbox/textarea
const charCount = function() {
  const MAX_CHAR = 140;
  const $form = $(this).closest('form');
  const $numChar = $form.find('output');
  const remaining = MAX_CHAR - $(this).val().length;
  // Change color to red when input exceeds the maximum
  (remaining < 0) ? $numChar.addClass('tooManyChar') : $numChar.removeClass('tooManyChar');
  $numChar.text(remaining);
};