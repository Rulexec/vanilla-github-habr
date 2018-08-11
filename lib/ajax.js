in_package('GitHubUsers.Http', function() {

this.provide('doRequest', function(options, callback) {
	var url;

	if (typeof options === "string") {
		url = options;
		options = {};
	} else {
		if (!options) options = {};
		url = options.url;
	}

	var method = options.method || "GET",
	    headers = options.headers || [],
	    body = options.body,
	    dataType = options.dataType || "json",
	    timeout = options.timeout || 10000;

	var old_callback = callback;
	callback = function() {
		callback = function(){}; // ignore all non-first calls
		old_callback.apply(this, arguments);
	};

	var isAborted = false;

	var request = new XMLHttpRequest();

	// force timeout
	var timeoutId = setTimeout(function() {
		timeoutId = 0;
		if (!isAborted) { request.abort(); isAborted = true; }
		callback({msg: "fetch_timeout", request: request, opts: options});
	}, timeout);

	request.addEventListener("load", function() {
		var error = null;

		if (request.status !== 200) {
			error = { type: 'not200', status: request.status };
		}

		if (typeof request.responseText === "string") {
			if (dataType !== "json") {
				callback(error, request.responseText);
				return;
			}

			var parsed;

			try {
				parsed = JSON.parse(request.responseText);
			} catch (e) {
				callback(e);
				return;
			}

			if (parsed) {
				callback(error, parsed);
			} else {
				callback({msg: "bad response", request: request});
			}
		} else {
			callback({msg: "no response text", request: request});
		}
	});
	request.addEventListener("error", function() {
		callback({msg: "request_error", request: request});
	});

	request.open(method, url, true /*async*/);

	request.timeout = timeout;
	request.responseType = "";

	headers.forEach(function(header) {
		try {
			request.setRequestHeader(header[0], header[1]);
		} catch (e) {}
	});

	try {
		if (body) request.send(body);
		else request.send();
	} catch (e) {
		callback({exception: e, type: 'send'});
	}

	return {
		cancel: function() {
			if (!isAborted) { request.abort(); isAborted = true; }

			if (timeoutId) { clearTimeout(timeoutId); timeoutId = 0; }
		}
	};
});

});