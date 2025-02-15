$(document).ready(() => {
  // Loads the tweets when the page is first visited or refreshed
  loadTweets();

  // Deals with the event of form submission
  $('form').on('submit', submitTweet);
});

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
          <img src="${tweet.user.avatar}" title="My avatar">
          <h5>&nbsp;${tweet.user.name}</h5>
        </div>
        <h5>${tweet.user.handle}</h5>
      </header>
      <p class="tweet-content"></p>
      <footer>
        <h5>${timeago.format(tweet.createdAt)}</h5>
        <ul>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
        </ul>
      </footer>
      </article>`);
  // To avoid cross-site scripting
  $tweet.find('.tweet-content').text(tweet.content.text);
  return $tweet;
};

// Loads the tweets when page is visited/reloaded by user
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(response) {
      const tweets = response;
      renderTweets(tweets);
    })
    .catch(function(error) {
      console.log(error);
    });
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

const submitTweet = function(event) {
  // Initial settings
  event.preventDefault();
  const $errorMessage = $(this).find('#errMess');
  const $textArea = $(this).find('textarea');

  // Get validity of the tweet
  const $tweetText = $textArea.val();
  const validTweet = validate($tweetText);

  // valid vs. invalid tweet
  if (!validTweet) {
    $errorMessage.css("display", "block");
    return;
  }
  // if tweet is valid send it to the server then prepend it to all tweets and clear textbox/textarea
  const tweetObj = { name: 'Irha', avatar: "/images/profile-hex.png", handle: "@IrhaAli", text: $tweetText };
  $.post("/tweets", tweetObj)
    .then(function(response) {
      $errorMessage.css("display", "none");
      const $tweet = createTweetElement(response);
      $('#tweets-container').prepend($tweet);
      $textArea.val('');
      $(this).find('output').text('140');
    })
    .catch(function(error) {
      console.log(error);
    });
};
