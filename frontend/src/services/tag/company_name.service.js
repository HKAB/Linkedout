import { fetchWrapper } from "@/helpers"
import { Config } from "../../config/consts"

function getCompanyName(query) {
  return fetchWrapper.get(Config.backendUrl + `/api/tag/company?query=${query}`)
}


export {
  getCompanyName,
}
