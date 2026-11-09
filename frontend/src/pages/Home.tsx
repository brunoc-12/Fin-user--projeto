import { useNavigate } from 'react-router-dom';
import CardAtalho from '../Componentes/CardAtalho';
import './Home.css';

const atalhos = [
  { titulo: 'Renda', descricao: 'Registre e acompanhe tudo o que entra.', rota: '/renda', icone: '💰' },
  { titulo: 'Despesa', descricao: 'Controle seus gastos por categoria.', rota: '/despesa', icone: '💳' },
  { titulo: 'Investimentos', descricao: 'Veja pra onde seu dinheiro está rendendo.', rota: '/investimentos', icone: '📈' },
];

export default function Home() {
  const navigate = useNavigate();
  const salvo = localStorage.getItem('usuario');
  const nome = salvo ? JSON.parse(salvo).nome.trim() : 'visitante';

  function sair() {
    localStorage.removeItem('usuario');
    navigate('/');
  }

  return (
    <div className="home">
      <header className="home-topo">
        <span className="home-marca">Fin User</span>
        <button className="home-sair" onClick={sair}>Sair</button>
      </header>

      <section className="home-hero">
        <p className="home-selo">Controle financeiro pessoal</p>
        <h1>Olá, {nome}! <span>Seu dinheiro, no seu controle.</span></h1>
        <p className="home-sub">
          Acompanhe rendas, despesas e investimentos em um só lugar.
        </p>
      </section>

      <section className="home-cards">
        {atalhos.map((a) => (
          <CardAtalho key={a.rota} {...a} />
        ))}
      </section>

      <footer className="home-rodape">Fin User · Projeto FIAP</footer>
    </div>
  );
}