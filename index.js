//Used for twitter api auth
import * as crypto from 'crypto';
import OAuth from 'oauth-1.0a';

addEventListener('scheduled', event => {
  event.waitUntil(triggerPost(event));
});

const token = {
	key: TWITTER_ACCESS_TOKEN,
	secret: TWITTER_ACCESS_SECRET,
};

// Following OAuth-1.0a docs for this
const oauth = new OAuth({
	consumer: { key: TWITTER_API_KEY, secret: TWITTER_API_SECRET },
	signature_method: 'HMAC-SHA1',
	hash_function: hash_function_sha1,
});


// Following OAuth-1.0a docs for this
function hash_function_sha1(base_string, key) {
	return crypto
		.createHmac('sha1', key)
		.update(base_string)
		.digest('base64')
}

async function triggerPost(event) {
	
	var requestData = {
		method: 'POST',
		headers: oauth.toHeader(oauth.authorize(request, token)),
		data: { status : "Sent from Cloudflare Workers"}
	};
	
	const response = await fetch("https://api.twitter.com/2/tweets", {
		method: requestData.method,
		headers: oauth.toHeader(oauth.authorize(requestData, token)),
		form: requestData.data,
	});
	
	console.log(await response.json());
}