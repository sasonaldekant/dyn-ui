import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { IconDictionaryProvider, IconDictionaryContext } from './IconDictionaryProvider';
import { useIconDictionary } from '../hooks/useIconDictionary';

// Test component that uses the hook
const TestComponent: React.FC = () => {
  const dictionary = useIconDictionary();
  return (
    <div>
      <span data-testid="ok-icon">{dictionary['ok'] || 'not-found'}</span>
      <span data-testid="custom-icon">{dictionary['custom'] || 'not-found'}</span>
      <span data-testid="unknown-icon">{dictionary['unknown'] || 'not-found'}</span>
    </div>
  );
};

// Test component that consumes context directly
const DirectContextComponent: React.FC = () => {
  const dictionary = React.useContext(IconDictionaryContext);
  return (
    <div>
      <span data-testid="context-ok">{dictionary['ok'] || 'not-found'}</span>
      <span data-testid="context-user">{dictionary['user'] || 'not-found'}</span>
    </div>
  );
};

describe('IconDictionaryProvider', () => {
  it('provides default icon dictionary', () => {
    render(
      <IconDictionaryProvider>
        <TestComponent />
      </IconDictionaryProvider>
    );
    
    expect(screen.getByTestId('ok-icon')).toHaveTextContent('dyn-icon-ok');
    expect(screen.getByTestId('unknown-icon')).toHaveTextContent('not-found');
  });

  it('merges custom dictionary with defaults', () => {
    const customDictionary = {
      'custom': 'my-custom-icon',
      'ok': 'override-ok-icon' // Override default
    };
    
    render(
      <IconDictionaryProvider customDictionary={customDictionary}>
        <TestComponent />
      </IconDictionaryProvider>
    );
    
    expect(screen.getByTestId('custom-icon')).toHaveTextContent('my-custom-icon');
    expect(screen.getByTestId('ok-icon')).toHaveTextContent('override-ok-icon');
  });

  it('provides context directly', () => {
    render(
      <IconDictionaryProvider>
        <DirectContextComponent />
      </IconDictionaryProvider>
    );
    
    expect(screen.getByTestId('context-ok')).toHaveTextContent('dyn-icon-ok');
    expect(screen.getByTestId('context-user')).toHaveTextContent('dyn-icon-user');
  });

  it('updates dictionary when customDictionary prop changes', () => {
    const initialCustom = { 'custom': 'initial-icon' };
    const updatedCustom = { 'custom': 'updated-icon' };
    
    const { rerender } = render(
      <IconDictionaryProvider customDictionary={initialCustom}>
        <TestComponent />
      </IconDictionaryProvider>
    );
    
    expect(screen.getByTestId('custom-icon')).toHaveTextContent('initial-icon');
    
    rerender(
      <IconDictionaryProvider customDictionary={updatedCustom}>
        <TestComponent />
      </IconDictionaryProvider>
    );
    
    expect(screen.getByTestId('custom-icon')).toHaveTextContent('updated-icon');
  });

  it('contains all default icons', () => {
    const IconChecker: React.FC = () => {
      const dictionary = useIconDictionary();
      const expectedIcons = [
        'user', 'home', 'settings', 'ok', 'close', 'warning', 'minus', 'plus',
        'search', 'edit', 'delete', 'arrow-up', 'arrow-down', 'arrow-left', 
        'arrow-right', 'menu', 'info', 'calendar', 'clock', 'mail'
      ];
      
      return (
        <div>
          {expectedIcons.map(icon => (
            <span key={icon} data-testid={`icon-${icon}`}>
              {dictionary[icon] || 'missing'}
            </span>
          ))}
        </div>
      );
    };
    
    render(
      <IconDictionaryProvider>
        <IconChecker />
      </IconDictionaryProvider>
    );
    
    // Check a few key icons
    expect(screen.getByTestId('icon-user')).toHaveTextContent('dyn-icon-user');
    expect(screen.getByTestId('icon-home')).toHaveTextContent('dyn-icon-home');
    expect(screen.getByTestId('icon-settings')).toHaveTextContent('dyn-icon-settings');
    expect(screen.getByTestId('icon-search')).toHaveTextContent('dyn-icon-search');
  });
});

describe('useIconDictionary', () => {
  it('throws error when used outside provider', () => {
    const TestComponentWithoutProvider = () => {
      useIconDictionary();
      return <div>Should not render</div>;
    };
    
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = () => {};
    
    expect(() => {
      render(<TestComponentWithoutProvider />);
    }).toThrow('useIconDictionary must be used within IconDictionaryProvider');
    
    console.error = originalError;
  });

  it('returns dictionary from context', () => {
    const TestHookComponent = () => {
      const dictionary = useIconDictionary();
      const hasOkIcon = 'ok' in dictionary;
      const hasUserIcon = 'user' in dictionary;
      
      return (
        <div>
          <span data-testid="has-ok">{hasOkIcon.toString()}</span>
          <span data-testid="has-user">{hasUserIcon.toString()}</span>
        </div>
      );
    };
    
    render(
      <IconDictionaryProvider>
        <TestHookComponent />
      </IconDictionaryProvider>
    );
    
    expect(screen.getByTestId('has-ok')).toHaveTextContent('true');
    expect(screen.getByTestId('has-user')).toHaveTextContent('true');
  });
});