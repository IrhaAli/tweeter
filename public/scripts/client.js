// Wrap out code to protect any data from being in global scope.
$(document).ready(function() {

  // Renders the articles/tweets provided
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  // Returns a tweet element for the tweet provided
  const createTweetElement = function(tweet) {
    /* Tweet format:
      header: avatar, name and userid
      body: the tweet
      footer: timestamp and like, flag, share icons
    */
    const $tweet = $(`
      <article>
      <header>
        <div>
          <img src="${tweet['user']['avatar']}" title="My avatar">
          <h5>&nbsp;${tweet['user']['name']}</h5>
        </div>
        <h5>${tweet['user']['handle']}</h5>
      </header>
      <p class="tweet-content"></p>
      <footer>
        <h5>${timeago.format(tweet['created_at'])}</h5>
        <ul>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
        </ul>
      </footer>
      </article>`);
    $tweet.find('.tweet-content').text(tweet.content.text);
    return $tweet;
  };

  // Validates the tweet submitted
  const validate = function(tweetText) {
    if (!tweetText) {
      $('#errMess').text('Please type something');
      return false;
    } else if (tweetText.length > 140) {
      $('#errMess').text('You typed too much');
      return false;
    }
    return true;
  };

  // Deals with the event of form submission
  $('form').submit(function(event) {
    // Initial settings
    event.preventDefault();

    // Get validity of the tweet NEEDS TO PROTECT AGAINS MAL
    const $tweetText = $('textarea').val();
    const validTweet = validate($tweetText);
    // valid vs. invalid tweet
    if (!validTweet) {
      // if not valid then compose error message and add styling to it
      $('#errMess').css("display", "block");
      return;
    }
    // if tweet is valid send it to the server then prepend it to all tweets and clear textbox/textarea
    const tweetObj = { name: 'Irha', avatar: "/images/profile-hex.png", handle: "@IrhaAli", text: $tweetText };
    $.post("/tweets", tweetObj)
      .then(function(response) {
        $('#errMess').css("display", "none");
        const $tweet = createTweetElement(response);
        $('#tweets-container').prepend($tweet);
        $('textarea').val('');
      });
  });

  // Loads the tweets when page is visited/reloaded by user
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(response) {
        const tweets = response;
        renderTweets(tweets);
      });
  };

  loadTweets();

  // Deals with form appearance/disappearance
  $('#write-new-tweet').click(function() {
    // hide vs. show the form
    if ($('form').css("display") !== "none") {
      $('form').css("display", "none");
    } else {
      // format by row: optional h5 for any error message then textarea then submit button and character count
      $('form').css("display", "block");
    }
  });

  // Scroll to the top button
  // When user scrolls down show the button
  window.addEventListener("scroll", () => {
    // Make the button appear vs. remove when user manually scrolls up
    if (window.pageYOffset > 20) {
      $('#scroll-to-top').html('<button type="click" title="Go to top">Top</button>');
    } else {
      $('#scroll-to-top').html('');
    }
  });

  // When the user clicks on the button, scroll to the top of the page
  $('#scroll-to-top').click(function() {
    window.scrollTo(0, 0);
    $('#scroll-to-top').html('');
  });
});

