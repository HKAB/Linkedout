import { fetchWrapper } from "@/helpers"

function getSkillName(query) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/tag/skill?query=${query}`)
}


export {
    getSkillName,
}