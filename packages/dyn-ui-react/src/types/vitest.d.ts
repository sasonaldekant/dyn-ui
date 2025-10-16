import type { AxeResults } from 'axe-core';

declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toHaveNoViolations(): T;
    }
    
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): any;
    }
  }
}

// Extend expect interface for jest-axe matchers
declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
  
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): any;
  }
}

export {};