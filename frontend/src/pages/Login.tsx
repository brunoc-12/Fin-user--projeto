
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface Usuario {
  id: number;
  nome: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensagem('');
    setCarregando(true);

    try {
      const resposta = await fetch(
        'http://localhost:8080/api/usuarios/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            senha: senha,
          }),
        }
      );

      const dados = await resposta.text();

      console.log('Status do login:', resposta.status);
      console.log('Resposta do login:', dados);

      if (!resposta.ok) {
        if (resposta.status === 401) {
          setMensagem('Email ou senha incorretos.');
        } else {
          setMensagem(`Erro ao entrar. Código: ${resposta.status}`);
        }
        return;
      }

      if (!dados) {
        setMensagem('O servidor não retornou os dados do usuário.');
        return;
      }

      let usuario: Usuario;

      try {
        usuario = JSON.parse(dados);
      } catch {
        setMensagem('O servidor retornou uma resposta inválida.');
        return;
      }

      if (!usuario.id || !usuario.nome) {
        setMensagem('Não foi possível identificar o usuário retornado.');
        return;
      }

      // Salva os dados do usuário
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('usuarioId', String(usuario.id));

      // Redireciona para a página inicial
      navigate('/home', { replace: true });

    } catch (erro) {
      console.error('Erro de conexão:', erro);
      setMensagem('Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">

      <div className="login-background">
        <div className="login-glow login-glow-1"></div>
        <div className="login-glow login-glow-2"></div>
      </div>

      <section className="login-container">

        <div className="login-brand">
          <div className="login-logo">F</div>
          <span>Fin <strong>User</strong></span>
        </div>

        <div className="login-card">

          <div className="login-icon">
            <span>✦</span>
          </div>

          <div className="login-heading">
            <span className="login-tag">
              SEU CONTROLE FINANCEIRO
            </span>

            <h1>Bem-vindo de volta!</h1>

            <p>
              Organize suas finanças, acompanhe suas metas
              e construa seu futuro.
            </p>
          </div>

          <form onSubmit={entrar} className="login-form">

            <div className="login-field">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="login-field">

              <label htmlFor="senha">Senha</label>

              <div className="login-password-wrapper">
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="login-show-password"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

            </div>

            {mensagem && (
              <div className="login-error" role="alert">
                <span>!</span>
                {mensagem}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={carregando}
            >
              {carregando ? 'Entrando...' : 'Entrar na minha conta'}

              {!carregando && <span>→</span>}
            </button>

          </form>

          <div className="login-divider">
            <span></span>
            <p>FIN USER</p>
            <span></span>
          </div>

          <p className="login-footer-text">
            Suas finanças organizadas em um só lugar.
          </p>

        </div>

        <footer className="login-copyright">
          Fin User © 2026 · Projeto FIAP
        </footer>

      </section>
    </main>
  );
}
