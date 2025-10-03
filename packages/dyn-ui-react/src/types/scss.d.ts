/**
 * TypeScript definitions for SCSS modules
 * Enables proper typing for SCSS module imports
 */

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}