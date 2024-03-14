// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import PatientsDashboard from './pages/PatientsDashboard';

function App() {
  return (
    <>
      <Router>
        <div className="w-full h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/by_patient/:patient_id" element={<PatientsDashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
