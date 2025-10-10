import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../../types';

export interface BreadcrumbItem {
  label: string;
  link?: string;
  action?: () => void;
}

export interface DynBreadcrumbProps extends BaseComponentProps {
  items?: BreadcrumbItem[];
  favorite?: boolean;
  favoriteService?: string;
  separator?: string | ReactNode;
  maxItems?: number;
  onFavorite?: (favorited: boolean) => void;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  ariaLabel?: string;
}

export interface DynBreadcrumbRef {
  addItem: (item: BreadcrumbItem) => void;
  removeItem: (index: number) => void;
  clear: () => void;
}

export const DEFAULT_SEPARATOR = 'dyn-icon-arrow-right';

export const BREADCRUMB_LITERALS = {
  addToFavorites: 'Adicionar aos favoritos',
  removeFromFavorites: 'Remover dos favoritos',
  showMore: 'Mostrar mais itens',
  home: 'Início',
} as const;

export type DynBreadcrumbDefaultProps = Required<
  Pick<DynBreadcrumbProps, 'separator' | 'maxItems' | 'ariaLabel'>
> & {
  items: BreadcrumbItem[];
};

export const DYN_BREADCRUMB_DEFAULT_PROPS: DynBreadcrumbDefaultProps = {
  items: [],
  separator: DEFAULT_SEPARATOR,
  maxItems: 5,
  ariaLabel: 'Breadcrumb',
};
