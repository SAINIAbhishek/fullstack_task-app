import axios, { Method } from 'axios';
import { API_BASE_URL, LOGGING, NODE_ENV } from '@/config';
import { getAccessToken } from '@/lib/react-cookie';

const isLogEnabled = NODE_ENV !== 'production' && LOGGING == 'true';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxContentLength: 5 * 1000 * 1000, // bytes => 5 MB,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    if (isLogEnabled)
      console.log(
        'Network Request: ',
        `${config.baseURL}${config.url}`,
        config.method,
      );
    return config;
  },
  async (error) => {
    if (isLogEnabled) console.error('Network Request Error: ', error);
    return Promise.reject({
      ...error.request,
      ...error.request.data,
    });
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (isLogEnabled) console.error('Network Response Error: ', error);
    return Promise.reject({
      ...error.response,
      ...error.response.data,
    });
  },
);

type NetworkResponse<T extends object | null> = {
  readonly statusCode: string;
  readonly message: string;
  readonly data?: T;
};

type NetworkRequest<T extends object | null> = {
  url: string;
  method: Method;
  data?: T;
  params?: object;
};

type NetworkAuthRequest<T extends object | null> = NetworkRequest<T> & {
  headers?: { Authorization: string };
};

/**
 * @T : Request Body Type
 * @R : Response Body type
 */
export async function publicRequest<
  T extends object | null,
  R extends object | null,
>(request: NetworkRequest<T>): Promise<NetworkResponse<R>> {
  const { data } = await instance.request<NetworkResponse<R>>(request);
  return data;
}

/**
 * @T : Request Body Type
 * @R : Response Body type
 */
export async function protectedRequest<
  T extends object | null,
  R extends object | null,
>(request: NetworkRequest<T>): Promise<NetworkResponse<R>> {
  try {
    (request as NetworkAuthRequest<T>).headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    const { data } = await instance.request<NetworkResponse<R>>({
      ...request,
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
