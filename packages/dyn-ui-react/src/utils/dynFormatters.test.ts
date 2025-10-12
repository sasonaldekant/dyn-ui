import { describe, it, expect } from 'vitest';
import { 
  generateInitials, 
  formatBadgeValue, 
  isThemeColor, 
  processIconString 
} from './dynFormatters';

describe('generateInitials', () => {
  it('generates initials from first and last name', () => {
    expect(generateInitials('John Doe')).toBe('JD');
    expect(generateInitials('Jane Smith')).toBe('JS');
    expect(generateInitials('Mary Jane Watson')).toBe('MW');
  });

  it('generates single initial from single word', () => {
    expect(generateInitials('Madonna')).toBe('M');
    expect(generateInitials('Cher')).toBe('C');
  });

  it('handles empty or invalid input', () => {
    expect(generateInitials('')).toBe('');
    expect(generateInitials('   ')).toBe('');
    expect(generateInitials(null as any)).toBe('');
    expect(generateInitials(undefined as any)).toBe('');
    expect(generateInitials(123 as any)).toBe('');
  });

  it('handles names with extra spaces', () => {
    expect(generateInitials('  John   Doe  ')).toBe('JD');
    expect(generateInitials('John    Smith   Wilson')).toBe('JW');
  });

  it('converts to uppercase', () => {
    expect(generateInitials('john doe')).toBe('JD');
    expect(generateInitials('mary jane')).toBe('MJ');
  });

  it('handles special characters in names', () => {
    expect(generateInitials('Jean-Luc Picard')).toBe('JP');
    expect(generateInitials("O'Connor Smith")).toBe('OS');
  });
});

describe('formatBadgeValue', () => {
  it('formats small numbers correctly', () => {
    expect(formatBadgeValue(0)).toBe('0');
    expect(formatBadgeValue(1)).toBe('1');
    expect(formatBadgeValue(42)).toBe('42');
    expect(formatBadgeValue(99)).toBe('99');
  });

  it('formats large numbers as 99+', () => {
    expect(formatBadgeValue(100)).toBe('99+');
    expect(formatBadgeValue(150)).toBe('99+');
    expect(formatBadgeValue(999)).toBe('99+');
    expect(formatBadgeValue(1000000)).toBe('99+');
  });

  it('handles negative numbers', () => {
    expect(formatBadgeValue(-1)).toBe('0');
    expect(formatBadgeValue(-100)).toBe('0');
  });

  it('handles edge case at 99', () => {
    expect(formatBadgeValue(99)).toBe('99');
    expect(formatBadgeValue(100)).toBe('99+');
  });
});

describe('isThemeColor', () => {
  it('returns true for valid theme colors', () => {
    expect(isThemeColor('primary')).toBe(true);
    expect(isThemeColor('success')).toBe(true);
    expect(isThemeColor('neutral')).toBe(true);
  });

  it('returns false for invalid theme colors', () => {
    expect(isThemeColor('color-01')).toBe(false);
    expect(isThemeColor('color-13')).toBe(false);
    expect(isThemeColor('color-1')).toBe(false);
    expect(isThemeColor('red')).toBe(false);
    expect(isThemeColor('#ff0000')).toBe(false);
    expect(isThemeColor('')).toBe(false);
    expect(isThemeColor('blue')).toBe(false);
  });

  it('is case sensitive', () => {
    expect(isThemeColor('COLOR-01')).toBe(false);
    expect(isThemeColor('Color-01')).toBe(false);
  });
});

describe('processIconString', () => {
  const mockDictionary = {
    'ok': 'dyn-icon-ok',
    'user': 'dyn-icon-user',
    'close': 'dyn-icon-close'
  };

  it('processes simple icon lookup', () => {
    const result = processIconString('ok', mockDictionary);
    expect(result.baseClass).toBe('dyn-icon');
    expect(result.iconClass).toBe('dyn-icon-ok');
  });

  it('processes unknown icon', () => {
    const result = processIconString('unknown', mockDictionary);
    expect(result.baseClass).toBe('dyn-icon');
    expect(result.iconClass).toBe('unknown');
  });

  it('processes dyn-icon prefixed classes directly', () => {
    const result = processIconString('dyn-icon-custom', mockDictionary);
    expect(result.baseClass).toBe('dyn-icon');
    expect(result.iconClass).toBe('dyn-icon-custom');
  });

  it('processes FontAwesome classes', () => {
    const result = processIconString('fas fa-user', mockDictionary);
    expect(result.baseClass).toBe('dyn-fonts-icon');
    expect(result.iconClass).toBe('fas fa-user');
  });

  it('processes FontAwesome single class', () => {
    const result = processIconString('fa-user', mockDictionary);
    expect(result.baseClass).toBe('dyn-fonts-icon');
    expect(result.iconClass).toBe('fa-user');
  });

  it('processes multiple space-separated tokens', () => {
    const result = processIconString('ok user close', mockDictionary);
    expect(result.baseClass).toBe('dyn-icon');
    expect(result.iconClass).toBe('dyn-icon-ok dyn-icon-user dyn-icon-close');
  });

  it('handles mixed dictionary and direct classes', () => {
    const result = processIconString('ok dyn-icon-custom', mockDictionary);
    expect(result.baseClass).toBe('dyn-icon');
    expect(result.iconClass).toBe('dyn-icon-ok dyn-icon-custom');
  });

  it('handles FontAwesome with solid variant', () => {
    const result = processIconString('fas fa-star', mockDictionary);
    expect(result.baseClass).toBe('dyn-fonts-icon');
    expect(result.iconClass).toBe('fas fa-star');
  });

  it('handles FontAwesome regular variant', () => {
    const result = processIconString('far fa-star', mockDictionary);
    expect(result.baseClass).toBe('dyn-fonts-icon');
    expect(result.iconClass).toBe('far fa-star');
  });

  it('trims whitespace properly', () => {
    const result = processIconString('  ok  user  ', mockDictionary);
    expect(result.iconClass).toBe('dyn-icon-ok dyn-icon-user');
  });

  it('handles empty dictionary', () => {
    const result = processIconString('ok', {});
    expect(result.baseClass).toBe('dyn-icon');
    expect(result.iconClass).toBe('ok');
  });
});