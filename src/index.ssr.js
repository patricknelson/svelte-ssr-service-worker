// @ts-ignore - built via DOM config
import HTML from '../public/index.html';
import App from './App.svelte';

addEventListener('fetch', event => {
	const req = event.request;
	const url = new URL(req.url);

	// Just cache resources containing a dot and, for everything else, perform our Svelte SSR instead.
	if (url.pathname.includes('.')) {
		return;
	}

	// use `/[pathname]` if not root
	const name = url.pathname.substring(1) || 'friend';

	const ssr = App.render({ name });

	let inject_head = ssr.head || '';
	if (ssr.css && ssr.css.code) {
		inject_head += `<style>${ssr.css.code}</style>`;
	}

	const output =
		HTML // Inject SSR'd header & body contents
			.replace('<!-- {{INJECT.HEAD}} -->', inject_head)
			.replace('<!-- {{INJECT.BODY}} -->', ssr.html + ' <- this was ssr!?')
	;

	console.log('sw:', event.request);

	event.respondWith(
		new Response(output, {
			status: 200,
			headers: {
				'content-type': 'text/html;charset=UTF-8'
			}
		})
	);
});
