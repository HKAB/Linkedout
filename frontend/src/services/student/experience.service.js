import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

const experienceSubject = new BehaviorSubject(null);

function getExperience(id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/experience/list?id=${id}`)
	.then(experiences => {
		experienceSubject.next(experiences);
		return experiences;
	})
}

function deleleExperience(id) {
	return fetchWrapper._delete(`http://127.0.0.1:8000/api/experience/delete?id=${id}`)
}

function createExperience(company_name,start_date, end_date, title, description) {
	console.log(company_name);
	return fetchWrapper.post(`http://127.0.0.1:8000/api/experience/create`, {company_name,start_date, end_date, title, description})
}

function updateExperience(id, school_name, start_date, end_date, title, description) {
	return fetchWrapper.put(`http://127.0.0.1:8000/api/experience/update`, {id, school_name, start_date, end_date, title, description})
}

export {
    getExperience,
    deleleExperience,
    createExperience,
    updateExperience,
}