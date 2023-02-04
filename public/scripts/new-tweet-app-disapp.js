$(document).ready(() => {
  $('#write-new-tweet').on('click', newTweet);
});

// hide vs. show the form
const newTweet = function() {
  const $form = $('form');
  if ($form.css("display") !== "none") {
    $form.css("display", "none");
  } else {
    $form.css("display", "block");
    window.scrollTo(0, 0);
  }
};
