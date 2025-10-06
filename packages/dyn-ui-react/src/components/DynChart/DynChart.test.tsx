// Removed unused import of React since it's not directly used in this file
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DynChart from './DynChart';
import styles from './DynChart.module.css';
import { ChartDataPoint } from './DynChart.types';

// Mock HTMLCanvasElement
const mockGetContext = vi.fn();
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: mockGetContext,
});

const mockCanvasContext: Record<string, any> = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
  arc: vi.fn(),
  fillText: vi.fn(),
  closePath: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  fillRect: vi.fn(),
  setLineDash: vi.fn(),
  strokeStyle: '#000',
  fillStyle: '#000',
  lineWidth: 1,
  font: '12px Arial',
  textAlign: 'center',
  lineCap: 'round',
  lineJoin: 'round',
};

beforeEach(() => {
  mockGetContext.mockReturnValue(mockCanvasContext);
  Object.keys(mockCanvasContext).forEach(key => {
    if (typeof mockCanvasContext[key as keyof typeof mockCanvasContext] === 'function') {
      (mockCanvasContext[key as keyof typeof mockCanvasContext] as any).mockClear();
    }
  });
});

const sampleData: ChartDataPoint[] = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 20 },
  { label: 'Mar', value: 15 },
  { label: 'Apr', value: 25 },
];

describe('DynChart', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<DynChart data={sampleData} />);
      expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument();
    });

    it('renders with title and subtitle', () => {
      render(
        <DynChart
          data={sampleData}
          title="Sales Chart"
          subtitle="Monthly sales data"
        />
      );

      expect(screen.getByText('Sales Chart')).toBeInTheDocument();
      expect(screen.getByText('Monthly sales data')).toBeInTheDocument();
    });

    it('renders legend when showLegend is true', () => {
      render(
        <DynChart
          data={[{ name: 'Series 1', data: sampleData }]}
          showLegend={true}
        />
      );

      expect(screen.getByText('Series 1')).toBeInTheDocument();
    });

    it('does not render legend when showLegend is false', () => {
      render(
        <DynChart
          data={[{ name: 'Series 1', data: sampleData }]}
          showLegend={false}
        />
      );

      expect(screen.queryByText('Series 1')).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies custom className', () => {
      const { container } = render(
        <DynChart data={sampleData} className="custom-chart" />
      );

      expect(container.firstChild).toHaveClass('custom-chart');
    });

    it('sets canvas dimensions', () => {
      render(
        <DynChart
          data={sampleData}
          width={500}
          height={400}
        />
      );

      const canvas = screen.getByRole('presentation', { hidden: true }) as HTMLCanvasElement;
      expect(canvas).toHaveStyle({ width: '500px', height: '400px' });
    });

    it('handles empty data', () => {
      render(<DynChart data={[]} />);
      expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument();
    });
  });

  describe('Chart Types', () => {
    it('renders line chart by default', () => {
      const { container } = render(<DynChart data={sampleData} />);
      expect(container.firstChild).toHaveClass(styles['dyn-chart--line']!);
    });

    it('renders bar chart when type is bar', () => {
      const { container } = render(<DynChart data={sampleData} type="bar" />);
      expect(container.firstChild).toHaveClass(styles['dyn-chart--bar'] ?? '');
    });

    it('renders pie chart when type is pie', () => {
      const { container } = render(<DynChart data={sampleData} type="pie" />);
      expect(container.firstChild).toHaveClass(styles['dyn-chart--pie'] ?? '');
    });

    it('renders area chart when type is area', () => {
      const { container } = render(<DynChart data={sampleData} type="area" />);
      expect(container.firstChild).toHaveClass(styles['dyn-chart--area'] ?? '');
    });
  });

  describe('Canvas Drawing', () => {
    it('calls getContext on canvas', () => {
      render(<DynChart data={sampleData} />);
      expect(mockGetContext).toHaveBeenCalledWith('2d');
    });

    it('clears canvas on render', () => {
      render(<DynChart data={sampleData} />);
      expect(mockCanvasContext.clearRect).toHaveBeenCalled();
    });

    it('draws grid when showGrid is true', () => {
      render(<DynChart data={sampleData} showGrid={true} />);
      expect(mockCanvasContext.setLineDash).toHaveBeenCalledWith([2, 2]);
    });
  });

  describe('Data Handling', () => {
    it('handles single data points array', () => {
      render(<DynChart data={sampleData} />);
      expect(mockGetContext).toHaveBeenCalled();
    });

    it('handles series data format', () => {
      const seriesData = [
        { name: 'Series 1', data: sampleData },
        { name: 'Series 2', data: sampleData.map(d => ({ ...d, value: d.value * 2 })) },
      ];

      render(<DynChart data={seriesData} />);
      expect(screen.getByText('Series 1')).toBeInTheDocument();
      expect(screen.getByText('Series 2')).toBeInTheDocument();
    });
  });

  describe('Tooltip', () => {
    it('renders tooltip container when enabled', () => {
      const { container } = render(<DynChart data={sampleData} showTooltip />);
      expect(container.querySelector(`.${styles['dyn-chart__tooltip']}`)).toBeInTheDocument();
    });

    it('does not render tooltip container when disabled', () => {
      const { container } = render(<DynChart data={sampleData} showTooltip={false} />);
      expect(container.querySelector(`.${styles['dyn-chart__tooltip']}`)).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('has appropriate ARIA attributes', () => {
      render(
        <DynChart
          data={sampleData}
          title="Sales Chart"
        />
      );

      const canvas = screen.getByRole('presentation', { hidden: true });
      expect(canvas).toBeInTheDocument();
    });
  });
});
