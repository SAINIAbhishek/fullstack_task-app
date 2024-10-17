import axios, { Method } from 'axios';
import { API_BASE_URL } from '@/config';
import { getAccessToken } from '@/lib/react-cookie';
import logger from '@/utils/log';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxContentLength: 5 * 1000 * 1000, // bytes => 5 MB,
});

/**
 * Request interceptor for logging and error handling
 */
instance.interceptors.request.use(
  (config) => {
    logger.log(
      'Network Request:',
      `${config.baseURL}${config.url}`,
      config.method,
    );
    return config;
  },
  async (error) => {
    const { request } = error;

    logger.error('Network Request Error: ', request);

    return Promise.reject({
      ...request,
      message: request?.data?.message || 'Request failed',
      statusCode: request?.data?.statusCode || 500,
    });
  },
);

/**
 * Response interceptor for handling successful and failed responses
 */
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const { response } = error;

    logger.error('Network Response Error: ', response);

    return Promise.reject({
      ...response,
      message: response?.data?.message || 'An error occurred',
      statusCode: response?.data?.statusCode || response?.status || 500,
      status: response?.status || 500, // HTTP status code
      data: response?.data || null,
    });
  },
);

/**
 * Define the response type for network requests
 */
type NetworkResponse<T extends object | null> = {
  readonly statusCode: number; // custom code from the server
  readonly status: number; // HTTP status code
  readonly message: string;
  readonly data?: T | null; // Data is optional and can be null
};

/**
 * Define the structure for network request
 */
type NetworkRequest<T extends object | null> = {
  url: string;
  method: Method;
  data?: T;
  params?: object;
};

type NetworkAuthRequest<T extends object | null> = NetworkRequest<T> & {
  headers?: { Authorization: string };
};

// Helper to handle request logic
async function makeRequest<T extends object | null, R extends object | null>(
  request: NetworkRequest<T>,
  authRequired: boolean = false,
): Promise<NetworkResponse<R>> {
  try {
    if (authRequired) {
      const token = getAccessToken();

      if (token) {
        (request as NetworkAuthRequest<T>).headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    }
    const response = await instance.request<NetworkResponse<R>>({
      ...request,
      withCredentials: authRequired,
    });

    const responseData = response?.data;

    // Ensure response and data are defined, and default to null if not
    return {
      ...responseData,
      data: responseData?.data || null, // Safe check to avoid accessing undefined
    };
  } catch (error) {
    // Handle error and ensure message and statusCode are provided
    return Promise.reject(error);
  }
}

/**
 * Public request without authentication
 * @T : Request Body Type
 * @R : Response Body type
 */
export async function publicRequest<
  T extends object | null,
  R extends object | null,
>(request: NetworkRequest<T>): Promise<NetworkResponse<R>> {
  return makeRequest<T, R>(request, false);
}

/**
 * Protected request with authentication
 * @T : Request Body Type
 * @R : Response Body type
 */
export async function protectedRequest<
  T extends object | null,
  R extends object | null,
>(request: NetworkRequest<T>): Promise<NetworkResponse<R>> {
  return makeRequest<T, R>(request, true);
}
