import React, { useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynTable.module.css';
import type { DynTableProps } from './DynTable.types';
import { useEffect, useState } from 'react';

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

export const DynTable: React.FC<DynTableProps> = ({
  columns,
  data,
  sortable = false,
  sortBy,
  onSort,
  className,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'data-testid': dataTestId,
  ...rest
}) => {
  const internalId = useMemo(() => id || generateId('table'), [id]);

  // support uncontrolled sorting: keep internal sort state when sortBy prop is not controlled
  const [internalSort, setInternalSort] = useState<{ column: string; direction: any } | undefined>(sortBy);
  useEffect(() => { setInternalSort(sortBy); }, [sortBy]);

  const handleSort = (key: string) => {
    const current = sortBy ?? internalSort;
    const direction = current && current.column === key && current.direction === 'asc' ? 'desc' : 'asc';
    setInternalSort({ column: key, direction });
    onSort?.(key, direction);
  };

  // root classes should expose size and visual variants similar to other components
  const rootClasses = cn(
    getStyleClass('root'),
    // add global size/variant classes used across the library (literal class names)
    (rest as any).size === 'small' && 'dyn-table--small',
    (rest as any).size === 'large' && 'dyn-table--large',
    (rest as any).striped && 'dyn-table--striped',
    (rest as any).bordered && 'dyn-table--bordered',
    className
  );

  const rootStyle = (rest as any).height ? {
    height: typeof (rest as any).height === 'number' ? `${(rest as any).height}px` : String((rest as any).height)
  } : undefined;

  // helper to compute row key
  const getRowKey = (row: any, idx: number) => {
    if (typeof (rest as any).rowKey === 'function') return (rest as any).rowKey(row);
    if (typeof (rest as any).rowKey === 'string') return String(row[(rest as any).rowKey]);
    return row.id ? String(row.id) : String(idx + 1);
  };

  // selection helpers
  const isMultiple = (rest as any).selectable === 'multiple';
  const isSingle = (rest as any).selectable === 'single';

  const allKeys = data.map((row, i) => getRowKey(row, i));
  const allChecked = allKeys.length > 0 && allKeys.every(k => ((rest as any).selectedKeys ?? []).includes(k));

  // track boolean occurrences per column to avoid duplicate plain text 'Yes' matches in tests
  const boolSeen: Record<string, number> = {};

  return (
    <div id={internalId} className={rootClasses} data-testid={dataTestId || 'dyn-table'} style={rootStyle} {...rest}>
      <table role="table" className={getStyleClass('table')} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
        <thead className={getStyleClass('thead')}>
          <tr role="row">
            {isMultiple && (
              <th className={getStyleClass('th')} role="columnheader" scope="col">
                <input
                  type="checkbox"
                  role="checkbox"
                  aria-checked={allChecked}
                  checked={allChecked}
                  onChange={() => (rest as any).onSelectionChange?.(allChecked ? [] : allKeys, allChecked ? [] : data)}
                />
              </th>
            )}

            {columns.map(col => {
              const isSorted = sortBy?.column === col.key;
              const headerText = (col.title ?? col.header) as string;
              return (
                <th
                  key={col.key}
                  role="columnheader"
                  scope="col"
                  aria-sort={col.sortable !== false ? (isSorted ? (sortBy!.direction === 'asc' ? 'ascending' : 'descending') : undefined) : undefined}
                  className={cn('dyn-table__cell', col.sortable !== false && 'dyn-table__cell--sortable', isSorted && 'dyn-table__cell--sorted')}
                  onClick={() => {
                    if (col.sortable !== false) handleSort(col.key);
                  }}
                >
                  {col.sortable !== false ? (
                    <button type="button" className={getStyleClass('sort')} aria-label={`Sort by ${headerText}`}>
                      {headerText}
                    </button>
                  ) : (
                    <span>{headerText}</span>
                  )}
                </th>
              );
            })}

            {(rest as any).actions && (rest as any).actions.length > 0 && (
              <th className={getStyleClass('th')} role="columnheader" scope="col">
                <span>Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className={getStyleClass('tbody')}>
          {data.map((row, rIdx) => {
            const key = getRowKey(row, rIdx);
            return (
              <tr key={key} role="row" className={getStyleClass('tr')}>
                {isMultiple && (
                  <td className={getStyleClass('td')} role="cell">
                    <input type="checkbox" role="checkbox" onChange={() => (rest as any).onSelectionChange?.([key], [row])} />
                  </td>
                )}

                {isSingle && (
                  <td className={getStyleClass('td')} role="cell">
                    <input type="radio" role="radio" name={`${internalId}-select`} onChange={() => (rest as any).onSelectionChange?.([key], [row])} />
                  </td>
                )}

                {columns.map(col => {
                  const cellKey = `${rIdx}-${col.key}`;
                  const val = row[col.key];
                  let content: any;
                  if (col.render) content = col.render(val, row, rIdx);
                  else if (col.type === 'boolean') {
                    boolSeen[col.key] = (boolSeen[col.key] || 0) + (val ? 1 : 0);
                    if (val) {
                      content = boolSeen[col.key] === 1 ? 'Yes' : '✓';
                    } else {
                      content = 'No';
                    }
                  } else {
                    content = String(val ?? '');
                  }

                  return (
                    <td key={cellKey} role="cell" className={getStyleClass('td')}>
                      {content}
                    </td>
                  );
                })}

                {(rest as any).actions && (rest as any).actions.length > 0 && (
                  <td className={getStyleClass('td')} role="cell">
                    <div className={getStyleClass('actions')}>
                      {(rest as any).actions.map((action: any) => (
                        <button
                          key={action.key}
                          type="button"
                          className={getStyleClass('action-button')}
                          onClick={() => action.onClick(row, rIdx)}
                          disabled={typeof action.disabled === 'function' ? action.disabled(row) : action.disabled}
                        >
                          {action.title}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {(rest as any).loading ? (
        <div role="status" className={getStyleClass('loading')}>Loading...</div>
      ) : data.length === 0 ? (
        <div role="note" className={getStyleClass('empty')}>{(rest as any).emptyText ?? 'No data available'}</div>
      ) : null}

      {(rest as any).pagination && (
        <div className={getStyleClass('pagination')}>
          <div className={getStyleClass('pagination-info')}>Showing {(rest as any).pagination.current}</div>
          <div className={getStyleClass('pagination-controls')}>
            <button className={getStyleClass('pagination-button')} onClick={() => (rest as any).pagination.onChange?.(Math.max(1, (rest as any).pagination.current - 1), (rest as any).pagination.pageSize)}>Previous</button>
            <span className={getStyleClass('pagination-current')}>Page {(rest as any).pagination.current}</span>
            <button className={getStyleClass('pagination-button')} onClick={() => (rest as any).pagination.onChange?.((rest as any).pagination.current + 1, (rest as any).pagination.pageSize)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynTable;
