# 🎯 DYN-UI CODEX PROMPT 16 - DynChart

## 🚀 AI ZADATAK: Refaktoriši DynChart komponent za accessibility i data visualization standarde

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim kompleksnim komponentima (DynDatePicker, DynGauge)

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynChart/
├── DynChart.tsx                 # React komponent
├── DynChart.types.ts           # TypeScript definicije
├── DynChart.module.css         # CSS Module stilovi
├── DynChart.stories.tsx        # Storybook stories
├── DynChart.test.tsx           # Vitest testovi
├── DynChart.utils.ts           # Utility functions
└── index.ts                    # Export file
```

---

## 🔧 CSS MODULE REFACTORING (DynChart.module.css):

**ZADATAK**: Zameniti SVE hard-coded vrednosti sa design tokens i implementirati accessibility

```css
/* Root container */
.root {
  display: flex;
  flex-direction: column;
  background-color: var(--dyn-color-bg-primary);
  border-radius: var(--dyn-border-radius-md);
  border: var(--dyn-border-width) solid var(--dyn-color-border);
  padding: var(--dyn-spacing-lg);
  font-family: var(--dyn-font-family-primary);
  gap: var(--dyn-spacing-lg);
  transition: var(--dyn-transition-fast);
  position: relative;
  
  /* Focus management for keyboard navigation */
  &:focus-within {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}

/* Chart figure wrapper */
.figure {
  display: flex;
  flex-direction: column;
  gap: var(--dyn-spacing-lg);
  margin: 0;
  position: relative;
}

/* Header section */
.header {
  display: flex;
  flex-direction: column;
  gap: var(--dyn-spacing-xs);
}

.title {
  margin: 0;
  font-size: var(--dyn-font-size-lg);
  font-weight: var(--dyn-font-weight-semibold);
  color: var(--dyn-color-text-primary);
  line-height: var(--dyn-line-height-tight);
}

.subtitle {
  margin: 0;
  font-size: var(--dyn-font-size-sm);
  font-weight: var(--dyn-font-weight-normal);
  color: var(--dyn-color-text-secondary);
  line-height: var(--dyn-line-height-normal);
}

/* Chart content area */
.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: var(--dyn-color-bg-secondary);
  border-radius: var(--dyn-border-radius-sm);
  padding: var(--dyn-spacing-md);
}

/* Canvas element */
.canvas {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--dyn-border-radius-sm);
  
  /* Focus styles for interactive charts */
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}

/* SVG specific styles */
.svg {
  display: block;
  max-width: 100%;
  height: auto;
  
  /* Ensure SVG elements are accessible */
  &[role="img"] {
    &:focus-visible {
      outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
      outline-offset: var(--dyn-focus-ring-offset);
    }
  }
}

/* Interactive chart elements */
.chartElement {
  cursor: pointer;
  transition: var(--dyn-transition-fast);
  
  &:hover {
    opacity: 0.8;
    transform: scale(1.02);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: 2px;
  }
  
  &[aria-selected="true"] {
    stroke: var(--dyn-color-primary);
    stroke-width: 2;
  }
}

/* Tooltip */
.tooltip {
  position: absolute;
  max-width: calc(220px + var(--dyn-spacing-md));
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  border-radius: var(--dyn-border-radius-md);
  background-color: var(--dyn-color-neutral-900);
  color: var(--dyn-color-text-inverse);
  font-size: var(--dyn-font-size-sm);
  line-height: var(--dyn-line-height-normal);
  box-shadow: var(--dyn-shadow-lg);
  pointer-events: none;
  transform: translate(-50%, -120%);
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--dyn-duration-fast) var(--dyn-timing-ease),
              visibility var(--dyn-duration-fast) var(--dyn-timing-ease);
  z-index: var(--dyn-z-index-tooltip);
  white-space: normal;
  word-break: break-word;
  border: var(--dyn-border-width) solid var(--dyn-color-border);
}

.tooltip[data-visible='true'] {
  opacity: 1;
  visibility: visible;
}

.tooltipHeader {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-sm);
  margin-bottom: var(--dyn-spacing-xs);
}

.tooltipColor {
  width: var(--dyn-spacing-sm);
  height: var(--dyn-spacing-sm);
  border-radius: var(--dyn-border-radius-full);
  flex-shrink: 0;
}

.tooltipSeries {
  font-weight: var(--dyn-font-weight-semibold);
}

.tooltipPercentage {
  margin-left: auto;
  font-size: var(--dyn-font-size-xs);
  opacity: 0.85;
}

.tooltipValue {
  font-weight: var(--dyn-font-weight-semibold);
  font-size: var(--dyn-font-size-base);
  margin-bottom: var(--dyn-spacing-xs);
}

.tooltipLabel {
  font-size: var(--dyn-font-size-xs);
  opacity: 0.85;
}

/* Legend */
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dyn-spacing-lg);
  justify-content: center;
  align-items: center;
  padding: var(--dyn-spacing-sm) 0;
}

