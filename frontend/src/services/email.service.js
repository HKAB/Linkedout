import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

const emailObject = new BehaviorSubject(null);

function getEmail(id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/email/list?id=${id}`)
	.then(email => {
		emailObject.next(email);
		return email;
	})
}

function deleteEmail(email) {
	return fetchWrapper._delete(`http://127.0.0.1:8000/api/email/delete?email=${email}`)
}

function createEmail(email) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/email/create`, {email})
}

function updateEmail(old_email, new_email) {
	return fetchWrapper.put(`http://127.0.0.1:8000/api/email/update`, {old_email, new_email})
}

export {
    getEmail,
    deleteEmail,
    createEmail,
    updateEmail,
};
