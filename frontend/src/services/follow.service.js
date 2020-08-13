import { fetchWrapper } from 'helpers';

export const followService = {
  check(id) {
    return fetchWrapper.get(`http://localhost:8000/api/follow/check?id=${id}`);
  },

  getCompaniesFollowed(id) {
    return fetchWrapper.get(`http://localhost:8000/api/follow/company_followed?id=${id}`);
  },

  count(id) {
    return fetchWrapper.get(`http://localhost:8000/api/follow/count?id=${id}`);
  },

  follow(id) {
    return fetchWrapper.post(`http://localhost:8000/api/follow/create`, { id: id });
  },

  unfollow(id) {
    return fetchWrapper.delete(`http://localhost:8000/api/follow/delete`, { id: id });
  }
}