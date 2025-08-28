import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './containers/App'
// import App from './App.tsx'
import './css/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
