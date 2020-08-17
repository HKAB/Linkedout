import { fetchWrapper } from 'helpers';
import { Config } from '../../config/consts'

function getFeedPost() {
  return fetchWrapper.get(Config.backendUrl + '/api/feed/get');
}

export {
    getFeedPost,
}