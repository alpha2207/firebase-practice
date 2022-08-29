import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import FireStorage from './components/FireStorage';
import FireStore from './components/FireStore';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FireStore/>
  </React.StrictMode>
);

