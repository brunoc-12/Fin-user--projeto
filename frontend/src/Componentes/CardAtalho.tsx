import { Link } from 'react-router-dom';

type Props = {
  titulo: string;
  descricao: string;
  rota: string;
  icone: string;
};

export default function CardAtalho({ titulo, descricao, rota, icone }: Props) {
  return (
    <Link to={rota} className="card-atalho">
      <span className="card-icone">{icone}</span>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <span className="card-seta">Acessar →</span>
    </Link>
  );
}