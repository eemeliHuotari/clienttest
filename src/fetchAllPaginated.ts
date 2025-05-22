import axios from 'axios';
import { API_BASE } from './config';

export async function fetchAllPaginated<T>(endpoint: string): Promise<T[]> {
  let results: T[] = [];
  let url = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;

  while (url) {
    // ✅ Only add API_BASE if it's a relative URL
    const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
    const res = await axios.get(fullUrl);
    const data = res.data;

    results = [...results, ...(data.results || data)];

    // ✅ Set `url` to the next relative path (if absolute, strip base)
    if (data.next) {
      try {
        const nextUrl = new URL(data.next);
        url = nextUrl.pathname + nextUrl.search;
      } catch {
        // If parsing fails (not a full URL), assume it's already relative
        url = data.next;
      }
    } else {
      url = '';
    }
  }

  return results;
}
