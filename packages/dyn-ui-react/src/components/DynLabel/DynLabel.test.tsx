import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DynLabel from './DynLabel';

describe('DynLabel', () => {
  it('renders basic label correctly', () => {
    render(<DynLabel>Email Address</DynLabel>);
    
    const label = screen.getByRole('group');
    expect(label).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('renders with htmlFor attribute', () => {
    render(<DynLabel htmlFor="email-input">Email Address</DynLabel>);
    
    const label = screen.getByLabelText('Email Address');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('shows required asterisk when required=true', () => {
    render(<DynLabel required>Password</DynLabel>);
    
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveClass('dyn-label-with-requirement');
  });

  it('shows optional text when optional=true', () => {
    render(<DynLabel optional>Middle Name</DynLabel>);
    
    expect(screen.getByText('(optional)')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveClass('dyn-label-with-requirement');
  });

  it('displays help text below label', () => {
    render(
      <DynLabel htmlFor="username" helpText="Must be 3-20 characters">
        Username
      </DynLabel>
    );
    
    const helpText = screen.getByText('Must be 3-20 characters');
    expect(helpText).toBeInTheDocument();
    expect(helpText).toHaveClass('dyn-label-help-text');
  });

  it('associates help text with input via aria-describedby', () => {
    render(
      <DynLabel htmlFor="email" helpText="We will never share your email">
        Email
      </DynLabel>
    );
    
    const label = screen.getByLabelText('Email');
    const helpText = screen.getByText('We will never share your email');
    
    expect(label).toHaveAttribute('aria-describedby', 'email-help');
    expect(helpText).toHaveAttribute('id', 'email-help');
  });

  it('applies disabled styling when disabled=true', () => {
    render(<DynLabel disabled>Account Type</DynLabel>);
    
    const labelElement = screen.getByRole('group');
    const labelText = labelElement.querySelector('label');
    expect(labelText).toHaveClass('dyn-label-disabled');
  });

  it('renders both required and help text together', () => {
    render(
      <DynLabel required helpText="This field is mandatory">
        Full Name
      </DynLabel>
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('This field is mandatory')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveClass('dyn-label-with-requirement');
  });

  it('renders both optional and help text together', () => {
    render(
      <DynLabel optional helpText="You can skip this field">
        Phone Number
      </DynLabel>
    );
    
    expect(screen.getByText('(optional)')).toBeInTheDocument();
    expect(screen.getByText('You can skip this field')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DynLabel className="custom-label">Test Label</DynLabel>);
    
    const labelText = screen.getByRole('group').querySelector('label');
    expect(labelText).toHaveClass('custom-label');
    expect(labelText).toHaveClass('dyn-label');
  });

  it('does not render help text when not provided', () => {
    render(<DynLabel>Simple Label</DynLabel>);
    
    const container = screen.getByRole('group');
    expect(container.querySelector('.dyn-label-help-text')).not.toBeInTheDocument();
  });

  it('handles complex label text with React nodes', () => {
    render(
      <DynLabel required>
        <span>Email</span> <em>Address</em>
      </DynLabel>
    );
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('maintains proper label structure', () => {
    render(
      <DynLabel htmlFor="test-input" required helpText="Help text">
        Test Label
      </DynLabel>
    );
    
    const container = screen.getByRole('group');
    expect(container).toHaveClass('dyn-label-container');
    
    const label = container.querySelector('label');
    expect(label).toHaveClass('dyn-label');
    expect(label).toHaveAttribute('for', 'test-input');
    
    const labelText = label?.querySelector('.dyn-label-text');
    expect(labelText).toBeInTheDocument();
    
    const helpText = container.querySelector('.dyn-label-help-text');
    expect(helpText).toBeInTheDocument();
  });
});