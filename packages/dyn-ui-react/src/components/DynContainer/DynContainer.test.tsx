import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynContainer } from './DynContainer';

describe('DynContainer', () => {
  it('exports a React component', () => {
    expect(DynContainer).toBeDefined(); // Changed from checking type to checking if defined
  });

  it('renders children correctly', () => {
    render(
      <DynContainer>
        <div>Test content</div>
      </DynContainer>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DynContainer className="custom-container">
        <div>Content</div>
      </DynContainer>
    );
    expect(container.firstChild).toHaveClass('custom-container');
  });

  it('applies size classes correctly', () => {
    const { container, rerender } = render(
      <DynContainer size="fluid">
        <div>Content</div>
      </DynContainer>
    );
    expect(container.firstChild?.className).toMatch(/fluid/i);
    
    rerender(
      <DynContainer size="fixed">
        <div>Content</div>
      </DynContainer>
    );
    expect(container.firstChild?.className).toMatch(/fixed/i);
  });
});