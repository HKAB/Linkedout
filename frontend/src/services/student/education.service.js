import { fetchWrapper } from "helpers";
import { BehaviorSubject } from 'rxjs';
import { Config } from '../../config/consts';


const educationObject = new BehaviorSubject(null);

function getEducation(id) {
  return fetchWrapper.get(Config.backendUrl + `/api/education/list?id=${id}`)
    .then(education => {
      educationObject.next(education);
      return education;
    })
}

function deleleEducation(id) {
  return fetchWrapper.delete(Config.backendUrl + `/api/education/delete`, { id })
}

function createEducation(school_name, start_date, end_date, major, degree) {
  return fetchWrapper.post(Config.backendUrl + `/api/education/create`, { school_name, start_date, end_date, major, degree })
}

function updateEducation(id, school_name, start_date, end_date, major, degree) {
  return fetchWrapper.put(Config.backendUrl + `/api/education/update`, { id, school_name, start_date, end_date, major, degree })
}

export {
  getEducation,
  deleleEducation,
  createEducation,
  updateEducation,
};

