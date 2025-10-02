import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Example wrapper for context providers
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  return render(ui, { wrapper: Providers, ...options });
}
