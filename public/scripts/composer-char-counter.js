$(document).ready(function() {
  // Update character count as user inputs something in the textbox/textarea
  $("#tweet-text").on("input", function() {
    const MAX_CHAR = 140;
    const numChar = document.getElementById('num-of-char');
    const remaining = MAX_CHAR - $(this).val().length;
    // Change color to red when input exceeds the maximum
    numChar.style.color = (remaining < 0) ? "red" : "black";
    numChar.textContent = remaining;
  });
});