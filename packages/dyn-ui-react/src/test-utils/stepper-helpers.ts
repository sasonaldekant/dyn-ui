/**
 * DynStepper Test Helper Utilities
 * Utility functions for testing DynStepper component functionality
 */

/**
 * Find step element by label text (supports RegExp)
 */
export const getStepByLabel = (container: HTMLElement, label: RegExp | string) => {
  const labelRegex = typeof label === 'string' ? new RegExp(label, 'i') : label;
  
  // Try different methods to find step by label
  const byAriaLabel = container.querySelector(`[aria-label*="${label}"]`);
  if (byAriaLabel) return byAriaLabel;
  
  const byTitle = container.querySelector(`[title*="${label}"]`);
  if (byTitle) return byTitle;
  
  // Search through all buttons for text content match
  const buttons = Array.from(container.querySelectorAll('button'));
  const buttonByText = buttons.find(btn => {
    const textContent = btn.textContent || '';
    return labelRegex.test(textContent);
  });
  
  return buttonByText || null;
};

/**
 * Find step button by index
 */
export const getStepByIndex = (container: HTMLElement, index: number, stepperId = 'stepper-1') => {
  const stepButton = container.querySelector(`#${stepperId}-step-${index}`);
  return stepButton;
};

/**
 * Find step panel/content by index
 */
export const getStepPanel = (container: HTMLElement, index: number, stepperId = 'stepper-1') => {
  const panel = container.querySelector(`#${stepperId}-panel-${index}`);
  return panel;
};

/**
 * Wait for step transition animations to complete
 */
export const waitForStepTransition = (element: HTMLElement, timeout = 300): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

/**
 * Get currently active/selected step
 */
export const getActiveStep = (container: HTMLElement) => {
  const activeButton = container.querySelector('[aria-current="step"]');
  return activeButton;
};

/**
 * Get all step elements
 */
export const getAllSteps = (container: HTMLElement, stepperId = 'stepper-1') => {
  return Array.from(container.querySelectorAll(`[id*="${stepperId}-step-"]`));
};

/**
 * Check if step is disabled
 */
export const isStepDisabled = (stepElement: HTMLElement): boolean => {
  return stepElement.hasAttribute('disabled') || 
         stepElement.getAttribute('aria-disabled') === 'true' ||
         stepElement.classList.contains('button--disabled');
};

/**
 * Check if step is completed
 */
export const isStepCompleted = (stepElement: HTMLElement): boolean => {
  return stepElement.classList.contains('item--completed') ||
         stepElement.closest('li')?.classList.contains('item--completed') ||
         stepElement.closest('li')?.classList.contains('status-completed') || false;
};

/**
 * Check if step is in error state
 */
export const isStepError = (stepElement: HTMLElement): boolean => {
  return stepElement.classList.contains('item--error') ||
         stepElement.closest('li')?.classList.contains('item--error') ||
         stepElement.closest('li')?.classList.contains('status-error') || false;
};

/**
 * Check if step is currently active
 */
export const isStepActive = (stepElement: HTMLElement): boolean => {
  return stepElement.getAttribute('aria-current') === 'step' ||
         stepElement.classList.contains('item--current') ||
         stepElement.closest('li')?.classList.contains('item--current') ||
         stepElement.closest('li')?.classList.contains('status-active') || false;
};

/**
 * Check if element has specific role
 */
export const hasRole = (element: HTMLElement, role: string): boolean => {
  return element.getAttribute('role') === role;
};

/**
 * Check if element has specific CSS class
 */
export const hasClass = (element: HTMLElement, className: string): boolean => {
  return element.classList.contains(className);
};

/**
 * Get stepper root element by test ID
 */
export const getStepperRoot = (container: HTMLElement, testId = 'dyn-stepper') => {
  return container.querySelector(`[data-testid="${testId}"]`);
};

/**
 * Find elements by accessible role (useful for ARIA testing)
 */
export const getElementByRole = (container: HTMLElement, role: string) => {
  return container.querySelector(`[role="${role}"]`);
};

/**
 * Get all elements by accessible role
 */
export const getAllElementsByRole = (container: HTMLElement, role: string) => {
  return Array.from(container.querySelectorAll(`[role="${role}"]`));
};

/**
 * Check if stepper has specific orientation
 */
