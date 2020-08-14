import { fetchWrapper } from 'helpers';
import { Config } from '../../config/consts';


function createPost(title, content, skills){
    return fetchWrapper.post(Config.backendUrl+ `/api/post/create`, {title, content, skills})
}
function deletePost(id){
    return fetchWrapper.delete(Config.backendUrl+ `/api/post/delete`, {id})
}
function getPost(id){
    return fetchWrapper.get(Config.backendUrl+ `/api/post/get?id=${id}`);
}
function listPost(id){
    return fetchWrapper.get(Config.backendUrl+ `/api/post/list?id=${id}`)
}
function updatePost(id, title, content, skills){
    return fetchWrapper.put(Config.backendUrl+ `/api/post/update`,{id, title, content, skills});
}

function uploadPostPicture(data) {
    return fetchWrapper.post_multipartdata(Config.backendUrl + '/api/post/upload', data)
  }

export const postServices = {
    createPost,
    deletePost,
    getPost,
    listPost,
    updatePost,

    uploadPostPicture
}