import { fetchWrapper } from '@/helpers';

export const feedFollowSuggestionService = {
  getSuggestions() {
    return fetchWrapper.get(`http://localhost:8000/api/feed/suggest-follow`);
  },
}