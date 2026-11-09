
import { useEffect, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Despesa.css';

const API = 'http://localhost:8080/api/despesas';

type Categoria =
  | 'ALIMENTACAO'
  | 'MORADIA'
  | 'TRANSPORTE'
  | 'SAUDE'
  | 'EDUCACAO'
  | 'LAZER'
  | 'COMPRAS'
  | 'OUTROS';

interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  dataPagamento: string;
  categoria: Categoria;
  usuario?: {
    id: number;
  };
}

interface Formulario {
  descricao: string;
  valor: string;
  dataPagamento: string;
  categoria: Categoria;
}

const categorias: { value: Categoria; label: string }[] = [
  { value: 'ALIMENTACAO', label: 'Alimentação' },
  { value: 'MORADIA', label: 'Moradia' },
  { value: 'TRANSPORTE', label: 'Transporte' },
  { value: 'SAUDE', label: 'Saúde' },
  { value: 'EDUCACAO', label: 'Educação' },
  { value: 'LAZER', label: 'Lazer' },
  { value: 'COMPRAS', label: 'Compras' },
  { value: 'OUTROS', label: 'Outros' },
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
  dataPagamento: dataAtual(),
  categoria: 'OUTROS',
};

function moeda(valor: number): string {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function Despesa() {
  const navigate = useNavigate();

  const [despesas, setDespesas] = useState<Despesa[]>([]);
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

  const usuarioId = usuario?.id;

  // Carrega as despesas
  async function carregarDespesas() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(API);

      if (!resposta.ok) {
        throw new Error(`Erro ao buscar despesas: ${resposta.status}`);
      }

      const dados: Despesa[] = await resposta.json();

      const minhasDespesas = dados.filter(
        (despesa) =>
          Number(despesa.usuario?.id) === Number(usuarioId)
      );

      setDespesas(minhasDespesas);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao carregar despesas.'
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

    void carregarDespesas();
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
      dataPagamento: dataAtual(),
    });

    setEditando(null);
  }

  // Salva ou atualiza uma despesa
  async function salvarDespesa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro('');
    setSucesso('');

    if (
      !formulario.descricao.trim() ||
      Number(formulario.valor) <= 0
    ) {
      setErro('Informe uma descrição e um valor válido.');
      return;
    }

    const payload = {
      descricao: formulario.descricao.trim(),
      valor: Number(formulario.valor),
      dataPagamento: formulario.dataPagamento,
      categoria: formulario.categoria,
      usuario: {
        id: Number(usuarioId),
      },
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
        throw new Error(mensagem || 'Não foi possível salvar a despesa.');
      }

      limparFormulario();

      setSucesso(
        editando !== null
          ? 'Despesa atualizada com sucesso!'
          : 'Despesa cadastrada com sucesso!'
      );

      await carregarDespesas();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao salvar despesa.'
      );
    } finally {
      setSalvando(false);
    }
  }

  // Prepara edição
  function editarDespesa(despesa: Despesa) {
    setEditando(despesa.id);

    setFormulario({
      descricao: despesa.descricao,
      valor: String(despesa.valor),
      dataPagamento: despesa.dataPagamento,
      categoria: despesa.categoria,
    });

    setErro('');
    setSucesso('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Exclui despesa
  async function excluirDespesa(id: number) {
    const confirmar = window.confirm(
      'Deseja realmente excluir esta despesa?'
    );

    if (!confirmar) return;

    setErro('');
    setSucesso('');

    try {
      const resposta = await fetch(`${API}/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível excluir esta despesa.');
      }

      setSucesso('Despesa excluída com sucesso!');
      await carregarDespesas();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao excluir despesa.'
      );
    }
  }

  // Sai da conta
  function sair() {
    localStorage.removeItem('usuario');
    navigate('/');
  }

  // Indicadores financeiros
  const totalDespesas = despesas.reduce(
    (total, despesa) => total + Number(despesa.valor || 0),
    0
  );

  const mediaDespesas =
    despesas.length > 0
      ? totalDespesas / despesas.length
      : 0;

  

  const despesasOrdenadas = [...despesas].sort(
    (a, b) =>
      new Date(b.dataPagamento).getTime() -
      new Date(a.dataPagamento).getTime()
  );

  return (
    <main className="despesa">

      {/* TOPO */}
      <header className="despesa-topo">

        <div className="despesa-marca">
          <button
            type="button"
            className="despesa-voltar"
            onClick={() => navigate('/home')}
          >
            ←
          </button>

          Fin User
        </div>

        <button
          type="button"
          className="despesa-sair"
          onClick={sair}
        >
          Sair
        </button>

      </header>

      <section className="despesa-conteudo">

        {/* INTRODUÇÃO */}
        <div className="despesa-introducao">

          <span className="despesa-selo">
            CONTROLE FINANCEIRO
          </span>

          <h1>Minhas despesas 💸</h1>

          <p>
            Acompanhe seus gastos, organize seus pagamentos
            e tenha mais controle sobre seu dinheiro.
          </p>

        </div>

        {/* RESUMOS */}
        <section className="despesa-resumos">

          <article className="despesa-resumo destaque">
            <span>Total de despesas</span>
            <h2>{moeda(totalDespesas)}</h2>
            <small>Somatório dos gastos cadastrados</small>
          </article>

          <article className="despesa-resumo">
            <span>Despesas cadastradas</span>
            <h2>{despesas.length}</h2>
            <small>Total de registros</small>
          </article>

          <article className="despesa-resumo">
            <span>Média por despesa</span>
            <h2>{moeda(mediaDespesas)}</h2>
            <small>Valor médio dos registros</small>
          </article>

        </section>

        {/* FORMULÁRIO */}
        <section className="despesa-formulario">

          <div className="despesa-titulo-secao">
            <div>
              <h2>
                {editando !== null
                  ? 'Editar despesa'
                  : 'Nova despesa'}
              </h2>

              <p>
                Registre seus gastos para manter suas finanças organizadas.
              </p>
            </div>
          </div>

          <form onSubmit={salvarDespesa}>

            <div className="despesa-campos">

              <label>
                Descrição

                <input
                  type="text"
                  name="descricao"
                  placeholder="Ex: Conta de energia"
                  value={formulario.descricao}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Valor (R$)

                <input
                  type="number"
                  name="valor"
                  placeholder="Ex: 150.00"
                  min="0.01"
                  step="0.01"
                  value={formulario.valor}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Data de pagamento

                <input
                  type="date"
                  name="dataPagamento"
                  value={formulario.dataPagamento}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Categoria

                <select
                  name="categoria"
                  value={formulario.categoria}
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

            </div>

            {erro && (
              <p className="despesa-mensagem erro">
                {erro}
              </p>
            )}

            {sucesso && (
              <p className="despesa-mensagem sucesso">
                {sucesso}
              </p>
            )}

            <div className="despesa-acoes">

              <button
                type="submit"
                className="despesa-salvar"
                disabled={salvando}
              >
                {salvando
                  ? 'Salvando...'
                  : editando !== null
                    ? 'Atualizar despesa'
                    : '+ Cadastrar despesa'}
              </button>

              {editando !== null && (
                <button
                  type="button"
                  className="despesa-cancelar"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>
              )}

            </div>

          </form>

        </section>

        {/* HISTÓRICO */}
        <section className="despesa-historico">

          <div className="despesa-titulo-secao">
            <div>
              <h2>Histórico de despesas</h2>
              <p>Confira seus gastos registrados.</p>
            </div>
          </div>

          {carregando ? (
            <p className="despesa-vazio">
              Carregando suas despesas...
            </p>
          ) : despesasOrdenadas.length === 0 ? (
            <div className="despesa-vazio">
              <span>💸</span>
              <h3>Nenhuma despesa cadastrada</h3>
              <p>Comece registrando seu primeiro gasto.</p>
            </div>
          ) : (

            <div className="despesa-lista">

              {despesasOrdenadas.map((despesa) => (

                <article
                  className="despesa-item"
                  key={despesa.id}
                >

                  <div className="despesa-item-icone">
                    💳
                  </div>

                  <div className="despesa-item-info">

                    <h3>{despesa.descricao}</h3>

                    <span>
                      {despesa.categoria} · {' '}
                      {new Date(
                        `${despesa.dataPagamento}T12:00:00`
                      ).toLocaleDateString('pt-BR')}
                    </span>

                  </div>

                  <strong className="despesa-valor">
                    - {moeda(despesa.valor)}
                  </strong>

                  <div className="despesa-item-acoes">

                    <button
                      type="button"
                      onClick={() => editarDespesa(despesa)}
                      title="Editar despesa"
                      aria-label="Editar despesa"
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() => excluirDespesa(despesa.id)}
                      title="Excluir despesa"
                      aria-label="Excluir despesa"
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

      <footer className="despesa-rodape">
        Fin User · Projeto FIAP
      </footer>

    </main>
  );
}
