import React, { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { DynTableProps, DynTableColumn, TableSortDirection } from '../types/data-display.types';
import DynCheckbox from './DynCheckbox';
import DynButton from './DynButton';
import DynIcon from './DynIcon';

const DynTable: React.FC<DynTableProps> = ({
  data = [],
  columns = [],
  actions = [],
  loading = false,
  size = 'medium',
  bordered = true,
  striped = false,
  hoverable = true,
  selectable = false,
  selectedKeys = [],
  rowKey = 'id',
  pagination,
  sortBy,
  onSort,
  onSelectionChange,
  emptyText = 'No data available',
  height,
  className,
}) => {
  const [internalSort, setInternalSort] = useState<{
    column: string;
    direction: TableSortDirection;
  } | null>(sortBy || null);

  const [internalSelection, setInternalSelection] = useState<string[]>(selectedKeys);

  // Get row key function
  const getRowKey = useCallback(
    (row: any, index: number): string => {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      return row[rowKey] || index.toString();
    },
    [rowKey]
  );

  // Handle sorting
  const handleSort = useCallback(
    (column: string) => {
      const currentSort = internalSort;
      let newDirection: TableSortDirection = 'asc';

      if (currentSort?.column === column) {
        newDirection = currentSort.direction === 'asc' ? 'desc' : 'asc';
      }

      const newSort = { column, direction: newDirection };
      setInternalSort(newSort);
      onSort?.(column, newDirection);
    },
    [internalSort, onSort]
  );

  // Handle selection
  const handleRowSelection = useCallback(
    (rowKey: string, checked: boolean) => {
      if (selectable === 'single') {
        const newSelection = checked ? [rowKey] : [];
        setInternalSelection(newSelection);
        onSelectionChange?.(newSelection, newSelection.map(key => 
          data.find((row, idx) => getRowKey(row, idx) === key)
        ).filter(Boolean));
      } else if (selectable === 'multiple' || selectable === true) {
        const newSelection = checked
          ? [...internalSelection, rowKey]
          : internalSelection.filter(key => key !== rowKey);
        setInternalSelection(newSelection);
        onSelectionChange?.(newSelection, newSelection.map(key => 
          data.find((row, idx) => getRowKey(row, idx) === key)
        ).filter(Boolean));
      }
    },
    [selectable, internalSelection, onSelectionChange, data, getRowKey]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (selectable === 'multiple' || selectable === true) {
        const newSelection = checked
          ? data.map((row, idx) => getRowKey(row, idx))
          : [];
        setInternalSelection(newSelection);
        onSelectionChange?.(newSelection, checked ? data : []);
      }
    },
    [selectable, data, getRowKey, onSelectionChange]
  );

  // Sort data if needed
  const sortedData = useMemo(() => {
    if (!internalSort) return data;

    const { column, direction } = internalSort;
    const columnConfig = columns.find(col => col.key === column);
    
    if (!columnConfig?.sortable) return data;

    return [...data].sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];
      
      let result = 0;
      if (aVal < bVal) result = -1;
      else if (aVal > bVal) result = 1;
      
      return direction === 'desc' ? -result : result;
    });
  }, [data, internalSort, columns]);

  // Check if all rows are selected
  const isAllSelected = useMemo(() => {
    if (!data.length) return false;
    return data.every((row, idx) => 
      internalSelection.includes(getRowKey(row, idx))
    );
  }, [data, internalSelection, getRowKey]);

  const isIndeterminate = useMemo(() => {
    const selectedCount = data.filter((row, idx) => 
      internalSelection.includes(getRowKey(row, idx))
    ).length;
    return selectedCount > 0 && selectedCount < data.length;
  }, [data, internalSelection, getRowKey]);

  // Format cell value
  const formatCellValue = useCallback(
    (value: any, column: DynTableColumn): React.ReactNode => {
      if (column.render) {
        return column.render(value, {}, 0);
      }

      switch (column.type) {
        case 'boolean':
          return value ? 'Yes' : 'No';
        case 'date':
          return value ? new Date(value).toLocaleDateString() : '';
        case 'time':
          return value ? new Date(value).toLocaleTimeString() : '';
        case 'datetime':
          return value ? new Date(value).toLocaleString() : '';
        case 'currency':
          return typeof value === 'number' 
            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
            : value;
        case 'link':
          return value ? <a href={value} target="_blank" rel="noopener noreferrer">{value}</a> : '';
        case 'icon':
          return value ? <DynIcon icon={value} /> : '';
        default:
          return value?.toString() || '';
      }
    },
    []
  );

  // Render actions
  const renderActions = useCallback(
    (row: any, index: number) => {
      if (!actions.length) return null;

      const visibleActions = actions.filter(action => 
        action.visible ? action.visible(row) : true
      );

      if (!visibleActions.length) return null;

      return (
        <div className="dyn-table-actions">
          {visibleActions.map(action => (
            <DynButton
              key={action.key}
              size="small"
              kind={action.type === 'primary' ? 'primary' : 
                    action.type === 'danger' ? 'primary' : 'tertiary'}
              icon={action.icon}
              title={action.title}
              disabled={action.disabled ? action.disabled(row) : false}
              onClick={() => action.onClick(row, index)}
              className={classNames({
                'dyn-button--danger': action.type === 'danger'
              })}
            >
              {action.title}
            </DynButton>
          ))}
        </div>
      );
    },
    [actions]
  );

  const tableClasses = classNames(
    'dyn-table',
    `dyn-table--${size}`,
    {
      'dyn-table--bordered': bordered,
      'dyn-table--striped': striped,
      'dyn-table--hoverable': hoverable,
      'dyn-table--loading': loading,
      'dyn-table--fixed-height': !!height,
    },
    className
  );

  if (loading) {
    return (
      <div className={tableClasses}>
        <div className="dyn-table__loading">
          <DynIcon icon="dyn-icon-loading" spin />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={tableClasses}>
        <div className="dyn-table__empty">
          <DynIcon icon="dyn-icon-inbox" />
          <span>{emptyText}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={tableClasses} style={{ height }}>
      <div className="dyn-table__wrapper">
        <table className="dyn-table__table">
          <thead className="dyn-table__head">
            <tr>
              {/* Selection column */}
              {(selectable === 'multiple' || selectable === true) && (
                <th className="dyn-table__cell dyn-table__cell--selection">
                  <DynCheckbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {selectable === 'single' && (
                <th className="dyn-table__cell dyn-table__cell--selection">
                  {/* Empty header for single selection */}
                </th>
              )}

              {/* Data columns */}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={classNames(
                    'dyn-table__cell',
                    'dyn-table__cell--header',
                    {
                      'dyn-table__cell--sortable': column.sortable,
                      'dyn-table__cell--sorted': internalSort?.column === column.key,
                      [`dyn-table__cell--${column.align || 'left'}`]: true,
                    }
                  )}
                  style={{ width: column.width }}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                >
                  <div className="dyn-table__cell-content">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="dyn-table__sort-icons">
                        <DynIcon 
                          icon="dyn-icon-chevron-up" 
                          className={classNames('dyn-table__sort-icon', {
                            'dyn-table__sort-icon--active': internalSort?.column === column.key && internalSort.direction === 'asc'
                          })}
                        />
                        <DynIcon 
                          icon="dyn-icon-chevron-down" 
                          className={classNames('dyn-table__sort-icon', {
                            'dyn-table__sort-icon--active': internalSort?.column === column.key && internalSort.direction === 'desc'
                          })}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}

              {/* Actions column */}
              {actions.length > 0 && (
                <th className="dyn-table__cell dyn-table__cell--actions">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          
          <tbody className="dyn-table__body">
            {sortedData.map((row, index) => {
              const key = getRowKey(row, index);
              const isSelected = internalSelection.includes(key);
              
              return (
                <tr
                  key={key}
                  className={classNames(
                    'dyn-table__row',
                    {
                      'dyn-table__row--selected': isSelected,
                    }
                  )}
                >
                  {/* Selection cell */}
                  {selectable && (
                    <td className="dyn-table__cell dyn-table__cell--selection">
                      {selectable === 'single' ? (
                        <input
                          type="radio"
                          name="table-selection"
                          checked={isSelected}
                          onChange={(e) => handleRowSelection(key, e.target.checked)}
                        />
                      ) : (
                        <DynCheckbox
                          checked={isSelected}
                          onChange={(checked) => handleRowSelection(key, checked)}
                        />
                      )}
                    </td>
                  )}

                  {/* Data cells */}
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={classNames(
                        'dyn-table__cell',
                        [`dyn-table__cell--${column.align || 'left'}`]
                      )}
                      title={column.tooltip}
                    >
                      {formatCellValue(row[column.key], column)}
                    </td>
                  ))}

                  {/* Actions cell */}
                  {actions.length > 0 && (
                    <td className="dyn-table__cell dyn-table__cell--actions">
                      {renderActions(row, index)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="dyn-table__pagination">
          <div className="dyn-table__pagination-info">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} - {Math.min(pagination.current * pagination.pageSize, pagination.total)} of {pagination.total}
          </div>
          <div className="dyn-table__pagination-controls">
            <DynButton
              kind="tertiary"
              size="small"
              disabled={pagination.current <= 1}
              onClick={() => pagination.onChange?.(pagination.current - 1, pagination.pageSize)}
            >
              Previous
            </DynButton>
            <span className="dyn-table__pagination-current">
              Page {pagination.current}
            </span>
            <DynButton
              kind="tertiary"
              size="small"
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              onClick={() => pagination.onChange?.(pagination.current + 1, pagination.pageSize)}
            >
              Next
            </DynButton>
          </div>
        </div>
      )}
    </div>
  );
};

DynTable.displayName = 'DynTable';

export default DynTable;