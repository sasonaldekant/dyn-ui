/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DynPage } from './DynPage';
import type { DynPageBreadcrumb, DynPageAction } from '../../types/layout.types';

const mockBreadcrumbs: DynPageBreadcrumb[] = [
  { title: 'Home', href: '/' },
  { title: 'Users', href: '/users' },
  { title: 'Profile' }
];

const mockActions: DynPageAction[] = [
  {
    key: 'edit',
    title: 'Edit',
    type: 'primary',
    onClick: vi.fn()
  },
  {
    key: 'delete',
    title: 'Delete',
    type: 'danger',
    onClick: vi.fn()
  }
];

describe('DynPage', () => {
  it('renders with basic title', () => {
    render(
      <DynPage title="Test Page">
        <div>Page content</div>
      </DynPage>
    );
    
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders with title and subtitle', () => {
    render(
      <DynPage title="Test Page" subtitle="This is a test page">
        <div>Page content</div>
      </DynPage>
    );
    
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('This is a test page')).toBeInTheDocument();
  });

  it('renders breadcrumbs', () => {
    render(
      <DynPage title="Profile" breadcrumbs={mockBreadcrumbs}>
        <div>Page content</div>
      </DynPage>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    // Use getAllByText since Profile appears in both breadcrumb and title
    expect(screen.getAllByText('Profile')).toHaveLength(2);
    
    // Should have navigation landmark
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('handles breadcrumb clicks', () => {
    const onClickMock = vi.fn();
    const breadcrumbsWithClick: DynPageBreadcrumb[] = [
      { title: 'Home', onClick: onClickMock },
      { title: 'Current' }
    ];
    
    render(
      <DynPage title="Test" breadcrumbs={breadcrumbsWithClick}>
        <div>Content</div>
      </DynPage>
    );
    
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    
    expect(onClickMock).toHaveBeenCalled();
  });

  it('renders action buttons', () => {
    render(
      <DynPage title="Test Page" actions={mockActions}>
        <div>Page content</div>
      </DynPage>
    );
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('handles action button clicks', () => {
    render(
      <DynPage title="Test Page" actions={mockActions}>
        <div>Page content</div>
      </DynPage>
    );
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockActions[0].onClick).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(
      <DynPage title="Test" loading={true}>
        <div>Content</div>
      </DynPage>
    );
    
    expect(screen.getByText('Carregando página...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(
      <DynPage title="Test" error="Something went wrong">
        <div>Content</div>
      </DynPage>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(
      <DynPage title="Test" size="large">
        <div>Content</div>
      </DynPage>
    );
    
    // CSS module friendly assertion
    const el = container.firstElementChild as HTMLElement | null;
    expect(el?.className).toMatch(/large/i);
  });

  it('applies padding classes', () => {
    const { container } = render(
      <DynPage title="Test" padding="lg">
        <div>Content</div>
      </DynPage>
    );
    
    // CSS module friendly assertion
    const el = container.firstElementChild as HTMLElement | null;
    expect(el?.className).toMatch(/padding.*lg/i);
  });

  it('applies background classes', () => {
    const { container } = render(
      <DynPage title="Test" background="surface">
        <div>Content</div>
      </DynPage>
    );
    
    // CSS module friendly assertion
    const el = container.firstElementChild as HTMLElement | null;
    expect(el?.className).toMatch(/surface/i);
  });

  it('has proper semantic structure', () => {
    render(
      <DynPage title="Test Page" breadcrumbs={mockBreadcrumbs}>
        <div>Page content</div>
      </DynPage>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main content
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // breadcrumbs
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});