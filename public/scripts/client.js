// Wrap out code to protect any data from being in global scope.
$(document).ready(function() {
  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article>
      <header>
        <div>
          <img src="${tweet['user']['avatars']}">
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
          <a href=""><i class="fa-solid fa-heart"></i></a>
          <a href=""><i class="fa-solid fa-flag"></i></a>
          <a href=""><i class="fa-solid fa-retweet"></i></a>
        </ul>
      </footer>
      </article>`);
    return $tweet;
  };

  const validate = function(tweetText) {
    if (!tweetText) {
      return 'Please type something.';
    } else if (tweetText.length > 140) {
      return 'You typed too much';
    }
    return '';
  };

  $('form').submit(function(event) {
    event.preventDefault();
    const tweet = ($('#tweet-text').val());
    const valMess = (!$('#tweet-text').text() && tweet) ? 'Trying to be malicious, eh. IDIOT MUAHAHAHA' : validate(tweet);
    if (!valMess) {
      const tweet = { user: 'IrhaAli', text: tweet };
      $.post("/tweets", tweet)
        .then(function(response) {
          const handle = response['user'];
          response['user'] = {
            handle,
            avatars: "/images/profile-hex.png",
            name: 'Irha'
          };
          const $tweet = createTweetElement(response);
          $('#tweets-container').prepend($tweet);
        });
      $('#tweet-text').val('');
    } else {
      const errorHTML = `<h5>${valMess}</h5>`;
      $('#new-tweet').append(errorHTML);
    }
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(response) {
        const tweets = response;
        renderTweets(tweets);
      });
  };

  loadTweets();
});