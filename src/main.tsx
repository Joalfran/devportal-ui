import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import DemoDayView from './components/DemoDayView.tsx';
import './index.css';

// Ruta aislada para la presentación del Demo Day; no toca el flujo principal.
const isDemoDay = window.location.pathname.replace(/\/+$/, '') === '/demo-day';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDemoDay ? <DemoDayView /> : <App />}
  </StrictMode>,
);
