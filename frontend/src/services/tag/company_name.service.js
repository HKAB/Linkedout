import { fetchWrapper } from "@/helpers"

function getCompanyName(query) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/tag/company?query=${query}`)
}


export {
    getCompanyName,
}