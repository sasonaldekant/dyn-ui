import { render, screen } from '@testing-library/react';
import React from 'react';

function DemoApp() {
  return <div>Dyn UI Demo</div>;
}

test('renders demo app placeholder', () => {
  render(<DemoApp />);
  expect(screen.getByText(/Dyn UI Demo/)).toBeInTheDocument();
});
