
import { useEffect, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Investimentos.css';

const API = 'http://localhost:8080/api/investimentos';

type Categoria =
  | 'RENDA_FIXA'
  | 'RENDA_VARIAVEL'
  | 'FUNDOS_IMOBILIARIOS'
  | 'CRIPTOMOEDAS'
  | 'PREVIDENCIA_PRIVADA';

type Objetivo =
  | 'FERIAS_E_VIAGENS'
  | 'PROJETOS_PESSOAIS'
  | 'EQUIPAMENTOS_DE_TRABALHO'
  | 'CURSOS_E_CERTIFICACOES'
  | 'COMPRA_DE_COMPUTADOR'
  | 'RESERVA_DE_EMERGENCIA';

interface Investimento {
  id: number;
  descricao: string;
  valor: number;
  dataInvestimento: string;
  investCategoria: Categoria;
  objetivoFinanceiro: Objetivo;
  usuario?: {
    id: number;
  };
  usuarioId?: number;
}

interface Formulario {
  descricao: string;
  valor: string;
  dataInvestimento: string;
  investCategoria: Categoria;
  objetivoFinanceiro: Objetivo;
}

const categorias: { value: Categoria; label: string }[] = [
  { value: 'RENDA_FIXA', label: 'Renda fixa' },
  { value: 'RENDA_VARIAVEL', label: 'Renda variável' },
  { value: 'FUNDOS_IMOBILIARIOS', label: 'Fundos imobiliários' },
  { value: 'CRIPTOMOEDAS', label: 'Criptomoedas' },
  { value: 'PREVIDENCIA_PRIVADA', label: 'Previdência privada' },
];

const objetivos: { value: Objetivo; label: string }[] = [
  { value: 'FERIAS_E_VIAGENS', label: 'Férias e viagens' },
  { value: 'PROJETOS_PESSOAIS', label: 'Projetos pessoais' },
  { value: 'EQUIPAMENTOS_DE_TRABALHO', label: 'Equipamentos de trabalho' },
  { value: 'CURSOS_E_CERTIFICACOES', label: 'Cursos e certificações' },
  { value: 'COMPRA_DE_COMPUTADOR', label: 'Compra de computador' },
  { value: 'RESERVA_DE_EMERGENCIA', label: 'Reserva de emergência' },
];

function dataAtual(): string {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

const formularioInicial: Formulario = {
  descricao: '',
  valor: '',
  dataInvestimento: dataAtual(),
  investCategoria: 'RENDA_FIXA',
  objetivoFinanceiro: 'RESERVA_DE_EMERGENCIA',
};

function moeda(valor: number): string {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function dataFormatada(data: string): string {
  if (!data) return 'Data não informada';

  const [ano, mes, dia] = data.split('-');

  return `${dia}/${mes}/${ano}`;
}

export default function Investimentos() {
  const navigate = useNavigate();

  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [formulario, setFormulario] =
    useState<Formulario>(formularioInicial);

  const [editando, setEditando] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Recupera o usuário logado
  let usuario: { id?: number; nome?: string } | null = null;

  try {
    const salvo = localStorage.getItem('usuario');
    usuario = salvo ? JSON.parse(salvo) : null;
  } catch {
    usuario = null;
  }

  const usuarioId = Number(
    usuario?.id ?? localStorage.getItem('usuarioId')
  );

  // Carrega os investimentos
  async function carregarInvestimentos() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(API);

      if (!resposta.ok) {
        throw new Error(
          `Erro ao buscar investimentos: ${resposta.status}`
        );
      }

      const dados: Investimento[] = await resposta.json();

      const meusInvestimentos = dados.filter(
        (investimento) =>
          Number(
            investimento.usuario?.id ?? investimento.usuarioId
          ) === usuarioId
      );

      setInvestimentos(meusInvestimentos);
    } catch (error) {
      console.error('Erro ao carregar investimentos:', error);

      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao carregar investimentos.'
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!usuarioId) {
      navigate('/');
      return;
    }

    void carregarInvestimentos();
  }, [usuarioId, navigate]);

  // Atualiza os campos
  function atualizarCampo(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  // Limpa o formulário
  function limparFormulario() {
    setFormulario({
      ...formularioInicial,
      dataInvestimento: dataAtual(),
    });

    setEditando(null);
  }

  // Salva ou atualiza um investimento
  async function salvarInvestimento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro('');
    setSucesso('');

    if (
      !formulario.descricao.trim() ||
      Number(formulario.valor) <= 0 ||
      !formulario.dataInvestimento
    ) {
      setErro('Informe uma descrição, um valor e uma data válidos.');
      return;
    }

    if (!usuarioId) {
      setErro('Usuário não identificado. Faça login novamente.');
      return;
    }

    const payload = {
      descricao: formulario.descricao.trim(),
      valor: Number(formulario.valor),
      dataInvestimento: formulario.dataInvestimento,
      investCategoria: formulario.investCategoria,
      objetivoFinanceiro: formulario.objetivoFinanceiro,
      usuarioId: Number(usuarioId),
    };

    setSalvando(true);

    try {
      const resposta = await fetch(
        editando !== null ? `${API}/${editando}` : API,
        {
          method: editando !== null ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!resposta.ok) {
        const mensagem = await resposta.text();

        throw new Error(
          mensagem || 'Não foi possível salvar o investimento.'
        );
      }

      const estavaEditando = editando !== null;

      limparFormulario();

      setSucesso(
        estavaEditando
          ? 'Investimento atualizado com sucesso!'
          : 'Investimento cadastrado com sucesso!'
      );

      await carregarInvestimentos();
    } catch (error) {
      console.error('Erro ao salvar investimento:', error);

      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao salvar investimento.'
      );
    } finally {
      setSalvando(false);
    }
  }

  // Prepara edição
  function editarInvestimento(investimento: Investimento) {
    setEditando(investimento.id);

    setFormulario({
      descricao: investimento.descricao,
      valor: String(investimento.valor),
      dataInvestimento: investimento.dataInvestimento,
      investCategoria: investimento.investCategoria,
      objetivoFinanceiro: investimento.objetivoFinanceiro,
    });

    setErro('');
    setSucesso('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Exclui investimento
  async function excluirInvestimento(id: number) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este investimento?'
    );

    if (!confirmar) return;

    setErro('');
    setSucesso('');

    try {
      const resposta = await fetch(`${API}/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível excluir este investimento.'
        );
      }

      setSucesso('Investimento excluído com sucesso!');

      await carregarInvestimentos();
    } catch (error) {
      console.error('Erro ao excluir investimento:', error);

      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao excluir investimento.'
      );
    }
  }

  // Sai da conta
  function sair() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioId');
    navigate('/');
  }

  // Indicadores financeiros
  const totalInvestido = investimentos.reduce(
    (total, investimento) =>
      total + Number(investimento.valor || 0),
    0
  );

  const mediaInvestimentos =
    investimentos.length > 0
      ? totalInvestido / investimentos.length
      : 0;

  const investimentosOrdenados = [...investimentos].sort(
    (a, b) =>
      new Date(b.dataInvestimento).getTime() -
      new Date(a.dataInvestimento).getTime()
  );

  return (
    <main className="investimentos">

      {/* TOPO */}
      <header className="inv-topo">

        <div className="inv-marca">
          <button
            type="button"
            className="inv-voltar"
            onClick={() => navigate('/home')}
            aria-label="Voltar para Home"
          >
            ←
          </button>

          Fin User
        </div>

        <button
          type="button"
          className="inv-sair"
          onClick={sair}
        >
          Sair
        </button>

      </header>

      <section className="inv-conteudo">

        {/* INTRODUÇÃO */}
        <div className="inv-introducao">

          <span className="inv-selo">
            PLANEJAMENTO FINANCEIRO
          </span>

          <h1>Meus investimentos 📈</h1>

          <p>
            Acompanhe seu patrimônio, organize seus investimentos
            e construa seus objetivos financeiros.
          </p>

        </div>

        {/* RESUMOS */}
        <section className="inv-resumos">

          <article className="inv-resumo destaque">
            <span>Total investido</span>
            <h2>{moeda(totalInvestido)}</h2>
            <small>Somatório dos investimentos cadastrados</small>
          </article>

          <article className="inv-resumo">
            <span>Investimentos cadastrados</span>
            <h2>{investimentos.length}</h2>
            <small>Total de registros</small>
          </article>

          <article className="inv-resumo">
            <span>Média por investimento</span>
            <h2>{moeda(mediaInvestimentos)}</h2>
            <small>Valor médio dos registros</small>
          </article>

        </section>

        {/* FORMULÁRIO */}
        <section className="inv-formulario">

          <div className="inv-titulo-secao">
            <div>
              <h2>
                {editando !== null
                  ? 'Editar investimento'
                  : 'Novo investimento'}
              </h2>

              <p>
                Registre seus investimentos e mantenha seus objetivos organizados.
              </p>
            </div>
          </div>

          <form onSubmit={salvarInvestimento}>

            <div className="inv-campos">

              <label>
                Descrição

                <input
                  type="text"
                  name="descricao"
                  placeholder="Ex: Tesouro Selic"
                  value={formulario.descricao}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Valor investido (R$)

                <input
                  type="number"
                  name="valor"
                  placeholder="Ex: 500.00"
                  min="0.01"
                  step="0.01"
                  value={formulario.valor}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Data do investimento

                <input
                  type="date"
                  name="dataInvestimento"
                  value={formulario.dataInvestimento}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Categoria

                <select
                  name="investCategoria"
                  value={formulario.investCategoria}
                  onChange={atualizarCampo}
                >
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.value}
                      value={categoria.value}
                    >
                      {categoria.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="inv-campo-objetivo">
                Objetivo financeiro

                <select
                  name="objetivoFinanceiro"
                  value={formulario.objetivoFinanceiro}
                  onChange={atualizarCampo}
                >
                  {objetivos.map((objetivo) => (
                    <option
                      key={objetivo.value}
                      value={objetivo.value}
                    >
                      {objetivo.label}
                    </option>
                  ))}
                </select>
              </label>

            </div>

            {erro && (
              <p className="inv-mensagem erro">
                {erro}
              </p>
            )}

            {sucesso && (
              <p className="inv-mensagem sucesso">
                {sucesso}
              </p>
            )}

            <div className="inv-acoes-form">

              <button
                type="submit"
                className="inv-salvar"
                disabled={salvando}
              >
                {salvando
                  ? 'Salvando...'
                  : editando !== null
                    ? 'Atualizar investimento'
                    : '+ Cadastrar investimento'}
              </button>

              {editando !== null && (
                <button
                  type="button"
                  className="inv-cancelar"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>
              )}

            </div>

          </form>

        </section>

        {/* HISTÓRICO */}
        <section className="inv-historico">

          <div className="inv-titulo-secao">
            <div>
              <h2>Histórico de investimentos</h2>
              <p>Confira seus investimentos registrados.</p>
            </div>
          </div>

          {carregando ? (
            <p className="inv-vazio">
              Carregando seus investimentos...
            </p>
          ) : investimentosOrdenados.length === 0 ? (
            <div className="inv-vazio">
              <span>📈</span>
              <h3>Nenhum investimento cadastrado</h3>
              <p>Comece registrando seu primeiro investimento.</p>
            </div>
          ) : (

            <div className="inv-lista">

              {investimentosOrdenados.map((investimento) => (

                <article
                  className="inv-item"
                  key={investimento.id}
                >

                  <div className="inv-item-icone">
                    📊
                  </div>

                  <div className="inv-item-info">

                    <h3>{investimento.descricao}</h3>

                    <span>
                      {categorias.find(
                        (categoria) =>
                          categoria.value === investimento.investCategoria
                      )?.label ?? investimento.investCategoria}
                      {' · '}
                      {dataFormatada(investimento.dataInvestimento)}
                    </span>

                    <small>
                      Objetivo: {
                        objetivos.find(
                          (objetivo) =>
                            objetivo.value === investimento.objetivoFinanceiro
                        )?.label ?? investimento.objetivoFinanceiro
                      }
                    </small>

                  </div>

                  <strong className="inv-valor">
                    {moeda(investimento.valor)}
                  </strong>

                  <div className="inv-item-acoes">

                    <button
                      type="button"
                      onClick={() => editarInvestimento(investimento)}
                      title="Editar investimento"
                      aria-label="Editar investimento"
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() => excluirInvestimento(investimento.id)}
                      title="Excluir investimento"
                      aria-label="Excluir investimento"
                    >
                      🗑️
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </section>

      <footer className="inv-rodape">
        Fin User · Projeto FIAP
      </footer>

    </main>
  );
}
