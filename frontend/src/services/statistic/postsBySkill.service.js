import { fetchWrapper } from 'helpers';
import { Config } from '../../config/consts';

function getPostsBySkill() {
  return fetchWrapper.get(Config.backendUrl + '/api/statistic/posts-by-skill');
}

export {
  getPostsBySkill
};
