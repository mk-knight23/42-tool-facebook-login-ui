/**
 * Logging Utility
 */

const isDevelopment = process.env.NODE_ENV !== 'production';

export const logger = {
  info: (message, data = {}) => {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, data);
    }
  },
  
  warn: (message, data = {}) => {
    console.warn(`[WARN] ${message}`, data);
  },
  
  error: (message, error = {}) => {
    console.error(`[ERROR] ${message}`, {
      message: error.message,
      stack: error.stack,
      ...error
    });
  },
  
  debug: (message, data = {}) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  }
};
