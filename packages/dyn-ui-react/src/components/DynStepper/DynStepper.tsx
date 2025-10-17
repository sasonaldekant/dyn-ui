import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynStepper.module.css';
import type { DynStepperProps, DynStepperRef, DynStep, StepItem } from './DynStepper.types';

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

function clamp(n: number, min: number, max: number) { 
  return Math.max(min, Math.min(max, n)); 
}

/**
 * DynStepper — standardized: ids, a11y, predictable events, linear/non-linear.
 * Complete implementation with all test fixes and missing functionality.
 */
export const DynStepper = forwardRef<DynStepperRef, DynStepperProps>(
  (
    {
      steps = [],
      value,
      defaultValue = 0,
      activeStep: controlledActiveStep,
      defaultActiveStep = 0,
      linear = true,
      onChange,
      onStepChange,
      onStepClick,
      clickableSteps = true,
      orientation = 'horizontal',
      variant = 'numbered',
      size = 'medium',
      className,
      contentClassName,
      renderStepContent,
      renderStepIcon,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const [internalId] = useState(() => id || generateId('stepper'));
    const isControlled = controlledActiveStep !== undefined;
    const [internalActiveStep, setInternalActiveStep] = useState(
      isControlled ? (controlledActiveStep as number) : (defaultActiveStep || 0)
    );
    
    const activeStep = isControlled ? (controlledActiveStep as number) : internalActiveStep;

    if (!steps || steps.length === 0) return null;

    const maxIndex = steps.length - 1;

    // Imperative API methods
    const nextStep = useCallback((): boolean => {
      if (activeStep >= steps.length - 1) return false;
      
      const newStep = activeStep + 1;
      if (!isControlled) setInternalActiveStep(newStep);
      onChange?.(newStep, steps[newStep], newStep);
      onStepChange?.(newStep, steps[newStep]);
      return true;
    }, [activeStep, steps.length, isControlled, onChange, onStepChange, steps]);

    const prevStep = useCallback((): boolean => {
      if (activeStep <= 0) return false;
      
      const newStep = activeStep - 1;
      if (!isControlled) setInternalActiveStep(newStep);
      onChange?.(newStep, steps[newStep], newStep);
      onStepChange?.(newStep, steps[newStep]);
      return true;
    }, [activeStep, isControlled, onChange, onStepChange, steps]);

    const goToStep = useCallback((stepIndex: number): boolean => {
      if (stepIndex < 0 || stepIndex >= steps.length) return false;
      if (linear && stepIndex > activeStep + 1) return false;
      
      if (!isControlled) setInternalActiveStep(stepIndex);
      onChange?.(stepIndex, steps[stepIndex], stepIndex);
      onStepChange?.(stepIndex, steps[stepIndex]);
      return true;
    }, [activeStep, steps.length, linear, isControlled, onChange, onStepChange, steps]);

    const getCurrentStep = useCallback((): number => {
      return activeStep;
    }, [activeStep]);

    const getStepData = useCallback((stepIndex: number): StepItem | undefined => {
      return steps[stepIndex];
    }, [steps]);

    const validateStep = useCallback((stepIndex: number): boolean => {
      const step = steps[stepIndex];
      if (!step) return false;
      // Add custom validation logic here if needed
      return !step.error && !step.disabled;
    }, [steps]);

    const completeStep = useCallback((stepIndex: number): void => {
      const step = steps[stepIndex];
      if (step) {
        step.completed = true;
        step.status = 'completed';
      }
    }, [steps]);

    const errorStep = useCallback((stepIndex: number, hasError: boolean): void => {
      const step = steps[stepIndex];
      if (step) {
        step.error = hasError;
        step.status = hasError ? 'error' : 'inactive';
      }
    }, [steps]);

    useImperativeHandle(ref, () => ({
      nextStep,
      prevStep,
      goToStep,
      getCurrentStep,
      getStepData,
      validateStep,
      completeStep,
      errorStep,
    }), [nextStep, prevStep, goToStep, getCurrentStep, getStepData, validateStep, completeStep, errorStep]);

    // Helper functions
    const isStepDisabled = (index: number): boolean => {
      const step = steps[index];
      if (step?.disabled) return true;
      if (linear && index > activeStep + 1) return true;
      return false;
    };

    const getRootRole = () => {
      if (variant === 'tabs') return 'tablist';
      return 'group';
    };

    const getRootClassName = () => {
      const classes = [getStyleClass('root')];
      
      // Add semantic classes for tests
      if (orientation) classes.push(`orientation-${orientation}`);
      if (variant) classes.push(`variant-${variant}`);
      if (size) classes.push(`size-${size}`);
      if (className) classes.push(className);
      
      return cn(...classes);
    };

    const getItemClassName = (index: number) => {
      const classes = [getStyleClass('item')];
      const step = steps[index];
      
      if (index === activeStep) {
        classes.push(getStyleClass('item--current'), 'item--current');
      }
      if (step?.completed || index < activeStep) {
        classes.push(getStyleClass('item--completed'), 'item--completed');
      }
      if (step?.error) {
        classes.push(getStyleClass('item--error'), 'item--error');
      }
      if (step?.disabled || isStepDisabled(index)) {
        classes.push(getStyleClass('item--disabled'), 'item--disabled');
      }
      
      return cn(...classes);
    };

    const getButtonClassName = (index: number) => {
      const classes = [getStyleClass('button')];
      
      if (isStepDisabled(index)) {
        classes.push(getStyleClass('button--disabled'), 'button--disabled');
      }
      
      return cn(...classes);
    };

    const getPanelClassName = (index: number) => {
      const classes = [getStyleClass('panel')];
      if (index !== activeStep) classes.push(getStyleClass('panel--hidden'));
      return cn(...classes);
    };

    const getStepId = (index: number) => `${internalId}-step-${index}`;
    const getPanelId = (index: number) => `${internalId}-panel-${index}`;
    const getStepDescId = (index: number) => `${internalId}-step-${index}-desc`;

    const handleStepClick = (index: number) => {
      if (!clickableSteps || isStepDisabled(index)) return;
      
      const clickResult = onStepClick?.(index, steps[index]);
      if (clickResult === false) return; // Allow onStepClick to prevent navigation
      
      if (linear && index > activeStep + 1) return;
      
      if (!isControlled) setInternalActiveStep(index);
      onChange?.(index, steps[index], index);
      onStepChange?.(index, steps[index]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextStep();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevStep();
          break;
        case 'Home':
          e.preventDefault();
          goToStep(0);
          break;
        case 'End':
          e.preventDefault();
          goToStep(maxIndex);
          break;
      }
    };

    return (
      <div
        id={internalId}
        role={getRootRole()}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={getRootClassName()}
        data-testid={dataTestId || 'dyn-stepper'}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <ol className={getStyleClass('list')} role={variant === 'tabs' ? 'presentation' : undefined}>
          {steps.map((step, index) => (
            <li key={step.id || index} className={getItemClassName(index)}>
              <button
                {...(variant === 'tabs' ? { role: 'tab' } : {})}
                aria-current={index === activeStep ? 'step' : undefined}
                aria-selected={variant === 'tabs' ? index === activeStep : undefined}
                className={getButtonClassName(index)}
                id={getStepId(index)}
                type="button"
                onClick={() => handleStepClick(index)}
                disabled={isStepDisabled(index)}
                aria-describedby={step.description ? getStepDescId(index) : undefined}
                title={step.tooltip}
              >
                {renderStepIcon ? renderStepIcon(step, index, index === activeStep) : (
                  <>
                    <span aria-hidden="true" className={getStyleClass('button__index')}>
                      {index + 1}
                    </span>
                    <span className={getStyleClass('button__label')}>
                      {step.title || step.label || `Step ${index + 1}`}
                    </span>
                  </>
                )}
              </button>
              {step.description && (
                <div className={getStyleClass('description')} id={getStepDescId(index)}>
                  {step.description}
                </div>
              )}
              {step.optional && (
                <span className={getStyleClass('optional')}>Optional</span>
              )}
            </li>
          ))}
        </ol>
        
        {variant === 'progress' && (
          <div 
            role="progressbar" 
            aria-valuenow={activeStep + 1} 
            aria-valuemin={1} 
            aria-valuemax={steps.length}
            className={getStyleClass('progressBar')}
          >
            <div 
              className={getStyleClass('progressFill')}
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        )}

        {steps.map((step, index) => (
          <section
            key={step.id || index}
            className={cn(getPanelClassName(index), contentClassName || '')}
            id={getPanelId(index)}
            role={variant === 'tabs' ? 'tabpanel' : 'region'}
            aria-labelledby={getStepId(index)}
            tabIndex={-1}
            hidden={index !== activeStep}
          >
            {renderStepContent ? 
              renderStepContent(step, index) : 
              (typeof step.content === 'function' ? 
                step.content({ index, selected: index === activeStep }) : 
                step.content
              )
            }
          </section>
        ))}
      </div>
    );
  }
);

export default DynStepper;
DynStepper.displayName = 'DynStepper';