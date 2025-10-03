import { render, screen } from '@testing-library/react';
// Kompatibilno i sa default i sa named exportom:
import DynButtonDefault, { DynButton as DynButtonNamed } from './DynButton';

const DynButton = (DynButtonNamed ?? DynButtonDefault) as React.ComponentType<any>;

describe('DynButton', () => {
  it('exports a React component', () => {
    expect(typeof DynButton).toBe('function');
  });

  it('renders label', () => {
    render(<DynButton>Click me</DynButton>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });
});
