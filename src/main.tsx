import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CheckFormat from './components/CheckFormat.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CheckFormat>
        <App />
      </CheckFormat>
    </BrowserRouter>
  </StrictMode>
);
