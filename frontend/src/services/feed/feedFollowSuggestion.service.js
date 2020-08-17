import { fetchWrapper } from 'helpers';
import { Config } from '../../config/consts';

function getFollowSuggestions() {
  return fetchWrapper.get(Config.backendUrl + '/api/feed/suggest-follow');
}

export {
  getFollowSuggestions
};
