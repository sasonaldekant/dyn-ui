**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DynGrid } from './DynGrid';
import type { DynGridColumn } from '../../types/layout.types';

const mockColumns: DynGridColumn[] = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    sortable: true
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true
  },
  {
    key: 'email',
    title: 'Email',
    width: 200
  },
  {
    key: 'status',
    title: 'Status',
    align: 'center',
    render: value => {
      const status = typeof value === 'string' ? value : '';

      return <span className={`status-${status}`}>{status}</span>;
    }
  }
];

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' }
];

describe('DynGrid', () => {
  it('renders with basic data', () => {
    render(<DynGrid columns={mockColumns} data={mockData} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DynGrid columns={mockColumns} data={[]} loading={true} />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    // expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<DynGrid columns={mockColumns} data={[]} emptyText="No data found" />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('handles sorting', () => {
    const onSort = vi.fn();
    render(<DynGrid columns={mockColumns} data={mockData} onSort={onSort} />);

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    expect(onSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('handles row selection', () => {
    const onSelectionChange = vi.fn();
    render(
      <DynGrid
        columns={mockColumns}
        data={mockData}
        selectable="multiple"
        onSelectionChange={onSelectionChange}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // First row checkbox

    expect(onSelectionChange).toHaveBeenCalledWith(['1'], [mockData[0]]);
  });

  it('renders custom cell content', () => {
    render(<DynGrid columns={mockColumns} data={mockData} />);

    // Use getAllByText since there are multiple 'active' status values
    expect(screen.getAllByText('active')).toHaveLength(2);
    expect(screen.getByText('inactive')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(
      <DynGrid columns={mockColumns} data={mockData} size="large" />
    );

    expect(container.firstChild).toHaveClass('dyn-grid--large');
  });

  it('applies styling variants', () => {
    const { container } = render(
      <DynGrid
        columns={mockColumns}
        data={mockData}
        bordered={true}
        striped={true}
        hoverable={true}
      />
    );

    expect(container.firstChild).toHaveClass(
      'dyn-grid--bordered',
      'dyn-grid--striped',
      'dyn-grid--hoverable'
    );
  });
});
