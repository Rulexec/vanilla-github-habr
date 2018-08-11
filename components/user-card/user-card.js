in_package('GitHubUsers', function() {

this.provide('UserCard', UserCard);
function UserCard() {
	var element = GitHubUsers.Dom.instantiateTemplate('usercard');

	this.getElement = function() { return element; };

	this.setData = function(data) {
		GitHubUsers.Dom.binding(element, data);
	};
}

});