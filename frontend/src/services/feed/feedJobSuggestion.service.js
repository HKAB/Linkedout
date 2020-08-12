import { fetchWrapper } from 'helpers';
import { Config } from '../../config/consts'

function getJobSuggestions() {
  return fetchWrapper.get(Config.backendUrl + '/api/feed/suggest-job');
}

export {
  getJobSuggestions,
}