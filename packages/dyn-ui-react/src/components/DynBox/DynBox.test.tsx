import { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DynBox } from './DynBox';
import { DYN_BOX_DEFAULT_PROPS } from './DynBox.types';
import styles from './DynBox.module.css';

describe('DynBox', () => {
  it('exports a React component', () => {
    expect(DynBox).toBeDefined();
  });

  it('applies base class and custom className', () => {
    const { getByTestId } = render(<DynBox className="custom" />);
    const element = getByTestId(DYN_BOX_DEFAULT_PROPS['data-testid']);

    expect(element).toHaveClass(styles.root!);
    expect(element).toHaveClass('custom');
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<DynBox ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges sx styles with inline styles', () => {
    const { getByTestId } = render(
      <DynBox sx={{ p: 'lg', bg: 'surface' }} style={{ opacity: 0.5 }} data-testid="custom-box" />
    );

    const element = getByTestId('custom-box');

    expect(element).toHaveStyle({
      padding: 'var(--dyn-spacing-lg)',
      backgroundColor: 'var(--dyn-colors-surface)',
      opacity: '0.5',
    });
  });
});
