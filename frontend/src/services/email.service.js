import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

function getEmail(id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/email/list?id=${id}`)
}

function deleteEmail(email) {
	return fetchWrapper.delete(`http://127.0.0.1:8000/api/email/delete`, {email})
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
