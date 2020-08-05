import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

function getJob(job_id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/job/get?id=${job_id}`)
}

function listJob(account_id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/job/get?id=${account_id}`)
}

function deleteJob(job_id) {
	return fetchWrapper._delete(`http://127.0.0.1:8000/api/job/delete`, {job_id})
}

function createJob(title, description, seniority_level, employment_type, recruiment_level, cities, skills) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/job/create`, {title, description, seniority_level, employment_type, recruiment_level, cities, skills})
}

function updateJob(job_id, title, description, seniority_level, employment_type, recruiment_level, cities, skills) {
	return fetchWrapper.put(`http://127.0.0.1:8000/api/job/update`, {job_id, title, description, seniority_level, employment_type, recruiment_level, cities, skills})
}

export {
    getJob,
    listJob,
    deleteJob,
    createJob,
    updateJob
}