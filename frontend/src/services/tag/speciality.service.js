import { fetchWrapper } from "@/helpers"

function getSpecialty(query) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/tag/specialty?query=${query}`)
}


export {
    getSpecialty,
}