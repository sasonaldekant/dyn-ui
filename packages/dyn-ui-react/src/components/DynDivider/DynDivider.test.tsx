import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynDivider } from './DynDivider';

describe('DynDivider', () => {
  it('exports a React component', () => {
    expect(DynDivider).toBeDefined();
  });

  it('renders a divider element', () => {
    const { container } = render(<DynDivider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DynDivider className="custom-divider" />);
    expect(container.firstChild).toHaveClass('custom-divider');
  });

  it('applies orientation classes', () => {
    const { container, rerender } = render(<DynDivider orientation="vertical" />);
    expect(container.firstChild?.className).toMatch(/vertical/i);
    
    rerender(<DynDivider orientation="horizontal" />);
    expect(container.firstChild?.className).toMatch(/horizontal/i);
  });
});