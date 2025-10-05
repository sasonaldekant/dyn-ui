import type { Meta, StoryObj } from '@storybook/react-vite';
import DynChart from './DynChart';
import { DynChartProps, ChartDataPoint, ChartSeries } from './DynChart.types';

const meta: Meta<typeof DynChart> = {
  title: 'Data Display/DynChart',
  component: DynChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile chart component that supports line, bar, pie, and area charts with customizable styling and interactive features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['line', 'bar', 'pie', 'area'],
      description: 'Chart type to display'
    },
    title: {
      control: 'text',
      description: 'Chart title'
    },
    subtitle: {
      control: 'text',
      description: 'Chart subtitle'
    },
    width: {
      control: { type: 'number', min: 200, max: 1000 },
      description: 'Chart width in pixels'
    },
    height: {
      control: { type: 'number', min: 150, max: 600 },
      description: 'Chart height in pixels'
    },
    showLegend: {
      control: 'boolean',
      description: 'Show chart legend'
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines'
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover'
    },
  },
};

export default meta;
type Story = StoryObj<typeof DynChart>;

// Sample data
const sampleDataPoints: ChartDataPoint[] = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 78 },
  { label: 'Mar', value: 52 },
  { label: 'Apr', value: 89 },
  { label: 'May', value: 94 },
  { label: 'Jun', value: 71 },
];

const multiSeriesData: ChartSeries[] = [
  {
    name: 'Revenue',
    data: sampleDataPoints,
    color: '#0066cc'
  },
  {
    name: 'Costs',
    data: sampleDataPoints.map(d => ({ ...d, value: d.value * 0.7 })),
    color: '#f44336'
  },
  {
    name: 'Profit',
    data: sampleDataPoints.map(d => ({ ...d, value: d.value * 0.3 })),
    color: '#00b248'
  }
];

const pieData: ChartDataPoint[] = [
  { label: 'Desktop', value: 45, color: '#0066cc' },
  { label: 'Mobile', value: 35, color: '#00b248' },
  { label: 'Tablet', value: 15, color: '#f44336' },
  { label: 'Other', value: 5, color: '#ff9800' },
];

// Default story
export const Default: Story = {
  args: {
    data: sampleDataPoints,
    type: 'line',
    title: 'Monthly Sales',
    subtitle: 'Sales performance over 6 months',
    width: 500,
    height: 300,
    showLegend: true,
    showGrid: true,
    showTooltip: true,
  },
};

// Line Chart
export const LineChart: Story = {
  args: {
    ...Default.args,
    type: 'line',
    title: 'Line Chart Example',
    data: sampleDataPoints,
  },
};

// Bar Chart
export const BarChart: Story = {
  args: {
    ...Default.args,
    type: 'bar',
    title: 'Bar Chart Example',
    data: sampleDataPoints,
  },
};

// Pie Chart
export const PieChart: Story = {
  args: {
    ...Default.args,
    type: 'pie',
    title: 'Device Usage Distribution',
    subtitle: 'Percentage of users by device type',
    data: pieData,
    width: 400,
    height: 400,
  },
};

// Area Chart
export const AreaChart: Story = {
  args: {
    ...Default.args,
    type: 'area',
    title: 'Area Chart Example',
    data: sampleDataPoints,
  },
};

// Multi-Series Chart
export const MultiSeries: Story = {
  args: {
    ...Default.args,
    type: 'line',
    title: 'Financial Performance',
    subtitle: 'Revenue, costs, and profit over time',
    data: multiSeriesData,
    width: 600,
    height: 350,
  },
};

// With Custom Colors
export const CustomColors: Story = {
  args: {
    ...Default.args,
    title: 'Custom Color Palette',
    data: sampleDataPoints,
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
  },
};

// Without Legend
export const NoLegend: Story = {
  args: {
    ...Default.args,
    title: 'Chart Without Legend',
    showLegend: false,
  },
};

// Without Grid
export const NoGrid: Story = {
  args: {
    ...Default.args,
    title: 'Chart Without Grid',
    showGrid: false,
  },
};

// Small Chart
export const SmallChart: Story = {
  args: {
    ...Default.args,
    title: 'Small Chart',
    width: 300,
    height: 200,
  },
};

// Large Chart
export const LargeChart: Story = {
  args: {
    ...Default.args,
    title: 'Large Chart',
    width: 800,
    height: 500,
  },
};

// With Axis Labels
export const WithAxisLabels: Story = {
  args: {
    ...Default.args,
    title: 'Chart with Axis Labels',
    xAxis: {
      title: 'Time Period',
      showLabels: true,
    },
    yAxis: {
      title: 'Sales ($K)',
      showLabels: true,
      min: 0,
      max: 100,
    },
  },
};

// Empty Data
export const EmptyData: Story = {
  args: {
    ...Default.args,
    title: 'Empty Chart',
    subtitle: 'No data available',
    data: [],
  },
};

// Loading State (simulated)
export const LoadingState: Story = {
  args: {
    ...Default.args,
    title: 'Loading Chart...',
    data: [],
    className: 'loading-state',
  },
};
