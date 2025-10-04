# Layout Components Group - SCOPE 7

Comprehensive documentation for DYN UI Layout Components implemented in React/TypeScript.

## 📋 Overview

The Layout Components Group provides essential layout building blocks for creating structured, responsive user interfaces. These components handle page structure, content organization, data presentation, and navigation patterns.

## 🎯 Components Implemented

### 1. DynContainer
**Purpose**: Flexible wrapper component for grouping content with optional styling and spacing controls.

**Key Features**:
- Flexible direction (horizontal/vertical)
- Customizable spacing and alignment
- Optional borders, shadows, and backgrounds
- Title and subtitle support
- Responsive design

**Usage**:
```tsx
import { DynContainer } from 'dyn-ui-react';

<DynContainer
  title="User Settings"
  subtitle="Manage your account preferences"
  bordered={true}
  shadow={true}
  spacing="lg"
  direction="vertical"
>
  <div>Content goes here</div>
</DynContainer>
```

**Props**:
- `title?: string` - Optional container title
- `subtitle?: string` - Optional container subtitle
- `size?: 'small' | 'medium' | 'large'` - Container size variant
- `spacing?: LayoutSpacing` - Internal spacing between children
- `bordered?: boolean` - Add border styling
- `shadow?: boolean` - Add shadow effect
- `background?: 'none' | 'surface' | 'card'` - Background variant
- `direction?: 'horizontal' | 'vertical'` - Flex direction
- `align?: LayoutAlignment` - Cross-axis alignment
- `justify?: LayoutJustify` - Main-axis alignment
- `maxWidth?: string` - Maximum width constraint

### 2. DynDivider
**Purpose**: Visual separator component with optional labels and customizable styling.

**Key Features**:
- Horizontal and vertical orientations
- Optional label text with positioning
- Multiple thickness and style options
- Color variants
- Spacing controls

**Usage**:
```tsx
import { DynDivider } from 'dyn-ui-react';

<DynDivider
  label="Section Break"
  labelPosition="center"
  thickness="medium"
  style="solid"
  color="primary"
/>
```

**Props**:
- `label?: string` - Optional divider label
- `labelPosition?: 'left' | 'center' | 'right'` - Label positioning
- `direction?: 'horizontal' | 'vertical'` - Divider orientation
- `thickness?: 'thin' | 'medium' | 'thick'` - Line thickness
- `style?: 'solid' | 'dashed' | 'dotted'` - Line style
- `color?: 'default' | 'primary' | 'secondary' | 'muted'` - Color variant
- `spacing?: LayoutSpacing` - Margin spacing

### 3. DynGrid
**Purpose**: Advanced data table component with sorting, filtering, selection, and pagination capabilities.

**Key Features**:
- Flexible column configuration
- Built-in sorting and filtering
- Single and multi-row selection
- Custom cell rendering
- Pagination support
- Loading and empty states
- Responsive design
- Accessibility compliant

**Usage**:
```tsx
import { DynGrid, DynGridColumn } from 'dyn-ui-react';

const columns: DynGridColumn[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    width: 200
  },
  {
    key: 'email',
    title: 'Email',
    width: 250
  },
  {
    key: 'status',
    title: 'Status',
    align: 'center',
    render: (value) => <StatusBadge status={value} />
  }
];

<DynGrid
  columns={columns}
  data={userData}
  selectable="multiple"
  sortable={true}
  bordered={true}
  striped={true}
  hoverable={true}
  pagination={{
    current: 1,
    pageSize: 10,
    total: 100,
    onChange: (page, size) => console.log(page, size)
  }}
  onSort={(column, direction) => console.log('Sort:', column, direction)}
  onSelectionChange={(keys, rows) => console.log('Selection:', keys, rows)}
/>
```

**Props**:
- `columns: DynGridColumn[]` - Column definitions
- `data: any[]` - Table data
- `loading?: boolean` - Loading state
- `size?: 'small' | 'medium' | 'large'` - Table size variant
- `bordered?: boolean` - Show borders
- `striped?: boolean` - Alternating row colors
- `hoverable?: boolean` - Row hover effects
- `sortable?: boolean` - Enable sorting
- `filterable?: boolean` - Enable filtering
- `selectable?: boolean | 'single' | 'multiple'` - Selection mode
- `selectedKeys?: string[]` - Currently selected rows
- `onSelectionChange?: (keys: string[], rows: any[]) => void` - Selection callback
- `onSort?: (column: string, direction: 'asc' | 'desc') => void` - Sort callback
- `pagination?: PaginationConfig` - Pagination configuration
- `emptyText?: ReactNode` - Empty state content

**Column Configuration**:
```tsx
interface DynGridColumn {
  key: string;
  title: string;
  width?: string | number;
  minWidth?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  render?: (value: any, record: any, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  hidden?: boolean;
}
```

### 4. DynPage
**Purpose**: Complete page layout component with header, breadcrumbs, actions, and flexible content area.

**Key Features**:
- Page title and subtitle
- Breadcrumb navigation
- Action buttons in header
- Loading and error states
- Flexible content area
- Responsive design
- Semantic HTML structure

