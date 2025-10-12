import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DynContainer } from './DynContainer';

describe('DynContainer', () => {
  it('exports a React component', () => {
    expect(DynContainer).toBeDefined();
  });

  it('renders children correctly', () => {
    render(
      <DynContainer>
        <div>Test content</div>
      </DynContainer>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title and subtitle when provided', () => {
    render(
      <DynContainer title="Section Title" subtitle="Supporting copy">
        <div>Content</div>
      </DynContainer>
    );

    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Supporting copy')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <DynContainer className="custom-container">
        <div>Content</div>
      </DynContainer>
    );

    expect(screen.getByTestId('dyn-container')).toHaveClass('custom-container');
  });

  it('applies layout modifiers through props', () => {
    render(
      <DynContainer spacing="lg" size="large" direction="horizontal" align="center" justify="between">
        <div>Content</div>
      </DynContainer>
    );

    const element = screen.getByTestId('dyn-container');

    expect(element.className).toMatch(/spacingLg/);
    expect(element.className).toMatch(/sizeLarge/);
    expect(element.className).toMatch(/directionHorizontal/);
    expect(element.className).toMatch(/alignCenter/);
    expect(element.className).toMatch(/justifyBetween/);
  });

  it('respects legacy noBorder and noPadding flags', () => {
    render(
      <DynContainer noBorder noPadding bordered shadow>
        <div>Content</div>
      </DynContainer>
    );

    const element = screen.getByTestId('dyn-container');

    expect(element.className).not.toMatch(/bordered/);
    expect(element.className).toMatch(/noPadding/);
  });
});
