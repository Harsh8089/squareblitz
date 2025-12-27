import ReactDOM from 'react-dom/client';
import { App } from './App';
import React from 'react';

import { AuthProvider, GameProvider } from './contexts';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </AuthProvider>,
);
