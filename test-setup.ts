import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Make vi globally available like jest was
(globalThis as any).vi = vi;

// For backward compatibility, also provide jest as vi
(globalThis as any).jest = vi;