import React, { useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynTable.module.css';
import type { DynTableProps } from './DynTable.types';

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

  const handleSort = (key: string) => {
    if (!sortable) return;
    const direction = sortBy && sortBy.column === key && sortBy.direction === 'asc' ? 'desc' : 'asc';
    onSort?.(key, direction);
  };

  return (
    <div id={internalId} className={cn(getStyleClass('root'), className)} data-testid={dataTestId || 'dyn-table'} {...rest}>
      <table role="table" className={getStyleClass('table')} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
        <thead className={getStyleClass('thead')}>
          <tr role="row">
            {columns.map(col => {
              const isSorted = sortBy?.column === col.key;
              return (
                <th
                  key={col.key}
                  role="columnheader"
                  scope="col"
                  aria-sort={sortable && isSorted ? sortBy!.direction === 'asc' ? 'ascending' : 'descending' : undefined}
                  className={cn(getStyleClass('th'), isSorted && getStyleClass('th--sorted'))}
                >
                  {col.sortable !== false && sortable ? (
                    <button type="button" className={getStyleClass('sort')} onClick={() => handleSort(col.key)} aria-label={`Sort by ${col.header}`}>
                      {col.header}
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={getStyleClass('tbody')}>
          {data.map((row, rIdx) => (
            <tr key={rIdx} role="row" className={getStyleClass('tr')}>
              {columns.map(col => (
                <td key={col.key} role="cell" className={getStyleClass('td')}>
                  {col.render ? col.render(row[col.key], row, rIdx) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynTable;
