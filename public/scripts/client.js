// Wrap out code to protect any data from being in global scope.
$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet = $(`
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

  renderTweets(data);
  
  $('form').submit(function(event) {
    event.preventDefault();
    const tweet = $('#new-tweet').serialize();
    $.post("/", tweet, function(data) {
      
    });
  });

});