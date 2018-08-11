in_package('GitHubUsers', function() {

this.provide('UserNameInput', UserNameInput);
function UserNameInput(options) {
	var onNameInput = options.onNameInput,
	    onNameChange = options.onNameChange;

	var element = GitHubUsers.Dom.instantiateTemplate('username_input');

	var debouncedChange = GitHubUsers.Util.delay(1000, function() {
		onNameChange(this.value);
	});

	GitHubUsers.Dom.binding(element, {
		onNameEdit: function() {
			onNameInput(this.value);

			debouncedChange.apply(this, arguments);
		}
	});

	this.getElement = function() { return element; };
}

});