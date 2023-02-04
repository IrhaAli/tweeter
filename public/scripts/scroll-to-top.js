$(document).ready(() => {
  const $scrollTopButton = $('#scroll-to-top');
  scrollToTop($scrollTopButton);
  scrollToTopPressed($scrollTopButton);
});

// When user scrolls down show the button
const scrollToTop = function($scrollTopButton) {
  window.addEventListener("scroll", () => {
    // Make the button appear vs. remove when user manually scrolls up
    if (window.pageYOffset > 20) {
      $scrollTopButton.css("display", "block");
    } else {
      $scrollTopButton.css("display", "none");
    }
  });
};

// When the user clicks on the button, scroll to the top of the page
const scrollToTopPressed = function($scrollTopButton) {
  $scrollTopButton.click(() => {
    window.scrollTo(0, 0);
    $scrollTopButton.css("display", "none");
  });
};