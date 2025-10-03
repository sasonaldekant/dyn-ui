/**
 * Utility functions for formatting data in DYN UI components
 */

/**
 * Generates initials from a full name
 * @param name - Full name (e.g., "John Doe")
 * @returns Initials (e.g., "JD")
 */
export const generateInitials = (name: string): string => {
  if (!name || typeof name !== 'string') return '';
  
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

/**
 * Formats badge value for display (9+ for values > 9)
 * @param value - Numeric value
 * @returns Formatted string
 */
export const formatBadgeValue = (value: number): string => {
  if (value <= 0) return '0';
  if (value > 99) return '99+';
  return value.toString();
};

/**
 * Checks if a color is a theme color from DYN palette
 * @param color - Color string
 * @returns Boolean indicating if it's a theme color
 */
export const isThemeColor = (color: string): boolean => {
  const themeColors = [
    'color-01', 'color-02', 'color-03', 'color-04', 'color-05', 'color-06',
    'color-07', 'color-08', 'color-09', 'color-10', 'color-11', 'color-12'
  ];
  return themeColors.includes(color);
};

/**
 * Processes icon string with dictionary lookup
 * @param iconStr - Icon string (may contain dictionary keys)
 * @param dictionary - Icon dictionary mapping
 * @returns Processed icon classes
 */
export const processIconString = (iconStr: string, dictionary: Record<string, string>) => {
  const iconTokens = iconStr.includes(' ') ? iconStr.split(' ') : [iconStr];
  let processedClass = '';
  let baseClass = 'dyn-icon';
  
  iconTokens.forEach((token, index) => {
    if (dictionary[token]) {
      const dictValue = dictionary[token];
      processedClass = index === 0 ? dictValue : `${processedClass} ${dictValue}`;
      if (dictValue.startsWith('dyn-icon')) {
        // Keep dyn-icon as base class
      }
    } else if (token.startsWith('dyn-icon-')) {
      processedClass = index === 0 ? token : `${processedClass} ${token}`;
    } else if (token.startsWith('fa') || token.startsWith('fas') || token.startsWith('far')) {
      baseClass = 'dyn-fonts-icon';
      processedClass = index === 0 ? token : `${processedClass} ${token}`;
    } else {
      processedClass = index === 0 ? token : `${processedClass} ${token}`;
    }
  });
  
  return {
    baseClass,
    iconClass: processedClass.trim()
  };
};
