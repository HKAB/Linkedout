import { fetchWrapper } from '@/helpers';

export const feedJobSuggestionService = {
  getSuggestions() {
    return fetchWrapper.get('http://localhost:8000/api/feed/suggest-job');
  },
}