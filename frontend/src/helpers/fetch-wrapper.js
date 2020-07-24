

export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete
}

function get(url) {
	const requestOptions = {
		method: "GET",
		header: authHeader(url)
	}
	return fetch(url, requestOptions).then(handleRequest)
}

function post(url, body) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json", ...authHeader(url) },
		credentials: "include",
		body: JSON.stringify(body)
	}
	return fetch(url, requestOptions).then(handleRequest)
}

function put(url, body) {
	const requestOptions = {
		method: "PUT",
		header: { "Content-Type": "application/json", ...authHeader(url) },
		credentials: "include",
		body: JSON.stringify(body)
	}
	return fetch(url, requestOptions).then(handleRequest)
}

function _delete(url) {
	const requestOptions = {
		method: "DELETE",
		header: authHeader(url)
	}
	return fetch(url, requestOptions).then(handleRequest)
}


function authHeader(url) {
	return {}
}

function handleRequest(response) {
	return response.text().then(text => {
		const data = JSON.parse(text);

		if (!response.ok) {
			const error = (data && data.detail) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}

