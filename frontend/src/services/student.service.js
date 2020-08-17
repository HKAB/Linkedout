import { fetchWrapper } from "helpers";
import { BehaviorSubject } from 'rxjs';
import { Config } from '../config/consts';
import { createEmail, deleteEmail, getEmail, updateEmail } from "./email.service";
import { createPhone, deletePhone, getPhone, updatePhone } from "./phone.service";
import { createSkill, deleteSkill, getSkill } from "./skill.service";
import { createEducation, deleleEducation, getEducation, updateEducation } from "./student/education.service";
import { createExperience, deleleExperience, getExperience, updateExperience } from "./student/experience.service";
import { getJobSuggestions } from './feed/feedJobSuggestion.service';
import { getFollowSuggestions } from './feed/feedFollowSuggestion.service';
import { getFeedPost } from './feed/feedPost.service';
import { createPostInterested, getAccountInterestPost, getPostInterested } from './student/interest.service'
const studentObject = new BehaviorSubject(null);

function getStudent(id) {
  let student_education = getEducation(id);
  let student_experience = getExperience(id);
  let student_email = getEmail(id);
  let student_phone = getPhone(id);
  let student_skill = getSkill(id);
  // TODO: Handle error here!
  let student_basic = fetchWrapper.get(Config.backendUrl + `/api/student/get?id=${id}`);

  return Promise.all([
    student_basic,
    student_education,
    student_experience,
    student_email,
    student_phone,
    student_skill,
  ]).then(([student_basic_data,
    student_education_data,
    student_experience_data,
    student_email_data,
    student_phone_data,
    student_skill_data,]) => {
    let student = {};
    student.basic_data = student_basic_data
    student.education = student_education_data;
    student.experience = student_experience_data;
    student.email = student_email_data.emails;
    student.phone = student_phone_data.phones;
    student.skill = student_skill_data.skills;
    studentObject.next(student);
    return student;
  })
}

function viewStudent(id) {
  let student_education = getEducation(id);
  let student_experience = getExperience(id);
  let student_email = getEmail(id);
  let student_phone = getPhone(id);
  let student_skill = getSkill(id);
  // TODO: Handle error here!
  let student_basic = fetchWrapper.get(Config.backendUrl + `/api/student/get?id=${id}`);

  return Promise.all([
    student_basic,
    student_education,
    student_experience,
    student_email,
    student_phone,
    student_skill,
  ]).then(([student_basic_data,
    student_education_data,
    student_experience_data,
    student_email_data,
    student_phone_data,
    student_skill_data,]) => {
    let student = {};
    student.basic_data = student_basic_data
    student.education = student_education_data;
    student.experience = student_experience_data;
    student.email = student_email_data.emails;
    student.phone = student_phone_data.phones;
    student.skill = student_skill_data.skills;
    return student;
  })
}

// basic info of student
function createBasicStudent(firstname, lastname, dateofbirth, description, gender) {
  return fetchWrapper.post(Config.backendUrl + `/api/student/create`, { firstname, lastname, dateofbirth, description, gender })
    .catch((error) => {
      console.log(error);
      return {};
    });
}

function updateBasicStudent(firstname, lastname, dateofbirth, gender, description) {
  return fetchWrapper.put(Config.backendUrl + `/api/student/update`, { firstname, lastname, dateofbirth, gender, description })
}
//

// student email
function updateStudentEmail(old_email, new_email) {
  return updateEmail(old_email, new_email);
}

function createStudentEmail(email) {
  return createEmail(email);
}

function deleteStudentEmail(email) {
  return deleteEmail(email);
}


// student phone
function updateStudentPhone(old_phone, new_phone) {
  return updatePhone(old_phone, new_phone);
}

function createStudentPhone(phone) {
  return createPhone(phone);
}

function deleteStudentPhone(phone) {
  return deletePhone(phone);
}
//

// student experience

function updateStudentExperience(id, company_name, start_date, end_date, title, description) {
  return updateExperience(id, company_name, start_date, end_date, title, description);
}

function createStudentExperience(company_name, start_date, end_date, title, description) {
  return createExperience(company_name, start_date, end_date, title, description);
}

function deleteStudentExperience(id) {
  return deleleExperience(id);
}
//

// student education

function updateStudentEducation(id, school_name, start_date, end_date, major, degree) {
  return updateEducation(id, school_name, start_date, end_date, major, degree);
}

function createStudentEducation(school_name, start_date, end_date, major, degree) {
  return createEducation(school_name, start_date, end_date, major, degree);
}

function deleteStudentEducation(id) {
  return deleleEducation(id);
}

// student skill

function getStudentSkill(id) {
  return getSkill(id);
}

function createStudentSkill(skill) {
  return createSkill(skill);
}

function deleteStudentSkill(skill) {
  return deleteSkill(skill);
}
// student post


function uploadStudentPictureProfile(data) {
  return fetchWrapper.post_multipartdata(Config.backendUrl + '/api/student/upload', data)
}

//

function getStudentJobSuggestion() {
  return getJobSuggestions();
}

function getStudentFollowSuggestion() {
  return getFollowSuggestions();
}
//

function getStudentFeedPost() {
  return getFeedPost();
}

export const studentServices = {
  getStudent,
  viewStudent,
  createBasicStudent,
  updateBasicStudent,

  updateStudentEmail,
  createStudentEmail,
  deleteStudentEmail,

  updateStudentPhone,
  createStudentPhone,
  deleteStudentPhone,

  updateStudentEducation,
  createStudentEducation,
  deleteStudentEducation,

  updateStudentExperience,
  createStudentExperience,
  deleteStudentExperience,

  getStudentSkill,
  createStudentSkill,
  deleteStudentSkill,

  uploadStudentPictureProfile,

  getStudentJobSuggestion,
  getStudentFollowSuggestion,
  getStudentFeedPost,

  createPostInterested,
  getPostInterested,
  getAccountInterestPost,

  get studentValue() { return studentObject.value },
  studentObject
}