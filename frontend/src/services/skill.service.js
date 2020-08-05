import { fetchWrapper } from "@/helpers"

function getSkill(id) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/skill/list?id=${id}`)
}

function deleteSkill(skill) {
	return fetchWrapper.delete(`http://127.0.0.1:8000/api/skill/delete`, {skill})
}

function createSkill(skill) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/skill/create`, {skill})
}

export {
    getSkill,
    deleteSkill,
    createSkill,
}