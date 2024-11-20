import { CONFIG } from '@/config/Config';

// Logger Utility for cleaner logging management
const isLogEnabled = CONFIG.LOGGING === 'true';

const logger = {
  log: (message: string, ...optionalParams: unknown[]) => {
    if (isLogEnabled) console.log(message, ...optionalParams);
  },
  error: (message: string, ...optionalParams: unknown[]) => {
    if (isLogEnabled) console.error(message, ...optionalParams);
  },
};

export default logger;
