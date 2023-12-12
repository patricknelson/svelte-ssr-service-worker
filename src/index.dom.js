import App from './App.svelte';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('build/bundle.service-worker.js');
}

export default new App({
	target: document.body,
	hydrate: true,
	props: {
		name: location && location.pathname.substring(1) || 'world'
	}
});
