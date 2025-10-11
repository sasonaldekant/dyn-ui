import { render, screen } from '@testing-library/react';
import { DynDivider } from './DynDivider';

describe('DynDivider', () => {
  it('renders a horizontal divider by default', () => {
    render(<DynDivider />);

    const divider = screen.getByTestId('dyn-divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('role', 'separator');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders an accessible label when provided', () => {
    render(<DynDivider label="Details" />);

    const divider = screen.getByTestId('dyn-divider');
    const label = screen.getByText('Details');

    expect(label.tagName).toBe('SPAN');
    expect(divider).toHaveAttribute('aria-labelledby', label.id);
    expect(divider.className).toContain('withLabel');
  });

  it('supports custom label content through children', () => {
    render(
      <DynDivider>
        <span data-testid="custom-label">Custom Content</span>
      </DynDivider>
    );

    const divider = screen.getByTestId('dyn-divider');
    const customLabel = screen.getByTestId('custom-label');
    const labelledBy = divider.getAttribute('aria-labelledby');

    expect(labelledBy).toBeTruthy();
    const labelElement = labelledBy ? document.getElementById(labelledBy) : null;
    expect(labelElement).not.toBeNull();
    expect(labelElement).toContainElement(customLabel);
  });

  it('applies configuration modifiers to the class list', () => {
    render(
      <DynDivider
        label="Summary"
        labelPosition="right"
        direction="vertical"
        thickness="thick"
        lineStyle="dashed"
        color="primary"
        spacing="lg"
      />
    );

    const divider = screen.getByTestId('dyn-divider');
    const className = divider.className;

    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(className).toContain('directionVertical');
    expect(className).toContain('thicknessThick');
    expect(className).toContain('lineStyleDashed');
    expect(className).toContain('colorPrimary');
    expect(className).toContain('spacingLg');
    expect(className).toContain('labelRight');
  });
});
