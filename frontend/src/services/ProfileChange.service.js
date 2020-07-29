import { BehaviorSubject} from 'rxjs'

import { fetchWrapper } from "@/helpers"

function addexp(companyname, description, title, startdate, enddate){
    return fetchWrapper.post('',{companyname, description, title, startdate, enddate})
}

export const ProfileChangeServices = {
	addexp,
}