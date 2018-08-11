in_package('GitHubUsers.Dom', function() {

var templatesMap = new Map();

this.provide('consumeTemplates', function(containerEl) {
	var templates = containerEl.querySelectorAll('[data-template-id]');

	for (var i = 0; i < templates.length; i++) {
		var templateEl = templates[i],
		    templateId = templateEl.getAttribute('data-template-id');

		templatesMap.set(templateId, templateEl);

		templateEl.parentNode.removeChild(templateEl);
	}

	if (containerEl.parentNode) containerEl.parentNode.removeChild(containerEl);
});

this.provide('instantiateTemplate', function(templateId) {
	var templateEl = templatesMap.get(templateId);

	return templateEl.cloneNode(true);
});

});