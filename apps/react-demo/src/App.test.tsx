import { render, screen } from '@testing-library/react';
import React from 'react';

function DemoApp() {
  return <div>Dyn UI Demo</div>;
}

describe('DemoApp', () => {
  it('renders Dyn UI Demo text', () => {
    render(<DemoApp />);
    const demoElement = screen.getByText(/dyn ui demo/i);
    expect(demoElement).toBeDefined();
  });
});