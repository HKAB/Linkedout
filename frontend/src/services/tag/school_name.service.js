import { fetchWrapper } from "@/helpers"

function getSchoolName(query) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/tag/school?query=${query}`)
}


export {
    getSchoolName,
}