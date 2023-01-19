$(document).ready(function() {
  console.log("Ready!");
  $("textarea").on("input", function() {
    const MAX_CHAR = 140;
    const numChar = document.getElementById('num-of-char');
    const remaining = MAX_CHAR - $(this).val().length;
    numChar.textContent = remaining;
  });
});