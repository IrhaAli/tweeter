/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const validateForm = function() {
  const newTweet = document.forms["newTweet"]["tweet-text"].value;
  if (!newTweet) {
    alert("You must provide a Tweet");
    return false;
  }
};