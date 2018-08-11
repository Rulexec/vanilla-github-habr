in_package('GitHubUsers', function() {

this.provide('App', App);
function App(options) {
	var api = options.api;

	var element = document.createElement('div');

	// Create needed components
	var userNameInput = new GitHubUsers.UserNameInput({
		onNameInput: onNameInput,
		onNameChange: onNameChange
	});

	var userCard = new GitHubUsers.UserCard();

	var errorElement = GitHubUsers.Dom.instantiateTemplate('error');

	var displayElements = [
		{ type: 'loading', element: GitHubUsers.Dom.instantiateTemplate('loading') },
		{ type: 'error', element: errorElement },
		{ type: 'userCard', element: userCard.getElement() }
	];

	// Append elements to DOM
	element.appendChild(userNameInput.getElement());
	userNameInput.getElement().style.marginBottom = '1em'; // HACK

	displayElements.forEach(function(x) {
		var el = x.element;
		el.style.display = 'none';
		element.appendChild(el);
	});

	var contentElements = new GitHubUsers.DomUtil.DisplayOneOf({ items: displayElements });

	// User name processing
	var activeRequest = null;

	function onNameInput(name) {
		name = name.trim();

		// Instant display of `loading` or current request result
		if (activeRequest && activeRequest.name === name) {
			activeRequest.activateState();
		} else if (name) {
			contentElements.showByType('loading');
		} else {
			contentElements.showByType(null);
		}
	}

	function onNameChange(name) {
		name = name.trim();

		// Cancel old request
		if (activeRequest && activeRequest.name !== name) {
			activeRequest.request.cancel();
			activeRequest = null;
		} else if (activeRequest) { // same name
			return;
		}

		if (!name) return;

		// Do new request
		activeRequest = {
			name: name,
			request: api.getUser({ userName: name }, onUserData),

			// method for `onNameInput`
			activateState: function() {
				contentElements.showByType('loading');
			}
		};

		activeRequest.activateState();

		function onUserData(error, data) {
			if (error) {
				activeRequest = null;
				contentElements.showByType('error');
				GitHubUsers.Dom.binding(errorElement, {
					status: error.status,
					text: error.message
				});
				return;
			}

			if (!data) {
				activeRequest.activateState = function() {
					GitHubUsers.Dom.binding(errorElement, {
						status: 404,
						text: 'Not found'
					});
					contentElements.showByType('error');
				};
				activeRequest.activateState();
				return;
			}

			activeRequest.activateState = function() {
				userCard.setData({
					userName: data.name || data.login, // `data.name` can be `null`
					userUrl: data.html_url,
					avatarImageUrl: data.avatar_url + '&s=80',

					reposCount: data.public_repos,
					reposUrl: 'https://github.com/' + data.login + '?tab=repositories',

					gistsCount: data.public_gists,
					gistsUrl: 'https://gist.github.com/' + data.login,

					followersCount: data.followers,
					followersUrl: 'https://github.com/' + data.login + '/followers'
				});

				contentElements.showByType('userCard');
			};

			activeRequest.activateState();
		}
	}

	this.getElement = function() { return element; };
}

});