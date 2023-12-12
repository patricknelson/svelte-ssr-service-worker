# svelte-swsr-worker

> A quick demo for rendering Svelte via _Service Worker Side Rendering_ (SWSR). Like SSR (Server Side Rendering) but within a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)!

This is a demo meant to illustrate how to get Svelte SSR in a Service Worker. It is _intentionally_ very minimal. It is
a fork of [svelte-ssr-worker](https://github.com/lukeed/svelte-ssr-worker) and lightly modified for Service Workers.
Svelte and Rollup are a bit out of date in this PoC and new projects shouldn't use this as a starting point.


## Install

```sh
$ git clone https://github.com/patricknelson/svelte-swsr-worker
$ cd svelte-swsr-worker
$ npm install
```

## Scripts

The following are `npm` scripts included in the project.<br>
They are invoked via `npm run <name>` on the command line; for example: `npm run build:dom`.

### `build`

This is an alias for _sequentially_ running the `build:dom` and `build:service-worker` scripts.

> **Note:** These are sequential because `build:service-worker` imports the `public/index.html` that `build:dom` produces.


### `build:dom`

Builds the client for production, using the `src/index.dom.js` entry point.

All files within the `/public` directory comprise your front-end client application.


### `build:service-worker`

Builds your Service Worker code, using the `src/index.service-worker.js` entry point.  The final worker file is saved to `public/build/bundle.service-worker.js`.

> **Important:** This script _must run after_ `build:dom` because it relies on its `public/index.html` output.

It's loaded via the DOM code (in `bundle.js`) via:

```js
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('build/bundle.service-worker.js');
}
```

### `start`

Starts a local development server.<br>
This is used to preview/visit your front-end application _only_.

> **Note:** This does not run your Worker code.

### `watch`

This is an alias for running the `start` and `watch:dom` scripts simultaneously.

### `watch:dom`

Watches your `src/index.dom.js` and its imports for changes.

### `watch:service-worker`

Watches your `src/index.service-worker.js` and its imports for changes.


## Deploy

You should have a storage bucket setup and attached to a CDN ahead of time.<br>
Once the CDN address is known, you will need to update the `{{CDN}}` value within `config/shared.js`.

Then, after a successful `build`, you will need to:

* Upload `public/*` to your storage bucket (or similar)
* Upload `build/index.js` to Cloudflare Workers

> **Note:** Cloudflare's `wrangler` can handle both of these steps!

You're done~! :tada:


## License

MIT © [Luke Edwards](https://lukeed.com)
