(function(){

function onReady() {
	GitHubUsers.Dom.consumeTemplates(document.getElementById('templates'));

	var rootEl = document.getElementById('root');

	var app = new GitHubUsers.App({
		api: new GitHubUsers.GitHubApi()
	});

	rootEl.appendChild(app.getElement());
}

switch (document.readyState) {
case 'interactive':
case 'complete':
	onReady();
	break;
default:
	document.addEventListener('readystatechange', onReadyStateChanged);
}

function onReadyStateChanged() {
	switch (document.readyState) {
	case 'interactive':
	case 'complete':
		document.removeEventListener('readystatechange', onReadyStateChanged);
		onReady();
		break;
	}
}

})();