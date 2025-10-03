import { render } from '@testing-library/react';
// Kompatibilno i sa default i sa named exportom:
import DynIconDefault, { DynIcon as DynIconNamed } from './DynIcon';

const DynIcon = (DynIconNamed ?? DynIconDefault) as React.ComponentType<any>;

describe('DynIcon', () => {
  it('exports a React component', () => {
    expect(typeof DynIcon).toBe('function');
  });

  it('renders without crashing', () => {
    render(<DynIcon name="check" />);
  });
});