.legendItem {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-text-secondary);
  cursor: pointer;
  border-radius: var(--dyn-border-radius-sm);
  padding: var(--dyn-spacing-xs) var(--dyn-spacing-sm);
  transition: var(--dyn-transition-fast);
  
  &:hover {
    background-color: var(--dyn-color-neutral-50);
    color: var(--dyn-color-text-primary);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
  
  &[data-active="false"] {
    opacity: 0.5;
  }
}

.legendColor {
  width: var(--dyn-spacing-md);
  height: var(--dyn-spacing-md);
  border-radius: var(--dyn-border-radius-sm);
  flex-shrink: 0;
}

.legendLabel {
  font-weight: var(--dyn-font-weight-normal);
  line-height: var(--dyn-line-height-normal);
}

/* Chart type variants */
.typeLine {
  --dyn-chart-marker-shape: circle;
}

.typeLine .legendColor,
.typeLine .tooltipColor {
  border-radius: var(--dyn-border-radius-full);
}

.typeBar {
  --dyn-chart-marker-shape: square;
}

.typeBar .legendColor,
.typeBar .tooltipColor {
  border-radius: var(--dyn-border-radius-sm);
}

.typePie {
  --dyn-chart-marker-shape: pie;
}

.typePie .legendColor,
.typePie .tooltipColor {
  border-radius: var(--dyn-border-radius-full);
}

.typeArea {
  --dyn-chart-marker-shape: soft;
}

.typeArea .legendColor,
.typeArea .tooltipColor {
  border-radius: var(--dyn-border-radius-xs);
  opacity: 0.9;
}

/* Empty state */
.emptyState {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-text-secondary);
  pointer-events: none;
  padding: var(--dyn-spacing-xl);
  text-align: center;
}

.emptyStateIcon {
  width: var(--dyn-spacing-3xl);
  height: var(--dyn-spacing-3xl);
  opacity: 0.5;
  color: var(--dyn-color-text-disabled);
}

/* Screen reader only content */
.visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Data table fallback for accessibility */
.dataTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--dyn-spacing-lg);
  font-size: var(--dyn-font-size-sm);
  
  th,
  td {
    padding: var(--dyn-spacing-sm);
    text-align: left;
    border-bottom: var(--dyn-border-width) solid var(--dyn-color-border);
  }
  
  th {
    font-weight: var(--dyn-font-weight-semibold);
    color: var(--dyn-color-text-primary);
    background-color: var(--dyn-color-neutral-25);
  }
  
  td {
    color: var(--dyn-color-text-secondary);
  }
}

.dataTableToggle {
  display: inline-flex;
  align-items: center;
  gap: var(--dyn-spacing-xs);
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  background-color: transparent;
  border: var(--dyn-border-width) solid var(--dyn-color-border);
  border-radius: var(--dyn-border-radius-md);
  color: var(--dyn-color-text-primary);
  font-size: var(--dyn-font-size-sm);
  cursor: pointer;
  transition: var(--dyn-transition-fast);
  
  &:hover {
    background-color: var(--dyn-color-neutral-25);
    border-color: var(--dyn-color-border-hover);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}

/* Loading state */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--dyn-spacing-2xl);
  color: var(--dyn-color-text-secondary);
}

.loadingSpinner {
  width: var(--dyn-spacing-xl);
  height: var(--dyn-spacing-xl);
  border: 2px solid var(--dyn-color-neutral-200);
  border-top: 2px solid var(--dyn-color-primary);
  border-radius: var(--dyn-border-radius-full);
  animation: spin var(--dyn-duration-slow) linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 767px) {
  .root {
    padding: var(--dyn-spacing-md);
  }

  .title {
    font-size: var(--dyn-font-size-base);
  }

  .subtitle {
    font-size: var(--dyn-font-size-xs);
  }

  .legend {
    gap: var(--dyn-spacing-md);
  }

  .legendItem {
    gap: var(--dyn-spacing-xs);
    font-size: var(--dyn-font-size-xs);
  }
  
  .tooltip {
    max-width: calc(180px + var(--dyn-spacing-sm));
    padding: var(--dyn-spacing-xs) var(--dyn-spacing-sm);
    font-size: var(--dyn-font-size-xs);
  }
}

