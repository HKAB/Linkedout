import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

const userSubject = new BehaviorSubject(null);

function login(username, password) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/account/login`, {username, password})
	.then(user => {
		userSubject.next(user);
		// start refresh token timer
		return user;
	})
}

function register(username, email, password, account_type) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/account/register`, {username, password, email, account_type})
}

export const accountServices = {
	login,
	register,
	get userValue () { return userSubject.value }
}