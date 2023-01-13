import axios, { AxiosRequestConfig } from 'axios';

export async function getFromHahow(config: AxiosRequestConfig) {
  const { data } = await axios(config);
  if (data.code) {
    throw new Error(data.message);
  }
  return data;
}
