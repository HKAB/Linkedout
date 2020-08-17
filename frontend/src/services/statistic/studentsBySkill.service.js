import { fetchWrapper } from 'helpers';
import { Config } from '../../config/consts';

function getStudentsBySkill() {
  return fetchWrapper.get(Config.backendUrl + '/api/statistic/students-by-skill');
}

export {
  getStudentsBySkill
};
