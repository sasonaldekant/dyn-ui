import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DynTable from './DynTable';
import { DynTableColumn, TableAction } from './DynTable.types';

const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', active: true },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', active: false },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', active: true },
];

const sampleColumns: DynTableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', type: 'number', sortable: true, align: 'right' },
  { key: 'email', title: 'Email', type: 'link' },
  { key: 'active', title: 'Active', type: 'boolean', align: 'center' },
];

const sampleActions: TableAction[] = [
  {
    key: 'edit',
    title: 'Edit',
    onClick: vi.fn(),
  },
  {
    key: 'delete',
    title: 'Delete',
    type: 'danger',
    onClick: vi.fn(),
  },
];

describe('DynTable', () => {
  beforeEach(() => {
    sampleActions.forEach(action => {
      (action.onClick as ReturnType<typeof vi.fn>).mockClear();
    });
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<DynTable data={[]} columns={[]} loading />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders empty state', () => {
      render(<DynTable data={[]} columns={sampleColumns} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('renders custom empty text', () => {
      render(<DynTable data={[]} columns={sampleColumns} emptyText="Custom empty message" />);
      expect(screen.getByText('Custom empty message')).toBeInTheDocument();
    });

    it('renders all columns and data', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} />);

      // Headers
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();

      // Data
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('renders selection checkboxes when selectable is multiple', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} selectable="multiple" />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4); // 3 rows + header
    });

    it('renders radio buttons when selectable is single', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} selectable="single" />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3); // 3 rows
    });

    it('handles row selection', () => {
      const onSelectionChange = vi.fn();
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          selectable="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // Click first row checkbox

      expect(onSelectionChange).toHaveBeenCalledWith(['1'], [sampleData[0]]);
    });

    it('handles select all', () => {
      const onSelectionChange = vi.fn();
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          selectable="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(['1', '2', '3'], sampleData);
    });
  });

  describe('Sorting', () => {
    it('renders sort indicators for sortable columns', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} />);
      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveClass('dyn-table__cell--sortable');
    });

    it('handles column sorting', () => {
      const onSort = vi.fn();
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          onSort={onSort}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      fireEvent.click(nameHeader!);

      expect(onSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('toggles sort direction on repeated clicks', () => {
      const onSort = vi.fn();
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          onSort={onSort}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      fireEvent.click(nameHeader!);
      fireEvent.click(nameHeader!);

      expect(onSort).toHaveBeenNthCalledWith(1, 'name', 'asc');
      expect(onSort).toHaveBeenNthCalledWith(2, 'name', 'desc');
    });
  });

  describe('Actions', () => {
    it('renders action buttons', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} actions={sampleActions} />);
      expect(screen.getAllByText('Edit')).toHaveLength(3);
      expect(screen.getAllByText('Delete')).toHaveLength(3);
    });

    it('calls action onClick handler', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} actions={sampleActions} />);

      const editButtons = screen.getAllByText('Edit');
      fireEvent.click(editButtons[0]);

      expect(sampleActions[0].onClick).toHaveBeenCalledWith(sampleData[0], 0);
    });
  });

  describe('Cell Formatting', () => {
    it('formats boolean values correctly', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} />);
      expect(screen.getAllByText('Yes')).toHaveLength(2); // true values
      expect(screen.getAllByText('No')).toHaveLength(1); // false value
    });

    it('handles custom cell renderers', () => {
      const customColumns: DynTableColumn[] = [
        {
          key: 'name',
          title: 'Name',
          render: (value) => <strong>Custom: {value}</strong>,
        },
      ];

      render(<DynTable data={sampleData} columns={customColumns} />);
      expect(screen.getByText(/Custom: John Doe/)).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    const pagination = {
      current: 1,
      pageSize: 2,
      total: 10,
      onChange: vi.fn(),
    };

    it('renders pagination controls', () => {
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          pagination={pagination}
        />
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    it('handles pagination changes', () => {
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          pagination={pagination}
        />
      );

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(pagination.onChange).toHaveBeenCalledWith(2, 2);
    });
  });

  describe('Props', () => {
    it('applies custom className', () => {
      const { container } = render(
        <DynTable data={sampleData} columns={sampleColumns} className="custom-table" />
      );
      expect(container.firstChild).toHaveClass('custom-table');
    });

    it('applies size variants', () => {
      const { container, rerender } = render(
        <DynTable data={sampleData} columns={sampleColumns} size="small" />
      );
      expect(container.firstChild).toHaveClass('dyn-table--small');

      rerender(<DynTable data={sampleData} columns={sampleColumns} size="large" />);
      expect(container.firstChild).toHaveClass('dyn-table--large');
    });

    it('applies visual variants', () => {
      const { container, rerender } = render(
        <DynTable data={sampleData} columns={sampleColumns} striped />
      );
      expect(container.firstChild).toHaveClass('dyn-table--striped');

      rerender(
        <DynTable data={sampleData} columns={sampleColumns} bordered={false} />
      );
      expect(container.firstChild).not.toHaveClass('dyn-table--bordered');
    });

    it('applies height style', () => {
      const { container } = render(
        <DynTable data={sampleData} columns={sampleColumns} height={400} />
      );
      expect(container.firstChild).toHaveStyle({ height: '400px' });
    });
  });
});
