import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/lite/bundle';
import Framework7React from 'framework7-react';
import 'framework7/css/bundle';
import App from './App';
import './index.css';  // Importa el CSS personalizado

// Init F7 React Plugin
Framework7.use(Framework7React);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
