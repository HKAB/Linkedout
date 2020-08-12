import { fetchWrapper } from "helpers"
import { Config } from "../../config/consts"

function getSchoolName(query) {
  return fetchWrapper.get(Config.backendUrl + `/api/tag/school?query=${query}`)
}


export {
  getSchoolName,
}

