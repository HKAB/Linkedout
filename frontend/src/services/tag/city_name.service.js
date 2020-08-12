import { fetchWrapper } from "helpers"
import { Config } from "../../config/consts"

function getCityName(query) {
  return fetchWrapper.get(Config.backendUrl + `/api/tag/location?query=${query}`)
}


export {
  getCityName,
}

