import delay from '@renderer/app/utils/delay';
import axios from 'axios';

export const mockedHttpClient = axios.create({
  baseURL: 'http://localhost:3001',
});

mockedHttpClient.interceptors.response.use(async (data) => {
  await delay(1500);

  return data;
});
