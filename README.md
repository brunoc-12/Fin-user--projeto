# 💰 Fin User

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![Oracle](https://img.shields.io/badge/Oracle-Database-F80000?logo=oracle&logoColor=white)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

> Aplicação web de **controle financeiro pessoal**: o usuário faz login e registra suas **despesas**, **rendas** e **investimentos** em um só lugar. O back-end é uma API REST em Java com Spring Boot, que guarda tudo em um banco Oracle, e o front-end é feito em React com TypeScript.

Projeto desenvolvido por mim durante o curso de Análise e Desenvolvimento de Sistemas (ADS) na FIAP, com o objetivo de praticar a construção de uma aplicação completa (banco de dados, API e interface) e de montar meu portfólio como desenvolvedor back-end.

---

## 📑 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Como o projeto é organizado](#-como-o-projeto-é-organizado)
- [Como rodar na sua máquina](#-como-rodar-na-sua-máquina)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Endpoints da API](#-endpoints-da-api)
- [Exemplos de uso](#-exemplos-de-uso)
- [Banco de dados](#-banco-de-dados)
- [Testes](#-testes)
- [Problemas comuns](#-problemas-comuns)
- [Pontos de melhoria](#-pontos-de-melhoria)
- [O que eu aprendi](#-o-que-eu-aprendi)
- [Autor](#-autor)

---

## ✅ Funcionalidades

- **Login** de usuário por e-mail e senha
- **Despesas**: cadastrar, listar, editar e excluir
- **Rendas**: cadastrar, listar, editar e excluir
- **Investimentos**: cadastrar, listar, editar e excluir
- Os dados ficam salvos no banco Oracle (continuam lá depois de recarregar a página)
- Comunicação entre front-end e back-end liberada por **CORS**

---

## 🛠 Tecnologias

### Back-end (`FinUser_backend_fintech`)

| Tecnologia | Para que serve no projeto |
|---|---|
| Java 21 | Linguagem da API |
| Spring Boot 4 | Estrutura da aplicação e servidor web embutido (Tomcat) |
| Spring Web | Criação dos endpoints REST |
| Spring Data JPA + Hibernate | Acesso ao banco sem escrever SQL manualmente |
| Oracle Database | Banco de dados relacional |
| HikariCP | Pool de conexões com o banco |
| Maven (`mvnw`) | Gerenciamento de dependências e build |

### Front-end (`frontend`)

| Tecnologia | Para que serve no projeto |
|---|---|
| React | Construção da interface em componentes |
| TypeScript | JavaScript com tipagem |
| Vite | Servidor de desenvolvimento e build |

---

## 🗂 Como o projeto é organizado

```
Fin-user--projeto/
├── FinUser_backend_fintech/      # API REST (Spring Boot)
│   ├── pom.xml
│   └── src/main/java/io/github/brunoc12/finuser/
│       ├── config/               # Configurações (CORS)
│       ├── controller/           # Recebe as requisições HTTP
│       ├── dto/                  # Objetos de entrada/saída (ex.: login)
│       ├── model/                # Entidades que viram tabelas
│       ├── repository/           # Acesso ao banco (Spring Data JPA)
│       └── service/              # Regras de negócio
│
├── frontend/                     # Interface (React + Vite)
│   └── src/
│       ├── pages/                # Login, Home, Despesa, Renda, Investimentos
│       └── Componentes/          # Componentes reutilizáveis
│
└── README.md
```

### Como uma requisição percorre o back-end

O back-end segue a arquitetura em camadas, em que cada camada tem uma responsabilidade:

```
Front-end ──► Controller ──► Service ──► Repository ──► Oracle
 (React)     (recebe HTTP)  (regras)    (acesso ao BD)
```

1. O **Controller** recebe a requisição HTTP e devolve a resposta.
2. O **Service** aplica as regras de negócio.
3. O **Repository** conversa com o banco usando Spring Data JPA.
4. O **Model** (entidade) representa uma tabela do banco.

---

## 🚀 Como rodar na sua máquina

### Pré-requisitos

- [Java 21](https://adoptium.net/) instalado (confira com `java -version`)
- [Node.js](https://nodejs.org/) e npm instalados (confira com `node -v`)
- [Git](https://git-scm.com/)
- Acesso a um banco **Oracle** (host, porta, SID, usuário e senha)

> O Maven não precisa ser instalado: o projeto já traz o Maven Wrapper (`mvnw`).

### Passo 1: clonar o repositório

```powershell
git clone https://github.com/brunoc-12/Fin-user--projeto.git
cd Fin-user--projeto
```

### Passo 2: configurar o banco (variáveis de ambiente)

Por segurança, **usuário, senha e endereço do banco não ficam escritos no código**. O `application.properties` só lê variáveis de ambiente. No PowerShell, defina as três **na mesma janela** em que vai subir o back-end:

```powershell
$env:DB_URL = "jdbc:oracle:thin:@SEU_HOST:1521:SEU_SID"
$env:DB_USERNAME = "seu_usuario"
$env:DB_PASSWORD = "sua_senha"
```

Troque os valores pelos dados reais do seu banco Oracle.

> ⚠️ Variáveis definidas com `$env:` valem apenas para aquela janela do PowerShell. Se abrir outra janela, é preciso definir de novo.

### Passo 3: subir o back-end

```powershell
cd FinUser_backend_fintech
.\mvnw.cmd spring-boot:run
```

Quando aparecer `Started FinUserApplication` no log, a API está no ar em **http://localhost:8080**.

> Abrir `http://localhost:8080` direto no navegador mostra uma página de erro 404 (Whitelabel). Isso é normal: a API não tem página inicial, só os endpoints listados mais abaixo.

### Passo 4: subir o front-end

Abra **outro terminal** (deixe o do back-end rodando):

```powershell
cd frontend
npm install
npm run dev
```

Acesse **http://localhost:5173**.

### Passo 5: criar um usuário para fazer login

Com o banco vazio, não existe nenhum usuário. Crie o primeiro por um **terceiro terminal**:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:8080/api/usuarios `
  -ContentType "application/json" `
  -Body '{"nome":"Teste","email":"teste@teste.com","senha":"123456"}'
```

Agora entre no front-end com `teste@teste.com` e `123456`.

---

## 🔐 Variáveis de ambiente

| Variável | O que é | Exemplo |
|---|---|---|
| `DB_URL` | URL JDBC do Oracle (precisa começar com `jdbc:`) | `jdbc:oracle:thin:@host:1521:sid` |
| `DB_USERNAME` | Usuário do banco | `meu_usuario` |
| `DB_PASSWORD` | Senha do banco | `minha_senha` |

---

## 📡 Endpoints da API

URL base: `http://localhost:8080`

### Usuários: `/api/usuarios`

| Método | Rota | O que faz |
|---|---|---|
| `POST` | `/api/usuarios` | Cria um usuário |
| `POST` | `/api/usuarios/login` | Faz login |
| `GET` | `/api/usuarios` | Lista todos |
| `GET` | `/api/usuarios/{id}` | Busca por id |
| `PUT` | `/api/usuarios/{id}` | Atualiza |
| `DELETE` | `/api/usuarios/{id}` | Remove |

### Despesas, Rendas e Investimentos

Os três recursos seguem o mesmo padrão:

| Recurso | Rota base |
|---|---|
| Despesas | `/api/despesas` |
| Rendas | `/api/rendas` |
| Investimentos | `/api/investimentos` |

| Método | Rota | O que faz |
|---|---|---|
| `POST` | `{rota base}` | Cria um registro |
| `GET` | `{rota base}` | Lista todos |
| `GET` | `{rota base}/{id}` | Busca por id |
| `PUT` | `{rota base}/{id}` | Atualiza |
| `DELETE` | `{rota base}/{id}` | Remove |

As rendas também aceitam `PATCH /api/rendas/{id}` para atualização parcial.

---

## 🧪 Exemplos de uso

### Login

**Requisição** `POST /api/usuarios/login`

```json
{
  "email": "teste@teste.com",
  "senha": "123456"
}
```

**Resposta** quando o login dá certo:

```json
{
  "id": 1,
  "nome": "Teste"
}
```

Quando e-mail ou senha estão errados, a API recusa o login e o front-end mostra a mensagem de e-mail ou senha inválidos.

### Criar usuário

**Requisição** `POST /api/usuarios`

```json
{
  "nome": "Teste",
  "email": "teste@teste.com",
  "senha": "123456"
}
```

O `id` é gerado automaticamente pelo banco (não precisa enviar), e o `email` é único: não é possível cadastrar dois usuários com o mesmo.

### Listar com o navegador

Os endpoints `GET` podem ser abertos direto no navegador, por exemplo `http://localhost:8080/api/usuarios`. Se o banco estiver vazio, a resposta é `[]`.

---

## 🗄 Banco de dados

- O mapeamento é feito pelo **JPA/Hibernate**: cada classe da pasta `model` vira uma tabela.
- A configuração `spring.jpa.hibernate.ddl-auto=update` faz o Hibernate **criar e ajustar as tabelas automaticamente** na primeira execução.
- Os `id`s são gerados por **sequences** do Oracle (por exemplo, `SEQ_USUARIO` para a tabela `tbl_USUARIO`).
- O `spring.jpa.show-sql=true` mostra no terminal os comandos SQL que o Hibernate executa, o que ajuda a estudar e a depurar.

---

## ✔️ Testes

```powershell
cd FinUser_backend_fintech
.\mvnw.cmd clean test
```

> ⚠️ O teste atual (`contextLoads`) **sobe a aplicação inteira**, então precisa das três variáveis de ambiente e de um Oracle acessível. Sem isso, ele falha com `'url' must start with "jdbc"` ou `UnknownHostException`.

Para só verificar se o projeto compila, sem rodar o teste:

```powershell
.\mvnw.cmd clean package -DskipTests
```

---

## 🩺 Problemas comuns

| Sintoma | Causa provável | Como resolver |
|---|---|---|
| `'url' must start with "jdbc"` | `DB_URL` não foi definida nessa janela do terminal | Defina as três variáveis e rode de novo na mesma janela |
| `ORA-17868` / `UnknownHostException` | O host da `DB_URL` está errado | Confira host, porta e SID do Oracle |
| Não conecta no Oracle mesmo com o host certo | O banco pode aceitar conexão só de certas redes | Verifique rede, VPN e permissões de acesso |
| `Whitelabel Error Page` (404) em `localhost:8080` | A API não tem rota na raiz | Acesse um endpoint, por exemplo `/api/usuarios` |
| "E-mail ou senha inválidos" ao logar | Ainda não existe usuário no banco | Crie um usuário (Passo 5) |
| Erro de **CORS** no console do navegador | A origem do front não está liberada no back-end | Confira a classe `CorsConfig` e a porta do Vite (`5173`) |

---

## 🔧 Pontos de melhoria

Sei que o projeto ainda tem o que evoluir, e estes são os próximos passos que pretendo seguir:

- [ ] **Segurança da senha**: hoje ela é salva e devolvida em texto puro. Quero aplicar hash com **BCrypt** (Spring Security) e criar um DTO de resposta sem o campo `senha`
- [ ] **Autenticação com JWT**, para proteger os endpoints
- [ ] **Validações** nos dados de entrada (Bean Validation) e tratamento de erros padronizado
- [ ] **Testes automatizados** das camadas de service e controller, que não dependam do Oracle real
- [ ] **Perfil de teste** com banco em memória
- [ ] **Documentação da API** com Swagger/OpenAPI
- [ ] Limpar os arquivos `.java` antigos da raiz de `FinUser_backend_fintech`, que sobraram da fase anterior do projeto e não fazem parte da aplicação Spring

---

## 📚 O que eu aprendi

- Construir uma API REST em camadas (controller, service, repository, model)
- Mapear entidades com JPA/Hibernate e trabalhar com sequences do Oracle
- Não deixar credenciais no código, usando variáveis de ambiente
- Liberar a comunicação entre front-end e back-end com CORS
- Consumir uma API com `fetch` em React e guardar a sessão no `localStorage`
- Usar Git na prática: clonar, comparar alterações com `git diff`, commitar e enviar com `git push`
- Ler logs e stack traces para encontrar a causa real de um erro

---

## 👤 Autor

**Bruno Costa**

- GitHub: [@brunoc-12](https://github.com/brunoc-12)
- LinkedIn: [bruno-costa](https://www.linkedin.com/in/bruno-costa-7780471a1/)
