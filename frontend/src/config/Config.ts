import { APP_CONFIG } from './AppConfig';
import { COOKIE_CONFIG } from './CookieConfig';
import { DATE_CONFIG } from './DateConfig';

export const CONFIG = {
  ...APP_CONFIG,
  ...DATE_CONFIG,
  ...COOKIE_CONFIG,
};
