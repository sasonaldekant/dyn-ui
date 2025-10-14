import fs from 'node:fs/promises';

const typeDefinitions = `/* Auto-generated from design tokens */

// Size scale aligned with design tokens
export type DynSpacingScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Component size types derived from spacing scale
export type DynComponentSize = DynSpacingScale;

// Spacing token mapping for avatar sizes
export const DYN_SPACING_TOKENS = {
  xs: 'var(--dyn-spacing-2xl, 2rem)',    // 32px
  sm: 'var(--dyn-spacing-3xl, 3rem)',    // 48px
  md: '4rem',                             // 64px
  lg: '5rem',                             // 80px
  xl: '6rem'                              // 96px
} as const;

// Status types
export type DynStatusType = 'online' | 'offline' | 'away' | 'busy';

// Shape types
export type DynShapeType = 'circle' | 'square' | 'rounded';
`;

try {
  await fs.writeFile('./src/generated.d.ts', typeDefinitions, 'utf8');
  console.log('✅ TypeScript tipovi generisani');
} catch (error) {
  console.error('❌ Greška:', error.message);
  process.exit(1);
}
