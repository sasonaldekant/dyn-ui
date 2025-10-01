/**
 * TypeScript definitions for SCSS modules
 * Enables proper typing for SCSS module imports
 */

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: string;
  export default content;
}