import { createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { testAccessibility } from '../../test-utils';
import { DynBox } from './DynBox';
import { DYN_BOX_DEFAULT_PROPS } from './DynBox.types';
import styles from './DynBox.module.css';

describe('DynBox', () => {
  describe('Basic Functionality', () => {
    it('exports a React component', () => {
      expect(DynBox).toBeDefined();
    });

    it('applies base class and custom className', () => {
      const { getByTestId } = render(<DynBox className="custom" />);
      const element = getByTestId(DYN_BOX_DEFAULT_PROPS['data-testid']);

      expect(element).toHaveClass(styles.box!);
      expect(element).toHaveClass('custom');
    });

    it('supports polymorphic rendering and ref forwarding', () => {
      const ref = createRef<HTMLElement>();
      const { rerender } = render(
        <DynBox ref={ref} data-testid="polymorphic">
          Content
        </DynBox>
      );

      expect(screen.getByTestId('polymorphic').tagName).toBe('DIV');

      rerender(
        <DynBox as="section" ref={ref} data-testid="polymorphic">
          Content
        </DynBox>
      );

      expect(screen.getByTestId('polymorphic').tagName).toBe('SECTION');
      expect(ref.current).toBeInstanceOf(HTMLElement);
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
  });

  describe('Accessibility', () => {
    it('passes automated accessibility checks', async () => {
      const { container } = render(
        <DynBox aria-label="Accessible box" p="md" bg="tertiary">
          Accessible Content
        </DynBox>
      );

      await testAccessibility(container);
    });

    it('exposes live region messaging and merges descriptions', () => {
      render(
        <DynBox
          role="region"
          aria-label="Announcements"
          aria-describedby="external-description"
          ariaLiveMessage="Live update inbound"
          ariaLivePoliteness="assertive"
        >
          Content
        </DynBox>
      );

      const element = screen.getByRole('region', { name: 'Announcements' });
      const liveRegion = element.querySelector('[aria-live]');

      expect(liveRegion).not.toBeNull();
      expect(liveRegion).toHaveAttribute('aria-live', 'assertive');

      const liveRegionId = liveRegion?.getAttribute('id');
      const describedBy = element.getAttribute('aria-describedby');

      expect(liveRegionId).toBeTruthy();
      expect(describedBy).toContain('external-description');
      expect(describedBy).toContain(liveRegionId!);
    });

    it('can focus on mount for keyboard users', async () => {
      render(
        <DynBox
          interactive
          aria-label="Focusable box"
          focusOnMount
        />
      );

      await waitFor(() => {
        expect(document.activeElement).toBe(
          screen.getByRole('button', { name: 'Focusable box' })
        );
      });
    });
  });

  describe('Interactive Behavior', () => {
    it('supports pointer and keyboard activation', async () => {
      const onClick = vi.fn();
      const onKeyDown = vi.fn();
      const user = userEvent.setup();

      render(
        <DynBox interactive onClick={onClick} onKeyDown={onKeyDown} aria-label="Interactive">
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
      expect(onKeyDown).toHaveBeenCalledTimes(2);
    });
  });

  describe('Variants and States', () => {
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
  });

  describe('Props and Customization', () => {
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

    it('supports custom dimensions via tokens', () => {
      render(
        <DynBox
          data-testid="dimension-box"
          width={320}
          height="50%"
          minWidth={200}
          maxWidth="640px"
        />
      );

      expect(screen.getByTestId('dimension-box')).toHaveStyle({
        '--dyn-box-width': '320px',
        '--dyn-box-height': '50%',
        '--dyn-box-min-width': '200px',
        '--dyn-box-max-width': '640px',
      });
    });
  });
});
