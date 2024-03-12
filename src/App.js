// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import DashboardPatient from './components/DashboardPatient';

function App() {
  return (
    <Router>
      <div className="w-full h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/by_patient/:client_id" element={<DashboardPatient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
