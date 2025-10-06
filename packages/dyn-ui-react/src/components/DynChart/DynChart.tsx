import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import { DynChartProps, ChartSeries, ChartDataPoint } from './DynChart.types';
import styles from './DynChart.module.css';

type TooltipTarget =
  | {
      kind: 'point';
      x: number;
      y: number;
      radius: number;
      value: number;
      label?: string;
      series: string;
      color: string;
    }
  | {
      kind: 'bar';
      x: number;
      y: number;
      width: number;
      height: number;
      value: number;
      label?: string;
      series: string;
      color: string;
    }
  | {
      kind: 'slice';
      startAngle: number;
      endAngle: number;
      centerX: number;
      centerY: number;
      radius: number;
      value: number;
      label?: string;
      series: string;
      color: string;
      percentage: number;
    };

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  value: number;
  label: string | undefined;
  series: string | undefined;
  color: string | undefined;
  percentage: number | undefined;
}

const normalizeAngle = (angle: number) => {
  const twoPi = Math.PI * 2;
  const normalized = angle % twoPi;
  return normalized >= 0 ? normalized : normalized + twoPi;
};

// Simple chart implementation without external dependencies
const DynChart: React.FC<DynChartProps> = ({
  type = 'line',
  data = [],
  title,
  subtitle,
  width = 400,
  height = 300,
  colors = ['#0066cc', '#00b248', '#f44336', '#ff9800', '#9c27b0'],
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  xAxis,
  yAxis,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipTargetsRef = useRef<TooltipTarget[]>([]);
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    value: 0,
    label: undefined,
    series: undefined,
    color: undefined,
    percentage: undefined,
  });

  // Normalize data to series format
  const normalizedData: ChartSeries[] = useMemo(() => {
    if (!data.length) return [];

    // If data is already in series format
    if (Array.isArray(data) && data[0] && 'name' in data[0]) {
      return data as ChartSeries[];
    }

    // Convert data points to single series
    return [
      {
        name: 'Series 1',
        data: data as ChartDataPoint[],
        color: colors[0] || '#0066cc',
      },
    ];
  }, [data, colors]);

  // Calculate chart dimensions
  const chartDimensions = useMemo(() => {
    const padding = { top: 20, right: 20, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    return {
      padding,
      chartWidth,
      chartHeight,
      totalWidth: width,
      totalHeight: height,
    };
  }, [width, height]);

  // Calculate data ranges
  const dataRanges = useMemo(() => {
    if (!normalizedData.length) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    let minY = yAxis?.min ?? Infinity;
    let maxY = yAxis?.max ?? -Infinity;
    let minX = 0;
    let maxX = 0;

    normalizedData.forEach(series => {
      series.data.forEach((point, index) => {
        if (yAxis?.min === undefined) {
          minY = Math.min(minY, point.value);
        }
        if (yAxis?.max === undefined) {
          maxY = Math.max(maxY, point.value);
        }
        maxX = Math.max(maxX, index);
      });
    });

    // Add some padding to Y axis
    if (yAxis?.min === undefined) {
      minY = Math.max(0, minY * 0.9);
    }
    if (yAxis?.max === undefined) {
      maxY = maxY * 1.1;
    }

    if (!Number.isFinite(minY) || !Number.isFinite(maxY)) {
      return { minX, maxX, minY: 0, maxY: 1 };
    }

    return { minX, maxX, minY, maxY };
  }, [normalizedData, yAxis]);

  const hideTooltip = useCallback(() => {
    setTooltipState(prev => (prev.visible ? { ...prev, visible: false } : prev));
  }, []);

  const findTooltipTarget = useCallback((x: number, y: number) => {
    for (const target of tooltipTargetsRef.current) {
      if (target.kind === 'point') {
        const distance = Math.hypot(x - target.x, y - target.y);
        if (distance <= target.radius + 6) {
          return target;
        }
      } else if (target.kind === 'bar') {
        if (
          x >= target.x &&
          x <= target.x + target.width &&
          y >= target.y &&
          y <= target.y + target.height
        ) {
          return target;
        }
      } else if (target.kind === 'slice') {
        const dx = x - target.centerX;
        const dy = y - target.centerY;
        const distance = Math.hypot(dx, dy);

        if (distance > target.radius) {
          continue;
        }

        const angle = normalizeAngle(Math.atan2(dy, dx));
        const start = normalizeAngle(target.startAngle);
        const end = normalizeAngle(target.endAngle);

        if (end < start) {
          if (angle >= start || angle <= end) {
            return target;
          }
        } else if (angle >= start && angle <= end) {
          return target;
        }
      }
    }

    return null;
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!showTooltip) {
        return;
      }

      const { offsetX, offsetY } = event.nativeEvent;
      const target = findTooltipTarget(offsetX, offsetY);

      if (!target) {
        hideTooltip();
        return;
      }

      setTooltipState(prev => {
        const nextState: TooltipState = {
          visible: true,
          x: offsetX + 12,
          y: offsetY - 12,
          value: target.value,
          label: target.label,
          series: target.series,
          color: target.color,
          percentage: target.kind === 'slice' ? target.percentage : undefined,
        };

        if (
          prev.visible &&
          prev.x === nextState.x &&
          prev.y === nextState.y &&
          prev.value === nextState.value &&
          prev.label === nextState.label &&
          prev.series === nextState.series &&
          prev.color === nextState.color &&
          prev.percentage === nextState.percentage
        ) {
          return prev;
        }

        return nextState;
      });
    },
    [findTooltipTarget, hideTooltip, showTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    if (!showTooltip) {
      return;
    }

    hideTooltip();
  }, [hideTooltip, showTooltip]);

  useEffect(() => {
    if (!showTooltip) {
      hideTooltip();
    }
  }, [hideTooltip, showTooltip]);

  // Drawing functions
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    if (!showGrid) return;

    const { padding, chartWidth, chartHeight } = chartDimensions;

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }

    const maxDataPoints = normalizedData.length
      ? Math.max(...normalizedData.map(s => s.data.length))
      : 0;

    if (maxDataPoints > 1) {
      const stepCount = Math.min(maxDataPoints - 1, 10);
      for (let i = 0; i <= stepCount; i++) {
        const x = padding.left + (chartWidth / stepCount) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();
      }
    }

    ctx.setLineDash([]);
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    const { padding, chartWidth, chartHeight } = chartDimensions;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // X axis title
    if (xAxis?.title) {
      ctx.fillText(xAxis.title, padding.left + chartWidth / 2, height - 10);
    }

    // Y axis title
    if (yAxis?.title) {
      ctx.save();
      ctx.translate(15, padding.top + chartHeight / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yAxis.title, 0, 0);
      ctx.restore();
    }

    // Y axis values
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value =
        dataRanges.minY + ((dataRanges.maxY - dataRanges.minY) / 5) * (5 - i);
      const y = padding.top + (chartHeight / 5) * i;
      ctx.fillText(value.toFixed(1), padding.left - 10, y + 5);
    }
  };

  const drawLineChart = (ctx: CanvasRenderingContext2D) => {
    const { padding, chartWidth, chartHeight } = chartDimensions;
    const yRange = Math.max(dataRanges.maxY - dataRanges.minY || 0, 1);

    normalizedData.forEach((series, seriesIndex) => {
      const color = series.color || colors[seriesIndex % colors.length] || '#0066cc';

      ctx.strokeStyle = color || '#000';
      ctx.fillStyle = color || '#000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (series.data.length === 0) return;

      ctx.beginPath();

      series.data.forEach((point, index) => {
        const x =
          padding.left + (chartWidth / Math.max(series.data.length - 1, 1)) * index;
        const y =
          padding.top +
          chartHeight -
          ((point.value - dataRanges.minY) / yRange) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      series.data.forEach((point, index) => {
        const x =
          padding.left + (chartWidth / Math.max(series.data.length - 1, 1)) * index;
        const y =
          padding.top +
          chartHeight -
          ((point.value - dataRanges.minY) / yRange) * chartHeight;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();

        if (showTooltip) {
          tooltipTargetsRef.current.push({
            kind: 'point',
            x,
            y,
            radius: 6,
            value: point.value,
            label: point.label ?? `Point ${index + 1}`,
            series: series.name,
            color,
          });
        }
      });
    });
  };

  const drawBarChart = (ctx: CanvasRenderingContext2D) => {
    const { padding, chartWidth, chartHeight } = chartDimensions;
    const yRange = Math.max(dataRanges.maxY - dataRanges.minY || 0, 1);

    if (!normalizedData.length) return;

    const maxDataPoints = normalizedData[0]?.data.length || 0;
    if (maxDataPoints === 0) return;

    const groupWidth = chartWidth / maxDataPoints;
    const barWidth = groupWidth * 0.8;
    const barSpacing = groupWidth * 0.2;

    normalizedData.forEach((series, seriesIndex) => {
      const color = series.color || colors[seriesIndex % colors.length] || '#0066cc';
      ctx.fillStyle = color || '#000';

      series.data.forEach((point, index) => {
        const x =
          padding.left +
          groupWidth * index +
          barSpacing / 2 +
          (barWidth / normalizedData.length) * seriesIndex;
        const individualWidth = barWidth / Math.max(normalizedData.length, 1);
        const barHeight = ((point.value - dataRanges.minY) / yRange) * chartHeight;
        const y = padding.top + chartHeight - barHeight;

        ctx.fillRect(x, y, individualWidth, barHeight);

        if (showTooltip) {
          tooltipTargetsRef.current.push({
            kind: 'bar',
            x,
            y,
            width: individualWidth,
            height: barHeight,
            value: point.value,
            label: point.label ?? `Category ${index + 1}`,
            series: series.name,
            color,
          });
        }
      });
    });
  };

  const drawPieChart = (ctx: CanvasRenderingContext2D) => {
    const { chartWidth, chartHeight } = chartDimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(chartWidth, chartHeight) / 3;

    if (!normalizedData.length) return;

    const data = normalizedData[0]?.data || [];
    const total = data.reduce((sum, point) => sum + point.value, 0);

    if (total === 0) return;

    let currentAngle = -Math.PI / 2;

    data.forEach((point, index) => {
      const sliceAngle = (point.value / total) * 2 * Math.PI;
      const color = point.color || colors[index % colors.length] || '#0066cc';
      const nextAngle = currentAngle + sliceAngle;
      const percentage = total ? (point.value / total) * 100 : 0;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, nextAngle);
      ctx.closePath();
      ctx.fill();

      if (point.value / total > 0.05) {
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${((point.value / total) * 100).toFixed(1)}%`, labelX, labelY);
      }

      if (showTooltip) {
        const sliceTooltipTarget: TooltipTarget = {
          kind: 'slice',
          startAngle: currentAngle,
          endAngle: nextAngle,
          centerX,
          centerY,
          radius,
          value: point.value,
          series: normalizedData[0]?.name || 'Series 1',
          color,
          percentage,
        };
        if (point.label !== undefined) {
          sliceTooltipTarget.label = point.label;
        }
        tooltipTargetsRef.current.push(sliceTooltipTarget);
      }

      currentAngle = nextAngle;
    });
  };

  // Draw chart
  useEffect(() => {
    tooltipTargetsRef.current = [];
    hideTooltip();

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    if (type !== 'pie') {
      drawGrid(ctx);
      drawAxes(ctx);
    }

    switch (type) {
      case 'line':
      case 'area':
        drawLineChart(ctx);
        break;
      case 'bar':
        drawBarChart(ctx);
        break;
      case 'pie':
        drawPieChart(ctx);
        break;
      default:
        drawLineChart(ctx);
    }
  }, [
    type,
    normalizedData,
    chartDimensions,
    dataRanges,
    colors,
    showGrid,
    hideTooltip,
    width,
    height,
    showTooltip,
  ]);

  const chartClasses = classNames(
    styles['dyn-chart'],
    styles[`dyn-chart--${type}`],
    className
  );

  return (
    <div className={chartClasses} ref={containerRef}>
      {(title || subtitle) && (
        <div className={styles['dyn-chart__header']}>
          {title && <h3 className={styles['dyn-chart__title']}>{title}</h3>}
          {subtitle && (
            <p className={styles['dyn-chart__subtitle']}>{subtitle}</p>
          )}
        </div>
      )}

      <div className={styles['dyn-chart__content']}>
        <canvas
          ref={canvasRef}
          className={styles['dyn-chart__canvas']}
          role="presentation"
          aria-hidden={true}
          style={{ width, height }}
          onMouseMove={showTooltip ? handleMouseMove : undefined}
          onMouseLeave={showTooltip ? handleMouseLeave : undefined}
        />
        {showTooltip && (
          <div
            className={styles['dyn-chart__tooltip']}
            data-visible={tooltipState.visible}
            aria-hidden={!tooltipState.visible}
            style={{
              left: `${tooltipState.x}px`,
              top: `${tooltipState.y}px`,
            }}
          >
            {(tooltipState.series ||
              tooltipState.color ||
              typeof tooltipState.percentage === 'number') && (
              <div className={styles['dyn-chart__tooltip-header']}>
                {tooltipState.color && (
                  <span
                    className={styles['dyn-chart__tooltip-color']}
                    style={{ backgroundColor: tooltipState.color }}
                  />
                )}
                {tooltipState.series && (
                  <span className={styles['dyn-chart__tooltip-series']}>
                    {tooltipState.series}
                  </span>
                )}
                {typeof tooltipState.percentage === 'number' && (
                  <span className={styles['dyn-chart__tooltip-percentage']}>
                    {tooltipState.percentage.toFixed(1)}%
                  </span>
                )}
              </div>
            )}
            <div className={styles['dyn-chart__tooltip-value']}>
              {tooltipState.value}
            </div>
            {tooltipState.label && (
              <div className={styles['dyn-chart__tooltip-label']}>
                {tooltipState.label}
              </div>
            )}
          </div>
        )}
      </div>

      {showLegend && normalizedData.length > 0 && (
        <div className={styles['dyn-chart__legend']}>
          {normalizedData.map((series, index) => (
            <div key={series.name} className={styles['dyn-chart__legend-item']}>
              <div
                className={styles['dyn-chart__legend-color']}
                style={{
                  backgroundColor:
                    series.color || colors[index % colors.length],
                }}
              />
              <span className={styles['dyn-chart__legend-label']}>
                {series.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DynChart.displayName = 'DynChart';

export default DynChart;
export { DynChart };
