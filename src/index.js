import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import FireStorage from './components/FireStorage';
import FireStore from './components/FireStore';
import OnAuthStateChange from './components/OnAuthStateChange';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OnAuthStateChange/>
  </React.StrictMode>
);

