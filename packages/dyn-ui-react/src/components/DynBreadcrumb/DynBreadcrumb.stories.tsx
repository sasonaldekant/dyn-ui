/**
 * DynBreadcrumb Storybook Stories
 * Interactive examples for breadcrumb navigation component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { DynBreadcrumb } from './DynBreadcrumb';
import { BreadcrumbItem } from './DynBreadcrumb.types';
import React from 'react';

const meta: Meta<typeof DynBreadcrumb> = {
  title: 'Navigation/DynBreadcrumb',
  component: DynBreadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The DynBreadcrumb component provides navigation path indication with:

- **Path Navigation** - Shows the current page location within the site hierarchy
- **Clickable Links** - Each breadcrumb item can be a clickable link or action
- **Overflow Handling** - Automatically handles long breadcrumb chains with ellipsis
- **Favorites Support** - Optional favorite button for bookmarking current path
- **Custom Separators** - Configurable separator icons or elements
- **Responsive Design** - Adapts to mobile devices with scrollable breadcrumbs
- **Accessibility** - Full keyboard navigation and screen reader support

## Usage

\`\`\`tsx
import { DynBreadcrumb } from '@dyn-ui/react';

const breadcrumbItems = [
  { label: 'Home', link: '/' },
  { label: 'Products', link: '/products' },
  { label: 'Electronics', link: '/products/electronics' },
  { label: 'Laptops' }
];

<DynBreadcrumb items={breadcrumbItems} />
\`\`\`
        `
      }
    }
  },
  argTypes: {
    items: {
      description: 'Array of breadcrumb items representing the navigation path',
      control: { type: 'object' }
    },
    favorite: {
      description: 'Whether the current path is favorited',
      control: { type: 'boolean' }
    },
    favoriteService: {
      description: 'API endpoint for updating favorite status',
      control: { type: 'text' }
    },
    maxItems: {
      description: 'Maximum number of items to show before truncating',
      control: { type: 'number' }
    },
    separator: {
      description: 'Custom separator icon or element between items',
      control: { type: 'text' }
    },
    onFavorite: {
      description: 'Callback fired when favorite status changes',
      action: 'favoriteToggled'
    },
    onItemClick: {
      description: 'Callback fired when breadcrumb item is clicked',
      action: 'itemClicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynBreadcrumb>;

// Sample breadcrumb data
const basicItems: BreadcrumbItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Products', link: '/products' },
  { label: 'Laptops' }
];

const longItems: BreadcrumbItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Categories', link: '/categories' },
  { label: 'Electronics', link: '/categories/electronics' },
  { label: 'Computers', link: '/categories/electronics/computers' },
  { label: 'Laptops', link: '/categories/electronics/computers/laptops' },
  { label: 'Gaming Laptops', link: '/categories/electronics/computers/laptops/gaming' },
  { label: 'High Performance', link: '/categories/electronics/computers/laptops/gaming/high-performance' },
  { label: 'ASUS ROG Series' }
];

const actionItems: BreadcrumbItem[] = [
  { label: 'Dashboard', action: () => console.log('Navigate to Dashboard') },
  { label: 'User Management', action: () => console.log('Navigate to User Management') },
  { label: 'User Profile', action: () => console.log('Navigate to User Profile') },
  { label: 'Edit Profile' }
];

const mixedItems: BreadcrumbItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Search Results', action: () => console.log('Back to search') },
  { label: 'Product Details' }
];

export const Default: Story = {
  args: {
    items: basicItems
  }
};

export const WithFavorites: Story = {
  args: {
    items: basicItems,
    favorite: false
  }
};

export const FavoritedPath: Story = {
  args: {
    items: basicItems,
    favorite: true
  }
};

export const LongBreadcrumb: Story = {
  args: {
    items: longItems,
    maxItems: 4
  }
};

export const LongBreadcrumbWithFavorites: Story = {
  args: {
    items: longItems,
    maxItems: 5,
    favorite: false
  }
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: 'dyn-icon-chevron-right'
  }
};

export const CustomElementSeparator: Story = {
  args: {
    items: basicItems,
    separator: <span style={{ color: '#666', fontSize: '12px' }}>/</span>
  }
};

export const WithActions: Story = {
  args: {
    items: actionItems,
    favorite: false
  }
};

export const MixedNavigation: Story = {
  args: {
    items: mixedItems,
    separator: 'dyn-icon-arrow-right'
  }
};

export const MaxItems3: Story = {
  args: {
    items: longItems,
    maxItems: 3,
    favorite: true
  }
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Current Page' }],
    favorite: false
  }
};

export const EmptyBreadcrumb: Story = {
  args: {
    items: [],
    favorite: true
  }
};

export const InteractiveExample: Story = {
  args: {
    items: [
      { 
        label: 'Home', 
        action: () => {
          console.log('Navigating to Home');
          alert('Would navigate to Home page');
        }
      },
      { 
        label: 'Products', 
        action: () => {
          console.log('Navigating to Products');
          alert('Would navigate to Products page');
        }
      },
      { 
        label: 'Electronics', 
        action: () => {
          console.log('Navigating to Electronics');
          alert('Would navigate to Electronics page');
        }
      },
      { label: 'Current Item' }
    ],
    favorite: false,
    maxItems: 4
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on any breadcrumb item to see the action in practice. Try clicking the favorite star as well!'
      }
    }
  }
};

export const ResponsiveTest: Story = {
  args: {
    items: [
      { label: 'Very Long Category Name That Should Truncate', link: '/category' },
      { label: 'Another Long Subcategory Name', link: '/category/subcategory' },
      { label: 'Even Longer Product Name That Definitely Needs Truncation', link: '/category/subcategory/product' },
      { label: 'Current Very Long Page Title' }
    ],
    favorite: true,
    maxItems: 6
  },
  parameters: {
    docs: {
      description: {
        story: 'Test responsive behavior by resizing the browser window. Long text will truncate with ellipsis.'
      }
    }
  }
};

export const APIIntegration: Story = {
  args: {
    items: basicItems,
    favorite: false,
    favoriteService: '/api/favorites/toggle'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with API integration. In a real app, clicking the favorite button would call the specified endpoint.'
      }
    }
  }
};