import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

createRoot(document.getElementById('__app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);