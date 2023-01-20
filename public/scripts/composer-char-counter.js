$(document).ready(function() {
  $("textarea").on("input", function() {
    const MAX_CHAR = 140;
    const numChar = document.getElementById('num-of-char');
    const remaining = MAX_CHAR - $(this).val().length;
    if (remaining < 0) {
      numChar.style.color = 'red';
    }
    numChar.textContent = remaining;
  });
});