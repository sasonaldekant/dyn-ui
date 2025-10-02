#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ImplementationChecker {
    constructor() {
        this.results = [];
        this.errors = [];
        this.warnings = [];
    }

    log(status, message, details = '') {
        const symbols = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        console.log(`${symbols[status]} ${message}`);
        if (details) {
            console.log(`   ${details}`);
        }

        this.results.push({ status, message, details });
    }

    async checkFileExists(filePath, description) {
        try {
            const fullPath = path.resolve(filePath);
            if (fs.existsSync(fullPath)) {
                this.log('success', `${description} postoji`, fullPath);
                return true;
            } else {
                this.log('error', `${description} ne postoji`, fullPath);
                return false;
            }
        } catch (error) {
            this.log('error', `Greška pri proveri ${description}`, error.message);
            return false;
        }
    }

    async checkDirectoryContents(dirPath, description, expectedFiles = []) {
        try {
            if (!fs.existsSync(dirPath)) {
                this.log('error', `Folder ${description} ne postoji`, dirPath);
                return false;
            }

            const files = fs.readdirSync(dirPath);
            this.log('info', `${description} sadrži ${files.length} fajlova`, files.join(', '));

            if (expectedFiles.length > 0) {
                const missing = expectedFiles.filter(file => !files.includes(file));
                if (missing.length === 0) {
                    this.log('success', `Svi očekivani fajlovi pronađeni u ${description}`);
                } else {
                    this.log('warning', `Nedostaju fajlovi u ${description}`, missing.join(', '));
                }
            }

            return true;
        } catch (error) {
            this.log('error', `Greška pri proveri folder ${description}`, error.message);
            return false;
        }
    }

    async checkDesignTokens() {
        console.log('\n🎨 PROVERA DESIGN TOKENA\n');

        // Proveri postojanje color token fajlova
        const colorTokenFiles = [
            './packages/design-tokens/tokens/color/action.json',
            './packages/design-tokens/tokens/color/neutral.json',
            './packages/design-tokens/tokens/color/feedback.json',
            './packages/design-tokens/tokens/color/base.json'
        ];

        let allColorTokensExist = true;
        for (const tokenFile of colorTokenFiles) {
            const exists = await this.checkFileExists(tokenFile, `Color token (${path.basename(tokenFile)})`);
            if (!exists) allColorTokensExist = false;
        }

        // Proveri size tokene
        const sizeTokenFiles = [
            './packages/design-tokens/tokens/size/spacing.json',
            './packages/design-tokens/tokens/size/font.json',
            './packages/design-tokens/tokens/size/border.json'
        ];

        for (const tokenFile of sizeTokenFiles) {
            await this.checkFileExists(tokenFile, `Size token (${path.basename(tokenFile)})`);
        }

        // Proveri animation tokene
        await this.checkFileExists('./packages/design-tokens/tokens/animation/transition.json', 'Animation tokens');

        // Proveri Style Dictionary konfiguraciju
        await this.checkFileExists('./packages/design-tokens/style-dictionary.config.js', 'Style Dictionary config');

        return allColorTokensExist;
    }

    async checkBuildProcess() {
        console.log('\n⚙️ PROVERA BUILD PROCESA\n');

        const originalCwd = process.cwd();
        
        try {
            const designTokensPath = './packages/design-tokens';
            if (!fs.existsSync(designTokensPath)) {
                this.log('error', 'Design tokens folder ne postoji');
                return false;
            }

            process.chdir(designTokensPath);
            this.log('info', 'Pokušavam build design tokena...');
            
            try {
                // Proveri da li package.json ima build script
                const packagePath = './package.json';
                if (fs.existsSync(packagePath)) {
                    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                    if (pkg.scripts && pkg.scripts.build) {
                        this.log('success', 'Build script postoji u design-tokens package.json');
                        
                        // Pokušaj build
                        execSync('npm run build', { stdio: 'pipe' });
                        this.log('success', 'Design token build uspešan');
                    } else {
                        this.log('error', 'Build script ne postoji u design-tokens package.json');
                        return false;
                    }
                } else {
                    this.log('error', 'package.json ne postoji u design-tokens folderu');
                    return false;
                }

                // Proveri generirane fajlove
                const buildDir = './build';
                if (fs.existsSync(buildDir)) {
                    await this.checkDirectoryContents(buildDir, 'Build folder');
                    
                    // Proveri CSS fajl
                    const cssFile = './build/css/tokens.css';
                    if (fs.existsSync(cssFile)) {
                        const cssContent = fs.readFileSync(cssFile, 'utf8');
                        
                        // Proveri da li CSS sadrži kritične varijable
                        const criticalVars = [
                            '--color-action-default',
                            '--color-neutral-light-00',
                            '--size-spacing-sm'
                        ];

                        for (const cssVar of criticalVars) {
                            if (cssContent.includes(cssVar)) {
                                this.log('success', `CSS varijabla ${cssVar} postoji`);
                            } else {
                                this.log('error', `CSS varijabla ${cssVar} ne postoji`);
                            }
                        }

                        // Proveri format
                        if (cssContent.includes(':root')) {
                            this.log('success', 'CSS koristi :root selector');
                        } else {
                            this.log('error', 'CSS ne koristi :root selector');
                        }
                    } else {
                        this.log('error', 'Generirani CSS fajl ne postoji');
                    }
                } else {
                    this.log('error', 'Build folder ne postoji nakon build procesa');
                }

                return true;
            } catch (buildError) {
                this.log('error', 'Design token build neuspešan', buildError.message);
                return false;
            }
        } catch (error) {
            this.log('error', 'Greška pri build procesu', error.message);
            return false;
        } finally {
            process.chdir(originalCwd);
        }
    }

    async checkComponents() {
        console.log('\n🧩 PROVERA KOMPONENTI\n');

        // Proveri DynButton komponentu
        const buttonPaths = [
            './packages/dyn-ui-react/src/components/DynButton/DynButton.tsx',
            './packages/dyn-ui-react/src/components/DynButton/DynButton.module.scss'
        ];

        for (const buttonPath of buttonPaths) {
            await this.checkFileExists(buttonPath, `DynButton (${path.basename(buttonPath)})`);
        }

        // Analiziraj SCSS fajl
        const buttonStyles = './packages/dyn-ui-react/src/components/DynButton/DynButton.module.scss';
        if (fs.existsSync(buttonStyles)) {
            try {
                const scssContent = fs.readFileSync(buttonStyles, 'utf8');
                
                // Proveri da li koristi CSS varijable
                const cssVarPattern = /var\(--[\w-]+\)/g;
                const cssVars = scssContent.match(cssVarPattern);
                
                if (cssVars && cssVars.length > 0) {
                    this.log('success', `SCSS koristi ${cssVars.length} CSS varijabli`);
                    
                    // Proveri problematične varijable
                    const problematicVars = [
                        'var(--color-primary)',
                        'var(--radius-md)',
                        'var(--spacing-sm)',
                        'var(--transition-all)'
                    ];

                    for (const problemVar of problematicVars) {
                        if (scssContent.includes(problemVar)) {
                            this.log('error', `Koristi neispravnu varijablu: ${problemVar}`);
                        }
                    }

                    // Proveri da li koristi ispravne varijable
                    const correctVars = [
                        'var(--color-action-default)',
                        'var(--size-spacing-sm)',
                        'var(--animation-transition-all)'
                    ];

                    for (const correctVar of correctVars) {
                        if (scssContent.includes(correctVar)) {
                            this.log('success', `Koristi ispravnu varijablu: ${correctVar}`);
                        } else {
                            this.log('warning', `Ne koristi preporučenu varijablu: ${correctVar}`);
                        }
                    }
                } else {
                    this.log('error', 'SCSS ne koristi CSS varijable (var())');
                }

                // Proveri da li postoje hardkodovane vrednosti
                const hardcodedColors = /#[0-9a-fA-F]{3,6}/g;
                const colors = scssContent.match(hardcodedColors);
                
                if (colors && colors.length > 2) { // Dozvoljavamo par hardkodovanih boja
                    this.log('warning', 'Pronađeno više hardkodovanih boja', colors.join(', '));
                }
            } catch (error) {
                this.log('error', 'Greška pri analizi SCSS fajla', error.message);
            }
        }
    }

    async checkIntegration() {
        console.log('\n🔗 PROVERA INTEGRACIJE\n');

        // Proveri da li postoji globalni import design tokena
        const possibleImportFiles = [
            './.storybook/preview-head.html',
            './packages/dyn-ui-react/src/styles/globals.scss',
            './packages/dyn-ui-react/src/index.scss'
        ];

        let integrationFound = false;
        for (const importFile of possibleImportFiles) {
            if (fs.existsSync(importFile)) {
                const content = fs.readFileSync(importFile, 'utf8');
                if (content.includes('tokens.css') || content.includes('design-tokens')) {
                    this.log('success', `Design tokeni integrisani u ${importFile}`);
                    integrationFound = true;
                } else {
                    this.log('info', `Proverio ${importFile} - nema import design tokena`);
                }
            }
        }

        if (!integrationFound) {
            this.log('error', 'Design tokeni nisu integrisani ni u jedan globalni fajl');
        }
    }

    async generateReport() {
        console.log('\n📊 FINALNI IZVEŠAJ\n');

        const successful = this.results.filter(r => r.status === 'success').length;
        const errors = this.results.filter(r => r.status === 'error').length;
        const warnings = this.results.filter(r => r.status === 'warning').length;

        console.log(`✅ Uspešno: ${successful}`);
        console.log(`❌ Greške: ${errors}`);
        console.log(`⚠️  Upozorenja: ${warnings}`);
        console.log(`ℹ️  Ukupno provereno: ${this.results.length}`);

        if (errors === 0) {
            console.log('\n🎉 SVI KRITIČNI TESTOVI SU PROŠLI!');
            console.log('Faza 4 implementacije je uspešno završena.');
        } else {
            console.log('\n🚨 PRONAĐENE SU KRITIČNE GREŠKE!');
            console.log('Potrebno je rešiti probleme pre završetka Faze 4.');
            
            // Prikaži greške
            console.log('\nKRITIČNE GREŠKE:');
            this.results.filter(r => r.status === 'error').forEach(error => {
                console.log(`❌ ${error.message}`);
                if (error.details) console.log(`   ${error.details}`);
            });
        }

        // Sačuvaj detaljan izvešaj
        const reportData = {
            timestamp: new Date().toISOString(),
            summary: { successful, errors, warnings, total: this.results.length },
            results: this.results
        };

        fs.writeFileSync('./implementation-report.json', JSON.stringify(reportData, null, 2));
        this.log('info', 'Detaljan izvešaj sačuvan u implementation-report.json');
    }

    async runAllChecks() {
        console.log('🔍 AUTOMATSKA PROVERA IMPLEMENTACIJE FAZE 4\n');
        console.log('Proverava design tokene, build proces, komponente i integraciju...\n');

        await this.checkDesignTokens();
        await this.checkBuildProcess();
        await this.checkComponents();
        await this.checkIntegration();
        await this.generateReport();
    }
}

// Pokreni proveru
if (require.main === module) {
    const checker = new ImplementationChecker();
    checker.runAllChecks().catch(console.error);
}

module.exports = ImplementationChecker;