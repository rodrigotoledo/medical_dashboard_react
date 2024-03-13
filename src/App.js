// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import PatientsDashboard from './components/PatientsDashboard';
import { AppointmentsProvider } from './context/AppointmentsContext';
import { PatientsProvider } from './context/PatientsContext';


function App() {
  return (
    <PatientsProvider>
      <AppointmentsProvider>
        <Router>
          <div className="w-full h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/by_patient/:client_id" element={<PatientsDashboard />} />
            </Routes>
          </div>
        </Router>
      </AppointmentsProvider>
     </PatientsProvider>
  );
}

export default App;
