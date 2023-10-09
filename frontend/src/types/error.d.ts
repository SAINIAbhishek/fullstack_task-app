import { AxiosError } from 'axios';

declare type Error = AxiosError & {
  message: string;
  statusCode: string;
};
