import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisitasPage from './pages/VisitaList/VisitasPage';
import Header from './components/Header/Header';
import { CurrentUserInterface } from './models/interfaces/current-user.interface';
import { getCurrentUser } from './services/api';
import "./App.css"
import ConcluirVisitaPage from './pages/ConcluirVisitaPage/ConcluirVisitaPage';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserInterface>({
    name: '',
    avatarUrl: '',
    condoName: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentUser();
        setCurrentUser(data);
      } catch (error) {
        console.error("Erro ao buscar visitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header userName={currentUser.name} loading={loading} condoName={currentUser.condoName}></Header>
      <Router>
        <Routes>
          <Route path="/" element={<VisitasPage />} />
          <Route path="/concluir/:id" element={<ConcluirVisitaPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
