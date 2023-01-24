$(document).ready(function() {
  // When user scrolls down show the button
  window.addEventListener("scroll", () => {
    // Make the button appear vs. remove when user manually scrolls up
    if (window.pageYOffset > 20) {
      $('#scroll-to-top').css("display", "block");
    } else {
      $('#scroll-to-top').css("display", "none");
    }
  });

  // When the user clicks on the button, scroll to the top of the page
  $('#scroll-to-top').click(function() {
    window.scrollTo(0, 0);
    $('#scroll-to-top').css("display", "none");
  });
});

