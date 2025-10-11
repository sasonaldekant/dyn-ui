import type { ReactElement } from 'react';
import type { BaseComponentProps } from '../../types';

export interface DynFieldContainerOwnProps {
  /** Form field element that should be wrapped */
  children: ReactElement;
  /** Optional label to display above the field */
  label?: string;
  /** Indicates the field is required */
  required?: boolean;
  /** Indicates the field is optional */
  optional?: boolean;
  /** Informational helper text displayed below the field */
  helpText?: string;
  /** Error message displayed below the field */
  errorText?: string;
  /** Controls whether validation messages are shown */
  showValidation?: boolean;
  /** Id of the input element for the label association */
  htmlFor?: string;
}

export type DynFieldContainerProps = Omit<BaseComponentProps, 'children'> &
  DynFieldContainerOwnProps;

export interface DynFieldContainerDefaultProps {
  showValidation: boolean;
  'data-testid': string;
}

export const DYN_FIELD_CONTAINER_DEFAULT_PROPS: DynFieldContainerDefaultProps = {
  showValidation: true,
  'data-testid': 'dyn-field-container',
};
