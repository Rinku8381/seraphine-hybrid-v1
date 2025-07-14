import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App onComplete={function (): void {
      throw new Error('Function not implemented.');
    } } />
  </React.StrictMode>
);
