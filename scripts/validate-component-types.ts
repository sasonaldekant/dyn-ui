/**
 * Script to validate that all DYN UI components follow type standards
 * Checks for BaseComponentProps usage, naming conventions, and export patterns
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ValidationResult {
  component: string;
  issues: string[];
  status: 'pass' | 'fail';
}

class ComponentTypeValidator {
  private componentsDir = 'packages/dyn-ui-react/src/components';
  private typesDir = 'packages/dyn-ui-react/src/types';
  private results: ValidationResult[] = [];

  async validate(): Promise<void> {
    console.log('🔍 Validating DYN UI Component Types...');
    
    // Get all component directories
    const componentDirs = this.getComponentDirectories();
    
    for (const componentDir of componentDirs) {
      const result = this.validateComponent(componentDir);
      this.results.push(result);
    }
    
    this.printResults();
  }

  private getComponentDirectories(): string[] {
    const componentsPath = path.resolve(this.componentsDir);
    return fs.readdirSync(componentsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('Dyn'))
      .map(dirent => dirent.name);
  }

  private validateComponent(componentName: string): ValidationResult {
    const issues: string[] = [];
    const componentPath = path.join(this.componentsDir, componentName);
    
    // Check 1: Component naming convention
    if (!componentName.startsWith('Dyn')) {
      issues.push('Component name must start with "Dyn" prefix');
    }
    
    // Check 2: Required files exist
    const requiredFiles = [
      `${componentName}.tsx`,
      `${componentName}.types.ts`,
      'index.ts'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(componentPath, file);
      if (!fs.existsSync(filePath)) {
        issues.push(`Missing required file: ${file}`);
      }
    }
    
    // Check 3: Types file extends BaseComponentProps
    const typesFile = path.join(componentPath, `${componentName}.types.ts`);
    if (fs.existsSync(typesFile)) {
      const content = fs.readFileSync(typesFile, 'utf8');
      
      if (!content.includes('extends BaseComponentProps')) {
        issues.push('Props interface must extend BaseComponentProps');
      }
      
      if (!content.includes("import { BaseComponentProps } from '../../types';")) {
        issues.push('Must import BaseComponentProps from "../../types"');
      }
      
      // Check for duplicate base props
      const duplicateProps = ['className', 'children', 'id', 'data-testid'];
      for (const prop of duplicateProps) {
        if (content.includes(`${prop}?:`)) {
          issues.push(`Remove duplicate prop "${prop}" - inherited from BaseComponentProps`);
        }
      }
    }
    
    // Check 4: Proper exports in index.ts
    const indexFile = path.join(componentPath, 'index.ts');
    if (fs.existsSync(indexFile)) {
      const content = fs.readFileSync(indexFile, 'utf8');
      
      if (!content.includes(`export { ${componentName} }`)) {
        issues.push(`index.ts must export { ${componentName} }`);
      }
      
      if (!content.includes(`export type { ${componentName}Props }`)) {
        issues.push(`index.ts must export type { ${componentName}Props }`);
      }
    }
    
    // Check 5: Props interface naming
    if (fs.existsSync(typesFile)) {
      const content = fs.readFileSync(typesFile, 'utf8');
      const expectedInterface = `${componentName}Props`;
      
      if (!content.includes(`interface ${expectedInterface}`)) {
        issues.push(`Props interface must be named "${expectedInterface}"`);
      }
    }
    
    return {
      component: componentName,
      issues,
      status: issues.length === 0 ? 'pass' : 'fail'
    };
  }

  private printResults(): void {
    console.log('\n📊 Validation Results:');
    console.log('=' .repeat(50));
    
    let passCount = 0;
    let failCount = 0;
    
    for (const result of this.results) {
      const status = result.status === 'pass' ? '✅' : '❌';
      console.log(`${status} ${result.component}`);
      
      if (result.issues.length > 0) {
        result.issues.forEach(issue => {
          console.log(`   └─ ⚠️  ${issue}`);
        });
        failCount++;
      } else {
        passCount++;
      }
      console.log('');
    }
    
    console.log('=' .repeat(50));
    console.log(`📈 Summary: ${passCount} passed, ${failCount} failed`);
    
    if (failCount > 0) {
      console.log('\n🔧 To fix issues, follow the Component Type Standards guide.');
      process.exit(1);
    } else {
      console.log('\n🎉 All components follow type standards!');
    }
  }
}

// Run validation
const validator = new ComponentTypeValidator();
validator.validate().catch(console.error);