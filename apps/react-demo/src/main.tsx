import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { DynButton, ThemeProvider } from 'dyn-ui-react'
import './dyn-ui-styles.css'
import './index.css'

const App = () => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="demo-container">
        <h1 style={{ marginBottom: '2rem', color: 'var(--color-text-primary)' }}>Dyn UI Demo - Stilovi Uključeni ✅</h1>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* Button Kinds */}
          <section className="demo-section">
            <h2>Button Kinds</h2>
            <div className="demo-buttons">
              <DynButton kind="primary" label="Primary" />
              <DynButton kind="secondary" label="Secondary" />
              <DynButton kind="tertiary" label="Tertiary" />
            </div>
          </section>
          
          {/* Button Sizes */}
          <section className="demo-section">
            <h2>Button Sizes</h2>
            <div className="demo-buttons">
              <DynButton kind="primary" label="Small" size="small" />
              <DynButton kind="primary" label="Medium" size="medium" />
              <DynButton kind="primary" label="Large" size="large" />
            </div>
          </section>
          
          {/* Danger States */}
          <section className="demo-section">
            <h2>Danger States</h2>
            <div className="demo-buttons">
              <DynButton kind="primary" label="Delete" danger />
              <DynButton kind="secondary" label="Remove" danger />
              <DynButton kind="tertiary" label="Cancel" danger />
            </div>
          </section>
          
          {/* Loading States */}
          <section className="demo-section">
            <h2>Loading States</h2>
            <div className="demo-buttons">
              <DynButton 
                kind="primary" 
                label={loading ? "Saving..." : "Click to Test Loading"} 
                loading={loading}
                onClick={handleClick}
              />
              <DynButton kind="secondary" label="Loading..." loading={true} />
            </div>
          </section>
          
          {/* Disabled States */}
          <section className="demo-section">
            <h2>Disabled States</h2>
            <div className="demo-buttons">
              <DynButton kind="primary" label="Disabled" disabled />
              <DynButton kind="secondary" label="Disabled" disabled />
              <DynButton kind="tertiary" label="Disabled" disabled />
            </div>
          </section>
          
          {/* Icons */}
          <section className="demo-section">
            <h2>With Icons</h2>
            <div className="demo-buttons">
              <DynButton kind="primary" icon="download" label="Download" />
              <DynButton kind="secondary" icon="settings" label="Settings" />
              <DynButton kind="tertiary" icon="help" ariaLabel="Help" />
            </div>
          </section>
          
          {/* Interactive Test */}
          <section className="demo-section">
            <h2>Interactive Test</h2>
            <div className="demo-buttons">
              <DynButton 
                kind="primary" 
                label="Click Me!" 
                onClick={() => alert('DynButton clicked!')}
              />
              <DynButton 
                kind="secondary" 
                label="Hover Test" 
                onBlur={() => console.log('Button blurred')}
              />
            </div>
          </section>
        </div>
        
        <div className="demo-info">
          <p>
            ✅ <strong>STILOVI REŠENI:</strong> DynButton komponente sada koriste kompletne CSS stilove.<br/>
            📋 <strong>Interface:</strong> kind, size, label, loading, danger, icon, ARIA support<br/>
            🎨 <strong>Theme System:</strong> CSS custom properties automatski primenjene<br/>
            🔧 <strong>Fix Applied:</strong> Kreiran konsolidovani CSS fajl sa svim potrebnim stilovima
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)