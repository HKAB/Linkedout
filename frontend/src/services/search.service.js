import { fetchWrapper } from "helpers"
import { Config } from '../config/consts'

function searchData(type, query, skills, specialties){
    return fetchWrapper.get(Config.backendUrl + `/api/search?type=${type}`, {query, skills, specialties})
}

export {
    searchData
}