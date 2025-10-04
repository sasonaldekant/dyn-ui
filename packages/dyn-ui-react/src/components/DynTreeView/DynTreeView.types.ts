import { BaseComponentProps } from '../types';

export interface DynTreeNode {
  key: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  children?: DynTreeNode[];
  [key: string]: any; // Allow additional properties
}

export interface TreeSelectInfo {
  selected: boolean;
  node: DynTreeNode;
}

export interface TreeCheckInfo {
  checked: boolean;
  node: DynTreeNode;
}

export interface DynTreeViewProps extends BaseComponentProps {
  /** Tree data */
  treeData: DynTreeNode[];
  
  /** Show checkboxes for selection */
  checkable?: boolean;
  
  /** Allow node selection */
  selectable?: boolean;
  
  /** Allow multiple selection */
  multiple?: boolean;
  
  /** Expanded node keys */
  expandedKeys?: string[];
  
  /** Checked node keys */
  checkedKeys?: string[];
  
  /** Selected node keys */
  selectedKeys?: string[];
  
  /** Expand all nodes by default */
  defaultExpandAll?: boolean;
  
  /** Show node icons */
  showIcon?: boolean;
  
  /** Show connecting lines */
  showLine?: boolean;
  
  /** Enable search functionality */
  searchable?: boolean;
  
  /** Expand callback */
  onExpand?: (expandedKeys: string[]) => void;
  
  /** Check callback */
  onCheck?: (checkedKeys: string[], info: TreeCheckInfo) => void;
  
  /** Select callback */
  onSelect?: (selectedKeys: string[], info: TreeSelectInfo) => void;
  
  /** Search callback */
  onSearch?: (value: string) => void;
  
  /** Fixed height for scrollable tree */
  height?: number | string;
  
  /** Additional CSS class name */
  className?: string;
}

export type DynTreeViewType = DynTreeViewProps;