# QA Data Validation Project

Projeto prático de **Quality Assurance** focado em validação de dados, preparação de ambiente PostgreSQL e carga de um dataset de municipios brasileiros para analise e testes.

## Visao Geral

Este projeto simula um fluxo comum em times de QA e dados:

- Preparar o banco de dados
- Criar a estrutura da tabela
- Importar um CSV com municipios
- Validação de integridade de dados
- Análise de qualidade de dados
- Testes de API
- Automação de Testes

O objetivo e servir como base para exercicios de validação de integridade, testes de API, consultas SQL e automacao.

## Objetivos

- Praticar validação de dados em banco relacional
- exercitar importacao e tratamento de dataset CSV
- Criar uma base para testes de API e automacao
- Organizar um fluxo simples de setup, seed e execucao da aplicacao

## Tecnologias

- Node.js
- Express
- PostgreSQL
- SQL
- dotenv
- csv-parser
- Postman
- Playwright

## Estrutura do Projeto

```text
qa-data-validation-project/
├── data/
│   └── municipios.csv
├── database/
│   ├── connection.js
│   ├── migrations/
│   │   ├── 001_create_database.sql
│   │   ├── 002_create_table.sql
│   │   └── 003_import_psql.sql
│   └── seeds/
│       └── importCsv.js
├── src/
│   ├── importCsv.js
│   ├── server.js
│   └── setupDatabase.js
├── .env
├── package.json
└── README.md
```

## Dataset

O arquivo `data/municipios.csv` contem os seguintes campos:

- codigo do municipio TOM
- codigo do municipio IBGE
- municipio TOM
- municipio IBGE
- UF

## Pre-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js 18+ recomendado
- PostgreSQL
- npm

Tambem e necessario que o PostgreSQL esteja em execucao localmente e com um usuario com permissao para criar banco.

## Configuracao

Crie ou ajuste o arquivo `.env` com as variaveis abaixo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=qa_validation
PORT=3000
```

## Instalacao

```bash
npm install
```

## Como Executar

O fluxo recomendado e executar os passos abaixo na ordem:

### 1. Criar o banco e a tabela

```bash
npm run db:setup
```

Esse comando:

- Cria o banco `qa_validation` se ele ainda nao existir
- Cria a tabela `public.ref_municipios_tom_ibge`

### 2. Importar o CSV

```bash
npm run db:seed
```

Esse comando:

- Conecta no banco configurado
- Limpa a tabela antes da carga
- Importa os registros do arquivo CSV dentro de transacao

### 3. Subir a API

```bash
npm start
```

Para desenvolvimento com reload automatico:

```bash
npm run dev
```

## Scripts Disponiveis

- `npm start`: Sobe a API Express
- `npm run dev`: Sobe a API com nodemon
- `npm run db:setup`: Cria o banco e a estrutura inicial
- `npm run db:seed`: Importa o dataset CSV
- `npm test`: Placeholder para futuros testes

## Endpoint Atual

### `GET /`

Retorna uma resposta simples para verificar se o servidor esta funcionando:

```json
{
  "message": "Servidor funcionando"
}
```

## Modelagem Atual

A tabela principal utilizada no projeto e:

- `public.ref_municipios_tom_ibge`

Campos atuais:

- `codigo_municipio_tom`
- `codigo_municipio_ibge`
- `municipio_tom`
- `municipio_ibge`
- `uf`

## Fluxo Atual da Aplicacao

O projeto esta separado em tres responsabilidades:

- `src/server.js`: sobe a API
- `src/setupDatabase.js`: prepara banco e tabela
- `src/importCsv.js`: executa a carga do CSV

Essa separacao evita que a API recrie o banco ou reimporte dados automaticamente a cada inicializacao.

## Autor

Renato Bonetti Neto
