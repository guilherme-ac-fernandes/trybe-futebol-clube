# Projeto Trybe Futebol Clube ⚽️🏆

- A partir de uma aplicação Front-End construída pela _[Trybe](https://www.betrybe.com)_, foi desenvolvido um API para prover as informações necessárias para apresentação ao usuário, que consiste em um site informativo sobre partidas e classificações de futebol!

* Construída com Node.js, Express, Typescript, MySQL, Sequelize e Docker
* Utilizando os princípios SOLID e Programação Orientada a Objetos
* Aplicando Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores


### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker:

```
npm run compose:up
npm run compose:down // para parar completamente a aplicação
```

E utilize os comandos a seguir para executar os testes de integração criado:

```
npm install // para instalar as dependências
cd app/backend && npm test
```

### Demonstração

<p align="center">
  <img src="" alt="Trybe Futebol Clube - Demostração"/>
</p>

### Endpoints

#### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3001/login |
| `GET` | Avalia se o usuário é o administrador | http://localhost:3001/login/validate |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "email": "Usuário",
  "password": "senha_secreta"
}
```


#### Times

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os times cadastrados | http://localhost:3001/teams |
| `GET` | Retorna um time específico | http://localhost:3001/teams/:id |


#### Partidas

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos as partidas cadastradas | http://localhost:3001/matches |
| `GET` | Retorna todos as partidas cadastradas em progresso | http://localhost:3001/matches?inProgress=true |
| `GET` | Retorna todos as partidas cadastradas finalizadas | http://localhost:3001/matches?inProgress=false |
| `POST` | Criação de uma nova partida | http://localhost:3001/matches |
| `PATCH` | Atualiza a chave 'inProgress' para finalidado de uma partida específica | http://localhost:3001/matches/:id/finish |
| `PATCH` | Atualiza os gols de uma partida específica| http://localhost:3001/matches/:id |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```


#### Placar

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna a classificação geral dos times | http://localhost:3001/leaderboard |
| `GET` | Retorna a classificação dos times mandantes | http://localhost:3001/leaderboard/home |
| `GET` | Retorna a classificação dos times visitantes | http://localhost:3001/leaderboard/away |

