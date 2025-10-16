import { render } from '@testing-library/react';
import { DynButton } from './DynButton';
import { describe, it, expect } from 'vitest';

describe('DynButton', () => {
  it('matches snapshot', () => {
    const { container } = render(<DynButton label="Snapshot" />);
    expect(container).toMatchSnapshot();
  });
});
