import '../testing/axe-patch';
import axe from 'axe-core';
import { expect } from 'vitest';

export const testAccessibility = async (container: HTMLElement) => {
  if (typeof HTMLCanvasElement !== 'undefined') {
    const canvasProto = HTMLCanvasElement.prototype as HTMLCanvasElement & {
      getContext?: (contextId: string, options?: unknown) => unknown;
    };

    if (!canvasProto.getContext) {
      canvasProto.getContext = () => null;
    }
  }

  const { violations } = await axe.run(container);

  const formattedViolations = violations
    .map((violation) => {
      const nodes = violation.nodes.map((node) => node.html).join('\n');
      return `${violation.id}: ${violation.description}\n${nodes}`;
    })
    .join('\n\n');

  expect(violations, formattedViolations).toHaveLength(0);
};

// Export DynStepper test helpers
export * from './stepper-helpers';