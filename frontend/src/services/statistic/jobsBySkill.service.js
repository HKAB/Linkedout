import { fetchWrapper } from 'helpers';
import { Config } from '../../config/consts';

function getJobsBySkill() {
  return fetchWrapper.get(Config.backendUrl + '/api/statistic/jobs-by-skill');
}

export {
  getJobsBySkill
};
