import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

const educationObject = new BehaviorSubject(null);

function getEducation(id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/education/list?id=${id}`)
	.then(education => {
		educationObject.next(education);
		return education;
	})
}

function deleleEducation(id) {
	return fetchWrapper.delete(`http://127.0.0.1:8000/api/education/delete`, {id})
}

function createEducation(school_name, start_date, end_date, major, degree) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/education/create`, {school_name, start_date, end_date, major, degree})
}

function updateEducation(id, school_name, start_date, end_date, major, degree) {
	return fetchWrapper.put(`http://127.0.0.1:8000/api/education/update`, {id, school_name, start_date, end_date, major, degree})
}

export {
    getEducation,
    deleleEducation,
    createEducation,
    updateEducation,
}