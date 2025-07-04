import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Page/Login';
import Report from './Page/Report';
import ReportTable from './Component/ReportTable';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Report/>
  </React.StrictMode>
);