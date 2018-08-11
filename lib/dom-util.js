in_package('GitHubUsers.DomUtil', function() {

this.provide('DisplayOneOf', function(options) {
	var items = options.items;

	var obj = {};

	items.forEach(function(item) { obj[item.type] = item; });

	var lastDisplayed = null;

	this.showByType = function(type) {
		if (lastDisplayed) {
			lastDisplayed.element.style.display = 'none';
		}

		if (!type) {
			lastDisplayed = null;
			return;
		}

		lastDisplayed = obj[type];

		lastDisplayed.element.style.display = '';
	};
});

});