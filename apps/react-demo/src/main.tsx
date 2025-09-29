import React from 'react'
import ReactDOM from 'react-dom/client'
import { DynButton } from 'dyn-ui-react'
import './index.css'

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dyn UI Demo</h1>
      <DynButton />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
