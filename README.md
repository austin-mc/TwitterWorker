# TwitterWorker

Posts a tweet on a user specified schedule through Twitter API v2 using a Cron Trigger on Cloudflare Workers. Tweet content is stored using Cloudflare Workers KV.

## Installation

Check out the Cloudflare Workers [getting started guide](https://developers.cloudflare.com/workers/get-started/guide/).

`npm install -g wrangler`

`wrangler login`

`wrangler init <worker name>`

`npm install oauth-1.0a`

`npm install crypto-js`


## Local development

`wrangler dev`

## Production

`wrangler publish`