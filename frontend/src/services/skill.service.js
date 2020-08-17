import { fetchWrapper } from "helpers"
import { Config } from "../config/consts"

function getSkill(id) {
  return fetchWrapper.get(Config.backendUrl + `/api/skill/list?id=${id}`)
}

function deleteSkill(skill) {
  return fetchWrapper.delete(Config.backendUrl + `/api/skill/delete`, { skill })
}

function createSkill(skill) {
  return fetchWrapper.post(Config.backendUrl + `/api/skill/create`, { skill })
}

export {
  getSkill,
  deleteSkill,
  createSkill,
}

