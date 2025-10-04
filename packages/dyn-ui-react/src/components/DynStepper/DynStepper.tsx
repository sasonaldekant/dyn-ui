/**
 * DynStepper - Step Navigation Component
 * Multi-step process navigation with linear and non-linear modes
 */

import React, { useState, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { DynStepperProps, DynStepperHandle, StepItem, STEPPER_DEFAULTS, STEP_STATES } from './DynStepper.types';
import { DynIcon } from '../DynIcon';
import styles from './DynStepper.module.css';

const DynStepper = forwardRef<DynStepperHandle, DynStepperProps>((
  {
    steps = [],
    activeStep,
    defaultActiveStep = STEPPER_DEFAULTS.defaultActiveStep,
    orientation = STEPPER_DEFAULTS.orientation,
    variant = STEPPER_DEFAULTS.variant,
    size = STEPPER_DEFAULTS.size,
    linear = STEPPER_DEFAULTS.linear,
    showLabels = STEPPER_DEFAULTS.showLabels,
    showDescription = STEPPER_DEFAULTS.showDescription,
    clickableSteps = STEPPER_DEFAULTS.clickableSteps,
    className,
    stepClassName,
    contentClassName,
    onStepChange,
    onStepClick,
    renderStepContent,
    renderStepIcon
  },
  ref
) => {
  const [internalActiveStep, setInternalActiveStep] = useState<number>(
    activeStep ?? defaultActiveStep
  );
  const [stepStates, setStepStates] = useState<Map<number, string>>(new Map());

  const currentActiveStep = activeStep ?? internalActiveStep;
  const totalSteps = steps.length;

  useEffect(() => {
    if (activeStep !== undefined && activeStep !== internalActiveStep) {
      setInternalActiveStep(activeStep);
    }
  }, [activeStep, internalActiveStep]);

  const isStepAccessible = useCallback((stepIndex: number): boolean => {
    if (!linear) return !steps[stepIndex]?.disabled;
    
    // In linear mode, can only access current step or previously completed steps
    for (let i = 0; i < stepIndex; i++) {
      const step = steps[i];
      if (!step?.completed && !stepStates.get(i)?.includes('completed')) {
        return false;
      }
    }
    
    return !steps[stepIndex]?.disabled;
  }, [linear, steps, stepStates]);

  const getStepStatus = useCallback((stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step) return STEP_STATES.INACTIVE;
    
    if (step.error || stepStates.get(stepIndex) === STEP_STATES.ERROR) {
      return STEP_STATES.ERROR;
    }
    if (step.completed || stepStates.get(stepIndex) === STEP_STATES.COMPLETED) {
      return STEP_STATES.COMPLETED;
    }
    if (stepIndex === currentActiveStep) {
      return STEP_STATES.ACTIVE;
    }
    if (step.disabled) {
      return STEP_STATES.DISABLED;
    }
    
    return STEP_STATES.INACTIVE;
  }, [steps, stepStates, currentActiveStep]);

  const handleStepClick = useCallback((stepIndex: number) => {
    const stepData = steps[stepIndex];
    if (!stepData || stepData.disabled) return;

    if (!clickableSteps && stepIndex !== currentActiveStep) return;
    
    if (!isStepAccessible(stepIndex)) return;

    if (onStepClick) {
      const result = onStepClick(stepIndex, stepData);
      if (result === false) return;
    }

    if (activeStep === undefined) {
      setInternalActiveStep(stepIndex);
    }
    
    onStepChange?.(stepIndex, stepData);
  }, [activeStep, clickableSteps, currentActiveStep, isStepAccessible, onStepClick, onStepChange, steps]);

  const nextStep = useCallback((): boolean => {
    const nextIndex = currentActiveStep + 1;
    if (nextIndex >= totalSteps) return false;
    
    if (!isStepAccessible(nextIndex)) return false;
    
    handleStepClick(nextIndex);
    return true;
  }, [currentActiveStep, totalSteps, isStepAccessible, handleStepClick]);

  const prevStep = useCallback((): boolean => {
    const prevIndex = currentActiveStep - 1;
    if (prevIndex < 0) return false;
    
    handleStepClick(prevIndex);
    return true;
  }, [currentActiveStep, handleStepClick]);

  const goToStep = useCallback((stepIndex: number): boolean => {
    if (stepIndex < 0 || stepIndex >= totalSteps) return false;
    if (!isStepAccessible(stepIndex)) return false;
    
    handleStepClick(stepIndex);
    return true;
  }, [totalSteps, isStepAccessible, handleStepClick]);

  const validateStep = useCallback((stepIndex: number): boolean => {
    const step = steps[stepIndex];
    if (!step) return false;
    
    return !step.error && !step.disabled && stepStates.get(stepIndex) !== STEP_STATES.ERROR;
  }, [steps, stepStates]);

  const completeStep = useCallback((stepIndex: number) => {
    setStepStates(prev => new Map(prev.set(stepIndex, STEP_STATES.COMPLETED)));
  }, []);

  const errorStep = useCallback((stepIndex: number, hasError: boolean) => {
    setStepStates(prev => {
      const newMap = new Map(prev);
      if (hasError) {
        newMap.set(stepIndex, STEP_STATES.ERROR);
      } else {
        newMap.delete(stepIndex);
      }
      return newMap;
    });
  }, []);

  useImperativeHandle(ref, () => ({
    nextStep,
    prevStep,
    goToStep,
    getCurrentStep: () => currentActiveStep,
    getStepData: (stepIndex: number) => steps[stepIndex],
    validateStep,
    completeStep,
    errorStep
  }));

  const renderStepIcon = useCallback((step: StepItem, index: number, isActive: boolean) => {
    const status = getStepStatus(index);
    
    if (renderStepIcon) {
      return renderStepIcon(step, index, isActive);
    }

    if (step.icon) {
      return (
        <span className={styles['custom-icon']}>
          {typeof step.icon === 'string' ? (
            <DynIcon icon={step.icon} />
          ) : (
            step.icon
          )}
        </span>
      );
    }

    switch (variant) {
      case 'numbered':
        return <span className={styles['step-number']}>{index + 1}</span>;
      case 'dots':
        return <span className={styles['dot']}></span>;
      default:
        if (status === STEP_STATES.COMPLETED) {
          return <DynIcon icon="dyn-icon-check" className={styles['check-icon']} />;
        }
        if (status === STEP_STATES.ERROR) {
          return <DynIcon icon="dyn-icon-close" className={styles['error-icon']} />;
        }
        return <span className={styles['step-number']}>{index + 1}</span>;
    }
  }, [variant, getStepStatus, renderStepIcon]);

  const renderStep = useCallback((step: StepItem, index: number) => {
    const status = getStepStatus(index);
    const isActive = index === currentActiveStep;
    const isAccessible = isStepAccessible(index);
    const isClickable = clickableSteps && isAccessible && !step.disabled;
    
    const stepClasses = classNames(
      styles['step'],
      styles[`status-${status}`],
      {
        [styles['active']]: isActive,
        [styles['disabled']]: step.disabled,
        [styles['optional']]: step.optional,
        [styles['clickable']]: isClickable
      },
      stepClassName
    );

    const StepElement = isClickable ? 'button' : 'div';

    return (
      <StepElement
        key={step.id}
        className={stepClasses}
        onClick={isClickable ? () => handleStepClick(index) : undefined}
        disabled={!isClickable}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index + 1}: ${step.title}${step.optional ? ' (optional)' : ''}`}
        title={step.tooltip}
        role={isClickable ? 'button' : 'presentation'}
      >
        <div className={styles['step-icon-container']}>
          {renderStepIcon(step, index, isActive)}
        </div>
        
        {showLabels && (
          <div className={styles['step-label-container']}>
            <div className={styles['step-title']}>
              {step.title}
              {step.optional && (
                <span className={styles['optional-badge']}>(optional)</span>
              )}
            </div>
            {showDescription && step.description && (
              <div className={styles['step-description']}>
                {step.description}
              </div>
            )}
          </div>
        )}
        
        {index < totalSteps - 1 && (
          <div className={styles['step-connector']} aria-hidden="true" />
        )}
      </StepElement>
    );
  }, [getStepStatus, currentActiveStep, isStepAccessible, clickableSteps, stepClassName, handleStepClick, showLabels, showDescription, totalSteps, renderStepIcon]);

  const renderStepContentArea = () => {
    const activeStepData = steps[currentActiveStep];
    if (!activeStepData) return null;

    const content = renderStepContent 
      ? renderStepContent(activeStepData, currentActiveStep)
      : activeStepData.content;

    if (!content) return null;

    return (
      <div className={classNames(styles['step-content'], contentClassName)}>
        {content}
      </div>
    );
  };

  const stepperClasses = classNames(
    styles['dyn-stepper'],
    {
      [styles[`orientation-${orientation}`]]: orientation,
      [styles[`variant-${variant}`]]: variant,
      [styles[`size-${size}`]]: size,
      [styles['linear']]: linear
    },
    className
  );

  const progressPercentage = variant === 'progress' 
    ? ((currentActiveStep + 1) / totalSteps) * 100 
    : 0;

  if (steps.length === 0) {
    return null;
  }

  return (
    <div className={stepperClasses} role="tablist" aria-label="Progress steps">
      {variant === 'progress' && (
        <div className={styles['progress-bar']} role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className={styles['progress-fill']}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}
      
      <div className={styles['steps-list']}>
        {steps.map(renderStep)}
      </div>
      
      {renderStepContentArea()}
    </div>
  );
});

DynStepper.displayName = 'DynStepper';

export default DynStepper;
export { DynStepper };