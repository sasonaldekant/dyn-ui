import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createRef } from 'react';
import DynFieldContainer from './DynFieldContainer';
import styles from './DynFieldContainer.module.css';

const classes = styles as Record<string, string>;

describe('DynFieldContainer', () => {
  it('renders the provided label and child element', () => {
    render(
      <DynFieldContainer label="First name" htmlFor="first-name">
        <input id="first-name" data-testid="inner-input" />
      </DynFieldContainer>
    );

    const container = screen.getByTestId('dyn-field-container');
    expect(container).toHaveClass(classes.container!);
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByTestId('inner-input')).toBeInTheDocument();
  });

  it('shows validation feedback when error text is provided', () => {
    render(
      <DynFieldContainer
        label="Email"
        errorText="This field is required"
        htmlFor="email"
      >
        <input id="email" />
      </DynFieldContainer>
    );

    const container = screen.getByTestId('dyn-field-container');
    expect(container).toHaveClass(classes.containerError!);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('hides validation messages when showValidation is false', () => {
    render(
      <DynFieldContainer
        label="Phone"
        helpText="Include area code"
        showValidation={false}
        htmlFor="phone"
      >
        <input id="phone" />
      </DynFieldContainer>
    );

    expect(screen.queryByText('Include area code')).not.toBeInTheDocument();
  });

  it('forwards refs and rest props to the container element', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <DynFieldContainer ref={ref} data-testid="custom-container" role="group">
        <input />
      </DynFieldContainer>
    );

    const container = screen.getByTestId('custom-container');
    expect(container).toHaveAttribute('role', 'group');
    expect(ref.current).toBe(container);
  });
});
