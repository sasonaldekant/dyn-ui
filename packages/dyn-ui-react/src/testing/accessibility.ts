import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

export interface AccessibilityTestOptions {
  /** Additional configuration forwarded to axe-core (inferred from vitest-axe) */
  axeOptions?: Parameters<typeof axe>[1];
  /** Optional test id that selects a specific node for the audit */
  containerTestId?: string;
}

export interface AccessibilityTestResult {
  /** Raw axe-core result allowing deeper assertions if desired */
  rawResults: Awaited<ReturnType<typeof axe>>;
}
/**
 * Convenience helper that runs an axe accessibility audit against the
 * rendered output of a component. The helper automatically asserts that
 * no accessibility violations are present.
 */
export async function testA11y(
  ui: ReactElement,
  options: AccessibilityTestOptions = {}
): Promise<AccessibilityTestResult> {
  const { container, unmount } = render(ui);

  const target = options.containerTestId
    ? container.querySelector(`[data-testid="${options.containerTestId}"]`) ?? container
    : container;

  const results = await axe(target, options.axeOptions);
  // assert there are no violations using the built-in matcher on the violations array
  expect(results.violations).toHaveLength(0);

  unmount();
  return { rawResults: results };
}

export { axe };
