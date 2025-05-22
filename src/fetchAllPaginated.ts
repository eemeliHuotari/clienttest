import axios from 'axios';
import { API_BASE } from './config';

export async function fetchAllPaginated<T>(endpoint: string): Promise<T[]> {
  let results: T[] = [];
  let url: string | null = endpoint;

  while (url) {
    // Only prepend API_BASE if the URL is not absolute
    const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;

    const res = await axios.get(fullUrl);
    const data = res.data;

    results = [...results, ...(data.results || data)];

    // Normalize `next` to a relative path
    if (data.next?.startsWith('http')) {
      const parsed = new URL(data.next);
      url = parsed.pathname + parsed.search;
    } else {
      url = data.next || null;
    }
  }

  return results;
}