@media (max-width: 479px) {
  .legend {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .root {
    background-color: var(--dyn-color-neutral-800);
    border-color: var(--dyn-color-neutral-600);
  }

  .content {
    background-color: var(--dyn-color-neutral-900);
  }

  .tooltip {
    background-color: var(--dyn-color-neutral-700);
    border-color: var(--dyn-color-neutral-500);
  }

  .legendItem:hover {
    background-color: var(--dyn-color-neutral-700);
  }

  .dataTable th {
    background-color: var(--dyn-color-neutral-700);
  }

  .dataTableToggle:hover {
    background-color: var(--dyn-color-neutral-700);
  }

  .loadingSpinner {
    border-color: var(--dyn-color-neutral-600);
    border-top-color: var(--dyn-color-primary);
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .root {
    border-width: 2px;
  }
  
  .chartElement:focus-visible {
    outline-width: 3px;
  }
  
  .tooltip {
    border-width: 2px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .chartElement,
  .legendItem,
  .tooltip,
  .loadingSpinner {
    transition: none;
    animation: none;
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynChart.types.ts):

```typescript
import { HTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, AccessibilityProps } from '../../types/base';

export interface ChartDataPoint {
  /** Data point label */
  label?: string;
  /** Numeric value */
  value: number;
  /** Custom color for this data point */
  color?: string;
  /** Additional metadata for accessibility */
  description?: string;
}

export interface ChartSeries {
  /** Series name for legend */
  name: string;
  /** Array of data points */
  data: ChartDataPoint[];
  /** Series color */
  color?: string;
  /** Series description for accessibility */
  description?: string;
}

export interface ChartAxis {
  /** Axis title */
  title?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Whether to show axis labels */
  showLabels?: boolean;
  /** Label formatter function */
  labelFormatter?: (value: number) => string;
}

export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export type DynChartData = ChartDataPoint[] | ChartSeries[];

export interface DynChartOptions {
  /** Show legend */
  showLegend?: boolean;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Enable data table fallback */
  showDataTable?: boolean;
  /** Enable keyboard navigation */
  enableKeyboardNavigation?: boolean;
  /** Enable screen reader optimizations */
  enableScreenReader?: boolean;
}

export interface DynChartProps extends 
  BaseComponentProps<HTMLDivElement>,
  AccessibilityProps,
  DynChartOptions {
  
  /** Chart type */
  type?: ChartType;

  /** Chart data - can be array of data points or series */
  data?: DynChartData;

  /** Chart title */
  title?: string;

  /** Chart subtitle */
  subtitle?: string;

  /** Chart width in pixels */
  width?: number;

  /** Chart height in pixels */
  height?: number;

  /** Color palette for chart elements */
  colors?: string[];

  /** X axis configuration */
  xAxis?: ChartAxis;

  /** Y axis configuration */  
  yAxis?: ChartAxis;

  /** Loading state */
  loading?: boolean;

  /** Error state */
  error?: boolean;

  /** Error message */
  errorMessage?: string;

  /** Empty state message */
  emptyMessage?: string;

  /** Callback when chart element is clicked */
  onElementClick?: (dataPoint: ChartDataPoint, seriesIndex?: number) => void;

  /** Callback when chart element is focused */
  onElementFocus?: (dataPoint: ChartDataPoint, seriesIndex?: number) => void;

  /** Callback when legend item is toggled */
  onLegendToggle?: (seriesIndex: number, visible: boolean) => void;

  /** Custom tooltip renderer */
  tooltipRenderer?: (dataPoint: ChartDataPoint, series?: ChartSeries) => ReactNode;

  /** Custom empty state renderer */
  emptyStateRenderer?: () => ReactNode;
}

export interface NormalizedChartSeries extends ChartSeries {
  color: string;
}

export interface DynChartLegendItem {
  id: string;
  label: string;
  color: string;
  seriesIndex: number;
  visible: boolean;
}

export interface ChartElement {
  dataPoint: ChartDataPoint;
  seriesIndex?: number;
  bounds: DOMRect;
  element: SVGElement | HTMLElement;
}

export interface TooltipData {
  dataPoint: ChartDataPoint;
  series?: ChartSeries;
  position: { x: number; y: number };
}

export type DynChartDefaultProps = Required<
  Pick<
    DynChartProps,
    'type' | 'data' | 'width' | 'height' | 'colors' | 'showLegend' | 'showTooltip' | 'showGrid' | 'enableKeyboardNavigation'
  >
>;

export const DYN_CHART_DEFAULT_PROPS: DynChartDefaultProps = {
  type: 'line',
  data: [],
  width: 400,
  height: 300,
  colors: [
    'var(--dyn-color-primary)',
    'var(--dyn-color-success)', 
    'var(--dyn-color-warning)',
    'var(--dyn-color-danger)',
    'var(--dyn-color-info)'
  ],
  showLegend: true,
  showTooltip: true,
  showGrid: true,
  enableKeyboardNavigation: true,
};

export interface DynChartRef extends HTMLDivElement {
  /** Focus specific chart element */
  focusElement: (index: number) => void;
  /** Get chart data as accessible table */
  getDataTable: () => HTMLTableElement;
  /** Export chart as image */
  exportAsImage: (format: 'png' | 'svg') => Promise<Blob>;
}
```

---

## ⚛️ REACT COMPONENT (DynChart.tsx):

```typescript
import React, { forwardRef, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/className';
import { generateId, announceToScreenReader } from '../../utils/accessibility';
import { DynChartProps, DynChartRef, DynChartLegendItem, ChartElement, TooltipData, NormalizedChartSeries, DYN_CHART_DEFAULT_PROPS } from './DynChart.types';
import { normalizeChartData, createChartElements, formatValue } from './DynChart.utils';
import styles from './DynChart.module.css';

export const DynChart = forwardRef<DynChartRef, DynChartProps>(
  (
    {
      className,
      type = DYN_CHART_DEFAULT_PROPS.type,
      data = DYN_CHART_DEFAULT_PROPS.data,
      title,
      subtitle,
      width = DYN_CHART_DEFAULT_PROPS.width,
      height = DYN_CHART_DEFAULT_PROPS.height,
      colors = DYN_CHART_DEFAULT_PROPS.colors,
      xAxis,
      yAxis,
      showLegend = DYN_CHART_DEFAULT_PROPS.showLegend,
      showTooltip = DYN_CHART_DEFAULT_PROPS.showTooltip,
      showGrid = DYN_CHART_DEFAULT_PROPS.showGrid,
      showDataTable = false,
      enableKeyboardNavigation = DYN_CHART_DEFAULT_PROPS.enableKeyboardNavigation,
      enableScreenReader = true,
      loading = false,
      error = false,
      errorMessage,
      emptyMessage = "No data available",
      onElementClick,
      onElementFocus,
      onLegendToggle,
      tooltipRenderer,
      emptyStateRenderer,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    
    // State
    const [focusedElementIndex, setFocusedElementIndex] = useState<number>(-1);
    const [legendItems, setLegendItems] = useState<DynChartLegendItem[]>([]);
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);
    const [showDataTableState, setShowDataTableState] = useState(false);
    
    // Generate IDs
    const [internalId] = useState(() => id || generateId('chart'));
    const titleId = `${internalId}-title`;
    const subtitleId = `${internalId}-subtitle`;
    const tableId = `${internalId}-table`;
    
    // Normalize data
    const normalizedData = useMemo(() => 
      normalizeChartData(data, colors), [data, colors]
    );
    
    // Create chart elements for accessibility
    const chartElements = useMemo(() => 
      createChartElements(normalizedData, type), [normalizedData, type]
    );
    
    // Update legend items when data changes
    useEffect(() => {
      const items: DynChartLegendItem[] = normalizedData.map((series, index) => ({
        id: `${internalId}-legend-${index}`,
        label: series.name,
        color: series.color,
        seriesIndex: index,
        visible: true
      }));
      setLegendItems(items);
    }, [normalizedData, internalId]);
    
    // Keyboard navigation
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (!enableKeyboardNavigation || chartElements.length === 0) return;
      
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          setFocusedElementIndex(prev => 
            prev < chartElements.length - 1 ? prev + 1 : 0
          );
          break;
          
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          setFocusedElementIndex(prev => 
            prev > 0 ? prev - 1 : chartElements.length - 1
          );
          break;
          
        case 'Home':
          event.preventDefault();
          setFocusedElementIndex(0);
          break;
          
        case 'End':
          event.preventDefault();
          setFocusedElementIndex(chartElements.length - 1);
          break;
          
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedElementIndex >= 0) {
            const element = chartElements[focusedElementIndex];
            onElementClick?.(element.dataPoint, element.seriesIndex);
          }
          break;
          
        case 'Escape':
          setTooltip(null);
          setFocusedElementIndex(-1);
          break;
      }
    }, [enableKeyboardNavigation, chartElements, focusedElementIndex, onElementClick]);
    
    // Handle element focus
    const handleElementFocus = useCallback((index: number) => {
      setFocusedElementIndex(index);
      const element = chartElements[index];
      
      if (element) {
        onElementFocus?.(element.dataPoint, element.seriesIndex);
        
        // Announce to screen reader
        if (enableScreenReader) {
          const announcement = `Chart element ${index + 1} of ${chartElements.length}: ${element.dataPoint.label}, value ${formatValue(element.dataPoint.value)}`;
          announceToScreenReader(announcement);
        }
      }
    }, [chartElements, onElementFocus, enableScreenReader]);
    
    // Handle legend toggle
    const handleLegendToggle = useCallback((seriesIndex: number) => {
      setLegendItems(prev => 
        prev.map(item => 
          item.seriesIndex === seriesIndex 
            ? { ...item, visible: !item.visible }
            : item
        )
      );
      onLegendToggle?.(seriesIndex, !legendItems[seriesIndex]?.visible);
    }, [legendItems, onLegendToggle]);
    
    // Expose ref methods
    React.useImperativeHandle(ref, () => ({
      ...containerRef.current!,
      focusElement: (index: number) => {
        setFocusedElementIndex(index);
      },
      getDataTable: () => {
        // Return data table element
        return document.getElementById(tableId) as HTMLTableElement;
      },
      exportAsImage: async (format: 'png' | 'svg') => {
        // Implementation for chart export
        throw new Error('Export functionality not implemented');
      }
    }));
    
    // Build describedBy string
    const describedBy = [
      ariaDescribedBy,
      subtitle ? subtitleId : null,
      showDataTableState ? tableId : null
    ].filter(Boolean).join(' ') || undefined;
    
    const containerClasses = cn(
      styles.root,
      styles[`type${type.charAt(0).toUpperCase() + type.slice(1)}`],
      {
        [styles.loading]: loading,
        [styles.error]: error
      },
      className
    );
    
    // Render empty state
    if (!loading && (!normalizedData.length || normalizedData.every(s => !s.data.length))) {
      return (
        <div
          ref={containerRef}
          id={internalId}
          className={containerClasses}
          role="img"
          aria-label={ariaLabel || `${type} chart: ${title || 'No data'}`}
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={describedBy}
          {...rest}
        >
          {title && (
            <div className={styles.header}>
              <h3 id={titleId} className={styles.title}>
                {title}
              </h3>
              {subtitle && (
                <p id={subtitleId} className={styles.subtitle}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          <div className={styles.content}>
            <div className={styles.emptyState}>
              {emptyStateRenderer ? (
                emptyStateRenderer()
              ) : (
                <>
                  <div className={styles.emptyStateIcon}>📊</div>
                  <span>{emptyMessage}</span>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // Render loading state
    if (loading) {
      return (
        <div
          ref={containerRef}
          id={internalId}
          className={containerClasses}
          role="img"
          aria-label="Loading chart data"
          aria-busy="true"
          {...rest}
        >
          {title && (
            <div className={styles.header}>
              <h3 id={titleId} className={styles.title}>
                {title}
              </h3>
              {subtitle && (
                <p id={subtitleId} className={styles.subtitle}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          <div className={styles.content}>
            <div className={styles.loading}>
              <div className={styles.loadingSpinner} />
              <span className={styles.visuallyHidden}>Loading chart data...</span>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div
        ref={containerRef}
        id={internalId}
        className={containerClasses}
        role="img"
        aria-label={ariaLabel || `${type} chart showing ${normalizedData.length} data series`}
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={describedBy}
        onKeyDown={handleKeyDown}
        tabIndex={enableKeyboardNavigation ? 0 : -1}
        {...rest}
      >
        <figure className={styles.figure}>
          {/* Header */}
          {(title || subtitle) && (
            <div className={styles.header}>
              {title && (
                <h3 id={titleId} className={styles.title}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p id={subtitleId} className={styles.subtitle}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          {/* Chart Content */}
          <div className={styles.content}>
            {/* SVG Chart */}
            <svg
              ref={svgRef}
              className={styles.svg}
              width={width}
              height={height}
              role="img"
              aria-hidden={enableScreenReader ? 'true' : 'false'}
            >
              <title>
                {title || `${type} chart`}
              </title>
              <desc>
                Chart showing {normalizedData.length} data series with {chartElements.length} total data points
              </desc>
              
              {/* Chart implementation would go here */}
              {/* This is a placeholder - actual chart rendering would use D3.js, Chart.js, or custom SVG */}
              
              {/* Interactive elements for keyboard navigation */}
              {chartElements.map((element, index) => (
                <g
                  key={`element-${index}`}
                  className={styles.chartElement}
                  role="button"
                  tabIndex={focusedElementIndex === index ? 0 : -1}
                  aria-label={`${element.dataPoint.label}: ${formatValue(element.dataPoint.value)}`}
                  aria-selected={focusedElementIndex === index}
                  onFocus={() => handleElementFocus(index)}
                  onClick={() => onElementClick?.(element.dataPoint, element.seriesIndex)}
                >
                  {/* Chart element visual representation */}
                  <circle cx={50} cy={50} r={5} fill={normalizedData[element.seriesIndex || 0]?.color} />
                </g>
              ))}
            </svg>
            
            {/* Tooltip */}
            {tooltip && showTooltip && (
              <div
                className={styles.tooltip}
                data-visible="true"
                style={{
                  left: tooltip.position.x,
                  top: tooltip.position.y
                }}
                role="tooltip"
                aria-live="polite"
              >
                {tooltipRenderer ? (
                  tooltipRenderer(tooltip.dataPoint, tooltip.series)
                ) : (
                  <>
                    <div className={styles.tooltipHeader}>
                      <div 
                        className={styles.tooltipColor}
                        style={{ backgroundColor: tooltip.series?.color }}
                      />
                      <span className={styles.tooltipSeries}>
                        {tooltip.series?.name}
                      </span>
                    </div>
                    <div className={styles.tooltipValue}>
                      {formatValue(tooltip.dataPoint.value)}
                    </div>
                    <div className={styles.tooltipLabel}>
                      {tooltip.dataPoint.label}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Legend */}
          {showLegend && legendItems.length > 0 && (
            <div className={styles.legend} role="list" aria-label="Chart legend">
              {legendItems.map((item) => (
                <div
                  key={item.id}
                  className={styles.legendItem}
                  role="listitem"
                  data-active={item.visible}
                  tabIndex={0}
                  onClick={() => handleLegendToggle(item.seriesIndex)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLegendToggle(item.seriesIndex);
                    }
                  }}
                  aria-label={`Toggle ${item.label} series visibility`}
                >
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={styles.legendLabel}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* Data Table Toggle */}
          {enableScreenReader && (
            <button
              className={styles.dataTableToggle}
              onClick={() => setShowDataTableState(!showDataTableState)}
              aria-expanded={showDataTableState}
              aria-controls={tableId}
            >
              {showDataTableState ? 'Hide' : 'Show'} data table
            </button>
          )}
        </figure>
        
        {/* Accessible Data Table */}
        {showDataTableState && (
          <table id={tableId} className={styles.dataTable}>
            <caption className={styles.visuallyHidden}>
              Chart data in tabular format
            </caption>
            <thead>
              <tr>
                <th scope="col">Series</th>
                <th scope="col">Label</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {normalizedData.map((series, seriesIndex) =>
                series.data.map((point, pointIndex) => (
                  <tr key={`${seriesIndex}-${pointIndex}`}>
                    <td>{series.name}</td>
                    <td>{point.label || `Point ${pointIndex + 1}`}</td>
                    <td>{formatValue(point.value)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        
        {/* Screen reader announcements */}
        <div className={styles.visuallyHidden} aria-live="polite" aria-atomic="true">
          {focusedElementIndex >= 0 && chartElements[focusedElementIndex] && (
            `Focused: ${chartElements[focusedElementIndex].dataPoint.label}, ${formatValue(chartElements[focusedElementIndex].dataPoint.value)}`
          )}
        </div>
      </div>
    );
  }
);

DynChart.displayName = 'DynChart';
```

---

## 🧪 TESTING ENHANCEMENTS (DynChart.test.tsx):

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testAccessibility } from '../../test-utils';
import { DynChart } from './DynChart';

const mockData = [
  { label: 'Q1', value: 100 },
  { label: 'Q2', value: 150 },
  { label: 'Q3', value: 120 },
  { label: 'Q4', value: 180 }
];

const mockSeriesData = [
  {
    name: 'Revenue',
    data: [
      { label: 'Q1', value: 100 },
      { label: 'Q2', value: 150 }
    ]
  },
  {
    name: 'Profit', 
    data: [
      { label: 'Q1', value: 20 },
      { label: 'Q2', value: 30 }
    ]
  }
];

describe('DynChart', () => {
  describe('Basic Functionality', () => {
    it('renders chart with title and data', () => {
      render(
        <DynChart 
          title="Test Chart"
          data={mockData}
          type="bar"
        />
      );
      
      expect(screen.getByText('Test Chart')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders empty state when no data provided', () => {
      render(
        <DynChart 
          title="Empty Chart"
          data={[]}
          emptyMessage="No data to display"
        />
      );
      
      expect(screen.getByText('No data to display')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<DynChart loading title="Loading Chart" />);
      
      expect(screen.getByLabelText('Loading chart data')).toBeInTheDocument();
      expect(screen.getByText('Loading chart data...')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <DynChart 
          title="Accessible Chart"
          data={mockData}
          type="line"
        />
      );
      await testAccessibility(container);
    });

    it('provides proper ARIA labels and roles', () => {
      render(
        <DynChart 
          title="ARIA Chart"
          subtitle="Chart subtitle"
          data={mockData}
          type="bar"
          aria-label="Custom chart label"
        />
      );
      
      const chart = screen.getByRole('img');
      expect(chart).toHaveAttribute('aria-label', 'Custom chart label');
      expect(chart).toHaveAttribute('aria-labelledby');
      expect(chart).toHaveAttribute('aria-describedby');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleElementFocus = vi.fn();
      
      render(
        <DynChart 
          data={mockData}
          enableKeyboardNavigation
          onElementFocus={handleElementFocus}
        />
      );
      
      const chart = screen.getByRole('img');
      await user.tab();
      expect(chart).toHaveFocus();
      
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowLeft}');
      await user.keyboard('{Home}');
      await user.keyboard('{End}');
    });

    it('provides data table alternative', async () => {
      const user = userEvent.setup();
      
      render(
        <DynChart 
          data={mockSeriesData}
          enableScreenReader
        />
      );
      
      const toggleButton = screen.getByText('Show data table');
      await user.click(toggleButton);
      
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Hide data table')).toBeInTheDocument();
    });

    it('announces screen reader updates', () => {
      render(
        <DynChart 
          data={mockData}
          enableScreenReader
        />
      );
      
      const liveRegion = screen.getByRole('status', { hidden: true });
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Legend Interaction', () => {
    it('renders legend with interactive items', () => {
      render(
        <DynChart 
          data={mockSeriesData}
          showLegend
        />
      );
      
      const legend = screen.getByRole('list', { name: /chart legend/i });
      expect(legend).toBeInTheDocument();
      
      const legendItems = screen.getAllByRole('listitem');
      expect(legendItems).toHaveLength(2);
    });

    it('handles legend toggle interactions', async () => {
      const user = userEvent.setup();
      const handleLegendToggle = vi.fn();
      
      render(
        <DynChart 
          data={mockSeriesData}
          showLegend
          onLegendToggle={handleLegendToggle}
        />
      );
      
      const firstLegendItem = screen.getAllByRole('listitem')[0];
      await user.click(firstLegendItem);
      
      expect(handleLegendToggle).toHaveBeenCalledWith(0, false);
    });

    it('supports legend keyboard interaction', async () => {
      const user = userEvent.setup();
      const handleLegendToggle = vi.fn();
      
      render(
        <DynChart 
          data={mockSeriesData}
          showLegend
          onLegendToggle={handleLegendToggle}
        />
      );
      
      const firstLegendItem = screen.getAllByRole('listitem')[0];
      firstLegendItem.focus();
      await user.keyboard('{Enter}');
      
      expect(handleLegendToggle).toHaveBeenCalledWith(0, false);
    });
  });

  describe('Chart Types', () => {
    it.each(['line', 'bar', 'pie', 'area'] as const)('renders %s chart type', (type) => {
      render(
        <DynChart 
          type={type}
          data={mockData}
          title={`${type} chart`}
        />
      );
      
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('renders error state', () => {
      render(
        <DynChart 
          error
          errorMessage="Failed to load chart data"
          title="Error Chart"
        />
      );
      
      expect(screen.getByText('Failed to load chart data')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      render(
        <DynChart 
          data={mockData}
          width={800}
          height={400}
        />
      );
      
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toHaveAttribute('width', '800');
      expect(svg).toHaveAttribute('height', '400');
    });
  });

  describe('Custom Renderers', () => {
    it('uses custom tooltip renderer', () => {
      const CustomTooltip = () => <div>Custom tooltip content</div>;
      
      render(
        <DynChart 
          data={mockData}
          tooltipRenderer={CustomTooltip}
        />
      );
      
      // Tooltip rendering would be tested with interaction simulation
    });

    it('uses custom empty state renderer', () => {
      const CustomEmptyState = () => <div>Custom empty state</div>;
      
      render(
        <DynChart 
          data={[]}
          emptyStateRenderer={CustomEmptyState}
        />
      );
      
      expect(screen.getByText('Custom empty state')).toBeInTheDocument();
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynChart.stories.tsx):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynChart } from './DynChart';

const mockData = [
  { label: 'January', value: 4000 },
  { label: 'February', value: 3000 },
  { label: 'March', value: 5000 },
  { label: 'April', value: 4500 },
  { label: 'May', value: 6000 },
  { label: 'June', value: 5500 }
];

const mockSeriesData = [
  {
    name: 'Revenue',
    data: [
      { label: 'Q1 2024', value: 15000 },
      { label: 'Q2 2024', value: 18000 },
      { label: 'Q3 2024', value: 22000 },
      { label: 'Q4 2024', value: 25000 }
    ]
  },
  {
    name: 'Expenses',
    data: [
      { label: 'Q1 2024', value: 12000 },
      { label: 'Q2 2024', value: 14000 },
      { label: 'Q3 2024', value: 16000 },
      { label: 'Q4 2024', value: 18000 }
    ]
  }
];

const meta = {
  title: 'Components/DynChart',
  component: DynChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible data visualization component with keyboard navigation, screen reader support, and responsive design.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie', 'area'],
      description: 'Chart type'
    },
    showLegend: {
      control: 'boolean',
      description: 'Show chart legend'
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltips on hover'
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines'
    },
    enableKeyboardNavigation: {
      control: 'boolean',
      description: 'Enable keyboard navigation'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state'
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Monthly Sales',
    subtitle: 'Revenue over the past 6 months',
    data: mockData,
    type: 'line',
    width: 500,
    height: 300,
  },
};

export const ChartTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', width: '100%' }}>
      <DynChart
        title="Line Chart"
        data={mockData}
        type="line"
        width={400}
        height={250}
      />
      <DynChart
        title="Bar Chart"
        data={mockData}
        type="bar"
        width={400}
        height={250}
      />
      <DynChart
        title="Pie Chart"
        data={mockData}
        type="pie"
        width={400}
        height={250}
      />
      <DynChart
        title="Area Chart"
        data={mockData}
        type="area"
        width={400}
        height={250}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different chart types available in the component.'
      }
    }
  }
};

export const MultiSeries: Story = {
  args: {
    title: 'Financial Overview',
    subtitle: 'Revenue vs Expenses by Quarter',
    data: mockSeriesData,
    type: 'bar',
    width: 600,
    height: 350,
    showLegend: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart with multiple data series and interactive legend.'
      }
    }
  }
};

export const LoadingState: Story = {
  args: {
    title: 'Loading Chart',
    loading: true,
    width: 500,
    height: 300,
  },
};

export const EmptyState: Story = {
  args: {
    title: 'Empty Chart',
    subtitle: 'No data available',
    data: [],
    emptyMessage: 'No sales data available for the selected period',
    width: 500,
    height: 300,
  },
};

export const AccessibilityFeatures: Story = {
  args: {
    title: 'Accessible Chart',
    subtitle: 'Demonstrates accessibility features',
    data: mockData,
    type: 'line',
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    showDataTable: true,
    'aria-label': 'Sales performance chart showing monthly revenue trends',
    width: 500,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart with full accessibility features enabled including keyboard navigation, screen reader support, and data table fallback.'
      }
    }
  }
};

export const CustomColors: Story = {
  args: {
    title: 'Custom Color Palette',
    data: mockSeriesData,
    type: 'bar',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    width: 500,
    height: 300,
  },
};

export const InteractiveChart: Story = {
  args: {
    title: 'Interactive Chart',
    subtitle: 'Click elements and legend items',
    data: mockSeriesData,
    type: 'line',
    showLegend: true,
    showTooltip: true,
    enableKeyboardNavigation: true,
    onElementClick: (dataPoint, seriesIndex) => {
      alert(`Clicked: ${dataPoint.label} - ${dataPoint.value} (Series: ${seriesIndex})`);
    },
    onLegendToggle: (seriesIndex, visible) => {
      console.log(`Legend toggled: Series ${seriesIndex} is now ${visible ? 'visible' : 'hidden'}`);
    },
    width: 600,
    height: 350,
  },
};

export const ResponsiveChart: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <DynChart
        title="Responsive Chart"
        subtitle="Adapts to container width"
        data={mockData}
        type="area"
        width={800}
        height={400}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};

export const DarkTheme: Story = {
  args: {
    title: 'Dark Theme Chart',
    subtitle: 'Chart optimized for dark backgrounds',
    data: mockSeriesData,
    type: 'line',
    width: 500,
    height: 300,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      story: {
        inline: false,
        height: '400px',
      },
    },
  },
  render: (args) => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <DynChart {...args} />
    </div>
  ),
};

