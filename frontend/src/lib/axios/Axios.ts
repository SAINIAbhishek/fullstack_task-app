import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { CONFIG } from '@/config/Config';
import { getAccessToken } from '@/lib/react-cookie/ReactCookie';
import logger from '@/helpers/LogHelper';
import { ApiResponseError } from '@/types/ApiBaseType';

const instance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxContentLength: 5 * 1000 * 1000, // bytes => 5 MB,
});

/**
 * Request interceptor for logging and error handling
 */
instance.interceptors.request.use((config) => {
  logger.log(
    'Network Request:',
    `${config.baseURL}${config.url}`,
    config.method,
  );
  return config;
});

/**
 * Response interceptor for handling successful and failed responses
 */
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      const axiosResponse = error.response as AxiosResponse<ApiResponseError>;

      logger.error('Network Response Error: ', axiosResponse);

      const { statusCode, message } = axiosResponse.data;

      return Promise.reject({
        message: message || 'An unexpected server error occurred.',
        statusCode: statusCode || axiosResponse?.status || 500,
        status: axiosResponse?.status || 500, // HTTP status code
        data: axiosResponse?.data || null,
      });
    }

    logger.error('Network Response Error: ', error);

    return Promise.reject({
      message: 'An unexpected server error occurred.',
      statusCode: 500,
      status: 500,
      data: null,
    });
  },
);

/**
 * Define the response type for network requests
 */
type NetworkResponse<T extends object | null> = ApiResponseError & {
  readonly status: number; // HTTP status code
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
