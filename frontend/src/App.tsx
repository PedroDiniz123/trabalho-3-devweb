import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AlunosPage from './pages/AlunosPage';
import TurmasPage from './pages/TurmasPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/alunos" replace />} />
          <Route path="/alunos" element={<AlunosPage />} />
          <Route path="/turmas" element={<TurmasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
