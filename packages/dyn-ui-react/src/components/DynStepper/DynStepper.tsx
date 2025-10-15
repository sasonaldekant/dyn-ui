import React, { forwardRef, useMemo, useState } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynStepper.module.css';
import type { DynStepperProps, DynStepperRef, DynStep } from './DynStepper.types';

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

/**
 * DynStepper — standardized: ids, a11y, predictable events, linear/non-linear.
 */
export const DynStepper = forwardRef<DynStepperRef, DynStepperProps>(
  (
    {
      steps,
      value,
      defaultValue = 0,
      linear = true,
      onChange,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const [internalId] = useState(() => id || generateId('stepper'));
    const isControlled = typeof value === 'number';
    const [current, setCurrent] = useState<number>(isControlled ? (value as number) : defaultValue);

    if (!steps || steps.length === 0) return null;

    const maxIndex = steps.length - 1;

    const goTo = (idx: number) => {
      const next = clamp(idx, 0, maxIndex);
      if (linear && next > current + 1) return; // block skipping when linear
      if (!isControlled) setCurrent(next);
      onChange?.(next);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          goTo(current + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goTo(current - 1);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(maxIndex);
          break;
      }
    };

    const currentId = `${internalId}-step-${current}`;

    return (
      <div
        id={internalId}
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(getStyleClass('root'), className)}
        data-testid={dataTestId || 'dyn-stepper'}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <ol className={getStyleClass('list')}>
          {steps.map((s, idx) => {
            const selected = idx === current;
            const disabled = linear && idx > current + 1;
            const stepId = `${internalId}-step-${idx}`;
            return (
              <li key={idx} className={cn(getStyleClass('item'), selected && getStyleClass('item--current'))}>
                <button
                  id={stepId}
                  type="button"
                  className={cn(getStyleClass('button'), disabled && getStyleClass('button--disabled'))}
                  aria-current={selected ? 'step' : undefined}
                  aria-disabled={disabled || undefined}
                  onClick={() => goTo(idx)}
                  disabled={disabled}
                >
                  <span className={getStyleClass('button__index')} aria-hidden="true">{idx + 1}</span>
                  <span className={getStyleClass('button__label')}>{s.label}</span>
                </button>
                {s.description && (
                  <div className={getStyleClass('description')} id={`${stepId}-desc`}>
                    {s.description}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {steps.map((s, idx) => (
          <section
            key={idx}
            id={`${internalId}-panel-${idx}`}
            role="region"
            aria-labelledby={`${internalId}-step-${idx}`}
            hidden={idx !== current}
            tabIndex={-1}
            className={cn(getStyleClass('panel'), idx === current && getStyleClass('panel--active'))}
          >
            {typeof s.content === 'function' ? s.content({ index: idx, selected: idx === current }) : s.content}
          </section>
        ))}
      </div>
    );
  }
);

export default DynStepper;
DynStepper.displayName = 'DynStepper';
