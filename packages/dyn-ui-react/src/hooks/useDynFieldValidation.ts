/**
 * Validation hook for DYN UI form components
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import { useState, useCallback } from 'react';
import type { ValidationRule } from '../types/field.types';

interface UseFieldValidationOptions {
  value: any;
  required?: boolean;
  validation?: ValidationRule[];
  customError?: string;
}

export const useDynFieldValidation = ({
  value,
  required,
  validation,
  customError
}: UseFieldValidationOptions) => {
  const [error, setError] = useState<string>('');

  const validate = useCallback(async (): Promise<boolean> => {
    // Clear previous error
    setError('');

    // Custom error takes precedence
    if (customError) {
      setError(customError);
      return false;
    }

    // Required validation
    if (required) {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        setError('Este campo é obrigatório');
        return false;
      }
    }

    // Custom validation rules
    if (validation && value !== undefined && value !== null && value !== '') {
      for (const rule of validation) {
        let isValid = true;
        let errorMessage = rule.message;

        switch (rule.type) {
          case 'minLength':
            if (typeof rule.value === 'number' && String(value).length < rule.value) {
              isValid = false;
            }
            break;

          case 'maxLength':
            if (typeof rule.value === 'number' && String(value).length > rule.value) {
              isValid = false;
            }
            break;

          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(String(value))) {
              isValid = false;
            }
            break;

          case 'url':
            try {
              new URL(String(value));
            } catch {
              isValid = false;
            }
            break;

          case 'pattern':
            const regex = typeof rule.value === 'string' ? new RegExp(rule.value) : rule.value;
            if (regex && !regex.test(String(value))) {
              isValid = false;
            }
            break;

          case 'custom':
            if (rule.validator) {
              try {
                const result = await rule.validator(value);
                isValid = result;
              } catch (error) {
                isValid = false;
                errorMessage = error instanceof Error ? error.message : rule.message;
              }
            }
            break;
        }

        if (!isValid) {
          setError(errorMessage);
          return false;
        }
      }
    }

    return true;
  }, [value, required, validation, customError]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    error,
    isValid: !error,
    validate,
    clearError
  };
};

// Export individual validation functions for reuse
export const validators = {
  required: (value: any): boolean => {
    return value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0);
  },

  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  minLength: (value: string, minLength: number): boolean => {
    return value.length >= minLength;
  },

  maxLength: (value: string, maxLength: number): boolean => {
    return value.length <= maxLength;
  },

  pattern: (value: string, pattern: string | RegExp): boolean => {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return regex.test(value);
  }
};
