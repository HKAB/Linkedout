import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

import { getEducation, deleleEducation, createEducation, updateEducation} from "./student/education.service";
import { getExperience, deleleExperience, createExperience, updateExperience} from "./student/experience.service";
import { getEmail, deleteEmail, createEmail, updateEmail } from "./email.service";
import { getPhone, deletePhone, createPhone, updatePhone } from "./phone.service";

const studentObject = new BehaviorSubject(null);

function getStudent (id) {
    let student_education = getEducation(id);
    let student_experience = getExperience(id);
    let student_email = getEmail(id);
    let student_phone = getPhone(id);    

    // TODO: Handle error here!
    let student_basic = fetchWrapper.get(`http://127.0.0.1:8000/api/student/get?id=${id}`);

    return Promise.all([
        student_basic, 
        student_education, 
        student_experience, 
        student_email, 
        student_phone
    ]).then(([  student_basic_data, 
                student_education_data, 
                student_experience_data, 
                student_email_data, 
                student_phone_data]) => {
                    let student = {};
                    student.basic_data = student_basic_data
                    student.education = student_education_data;
                    student.experience = student_experience_data;
                    student.email = student_email_data.emails;
                    student.phone = student_phone_data.phones;
                    studentObject.next(student);
                    return student;
    })
    .catch((error) =>
    {
        console.log(error);
        return {};
    });

    // return 
    // .then(student => {
    //     student.education = student_education;
    //     // student.experience = student_experience;
    //     // student.email = student_email;
    //     // student.phone = student_phone;
	// 	studentObject.next(student);
	// 	return student;
	// })
}

// basic info of student
function createBasicStudent (first_name, last_name, date_of_birth, description) {
	return fetchWrapper.post(`http://127.0.0.1:8000/api/student/create`, {first_name, last_name, date_of_birth, description})
}

function updateBasicStudent (first_name, last_name, date_of_birth, description) {
	return fetchWrapper.put(`http://127.0.0.1:8000/api/student/update`, {first_name, last_name, date_of_birth, description})
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

function updateStudentExperience(id, school_name, start_date, end_date, title, description) {
    return deleleExperience(id, school_name, start_date, end_date, title, description);
}

function createStudentExperience(company_name,start_date, end_date, title, description) {
    return createExperience(company_name,start_date, end_date, title, description);
}

function deleteStudentExperience(id) {
    return updateExperience(id);
}
//

// student education

function updateStudentEducation(id, school_name, start_name, end_date, major, degree) {
    return updateEducation(id, school_name, start_name, end_date, major, degree);
}

function createStudentEducation(school_name, start_name, end_date, major, degree) {
    return createEducation(school_name, start_name, end_date, major, degree);
}

function deleteStudentEducation(id) {
    return deleleEducation(id);
}


export const studentServices = {
    getStudent,
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



    get studentValue () { return studentObject.value}
}