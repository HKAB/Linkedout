import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

const phoneObject = new BehaviorSubject(null);

function getPhone(id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/phone/list?id=${id}`)
	.then(phone => {
		phoneObject.next(phone);
		return phone;
	})
}

function deletePhone(phone) {
	return fetchWrapper._delete(`http://127.0.0.1:8000/api/phone/delete?phone=${phone}`)
}

function createPhone(phone) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/phone/create`, {phone})
}

function updatePhone(old_phone, new_phone) {
	return fetchWrapper.put(`http://127.0.0.1:8000/api/phone/update`, {old_phone, new_phone})
}

export {
    getPhone,
    deletePhone,
    createPhone,
    updatePhone
}