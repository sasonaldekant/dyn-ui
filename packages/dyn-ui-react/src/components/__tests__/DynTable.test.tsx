import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynTable from '../DynTable';
import { DynTableColumn, DynTableAction } from '../../types/data-display.types';

const mockData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', active: true },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', active: false },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', active: true },
];

const mockColumns: DynTableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', type: 'number', sortable: true },
  { key: 'email', title: 'Email', type: 'text' },
  { key: 'active', title: 'Active', type: 'boolean' },
];

const mockActions: DynTableAction[] = [
  {
    key: 'edit',
    title: 'Edit',
    icon: 'dyn-icon-edit',
    onClick: jest.fn(),
  },
  {
    key: 'delete',
    title: 'Delete',
    icon: 'dyn-icon-delete',
    type: 'danger',
    onClick: jest.fn(),
  },
];

describe('DynTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table with data', () => {
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('handles sorting', () => {
    const onSort = jest.fn();
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        onSort={onSort}
      />
    );

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    expect(onSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('renders actions', () => {
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        actions={mockActions}
      />
    );

    expect(screen.getAllByText('Edit')).toHaveLength(mockData.length);
    expect(screen.getAllByText('Delete')).toHaveLength(mockData.length);
  });

  it('handles action clicks', () => {
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        actions={mockActions}
      />
    );

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockActions[0].onClick).toHaveBeenCalledWith(mockData[0], 0);
  });

  it('handles selection', () => {
    const onSelectionChange = jest.fn();
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        selectable="multiple"
        onSelectionChange={onSelectionChange}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // First data row checkbox

    expect(onSelectionChange).toHaveBeenCalledWith(['1'], [mockData[0]]);
  });

  it('handles select all', () => {
    const onSelectionChange = jest.fn();
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        selectable="multiple"
        onSelectionChange={onSelectionChange}
      />
    );

    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAllCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith(['1', '2', '3'], mockData);
  });

  it('formats boolean values', () => {
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
      />
    );

    expect(screen.getAllByText('Yes')).toHaveLength(2); // Two active users
    expect(screen.getAllByText('No')).toHaveLength(1);  // One inactive user
  });

  it('shows loading state', () => {
    render(
      <DynTable
        data={[]}
        columns={mockColumns}
        loading
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(
      <DynTable
        data={[]}
        columns={mockColumns}
        emptyText="No users found"
      />
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders pagination', () => {
    render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        pagination={{
          current: 1,
          pageSize: 10,
          total: 30,
          onChange: jest.fn(),
        }}
      />
    );

    expect(screen.getByText('Showing 1 - 3 of 30')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container, rerender } = render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        size="small"
      />
    );

    expect(container.firstChild).toHaveClass('dyn-table--small');

    rerender(
      <DynTable
        data={mockData}
        columns={mockColumns}
        size="large"
      />
    );

    expect(container.firstChild).toHaveClass('dyn-table--large');
  });

  it('applies style modifiers', () => {
    const { container } = render(
      <DynTable
        data={mockData}
        columns={mockColumns}
        bordered
        striped
        hoverable
      />
    );

    expect(container.firstChild).toHaveClass('dyn-table--bordered');
    expect(container.firstChild).toHaveClass('dyn-table--striped');
    expect(container.firstChild).toHaveClass('dyn-table--hoverable');
  });
});