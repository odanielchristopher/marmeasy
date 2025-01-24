import { localStorageKeys } from '@renderer/app/config/localStorageKeys';
import delay from '@renderer/app/utils/delay';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use(async (data) => {
  await delay(1500);

  return data;
});
