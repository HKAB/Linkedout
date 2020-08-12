import { fetchWrapper } from "helpers"
import { Config } from "../../config/consts"

function getSpecialty(query) {
  return fetchWrapper.get(Config.backendUrl + `/api/tag/specialty?query=${query}`)
}

function getSpecialityById(id) {
  return fetchWrapper.get(Config.backendUrl + `/api/tag/specialty/list?id=${id}`)
}

export {
  getSpecialty,
  getSpecialityById
}

