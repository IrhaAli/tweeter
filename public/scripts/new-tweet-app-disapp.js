$(document).ready(function() {
  $('#write-new-tweet').click(function() {
    // hide vs. show the form
    if ($('form').css("display") !== "none") {
      $('form').css("display", "none");
    } else {
      $('form').css("display", "block");
      window.scrollTo(0, 0);
    }
  });
});

