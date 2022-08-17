//Used for twitter api auth
import { HmacSHA1, enc } from 'crypto-js';
import OAuth from 'oauth-1.0a';


addEventListener('scheduled', event => {
  event.waitUntil(triggerPost(event));
});


// From OAuth-1.0a docs
const oauth = new OAuth({
	consumer: { key: TWITTER_API_KEY, secret: TWITTER_API_SECRET },
	signature_method: 'HMAC-SHA1',
	hash_function: hashSha1,
});

// Hash function for OAuth using Crypto-JS HMAC-SHA1
function hashSha1(baseString, key) {
	return HmacSHA1(baseString, key).toString(enc.Base64)
}

// Will be added to request headers
const token = {
	key: TWITTER_ACCESS_TOKEN,
	secret: TWITTER_ACCESS_SECRET,
};

// Will be added to request headers
const reqAuth = {
  url: "https://api.twitter.com/2/tweets",
  method: 'POST',
};


// Triggered by Cloudflare Worker Crons to post a tweet
async function triggerPost(event) {
  
  var reqBody = JSON.stringify({
    "text": "Sent from Cloudflare Workers"
  });
  
  const response = await fetch(reqAuth.url, {
    method: reqAuth.method,
    headers: {
      ...oauth.toHeader(oauth.authorize(reqAuth, token)),
      'Content-Type': 'application/json',
    },
    body: reqBody
  });
  
	return new Response(await response.json());
}