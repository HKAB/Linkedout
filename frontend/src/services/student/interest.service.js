import { fetchWrapper } from "helpers";
import { BehaviorSubject } from 'rxjs';
import { Config } from '../../config/consts';

function getPostInterested() {
    return fetchWrapper.get(Config.backendUrl + `/api/interest/post-interested`)
}

function createPostInterested(id) {
    return fetchWrapper.post(Config.backendUrl + `/api/interest/create`, {id})
}

function deletePostInterested(id) {
    return fetchWrapper.delete(Config.backendUrl + `/api/interest/delete`, {id})
}

function countPostInterested(id) {
    return fetchWrapper.get(Config.backendUrl + `/api/interest/count?id=${id}`)
}

function checkPostInterested(id) {
    return fetchWrapper.get(Config.backendUrl + `/api/interest/check?id=${id}`)
}

function getAccountInterestPost(id) {
    return fetchWrapper.get(Config.backendUrl + `/api/interest/account-interested?id=${id}`)
}


export {
    getPostInterested,
    createPostInterested,
    deletePostInterested,
    countPostInterested,
    checkPostInterested,
    getAccountInterestPost
};

