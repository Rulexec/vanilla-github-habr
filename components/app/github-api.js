in_package('GitHubUsers', function() {

this.provide('GitHubApi', GitHubApi);
function GitHubApi() {
	this.getUser = function(options, callback) {
		var url = 'https://api.github.com/users/' + options.userName;

		return GitHubUsers.Http.doRequest(url, function(error, data) {
			if (error) {
				if (error.type === 'not200') {
					if (error.status === 404) callback(null, null);
					else callback({ status: error.status, message: data && data.message });
				} else {
					callback(error);
				}
				return;
			}

			// TODO: validate `data` against schema
			callback(null, data);
		});
	};
}

});