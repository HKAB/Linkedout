import { fetchWrapper } from "@/helpers"
import { Config } from "../../config/consts"

function getSkillName(query) {
  return fetchWrapper.get(Config.backendUrl + `/api/tag/skill?query=${query}`)
}


export {
  getSkillName,
}
