// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import DashboardClient from './components/DashboardClient';

function App() {
  return (
    <Router>
        <div className="w-full h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/by_client" element={<DashboardClient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
