/**
 * Utility function for conditional class name concatenation
 * Similar to popular classnames/clsx libraries but built-in
 */

type ClassNameValue = string | number | boolean | null | undefined;

type ClassNameArg = 
  | ClassNameValue
  | Record<string, ClassNameValue>
  | ClassNameArg[];

/**
 * Concatenates class names conditionally
 * @param args - Array of class name arguments
 * @returns Concatenated class name string
 */
export function classNames(...args: ClassNameArg[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      const nested = classNames(...arg);
      if (nested) classes.push(nested);
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Creates a CSS module class name generator
 * @param styles - CSS module styles object
 * @returns Function that maps class names to CSS module classes
 */
export function createClassNameGenerator(styles: Record<string, string>) {
  return (...args: ClassNameArg[]) => {
    const className = classNames(...args);
    return className
      .split(' ')
      .map(cls => styles[cls] || cls)
      .join(' ');
  };
}

/**
 * Combines base classes with conditional classes
 * @param baseClasses - Always applied classes
 * @param conditionalClasses - Conditionally applied classes
 * @returns Combined class name string
 */
export function combineClasses(
  baseClasses: string,
  conditionalClasses?: ClassNameArg
): string {
  return classNames(baseClasses, conditionalClasses);
}