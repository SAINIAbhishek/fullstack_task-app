import { AxiosError } from 'axios';

declare type Error = AxiosError & {
  readonly message: string;
  readonly statusCode: string;
};
