import { fetchWrapper } from "@/helpers";
import { BehaviorSubject } from 'rxjs';
import { Config } from '../../config/consts';


const experienceSubject = new BehaviorSubject(null);

function getExperience(id) {
  return fetchWrapper.get(Config.backendUrl + `/api/experience/list?id=${id}`)
    .then(experiences => {
      experienceSubject.next(experiences);
      return experiences;
    })
}

function deleleExperience(id) {
  return fetchWrapper.delete(Config.backendUrl + `/api/experience/delete`, { id })
}

function createExperience(company_name, start_date, end_date, title, description) {
  console.log(company_name);
  return fetchWrapper.post(Config.backendUrl + `/api/experience/create`, { company_name, start_date, end_date, title, description })
}

function updateExperience(id, company_name, start_date, end_date, title, description) {
  return fetchWrapper.put(Config.backendUrl + `/api/experience/update`, { "id": id, "experience": { company_name, start_date, end_date, title, description } })
}

export {
  getExperience,
  deleleExperience,
  createExperience,
  updateExperience,
};
