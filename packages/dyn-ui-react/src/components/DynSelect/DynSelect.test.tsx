import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynSelect } from './DynSelect';

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('DynSelect', () => {
  it('renders with label', () => {
    render(<DynSelect name="test" label="Test Select" options={sampleOptions} />);
    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });

  it('displays placeholder when no value selected', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} placeholder="Choose option" />);
    expect(screen.getByText('Choose option')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('selects option when clicked', () => {
    const handleChange = vi.fn();
    render(<DynSelect name="test" label="Test" options={sampleOptions} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    
    expect(handleChange).toHaveBeenCalledWith('option1');
  });

  it('handles multiple selection', () => {
    const handleChange = vi.fn();
    render(
      <DynSelect 
        name="test" 
        label="Test" 
        options={sampleOptions} 
        multiple 
        onChange={handleChange} 
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    
    expect(handleChange).toHaveBeenCalledWith(['option1']);
  });

  it('filters options when searchable', () => {
    render(
      <DynSelect 
        name="test" 
        label="Test" 
        options={sampleOptions} 
        searchable 
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const searchInput = screen.getByPlaceholderText('Pesquisar...');
    fireEvent.change(searchInput, { target: { value: 'Option 1' } });
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('prevents interaction when disabled', () => {
    const handleChange = vi.fn();
    render(<DynSelect name="test" label="Test" options={sampleOptions} disabled onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('prevents selection of disabled options', () => {
    const handleChange = vi.fn();
    render(<DynSelect name="test" label="Test" options={sampleOptions} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const disabledOption = screen.getByText('Option 3');
    fireEvent.click(disabledOption);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} />);
    
    const select = screen.getByRole('combobox');
    
    // Enter should open dropdown
    fireEvent.keyDown(select, { key: 'Enter' });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Escape should close dropdown
    fireEvent.keyDown(select, { key: 'Escape' });
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} value="option2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} loading />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('displays help text', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} help="Help text" />);
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} errorMessage="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} size="large" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('dyn-select--large');
  });

  it('applies custom className', () => {
    const { container } = render(
      <DynSelect name="test" label="Test" options={sampleOptions} className="custom-select" />
    );
    expect(container.querySelector('.custom-select')).toBeInTheDocument();
  });

  it('shows empty state when no options match search', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} searchable />);
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const searchInput = screen.getByPlaceholderText('Pesquisar...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
  });

  it('removes tags in multiple mode', () => {
    const handleChange = vi.fn();
    render(
      <DynSelect 
        name="test" 
        label="Test" 
        options={sampleOptions} 
        multiple 
        value={['option1', 'option2']}
        onChange={handleChange} 
      />
    );
    
    const removeButton = screen.getByLabelText('Remover Option 1');
    fireEvent.click(removeButton);
    
    expect(handleChange).toHaveBeenCalledWith(['option2']);
  });

  it('hides when not visible', () => {
    render(<DynSelect name="test" label="Test" options={sampleOptions} visible={false} />);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});