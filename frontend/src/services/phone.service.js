import { fetchWrapper } from "@/helpers"
import { Config } from '../config/consts'


function getPhone(id) {
  return fetchWrapper.get(Config.backendUrl + `/api/phone/list?id=${id}`)
}

function deletePhone(phone) {
  return fetchWrapper.delete(Config.backendUrl + `/api/phone/delete`, { phone })
}

function createPhone(phone) {
  return fetchWrapper.post(Config.backendUrl + `/api/phone/create`, { phone })
}

function updatePhone(old_phone = "", new_phone) {
  return fetchWrapper.put(Config.backendUrl + `/api/phone/update`, { old_phone, new_phone })
}

export {
  getPhone,
  deletePhone,
  createPhone,
  updatePhone
}
