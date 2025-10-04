import { render, screen } from '@testing-library/react';
import React from 'react';
import DynIcon from './DynIcon';

test('renders DynIcon placeholder', () => {
  render(<DynIcon />);
  expect(screen.getByText('DynIcon placeholder')).toBeInTheDocument();
});