export const HighContrast: Story = {
  args: {
    title: 'High Contrast Chart',
    data: mockData,
    type: 'bar',
    colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF'],
    width: 500,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart with high contrast colors for improved accessibility.'
      }
    }
  }
};
```

---

## 📤 EXPORT STANDARDIZATION (index.ts):

```typescript
export { DynChart } from './DynChart';
export { default } from './DynChart';
export type { 
  DynChartProps, 
  DynChartRef,
  ChartDataPoint,
  ChartSeries,
  ChartType,
  DynChartData,
  DynChartOptions
} from './DynChart.types';
export { 
  DYN_CHART_DEFAULT_PROPS 
} from './DynChart.types';
```

---

## ✅ DELIVERABLE CHECKLIST:

Po završetku ovog prompta, verifikuj da je sve implementirano:

- [ ] **CSS Tokens**: Svi hard-coded stilovi zamenjeni sa `var(--dyn-*)`
- [ ] **Responsive**: Mobile-first breakpoints sa proper touch targets
- [ ] **Dark Theme**: `@media (prefers-color-scheme: dark)` podrška  
- [ ] **TypeScript**: Accessibility props u interface-u sa forwardRef
- [ ] **Keyboard Navigation**: Arrow keys, Home/End, Enter/Space support
- [ ] **Screen Reader**: ARIA roles, live regions, data table fallback
- [ ] **SVG Accessibility**: `<title>`, `<desc>`, proper roles
- [ ] **Focus Management**: Visual focus indicators, roving tabindex
- [ ] **Legend Interaction**: Clickable, keyboard accessible legend
- [ ] **Tooltip**: Accessible tooltip with live announcements
- [ ] **Testing**: 85%+ coverage sa accessibility tests
- [ ] **Loading/Empty States**: Proper ARIA attributes
- [ ] **Performance**: Optimized for large datasets
- [ ] **Exports**: Standardizovani exports u index.ts

---

## 🎯 SUCCESS CRITERIA:

✅ **Accessibility**: 0 violations u jest-axe testovima  
✅ **SVG Standards**: Proper semantic markup sa title/desc  
✅ **Keyboard Navigation**: Full chart navigation sa announcements  
✅ **Screen Reader**: Data table alternative + live regions  
✅ **Design Tokens**: 100% hard-coded vrednosti zamenjeno  
✅ **Responsive**: Mobile-optimized sa proper breakpoints  
✅ **Performance**: Optimized rendering za complex data  
✅ **Documentation**: Comprehensive Storybook sa accessibility demos

**REZULTAT**: Production-ready DynChart komponent koji postavlja standard za data visualization accessibility u DYN-UI biblioteci!