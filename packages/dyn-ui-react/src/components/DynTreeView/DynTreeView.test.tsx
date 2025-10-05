import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import DynTreeView from './DynTreeView';
import { DynTreeNode } from './DynTreeView.types';

const sampleTreeData: DynTreeNode[] = [
  {
    key: '1',
    title: 'Parent 1',
    icon: '📁',
    children: [
      { key: '1-1', title: 'Child 1-1', icon: '📄' },
      { key: '1-2', title: 'Child 1-2', icon: '📄' },
      {
        key: '1-3',
        title: 'Child 1-3',
        icon: '📁',
        children: [
          { key: '1-3-1', title: 'Grandchild 1-3-1', icon: '📄' },
          { key: '1-3-2', title: 'Grandchild 1-3-2', icon: '📄' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: 'Parent 2',
    icon: '📁',
    children: [
      { key: '2-1', title: 'Child 2-1', icon: '📄' },
      { key: '2-2', title: 'Child 2-2', icon: '📄', disabled: true },
    ],
  },
  { key: '3', title: 'Leaf Node', icon: '📄' },
];

describe('DynTreeView', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<DynTreeView treeData={sampleTreeData} />);
      expect(screen.getByText('Parent 1')).toBeInTheDocument();
    });

    it('renders all root nodes', () => {
      render(<DynTreeView treeData={sampleTreeData} />);
      expect(screen.getByText('Parent 1')).toBeInTheDocument();
      expect(screen.getByText('Parent 2')).toBeInTheDocument();
      expect(screen.getByText('Leaf Node')).toBeInTheDocument();
    });

    it('renders icons when showIcon is true', () => {
      render(<DynTreeView treeData={sampleTreeData} showIcon />);
      expect(screen.getAllByText('📁')).toHaveLength(2); // Updated to handle multiple elements
    });

    it('does not render icons when showIcon is false', () => {
      render(<DynTreeView treeData={sampleTreeData} showIcon={false} />);
      expect(screen.queryByText('📁')).not.toBeInTheDocument();
    });

    it('renders expand/collapse icons for parent nodes', () => {
      render(<DynTreeView treeData={sampleTreeData} />);
      const expandButtons = screen.getAllByText('▶');
      expect(expandButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Expansion', () => {
    it('expands nodes when expand icon is clicked', () => {
      render(<DynTreeView treeData={sampleTreeData} />);
      
      const expandButton = screen.getAllByText('▶')[0];
      fireEvent.click(expandButton);
      
      expect(screen.getByText('Child 1-1')).toBeInTheDocument();
      expect(screen.getByText('Child 1-2')).toBeInTheDocument();
    });

    it('collapses expanded nodes', () => {
      render(<DynTreeView treeData={sampleTreeData} expandedKeys={['1']} />);
      
      expect(screen.getByText('Child 1-1')).toBeInTheDocument();
      
      const collapseButton = screen.getByText('▼');
      fireEvent.click(collapseButton);
      
      expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();
    });

    it('expands all nodes when defaultExpandAll is true', () => {
      render(<DynTreeView treeData={sampleTreeData} defaultExpandAll />);
      
      expect(screen.getByText('Child 1-1')).toBeInTheDocument();
      expect(screen.getByText('Child 2-1')).toBeInTheDocument();
      expect(screen.getByText('Grandchild 1-3-1')).toBeInTheDocument();
    });

    it('calls onExpand callback', () => {
      const onExpand = vi.fn(); // Changed from jest.fn()
      render(<DynTreeView treeData={sampleTreeData} onExpand={onExpand} />);
      
      const expandButton = screen.getAllByText('▶')[0];
      fireEvent.click(expandButton);
      
      expect(onExpand).toHaveBeenCalledWith(['1']);
    });
  });

  describe('Selection', () => {
    it('handles single selection', () => {
      const onSelect = vi.fn(); // Changed from jest.fn()
      render(
        <DynTreeView 
          treeData={sampleTreeData} 
          selectable 
          onSelect={onSelect}
        />
      );
      
      fireEvent.click(screen.getByText('Parent 1'));
      
      expect(onSelect).toHaveBeenCalledWith(['1'], expect.objectContaining({
        selected: true,
        node: expect.objectContaining({ key: '1', title: 'Parent 1' })
      }));
    });

    it('handles multiple selection', () => {
      const onSelect = vi.fn(); // Changed from jest.fn()
      render(
        <DynTreeView 
          treeData={sampleTreeData} 
          selectable 
          multiple
          onSelect={onSelect}
        />
      );
      
      fireEvent.click(screen.getByText('Parent 1'));
      fireEvent.click(screen.getByText('Parent 2'));
      
      expect(onSelect).toHaveBeenCalledWith(['1'], expect.any(Object));
      expect(onSelect).toHaveBeenCalledWith(['1', '2'], expect.any(Object));
    });

    it('does not select disabled nodes', () => {
      const onSelect = vi.fn(); // Changed from jest.fn()
      render(
        <DynTreeView 
          treeData={sampleTreeData} 
          selectable
          expandedKeys={['2']}
          onSelect={onSelect}
        />
      );
      
      fireEvent.click(screen.getByText('Child 2-2'));
      
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('Checkboxes', () => {
    it('renders checkboxes when checkable is true', () => {
      render(<DynTreeView treeData={sampleTreeData} checkable />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('handles checkbox checking', () => {
      const onCheck = vi.fn(); // Changed from jest.fn()
      render(
        <DynTreeView 
          treeData={sampleTreeData} 
          checkable
          onCheck={onCheck}
        />
      );
      
      const checkbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(checkbox);
      
      expect(onCheck).toHaveBeenCalledWith(
        expect.arrayContaining(['1']),
        expect.objectContaining({
          checked: true,
          node: expect.objectContaining({ key: '1' })
        })
      );
    });

    it('checks/unchecks children when parent is checked/unchecked', () => {
      const onCheck = vi.fn(); // Changed from jest.fn()
      render(
        <DynTreeView 
          treeData={sampleTreeData} 
          checkable
          onCheck={onCheck}
        />
      );
      
      const parentCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(parentCheckbox);
      
      // Should check parent and all children
      expect(onCheck).toHaveBeenCalledWith(
        expect.arrayContaining(['1', '1-1', '1-2', '1-3', '1-3-1', '1-3-2']),
        expect.any(Object)
      );
    });
  });

  describe('Search', () => {
    it('renders search input when searchable is true', () => {
      render(<DynTreeView treeData={sampleTreeData} searchable />);
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('filters nodes based on search input', () => {
      render(<DynTreeView treeData={sampleTreeData} searchable />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'Child 1-1' } });
      
      expect(screen.getByText('Child 1-1')).toBeInTheDocument();
      expect(screen.queryByText('Parent 2')).not.toBeInTheDocument();
    });

    it('calls onSearch callback', () => {
      const onSearch = vi.fn(); // Changed from jest.fn()
      render(
        <DynTreeView 
          treeData={sampleTreeData} 
          searchable
          onSearch={onSearch}
        />
      );
      
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'test' } });
      
      expect(onSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no data', () => {
      render(<DynTreeView treeData={[]} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('shows no matches message when search yields no results', () => {
      render(<DynTreeView treeData={sampleTreeData} searchable />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      
      expect(screen.getByText('No matching nodes found')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies custom className', () => {
      const { container } = render(
        <DynTreeView treeData={sampleTreeData} className="custom-tree" />
      );
      expect(container.firstChild).toHaveClass('custom-tree');
    });

    it('applies height style', () => {
      const { container } = render(
        <DynTreeView treeData={sampleTreeData} height={300} />
      );
      expect(container.firstChild).toHaveStyle({ height: '300px' });
    });

    it('applies correct CSS classes based on props', () => {
      const { container, rerender } = render(
        <DynTreeView treeData={sampleTreeData} checkable />
      );
      expect(container.firstChild?.className).toMatch(/checkable/i); // CSS module friendly
      
      rerender(<DynTreeView treeData={sampleTreeData} showLine />);
      expect(container.firstChild?.className).toMatch(/show-line/i); // CSS module friendly
    });
  });
});