import { render } from '@testing-library/react';
import * as React from 'react';
import { DynIcon } from './DynIcon';
describe('DynIcon', () => {
  it('exports a React component', () => { expect(typeof DynIcon).toBe('function'); });
  it('renders without crashing', () => { render(<DynIcon name="check" />); });
});
