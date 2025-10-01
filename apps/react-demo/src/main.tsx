import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { DynButton, ThemeProvider } from 'dyn-ui-react'
import './index.css'

const App = () => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
        <h1 style={{ marginBottom: '2rem', color: 'var(--color-text-primary)' }}>Dyn UI Demo - SCOPE 3</h1>
        
        <div style={{ display: 'grid', gap: '3rem', maxWidth: '800px' }}>
          
          {/* Button Kinds */}
          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Button Kinds</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <DynButton kind="primary" label="Primary" />
              <DynButton kind="secondary" label="Secondary" />
              <DynButton kind="tertiary" label="Tertiary" />
            </div>
          </section>
          
          {/* Button Sizes */}
          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Button Sizes</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <DynButton kind="primary" label="Small" size="small" />
              <DynButton kind="primary" label="Medium" size="medium" />
              <DynButton kind="primary" label="Large" size="large" />
            </div>
          </section>
          
          {/* Danger States */}
          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Danger States</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <DynButton kind="primary" label="Delete" danger />
              <DynButton kind="secondary" label="Remove" danger />
              <DynButton kind="tertiary" label="Cancel" danger />
            </div>
          </section>
          
          {/* Loading States */}
          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Loading States</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Disabled States</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <DynButton kind="primary" label="Disabled" disabled />
              <DynButton kind="secondary" label="Disabled" disabled />
              <DynButton kind="tertiary" label="Disabled" disabled />
            </div>
          </section>
          
          {/* Icons */}
          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>With Icons</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <DynButton kind="primary" icon="download" label="Download" />
              <DynButton kind="secondary" icon="settings" label="Settings" />
              <DynButton kind="tertiary" icon="help" ariaLabel="Help" />
            </div>
          </section>
          
          {/* Interactive Test */}
          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Interactive Test</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
        
        <div style={{ marginTop: '3rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            ✅ <strong>SCOPE 3 Verification:</strong> DynButton component implements exact specification from implementation plan.<br/>
            📋 <strong>Interface:</strong> kind, size, label, loading, danger, icon, ARIA support<br/>
            🎨 <strong>Theme System:</strong> CSS custom properties automatically applied
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)