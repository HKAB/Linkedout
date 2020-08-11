import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"
import { Config } from '../config/consts';
// import { getEducation, deleleEducation, createEducation, updateEducation} from "./company/education.service";
// import { getExperience, deleleExperience, createExperience, updateExperience} from "./company/experience.service";
import { getEmail, deleteEmail, createEmail, updateEmail } from "./email.service";
import { getPhone, deletePhone, createPhone, updatePhone } from "./phone.service";
import { jobServices } from "./job.service";
import { getSpecialityById } from './tag/speciality.service';

const companyObject = new BehaviorSubject(null);

function getCompany(account_id) {
    let company_email = getEmail(account_id);
    let company_phone = getPhone(account_id);    
    let list_job = jobServices.listJob(account_id);
    // TODO: Handle error here!
    let company_basic = fetchWrapper.get(Config.backendUrl + `/api/company/get?id=${account_id}`);
    // {
    //     "name": "Facebook",
    //     "website": "facebook.com",
    //     "profile_picture": "/media/agriculture-background-bell-pepper-broccoli-1414651_CILReVl.jpg",
    //     "specialties": [
    //       "An hai"
    //     ],
    //     "description": "We are anonymous, we are invincible"
    //   }

    return Promise.all([
        company_basic, 
        company_email, 
        company_phone,
        list_job,
    ]).then(([  company_basic_data, 
                company_email_data, 
                company_phone_data,
                company_listjob_data,
                ]) => {
                    let company = {};
                    company.basic_data = company_basic_data;
                    company.email = company_email_data.emails;
                    company.phone = company_phone_data.phones;
                    company.job = company_listjob_data;
                    companyObject.next(company);
                    return company;
    })
    .catch((error) =>
    {
        console.log(error);
        return {};
    });
}

// basic info of company
function createBasicCompany (name, website, specialties, description) {
    return fetchWrapper.post(Config.backendUrl + `/api/company/create`, { name, website, specialties, description })
    .catch((error) =>
    {
        console.log(error);
        return {};
    });
}

function updateBasicCompany (name, website, specialties, description) {
	return fetchWrapper.put(Config.backendUrl + `/api/company/update`, { name, website, specialties, description })
}
//

// company email
function updateCompanyEmail(old_email, new_email) {
    return updateEmail(old_email, new_email);
}

function createCompanyEmail(email) {
    return createEmail(email);
}

function deleteCompanyEmail(email) {
    return deleteEmail(email);
}


// company phone
function updateCompanyPhone(old_phone, new_phone) {
    return updatePhone(old_phone, new_phone);
}

function createCompanyPhone(phone) {
    return createPhone(phone);
}

function deleteCompanyPhone(phone) {
    return deletePhone(phone);
}
//
function uploadCompanyPictureProfile(data) {
    return fetchWrapper.post_multipartdata('http://127.0.0.1:8000/api/company/upload', data)
    .catch(error => {
        console.log(error);
    });
}

export const companyServices = {
    getCompany,
    createBasicCompany,
    updateBasicCompany,

    createCompanyEmail,
    updateCompanyEmail,
    deleteCompanyEmail,

    createCompanyPhone,
    updateCompanyPhone,
    deleteCompanyPhone,

    uploadCompanyPictureProfile,

    get companyValue () { return companyObject.value},
    companyObject
}