export const getStepperOrientation = (stepperRoot: HTMLElement): 'horizontal' | 'vertical' | null => {
  if (stepperRoot.classList.contains('orientation-horizontal')) return 'horizontal';
  if (stepperRoot.classList.contains('orientation-vertical')) return 'vertical';
  return null;
};

/**
 * Check if stepper has specific variant
 */
export const getStepperVariant = (stepperRoot: HTMLElement): string | null => {
  const classList = Array.from(stepperRoot.classList);
  const variantClass = classList.find(cls => cls.startsWith('variant-'));
  return variantClass ? variantClass.replace('variant-', '') : null;
};

/**
 * Check if stepper has specific size
 */
export const getStepperSize = (stepperRoot: HTMLElement): string | null => {
  const classList = Array.from(stepperRoot.classList);
  const sizeClass = classList.find(cls => cls.startsWith('size-'));
  return sizeClass ? sizeClass.replace('size-', '') : null;
};

/**
 * Get step description element
 */
export const getStepDescription = (container: HTMLElement, index: number, stepperId = 'stepper-1') => {
  return container.querySelector(`#${stepperId}-step-${index}-desc`);
};

/**
 * Get progress bar element (for progress variant)
 */
export const getProgressBar = (container: HTMLElement) => {
  return container.querySelector('[role="progressbar"]');
};

/**
 * Get progress fill element
 */
export const getProgressFill = (container: HTMLElement) => {
  return container.querySelector('.progressFill');
};

/**
 * Check if step has optional badge
 */
export const hasOptionalBadge = (stepElement: HTMLElement): boolean => {
  const stepContainer = stepElement.closest('li');
  return stepContainer?.querySelector('.optional') !== null;
};

/**
 * Simulate keyboard navigation
 */
export const simulateKeyboardNavigation = (element: HTMLElement, key: string) => {
  const event = new KeyboardEvent('keydown', { key, bubbles: true });
  element.dispatchEvent(event);
};

/**
 * Get step tooltip text
 */
export const getStepTooltip = (stepElement: HTMLElement): string | null => {
  return stepElement.getAttribute('title');
};

/**
 * Check if element is hidden
 */
export const isElementHidden = (element: HTMLElement): boolean => {
  return element.hasAttribute('hidden') || 
         element.style.display === 'none' ||
         element.classList.contains('panel--hidden');
};

/**
 * Get visible step panel
 */
export const getVisibleStepPanel = (container: HTMLElement) => {
  const panels = Array.from(container.querySelectorAll('[role="region"], [role="tabpanel"]'));
  return panels.find(panel => !isElementHidden(panel as HTMLElement)) as HTMLElement | undefined;
};

/**
 * Assert step accessibility attributes
 */
export const assertStepAccessibility = (stepElement: HTMLElement, expectedState: {
  ariaCurrent?: string;
  ariaSelected?: string;
  disabled?: boolean;
  role?: string;
}) => {
  const assertions: string[] = [];
  
  if (expectedState.ariaCurrent !== undefined) {
    const actual = stepElement.getAttribute('aria-current');
    if (actual !== expectedState.ariaCurrent) {
      assertions.push(`Expected aria-current="${expectedState.ariaCurrent}", got "${actual}"`);
    }
  }
  
  if (expectedState.ariaSelected !== undefined) {
    const actual = stepElement.getAttribute('aria-selected');
    if (actual !== expectedState.ariaSelected) {
      assertions.push(`Expected aria-selected="${expectedState.ariaSelected}", got "${actual}"`);
    }
  }
  
  if (expectedState.disabled !== undefined) {
    const isDisabled = stepElement.hasAttribute('disabled') || 
                      stepElement.getAttribute('aria-disabled') === 'true';
    if (isDisabled !== expectedState.disabled) {
      assertions.push(`Expected disabled=${expectedState.disabled}, got ${isDisabled}`);
    }
  }
  
  if (expectedState.role !== undefined) {
    const actual = stepElement.getAttribute('role');
    if (actual !== expectedState.role) {
      assertions.push(`Expected role="${expectedState.role}", got "${actual}"`);
    }
  }
  
  if (assertions.length > 0) {
    throw new Error(`Accessibility assertions failed:\n${assertions.join('\n')}`);
  }
  
  return true;
};