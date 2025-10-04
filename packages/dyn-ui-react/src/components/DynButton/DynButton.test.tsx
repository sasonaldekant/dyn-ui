import { render, screen } from '@testing-library/react';
import React from 'react';
import DynButton from './DynButton';

test('renders DynButton placeholder', () => {
  render(<DynButton />);
  expect(screen.getByText('DynButton placeholder')).toBeInTheDocument();
});
