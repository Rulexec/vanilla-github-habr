in_package('GitHubUsers.Dom', function() {

this.provide('binding', function(element, options) {
	options = options || {};

	var binding = {};

	handleAttribute('data-element', function(el, name) {
		binding[name] = el;
	});

	handleAttribute('data-text', function(el, key) {
		var text = options[key];
		if (typeof text !== 'string' && typeof text !== 'number') return;

		el.innerText = text;
	});

	handleAttribute('data-src', function(el, key) {
		var src = options[key];
		if (typeof src !== 'string') return;

		el.src = src;
	});

	handleAttribute('data-href', function(el, key) {
		var href = options[key];
		if (typeof href !== 'string') return;

		el.href = href;
	});

	handleAttribute('data-onedit', function(el, key) {
		var handler = options[key];
		if (typeof handler !== 'function') return;

		el.addEventListener('keyup', handler);
		el.addEventListener('change', handler);
	});

	function handleAttribute(attribute, fun) {
		var elements = element.querySelectorAll('[' + attribute + ']');
		for (var i = 0; i < elements.length; i++) {
			var el = elements[i],
			    attributeValue = el.getAttribute(attribute);

			fun(el, attributeValue);
		}
	}

	return binding;
});

});