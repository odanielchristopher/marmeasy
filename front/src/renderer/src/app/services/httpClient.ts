import { localStorageKeys } from '@renderer/app/config/localStorageKeys';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (config.url?.startsWith('/dashboard/')) {
    const storageDateRange = localStorage.getItem(
      localStorageKeys.DASHBOARD_DATE_RANGE,
    );
    if (storageDateRange) {
      const { from, to } = JSON.parse(storageDateRange);

      if (from && to) {
        config.params = {
          ...config.params, // Mantém os query params existentes
          from,
          to,
        };
      }
    }
  }

  return config;
});

httpClient.interceptors.response.use(async (data) => {
  return data;
});
