import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { axe, type AxeOptions, type AxeResults } from 'vitest-axe';

export interface AccessibilityTestOptions {
  /** Additional configuration forwarded to axe-core */
  axeOptions?: AxeOptions;
  /** Optional test id that selects a specific node for the audit */
  containerTestId?: string;
}

export interface AccessibilityTestResult {
  /** Raw axe-core result allowing deeper assertions if desired */
  rawResults: AxeResults;
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
  expect(results).toHaveNoViolations();

  unmount();
  return { rawResults: results };
}

export { axe };
