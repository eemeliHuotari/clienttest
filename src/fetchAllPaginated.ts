import axios from 'axios';
import { API_BASE } from './config';

export async function fetchAllPaginated<T>(endpoint: string): Promise<T[]> {
  let results: T[] = [];
  let url = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;

  while (url) {
    const res = await axios.get(`${API_BASE}${url}`);
    const data = res.data;

    results = [...results, ...(data.results || data)];

    // Remove full base URL from `next` to avoid duplicated hostnames
    if (data.next) {
      const nextUrl = new URL(data.next);
      url = nextUrl.pathname + nextUrl.search;
    } else {
      url = '';
    }
  }

  return results;
}
