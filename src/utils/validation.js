/**
 * Input Validation Utilities
 */

export const validators = {
  isEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  isUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  isRequired: (value) => {
    return value !== null && value !== undefined && value !== '';
  },
  
  minLength: (value, min) => {
    return value && value.length >= min;
  },
  
  maxLength: (value, max) => {
    return !value || value.length <= max;
  }
};

export function validateSchema(schema, data) {
  const errors = [];
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    
    if (rules.required && !validators.isRequired(value)) {
      errors.push(`${field} is required`);
    }
    
    if (rules.email && value && !validators.isEmail(value)) {
      errors.push(`${field} must be a valid email`);
    }
    
    if (rules.url && value && !validators.isUrl(value)) {
      errors.push(`${field} must be a valid URL`);
    }
    
    if (rules.minLength && !validators.minLength(value, rules.minLength)) {
      errors.push(`${field} must be at least ${rules.minLength} characters`);
    }
    
    if (rules.maxLength && !validators.maxLength(value, rules.maxLength)) {
      errors.push(`${field} must be at most ${rules.maxLength} characters`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
