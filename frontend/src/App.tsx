import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Renda from './pages/Renda';
import Despesa from './pages/Despesa';
import Investimentos from './pages/Investimentos';
import Erro from './pages/Erro';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/renda" element={<Renda />} />
        <Route path="/despesa" element={<Despesa />} />
        <Route path="/investimentos" element={<Investimentos />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}