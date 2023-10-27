import axios, { AxiosError, isAxiosError } from 'axios';

import { localStorageKeys } from '../config/localStorageKeys';

export interface ApiDefaultErrorResponse {
  message?: string;
}

// eslint-disable-next-line prettier/prettier
export interface ApiErrorResponse extends AxiosError<ApiDefaultErrorResponse> { }

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiException = (error: any) => {
  if (error.response.status === 403) {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    window.location.href = '/login';
  }
  if (!isAxiosError(error)) {
    return {
      message: error.message,
      date: error.timestamp,
      code: error.code,
    };
  }

  const axiosError = error as ApiErrorResponse;

  return {
    message: axiosError.response?.data?.message || 'Ocorreu um erro inesperado',
    date: null,
    code: axiosError.response?.status,
  };
};
