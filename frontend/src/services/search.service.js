import { fetchWrapper } from "helpers"
import { Config } from '../config/consts'

function search(type, query, skills, specialties) {
    console.log(`/api/search?type=${type}&query=${query}&skills=${skills}&specialties=${specialties}`);
    return fetchWrapper.get(Config.backendUrl + `/api/search?type=${type}&query=${query}&skills=${skills}&specialties=${specialties}`)
}

export const searchServices = {
    search,
}