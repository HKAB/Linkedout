import { fetchWrapper } from "@/helpers"

function getCityName(query) {
	return fetchWrapper.get(`http://127.0.0.1:8000/api/tag/location?query=${query}`)
}


export {
    getCityName,
}