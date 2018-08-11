in_package('GitHubUsers.Util', function() {

this.provide('forEachProp', function(obj, fun) {
	for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
		fun(key, obj[key]);
	}
});

});