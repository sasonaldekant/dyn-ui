import { vi, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Canvas getContext mock - GLAVNI FIX za "getContext does not exist"
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  configurable: true,
  value: vi.fn((contextType: string) => {
    if (contextType === '2d') {
      return {
        canvas: { width: 300, height: 150 },
        save: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        closePath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
        clearRect: vi.fn(),
        fillRect: vi.fn(),
        strokeRect: vi.fn(),
        translate: vi.fn(),
        rotate: vi.fn(),
        scale: vi.fn(),
        setTransform: vi.fn(),
        measureText: vi.fn(() => ({ width: 0, height: 12 })),
        fillText: vi.fn(),
        strokeText: vi.fn(),
        createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
        createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
        createPattern: vi.fn(),
        getImageData: vi.fn(() => ({ data: [] })),
        putImageData: vi.fn(),
        font: '10px Arial',
        textAlign: 'start',
        textBaseline: 'alphabetic',
        lineWidth: 1,
        lineCap: 'butt',
        lineJoin: 'miter',
        miterLimit: 10,
        globalAlpha: 1,
        globalCompositeOperation: 'source-over',
        fillStyle: '#000000',
        strokeStyle: '#000000',
      };
    }
    return null;
  }),
});

// Animation frame mock
globalThis.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(() => cb(Date.now()), 16);
  return 1;
});

globalThis.cancelAnimationFrame = vi.fn();

// ResizeObserver mock
globalThis.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
