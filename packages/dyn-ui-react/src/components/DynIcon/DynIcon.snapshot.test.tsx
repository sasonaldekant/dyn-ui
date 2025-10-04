import { render } from '@testing-library/react';
import React from 'react';
import DynIcon from './DynIcon';
import { describe, it, expect } from 'vitest';

describe('DynIcon', () => {
  it('matches snapshot', () => {
    const { container } = render(<DynIcon />);
    expect(container).toMatchSnapshot();
  });
});
