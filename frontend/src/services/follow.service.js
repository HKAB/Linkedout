import { fetchWrapper } from 'helpers';
import { Config } from '../config/consts';

export const followService = {
  check(id) {
    return fetchWrapper.get(Config.backendUrl + `/api/follow/check?id=${id}`);
  },

  getCompaniesFollowed(id) {
    return fetchWrapper.get(Config.backendUrl + `/api/follow/company-followed?id=${id}`);
  },

  count(id) {
    return fetchWrapper.get(Config.backendUrl + `/api/follow/count?id=${id}`);
  },

  follow(id) {
    return fetchWrapper.post(Config.backendUrl + `/api/follow/create`, { id: id });
  },

  unfollow(id) {
    return fetchWrapper.delete(Config.backendUrl + `/api/follow/delete`, { id: id });
  }
}