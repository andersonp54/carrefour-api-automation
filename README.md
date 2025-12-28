![CI](https://github.com/andersonp54/carrefour-api-automation/actions/workflows/ci.yml/badge.svg)

# 🧪 Testes de API – Carrefour | Automação de Contrato e Integração

![Javascript](https://img.shields.io/static/v1?label=language&message=javascript&color=orange&style=for-the-badge&logo=javascript)
![Jest](https://img.shields.io/static/v1?label=test&message=jest&color=red&style=for-the-badge&logo=jest)
![Supertest](https://img.shields.io/static/v1?label=api&message=supertest&color=black&style=for-the-badge&logo=github)
![AJV](https://img.shields.io/static/v1?label=contract&message=ajv&color=blue&style=for-the-badge)
![dotenv](https://img.shields.io/static/v1?label=config&message=dotenv&color=green&style=for-the-badge)

---

## 📋 Sobre o projeto

Este projeto tem como objetivo automatizar **testes de integração e testes de contrato (contract tests)** para os endpoints de **Usuários** de uma API REST, utilizando **JavaScript moderno (ES Modules)**.

O foco da automação é garantir:

- comportamento correto dos endpoints
- consistência estrutural (schema) das respostas
- prevenção de regressões de contrato
- execução simples por ambiente (`dev` / `hmg`)

---

## 🧰 Tecnologias utilizadas

### 🔹 Testes de API
- **Supertest**  
  https://github.com/visionmedia/supertest

### 🔹 Test Runner
- **Jest**  
  https://jestjs.io/

### 🔹 Validação de Contrato (Schema)
- **AJV (Another JSON Schema Validator)**  
  https://ajv.js.org/

### 🔹 Configuração por ambiente
- **dotenv**  
  https://github.com/motdotla/dotenv

---

## 💻 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js 18+**
- **npm 8+**

Verifique as versões:

```bash
node -v
npm -v
```

---

## 📦 Instalação das dependências

Na raiz do projeto, execute:
```bash
npm install
```
Caso encontre problemas de dependência:
```bash
npm install --force
```

---

## ⚙️ Configuração de ambiente

As configurações são controladas por arquivos .env, organizados por ambiente.

### 📁 Estrutura de configuração
```
config/
├─ dev.env
└─ hmg.env
```
### 📄 Exemplo config/hmg.env
```env
API_BASE_URL=https://serverest.dev
AUTH_EMAIL=admin@qa.com.br
AUTH_PASSWORD=teste

RETRY_COUNT=3
RETRY_DELAY_MS=500
RETRY_STATUS=429,500,502,503,504
```
### ⚙️ Seleção de ambiente
O ambiente é definido via variável NODE_ENV.
```bash
NODE_ENV=dev
NODE_ENV=hmg
```

---

## ▶️ Executando os testes
Executar todos os testes:
```bash
NODE_ENV=hmg npx jest
```
Executar um arquivo específico:
```bash
NODE_ENV=hmg npx jest tests/users/contract.test.js
```

### 📊 Relatórios

Após a execução no CI, os seguintes artefatos ficam disponíveis:

- `reports/junit.xml` – integração com CI
- `reports/report.html` – relatório visual

Acesse em:
GitHub → Actions → Workflow run → Upload Reports


---


## 🗂️ Estrutura do projeto
```
carrefour-api-automation/
├─ config/
│  ├─ dev.env
│  └─ hmg.env
│
├─ dto/
│  └─ user-bean.js
│
├─ helpers/
│  └─ utils/
│     ├─ json-validator.js
│     └─ random.js
│
├─ services/
│  ├─ generic-service.js
│  ├─ auth/
│  │  └─ auth-service.js
│  └─ user/
│     └─ user-service.js
│
├─ tests/
│  └─ users/
│     ├─ contract.test.js
│     ├─ crud.test.js
│     └─ negative.test.js
│
├─ jest.config.cjs
├─ package.json
└─ README.md
```

---

## 🧪 Tipos de testes implementados
### ✅ Testes de Contrato (Contract Tests)
```
Validação de schema com AJV
Schemas centralizados em DTOs (dto/user-bean.js)
Garantia de estrutura e tipos das respostas da API
```

### ✅ Testes de Integração (CRUD)
```
Criação de usuário
Consulta por ID
Atualização de dados
Exclusão de usuário
Validação de status HTTP e payload
```

### ✅ Testes Negativos
```
Payload inválido
Email duplicado
IDs inexistentes
Campos obrigatórios ausentes
```


---

## 👤 Autor

### Anderson Patricio
#### Senior Quality Assurance Engineer