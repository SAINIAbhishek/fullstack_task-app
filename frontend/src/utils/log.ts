import { LOGGING } from '@/config';

// Logger Utility for cleaner logging management
const isLogEnabled = LOGGING === 'true';

const logger = {
  log: (message: string, ...optionalParams: any[]) => {
    if (isLogEnabled) console.log(message, ...optionalParams);
  },
  error: (message: string, ...optionalParams: any[]) => {
    if (isLogEnabled) console.error(message, ...optionalParams);
  },
};

export default logger;
