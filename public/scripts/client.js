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
      <p>
        ${tweet['content']['text']}
      </p>
      <footer>
        <h5>${tweet['created_at']}</h5>
        <ul>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
        </ul>
      </footer>
      </article>`);
    return $tweet;
  };

  // Validates the tweet submitted
  const validate = function(tweetText) {
    if (!tweetText) {
      return 'Please type something and be sure that it is not malicious';
    } else if (tweetText.length > 140) {
      return 'You typed too much';
    }
    return '';
  };

  // Deals with the event of form submission
  $('form').submit(function(event) {
    // Initial settings
    event.preventDefault();
    $('#errMess').removeClass('errMessStyle');
    $('#errMess').html('');

    // Get validity of the tweet NEEDS TO PROTECT AGAINS MAL
    const $tweetText = $('textarea').val();
    const valMess = validate($tweetText);
    // valid vs. invalid tweet
    if (!valMess) {
      // if tweet is valid send it to the server then prepend it to all tweets and clear textbox/textarea
      const tweetObj = { name: 'Irha', avatar: "/images/profile-hex.png", handle: "@IrhaAli", text: $tweetText };
      $.post("/tweets", tweetObj)
        .then(function(response) {
          const $tweet = createTweetElement(response);
          $('#tweets-container').prepend($tweet);
        });
      $('textarea').val('');
    } else {
      // if not valid then compose error message and add styling to it
      const errorHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${valMess} <i class="fa-solid fa-triangle-exclamation"></i>`;
      $('#errMess').html(errorHTML);
      $('#errMess').addClass('errMessStyle');
    }
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
    if ($('form').html()) {
      $('form').html('');
    } else {
      // format by row: optional h5 for any error message then textarea then submit button and character count
      $('form').html("<h5 id='errMess'></h5> <textarea name='text' type='text' placeholder='What art thou hummning about?'></textarea><div><button type='submit'>Tweet</button><output for='tweet-text'>140</output></div>");
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

