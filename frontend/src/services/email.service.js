import { fetchWrapper } from "helpers"
import { Config } from '../config/consts'


function getEmail(id) {
  return fetchWrapper.get(Config.backendUrl + `/api/email/list?id=${id}`)
}

function deleteEmail(email) {
  return fetchWrapper.delete(Config.backendUrl + `/api/email/delete`, { email })
}

function createEmail(email) {
  return fetchWrapper.post(Config.backendUrl + `/api/email/create`, { email })
}

function updateEmail(old_email, new_email) {
  return fetchWrapper.put(Config.backendUrl + `/api/email/update`, { old_email, new_email })
}

export {
  getEmail,
  deleteEmail,
  createEmail,
  updateEmail,
}

