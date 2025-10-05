import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynGauge } from './DynGauge';

describe('DynGauge', () => {
  it('renders with default props', () => {
    render(<DynGauge value={50} />);
    expect(screen.getByTestId('dyn-gauge')).toBeInTheDocument();
  });

  it('displays the value', () => {
    render(<DynGauge value={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('displays custom label', () => {
    render(<DynGauge value={60} label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<DynGauge value={50} size="small" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--small');
    
    rerender(<DynGauge value={50} size="large" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--large');
  });

  it('applies type classes', () => {
    const { rerender } = render(<DynGauge value={50} type="circular" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--circular');
    
    rerender(<DynGauge value={50} type="linear" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--linear');
  });

  it('applies custom className', () => {
    render(<DynGauge value={50} className="custom-gauge" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('custom-gauge');
  });

  it('handles value bounds', () => {
    const { rerender } = render(<DynGauge value={-10} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    
    rerender(<DynGauge value={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('formats value correctly', () => {
    render(<DynGauge value={33.333} />);
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('renders SVG elements for visualization', () => {
    const { container } = render(<DynGauge value={50} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies correct ARIA attributes', () => {
    render(<DynGauge value={75} label="Progress" />);
    const gauge = screen.getByTestId('dyn-gauge');
    
    expect(gauge).toHaveAttribute('role', 'progressbar');
    expect(gauge).toHaveAttribute('aria-valuenow', '75');
    expect(gauge).toHaveAttribute('aria-valuemin', '0');
    expect(gauge).toHaveAttribute('aria-valuemax', '100');
    expect(gauge).toHaveAttribute('aria-label', 'Progress');
  });
});