import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import './styles.css';
import { AuthProvider, GameProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </AuthProvider>
)