import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Page/Login';
import Report from './Page/Report';
import ReportTable from './Component/ReportTable';
import Router from './router/Router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>
);