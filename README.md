# Projeto Trybe Futebol Clube ⚽️🏆

- A partir de uma aplicação Front-End criada pela construída pela _[Trybe](https://www.betrybe.com)_

* Construída com Node.js, Express, Typescript, MySQL e Docker
* Utilizando as práticas do REST
* Aplicando Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores


### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker e instalar as dependências:

**Observação:** O arquivo `Trybesmith.sql` cobtém as `queries` que cria e popula o banco no MySQL.

```
docker-compose up -d
docker exec -it trybesmith bash
npm install // para instalar as dependências
docker-compose down // para parar completamente a aplicação
```

E utilize os comandos a seguir para executar a aplicação:

```
npm start // para iniciar a aplicação
```

### Endpoints

#### Produtos

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o cadastro de um produto | http://localhost:3000/products |
| `GET` | Retorna uma listagem de todos os produtos cadastrados | http://localhost:3000/products |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "name": "Espada longa",
  "amount": "30 peças de ouro"
}
```

#### Usuários

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o cadastro de uma pessoa usuária e retorna o token | http://localhost:3000/users |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": "MAX",
  "classe": "swordsman",
  "level": 10,
  "password": "SavingPeople"
}
```
