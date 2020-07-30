
import { accountServices } from "@/services"

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
	const user = accountServices.userValue;

	const isLoggedIn = user && user.access_token

	if (isLoggedIn) {
		return {Authorization: `Bearer ${user.access_token}`};
	}
	else {
		return {}
	}
}

function handleRequest(response) {
	// console.log(response);
	return response.text().then(text => {
		const data = JSON.parse(text);

		if (!response.ok) {
			const error = (data && data.detail) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}

