import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynFieldContainer } from './DynFieldContainer';

describe('DynFieldContainer', () => {
  it('renders children', () => {
    render(
      <DynFieldContainer>
        <input data-testid="test-input" />
      </DynFieldContainer>
    );
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('displays label', () => {
    render(
      <DynFieldContainer label="Test Label">
        <input />
      </DynFieldContainer>
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays help text', () => {
    render(
      <DynFieldContainer helpText="Help text">
        <input />
      </DynFieldContainer>
    );
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('displays error text', () => {
    render(
      <DynFieldContainer errorText="Error message">
        <input />
      </DynFieldContainer>
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(
      <DynFieldContainer label="Required Field" required>
        <input />
      </DynFieldContainer>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows optional indicator', () => {
    render(
      <DynFieldContainer label="Optional Field" optional>
        <input />
      </DynFieldContainer>
    );
    expect(screen.getByText('(opcional)')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DynFieldContainer className="custom-class">
        <input />
      </DynFieldContainer>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('associates label with input using htmlFor', () => {
    render(
      <DynFieldContainer label="Test Label" htmlFor="test-input">
        <input id="test-input" />
      </DynFieldContainer>
    );
    
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('prioritizes error text over help text', () => {
    render(
      <DynFieldContainer 
        helpText="Help text" 
        errorText="Error message"
      >
        <input />
      </DynFieldContainer>
    );
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Help text')).not.toBeInTheDocument();
  });

  it('applies error class when error text is present', () => {
    const { container } = render(
      <DynFieldContainer errorText="Error message">
        <input />
      </DynFieldContainer>
    );
    
    expect(container.firstChild).toHaveClass('field-container--error');
  });

  it('renders without label when not provided', () => {
    render(
      <DynFieldContainer>
        <input data-testid="test-input" />
      </DynFieldContainer>
    );
    
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });
});