import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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

    expect(element).toHaveClass(styles.box!);
    expect(element).toHaveClass('custom');
  });

  it('renders as div by default and supports custom element', () => {
    const { rerender } = render(<DynBox data-testid="default-box">Content</DynBox>);
    expect(screen.getByTestId('default-box').tagName).toBe('DIV');

    rerender(
      <DynBox as="section" data-testid="custom-element">
        Content
      </DynBox>
    );
    expect(screen.getByTestId('custom-element').tagName).toBe('SECTION');
  });

  it('forwards ref to the underlying element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<DynBox ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges cssVars with inline style', () => {
    render(
      <DynBox
        data-testid="styled-box"
        cssVars={{ '--custom-var': '42px' }}
        style={{ opacity: 0.5 }}
      />
    );

    expect(screen.getByTestId('styled-box')).toHaveStyle({
      '--custom-var': '42px',
      opacity: '0.5',
    });
  });

  it('applies spacing tokens to CSS variables', () => {
    render(
      <DynBox
        data-testid="spacing-box"
        p="md"
        mt="lg"
        px="sm"
        mx="auto"
      />
    );

    expect(screen.getByTestId('spacing-box')).toHaveStyle({
      '--dyn-box-padding': 'var(--dyn-spacing-md, var(--spacing-md, 1rem))',
      '--dyn-box-padding-left': 'var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem))',
      '--dyn-box-padding-right': 'var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem))',
      '--dyn-box-margin-top': 'var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem))',
      '--dyn-box-margin-left': 'auto',
      '--dyn-box-margin-right': 'auto',
    });
  });

  it('applies background variant and border utilities', () => {
    render(
      <DynBox data-testid="variant-box" bg="primary" border borderRadius="md" shadow="lg" />
    );

    const element = screen.getByTestId('variant-box');
    expect(element).toHaveClass(styles['box--bg-primary']!);
    expect(element).toHaveClass(styles['box--border']!);
    expect(element).toHaveClass(styles['box--rounded-md']!);
    expect(element).toHaveClass(styles['box--shadow-lg']!);
  });

  it('applies layout variables for flex configuration', () => {
    render(
      <DynBox
        data-testid="flex-box"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        gap="sm"
      />
    );

    expect(screen.getByTestId('flex-box')).toHaveStyle({
      '--dyn-box-flex-direction': 'column',
      '--dyn-box-justify-content': 'center',
      '--dyn-box-align-items': 'flex-start',
      '--dyn-box-gap': 'var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem))',
    });
  });

  it('supports interactive behaviour with keyboard activation', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <DynBox interactive onClick={onClick} aria-label="Interactive">
        Clickable
      </DynBox>
    );

    const element = screen.getByRole('button', { name: 'Interactive' });
    await user.click(element);
    expect(onClick).toHaveBeenCalledTimes(1);

    element.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('applies responsive visibility helpers', () => {
    render(
      <DynBox
        data-testid="responsive-box"
        hideOnMobile
        tabletOnly
      />
    );

    const element = screen.getByTestId('responsive-box');
    expect(element).toHaveClass(styles['box--mobile-hidden']!);
    expect(element).toHaveClass(styles['box--desktop-hidden']!);
    expect(element).not.toHaveClass(styles['box--tablet-hidden']!);
  });
});