**Usage**:
```tsx
import { DynPage, DynPageBreadcrumb, DynPageAction } from 'dyn-ui-react';

const breadcrumbs: DynPageBreadcrumb[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Users', href: '/users' },
  { title: 'Profile' }
];

const actions: DynPageAction[] = [
  {
    key: 'save',
    title: 'Save Changes',
    type: 'primary',
    onClick: () => handleSave()
  },
  {
    key: 'cancel',
    title: 'Cancel',
    type: 'secondary',
    onClick: () => handleCancel()
  }
];

<DynPage
  title="User Profile"
  subtitle="Manage user account settings"
  breadcrumbs={breadcrumbs}
  actions={actions}
  size="medium"
  padding="md"
  background="page"
>
  <UserProfileForm />
</DynPage>
```

**Props**:
- `title: string` - Page title (required)
- `subtitle?: string` - Optional page subtitle
- `breadcrumbs?: DynPageBreadcrumb[]` - Breadcrumb navigation
- `actions?: DynPageAction[]` - Header action buttons
- `loading?: boolean` - Loading state
- `error?: string | ReactNode` - Error state content
- `size?: 'small' | 'medium' | 'large'` - Page size variant
- `padding?: LayoutSpacing` - Content padding
- `background?: 'none' | 'surface' | 'page'` - Background variant

## 🎨 Styling System

### CSS Architecture
All Layout components use pure CSS with the `dyn-` prefix for consistent naming:

- **DynContainer**: `.dyn-container`, `.dyn-container--bordered`, etc.
- **DynDivider**: `.dyn-divider`, `.dyn-divider--horizontal`, etc.
- **DynGrid**: `.dyn-grid`, `.dyn-grid-table`, `.dyn-grid-cell`, etc.
- **DynPage**: `.dyn-page`, `.dyn-page-header`, `.dyn-page-content`, etc.

### CSS Custom Properties
Components leverage CSS custom properties for theming:

```css
:root {
  /* Layout color tokens */
  --dyn-layout-border: #e2e8f0;
  --dyn-layout-bg-surface: #f8fafc;
  --dyn-layout-bg-card: #ffffff;
  --dyn-layout-text-primary: #1e293b;
  --dyn-layout-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
}
```

### Responsive Design
All components include responsive breakpoints:

```css
@media (max-width: 768px) {
  .dyn-page-title-section {
    flex-direction: column;
  }
  
  .dyn-grid-wrapper {
    overflow-x: scroll;
  }
}
```

## ♿ Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1, h2, h3)
- Semantic landmarks (header, main, nav)
- ARIA labels and descriptions
- Focus management

### Keyboard Navigation
- Tab order compliance
- Enter/Space key handlers
- Arrow key navigation (where applicable)
- Escape key support

### Screen Reader Support
- ARIA roles and states
- Alternative text for icons
- Status announcements
- Table headers association

### High Contrast & Motion
```css
@media (prefers-contrast: high) {
  .dyn-container--bordered {
    border-width: 2px;
    border-color: currentColor;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dyn-container,
  .dyn-grid-row {
    transition: none;
  }
}
```

## 🧪 Testing

### Unit Tests
Each component includes comprehensive Jest tests:
- Rendering with props
- User interactions
- Accessibility compliance
- State management
- Error boundaries

### Storybook Stories
Interactive documentation with:
- Basic usage examples
- All prop combinations
- Edge cases and states
- Accessibility testing
- Visual regression testing

### Test Coverage
Target 90%+ code coverage for:
- Component rendering
- Event handlers
- Prop validation
- Error states
- Accessibility features

## 🚀 Performance Considerations

### Optimization Strategies
- **Memoization**: React.memo for pure components
- **Lazy Loading**: Code splitting for large components
- **Virtual Scrolling**: For large datasets in DynGrid
- **CSS-in-CSS**: Minimal runtime overhead
- **Tree Shaking**: Modular exports

### Bundle Size
- Individual component imports
- CSS imports only when needed
- Minimal external dependencies
- Efficient TypeScript compilation

## 🔄 Usage Patterns

### Page Layout Pattern
```tsx
<DynPage title="Dashboard" breadcrumbs={breadcrumbs} actions={actions}>
  <DynContainer spacing="lg" direction="vertical">
    <DynGrid columns={columns} data={data} />
    <DynDivider label="Statistics" />
    <StatsSection />
  </DynContainer>
</DynPage>
```

### Data Display Pattern
```tsx
<DynContainer bordered shadow background="card">
  <DynGrid
    columns={columns}
    data={data}
    selectable="multiple"
    pagination={{ current: 1, pageSize: 20, total: 100 }}
  />
</DynContainer>
```

### Form Layout Pattern
```tsx
<DynPage title="Edit User">
  <DynContainer title="Personal Information" bordered>
    <FormFields />
    <DynDivider />
    <ActionButtons />
  </DynContainer>
</DynPage>
```

## 📚 Next Steps

With SCOPE 7 complete, the next phase would be:
- **SCOPE 8**: Data Display Components (Charts, TreeView, Advanced Tables)
- **SCOPE 9**: Navigation Components (Menus, Tabs, Breadcrumbs)
- **SCOPE 10**: Feedback Components (Modals, Toasts, Alerts)

---

**Ready for Production**: All Layout Components are fully implemented, tested, and documented for enterprise use.