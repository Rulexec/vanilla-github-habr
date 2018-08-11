window.in_package = function(path, fun) {
	path = path.split('.');

	var obj = path.reduce(function(acc, p) {
		var o = acc[p];

		if (!o) {
			o = {};
			acc[p] = o;
		}

		return o;
	}, window);

	fun.call({
		provide: function(name, value) {
			obj[name] = value;
		}
	});
};