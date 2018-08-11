in_package('GitHubUsers.Util', function() {

this.provide('delay', function(timeout, fun) {
	var timeoutId = 0;

	return function() {
		var that = this,
		    args = arguments;

		if (timeoutId) clearTimeout(timeoutId);

		timeoutId = setTimeout(function() {
			timeoutId = 0;

			fun.apply(that, args);
		}, timeout);
	};
});

});