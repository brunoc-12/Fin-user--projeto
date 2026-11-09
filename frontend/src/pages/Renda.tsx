
import { useEffect, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Renda.css';

const API = 'http://localhost:8080/api/rendas';

interface Renda {
  id: number;
  descricao: string;
  valor: number;
  dataRenda: string;
  usuarioId?: number;
  usuario?: {
    id: number;
  };
}

interface Formulario {
  descricao: string;
  valor: string;
  dataRenda: string;
}

function obterUsuarioId(): number | null {
  try {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);

      const id = Number(
        usuario.id ?? usuario.usuarioId ?? usuario.idUsuario
      );

      if (Number.isFinite(id) && id > 0) {
        return id;
      }
    }

    const idSalvo = localStorage.getItem('usuarioId');

    if (idSalvo) {
      const id = Number(idSalvo);

      if (Number.isFinite(id) && id > 0) {
        return id;
      }
    }
  } catch (error) {
    console.error('Erro ao recuperar usuário:', error);
  }

  return null;
}

function dataHoje(): string {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function formatarMoeda(valor: number): string {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatarData(data: string): string {
  if (!data) return '-';

  const [ano, mes, dia] = data.split('-');

  if (!ano || !mes || !dia) return data;

  return `${dia}/${mes}/${ano}`;
}

export default function Renda() {
  const navigate = useNavigate();

  const [usuarioId] = useState<number | null>(obterUsuarioId);

  const [rendas, setRendas] = useState<Renda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [editando, setEditando] = useState<number | null>(null);

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const [formulario, setFormulario] = useState<Formulario>({
    descricao: '',
    valor: '',
    dataRenda: dataHoje(),
  });

  // Identifica a qual usuário pertence cada renda.
  function identificarUsuario(renda: Renda): number | undefined {
    return renda.usuarioId ?? renda.usuario?.id;
  }

  // Busca todas as rendas na API.
  async function carregarRendas() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(API);

      if (!resposta.ok) {
        throw new Error(
          `Erro ao buscar rendas. Código: ${resposta.status}`
        );
      }

      const dados: Renda[] = await resposta.json();

      if (!Array.isArray(dados)) {
        throw new Error('A API não retornou uma lista de rendas.');
      }

      console.log('Rendas recebidas da API:', dados);

      // Filtra pelo usuário logado.
      const minhasRendas = dados.filter((renda) => {
        return Number(identificarUsuario(renda)) === Number(usuarioId);
      });

      setRendas(minhasRendas);
    } catch (error) {
      console.error('Erro ao carregar rendas:', error);

      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar suas rendas.'
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!usuarioId) {
      setErro(
        'Não foi possível identificar o usuário. Faça login novamente.'
      );
      setCarregando(false);
      return;
    }

    void carregarRendas();
  }, [usuarioId]);

  // Atualiza os campos do formulário.
  function atualizarCampo(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  // Limpa o formulário.
  function limparFormulario() {
    setFormulario({
      descricao: '',
      valor: '',
      dataRenda: dataHoje(),
    });

    setEditando(null);
  }

  // Cadastra ou atualiza uma renda.
  async function salvarRenda(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro('');
    setSucesso('');

    if (!usuarioId) {
      setErro('Usuário não identificado. Faça login novamente.');
      return;
    }

    if (
      !formulario.descricao.trim() ||
      Number(formulario.valor) <= 0 ||
      !formulario.dataRenda
    ) {
      setErro('Preencha todos os campos corretamente.');
      return;
    }

    const payload = {
      descricao: formulario.descricao.trim(),
      valor: Number(formulario.valor),
      dataRenda: formulario.dataRenda,

      // O Renda.java possui os dois campos.
      usuarioId: usuarioId,
      usuario: {
        id: usuarioId,
      },
    };

    setSalvando(true);

    try {
      const url =
        editando !== null
          ? `${API}/${editando}`
          : API;

      const resposta = await fetch(url, {
        method: editando !== null ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!resposta.ok) {
        const mensagem = await resposta.text();

        throw new Error(
          mensagem || 'Não foi possível salvar a renda.'
        );
      }

      limparFormulario();

      setSucesso(
        editando !== null
          ? 'Renda atualizada com sucesso!'
          : 'Renda cadastrada com sucesso!'
      );

      await carregarRendas();
    } catch (error) {
      console.error('Erro ao salvar renda:', error);

      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao salvar renda.'
      );
    } finally {
      setSalvando(false);
    }
  }

  // Prepara uma renda para edição.
  function editarRenda(renda: Renda) {
    setEditando(renda.id);

    setFormulario({
      descricao: renda.descricao,
      valor: String(renda.valor),
      dataRenda: renda.dataRenda,
    });

    setErro('');
    setSucesso('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Exclui uma renda.
  async function excluirRenda(id: number) {
    const confirmar = window.confirm(
      'Deseja realmente excluir esta renda?'
    );

    if (!confirmar) return;

    setErro('');
    setSucesso('');

    try {
      const resposta = await fetch(`${API}/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível excluir a renda.');
      }

      setSucesso('Renda excluída com sucesso!');

      if (editando === id) {
        limparFormulario();
      }

      await carregarRendas();
    } catch (error) {
      console.error('Erro ao excluir renda:', error);

      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao excluir renda.'
      );
    }
  }

  // Encerra a sessão.
  function sair() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioId');

    navigate('/');
  }

  // Indicadores financeiros.
  const totalRendas = rendas.reduce(
    (total, renda) => total + Number(renda.valor || 0),
    0
  );

  const mediaRendas =
    rendas.length > 0
      ? totalRendas / rendas.length
      : 0;

  const ultimaRenda = [...rendas].sort(
    (a, b) =>
      new Date(b.dataRenda).getTime() -
      new Date(a.dataRenda).getTime()
  )[0];

  const rendasOrdenadas = [...rendas].sort(
    (a, b) =>
      new Date(b.dataRenda).getTime() -
      new Date(a.dataRenda).getTime()
  );

  return (
    <main className="renda">

      <header className="renda-topo">
        <div className="renda-marca">
          <button
            type="button"
            className="renda-voltar"
            onClick={() => navigate('/home')}
          >
            ←
          </button>

          Fin User
        </div>

        <button
          type="button"
          className="renda-sair"
          onClick={sair}
        >
          Sair
        </button>
      </header>

      <section className="renda-conteudo">

        <div className="renda-introducao">
          <span className="renda-selo">
            CONTROLE FINANCEIRO
          </span>

          <h1>Minhas rendas 💰</h1>

          <p>
            Acompanhe seus recebimentos e tenha uma visão
            melhor da sua vida financeira.
          </p>
        </div>

        {/* RESUMO */}
        <section className="renda-resumos">

          <article className="renda-resumo destaque">
            <span>Total de rendas</span>
            <h2>{formatarMoeda(totalRendas)}</h2>
            <small>Somatório dos registros</small>
          </article>

          <article className="renda-resumo">
            <span>Rendas cadastradas</span>
            <h2>{rendas.length}</h2>
            <small>Total de recebimentos</small>
          </article>

          <article className="renda-resumo">
            <span>Média por renda</span>
            <h2>{formatarMoeda(mediaRendas)}</h2>
            <small>Valor médio dos registros</small>
          </article>

        </section>

        {/* FORMULÁRIO */}
        <section className="renda-formulario">

          <div className="renda-titulo-secao">
            <div>
              <h2>
                {editando !== null
                  ? 'Editar renda'
                  : 'Nova renda'}
              </h2>

              <p>
                Registre seus recebimentos.
              </p>
            </div>
          </div>

          <form onSubmit={salvarRenda}>

            <div className="renda-campos">

              <label>
                Descrição

                <input
                  type="text"
                  name="descricao"
                  placeholder="Ex: Salário mensal"
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
                  placeholder="Ex: 3500.00"
                  min="0.01"
                  step="0.01"
                  value={formulario.valor}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Data de recebimento

                <input
                  type="date"
                  name="dataRenda"
                  value={formulario.dataRenda}
                  onChange={atualizarCampo}
                  required
                />
              </label>

            </div>

            {erro && (
              <p className="renda-mensagem erro">
                {erro}
              </p>
            )}

            {sucesso && (
              <p className="renda-mensagem sucesso">
                {sucesso}
              </p>
            )}

            <div className="renda-acoes">

              <button
                type="submit"
                className="renda-salvar"
                disabled={salvando}
              >
                {salvando
                  ? 'Salvando...'
                  : editando !== null
                    ? 'Atualizar renda'
                    : '+ Cadastrar renda'}
              </button>

              {editando !== null && (
                <button
                  type="button"
                  className="renda-cancelar"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>
              )}

            </div>

          </form>

        </section>

        {/* HISTÓRICO */}
        <section className="renda-historico">

          <div className="renda-titulo-secao">
            <div>
              <h2>Histórico de rendas</h2>
              <p>Confira seus recebimentos cadastrados.</p>
            </div>

            <button
              type="button"
              className="renda-atualizar"
              onClick={() => void carregarRendas()}
              disabled={carregando}
            >
              ↻ Atualizar
            </button>
          </div>

          {carregando ? (
            <p className="renda-vazio">
              Carregando suas rendas...
            </p>
          ) : rendasOrdenadas.length === 0 ? (
            <div className="renda-vazio">
              <span>💰</span>
              <h3>Nenhuma renda encontrada</h3>
              <p>
                Cadastre sua primeira renda para começar.
              </p>
            </div>
          ) : (

            <div className="renda-lista">

              {rendasOrdenadas.map((renda) => (

                <article
                  className="renda-item"
                  key={renda.id}
                >

                  <div className="renda-item-icone">
                    💵
                  </div>

                  <div className="renda-item-info">
                    <h3>{renda.descricao}</h3>

                    <span>
                      Recebimento · {formatarData(renda.dataRenda)}
                    </span>
                  </div>

                  <strong className="renda-valor">
                    + {formatarMoeda(renda.valor)}
                  </strong>

                  <div className="renda-item-acoes">

                    <button
                      type="button"
                      onClick={() => editarRenda(renda)}
                      title="Editar renda"
                      aria-label="Editar renda"
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() => excluirRenda(renda.id)}
                      title="Excluir renda"
                      aria-label="Excluir renda"
                    >
                      🗑️
                    </button>

                  </div>

                </article>

              ))}

            </div>
          )}

          {ultimaRenda && (
            <p className="renda-ultima">
              Último recebimento: {formatarData(ultimaRenda.dataRenda)}
            </p>
          )}

        </section>

      </section>

      <footer className="renda-rodape">
        Fin User · Projeto FIAP
      </footer>

    </main>
  );
}
