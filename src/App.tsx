import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisitasPage from './pages/VisitasPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisitasPage />} />
      </Routes>
    </Router>
  );
};

export default App;
