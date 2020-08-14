import { fetchWrapper } from 'helpers';
import { Config } from '../config/consts';

export const postService = {
    createPost(title, content, skills){
        return fetchWrapper.post(Config.backendUrl+ `/api/post/create`, {title, content, skills})
    },
    deletePost(id){
        return fetchWrapper.delete(Config.backendUrl+ `/api/post/delete`, {id})
    },
    getPost(id){
        return fetchWrapper.get(Config.backendUrl+ `/api/post/get?id=${id}`);
    },
    listPost(id){
        return fetchWrapper.get(Config.backendUrl+ `/api/post/list?id=${id}`)
    },
    updatePost(id, title, content, skills){
        return fetchWrapper.put(Config.backendUrl+ `/api/post/update`,{id, title, content, skills});
    },

  }