import React, { useMemo, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { DynChartProps, ChartSeries, ChartDataPoint } from './DynChart.types';
import styles from './DynChart.module.css';

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

  // Normalize data to series format
  const normalizedData: ChartSeries[] = useMemo(() => {
    if (!data.length) return [];
    
    // If data is already in series format
    if (Array.isArray(data) && data[0] && 'name' in data[0]) {
      return data as ChartSeries[];
    }
    
    // Convert data points to single series
    return [{
      name: 'Series 1',
      data: data as ChartDataPoint[],
      color: colors[0],
    }];
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
    
    return { minX, maxX, minY, maxY };
  }, [normalizedData, yAxis]);

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
    
    // Vertical grid lines
    const maxDataPoints = Math.max(...normalizedData.map(s => s.data.length));
    for (let i = 0; i <= Math.min(maxDataPoints - 1, 10); i++) {
      const x = padding.left + (chartWidth / Math.min(maxDataPoints - 1, 10)) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();
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
      const value = dataRanges.minY + ((dataRanges.maxY - dataRanges.minY) / 5) * (5 - i);
      const y = padding.top + (chartHeight / 5) * i;
      ctx.fillText(value.toFixed(1), padding.left - 10, y + 5);
    }
  };

  const drawLineChart = (ctx: CanvasRenderingContext2D) => {
    const { padding, chartWidth, chartHeight } = chartDimensions;
    
    normalizedData.forEach((series, seriesIndex) => {
      const color = series.color || colors[seriesIndex % colors.length];
      
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (series.data.length === 0) return;
      
      ctx.beginPath();
      
      series.data.forEach((point, index) => {
        const x = padding.left + (chartWidth / Math.max(series.data.length - 1, 1)) * index;
        const y = padding.top + chartHeight - 
          ((point.value - dataRanges.minY) / (dataRanges.maxY - dataRanges.minY)) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Draw points
      series.data.forEach((point, index) => {
        const x = padding.left + (chartWidth / Math.max(series.data.length - 1, 1)) * index;
        const y = padding.top + chartHeight - 
          ((point.value - dataRanges.minY) / (dataRanges.maxY - dataRanges.minY)) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
  };

  const drawBarChart = (ctx: CanvasRenderingContext2D) => {
    const { padding, chartWidth, chartHeight } = chartDimensions;
    
    if (!normalizedData.length) return;
    
    const maxDataPoints = normalizedData[0].data.length;
    const barWidth = chartWidth / maxDataPoints * 0.8;
    const barSpacing = chartWidth / maxDataPoints * 0.2;
    
    normalizedData.forEach((series, seriesIndex) => {
      const color = series.color || colors[seriesIndex % colors.length];
      ctx.fillStyle = color;
      
      series.data.forEach((point, index) => {
        const x = padding.left + (chartWidth / maxDataPoints) * index + 
          (barSpacing / 2) + (barWidth / normalizedData.length) * seriesIndex;
        const barHeight = ((point.value - dataRanges.minY) / (dataRanges.maxY - dataRanges.minY)) * chartHeight;
        const y = padding.top + chartHeight - barHeight;
        
        ctx.fillRect(x, y, barWidth / normalizedData.length, barHeight);
      });
    });
  };

  const drawPieChart = (ctx: CanvasRenderingContext2D) => {
    const { chartWidth, chartHeight } = chartDimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(chartWidth, chartHeight) / 3;
    
    if (!normalizedData.length) return;
    
    const data = normalizedData[0].data;
    const total = data.reduce((sum, point) => sum + point.value, 0);
    
    let currentAngle = -Math.PI / 2; // Start from top
    
    data.forEach((point, index) => {
      const sliceAngle = (point.value / total) * 2 * Math.PI;
      const color = point.color || colors[index % colors.length];
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      
      // Draw label
      if (point.value / total > 0.05) { // Only show labels for slices > 5%
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${((point.value / total) * 100).toFixed(1)}%`, labelX, labelY);
      }
      
      currentAngle += sliceAngle;
    });
  };

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw based on chart type
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
  }, [type, normalizedData, chartDimensions, dataRanges, colors, showGrid]);

  const chartClasses = classNames(
    styles['dyn-chart'],
    styles[`dyn-chart--${type}`],
    className
  );

  return (
    <div className={chartClasses} ref={containerRef}>
      {/* Header */}
      {(title || subtitle) && (
        <div className={styles['dyn-chart__header']}>
          {title && <h3 className={styles['dyn-chart__title']}>{title}</h3>}
          {subtitle && <p className={styles['dyn-chart__subtitle']}>{subtitle}</p>}
        </div>
      )}
      
      {/* Chart */}
      <div className={styles['dyn-chart__content']}>
        <canvas
          ref={canvasRef}
          className={styles['dyn-chart__canvas']}
          style={{ width, height }}
        />
      </div>
      
      {/* Legend */}
      {showLegend && normalizedData.length > 0 && (
        <div className={styles['dyn-chart__legend']}>
          {normalizedData.map((series, index) => (
            <div key={series.name} className={styles['dyn-chart__legend-item']}>
              <div
                className={styles['dyn-chart__legend-color']}
                style={{ 
                  backgroundColor: series.color || colors[index % colors.length] 
                }}
              />
              <span className={styles['dyn-chart__legend-label']}>{series.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DynChart.displayName = 'DynChart';

export default DynChart;