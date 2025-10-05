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
    const { rerender } = render(<DynGauge value={50} type="circle" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--circle');
    
    rerender(<DynGauge value={50} type="line" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--line');
    
    rerender(<DynGauge value={50} type="arc" />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--arc');
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

  it('displays title when provided', () => {
    render(<DynGauge value={60} title="Progress Gauge" />);
    expect(screen.getByText('Progress Gauge')).toBeInTheDocument();
  });

  it('displays subtitle when provided', () => {
    render(<DynGauge value={60} subtitle="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays unit when provided', () => {
    render(<DynGauge value={60} unit="MB/s" />);
    expect(screen.getByText('60 MB/s')).toBeInTheDocument();
  });

  it('can hide value display', () => {
    render(<DynGauge value={75} showValue={false} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('supports custom color', () => {
    render(<DynGauge value={50} color="#ff0000" />);
    const gauge = screen.getByTestId('dyn-gauge');
    expect(gauge).toHaveStyle('--gauge-color: #ff0000');
  });

  it('supports animated transitions', () => {
    render(<DynGauge value={50} animated={true} />);
    expect(screen.getByTestId('dyn-gauge')).toHaveClass('gauge--animated');
  });
});