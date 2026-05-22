# Sistema Souza Car - Frontend

Frontend do sistema de gerenciamento de oficina mecânica desenvolvido utilizando:

- Angular
- TypeScript
- Bootstrap
- Angular Router
- Angular HttpClient

---

# Pré-requisitos

Antes de rodar o projeto, é necessário instalar os seguintes softwares na máquina.

---

# Node.js

Versão obrigatória utilizada no projeto:

```bash
v24.15.0
```

---

## Download Node.js

https://nodejs.org/

Durante a instalação:

- Marque a opção:

```txt
Add to PATH
```

---

## Verificar instalação

Após instalar:

```bash
node -v
```

Deve retornar:

```bash
v24.15.0
```

---

# NPM

Versão utilizada no projeto:

```bash
11.12.1
```

---

## Verificar instalação

```bash
npm -v
```

Deve retornar:

```bash
11.12.1
```

---

# Angular CLI

Versão utilizada:

```bash
Angular CLI 21.2.12
```

---

## Instalar Angular CLI

```bash
npm install -g @angular/cli
```

---

## Verificar instalação

```bash
ng version
```

---

# VS Code 

## Extensões recomendadas

- Angular Language Service
- TypeScript
- Prettier

---

# Estrutura do Projeto

```txt
frontend/
│
├── src/
│   ├── app/
│   │
│   ├── models/
│   │   ├── cliente.ts
│   │   ├── veiculo.ts
│   │   └── ordem-servico.ts
│   │
│   ├── pages/
│   │   ├── clientes/
│   │   ├── veiculos/
│   │   └── ordem-servico/
│   │
│   ├── services/
│   │   ├── cliente.service.ts
│   │   ├── veiculo.service.ts
│   │   └── ordem-servico.service.ts
│   │
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.component.ts
│
├── package.json
├── angular.json
└── README.md
```

---

# ⚙️ Como Rodar o Projeto

---

# Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

# Entrar na pasta frontend

```bash
cd frontend
```

---

# Instalar dependências

```bash
npm install
```

---

# Rodar o projeto

```bash
ng serve
```

---

# Frontend funcionando

Se tudo estiver correto:

```bash
Application bundle generation complete.
```

---

# Abrir no navegador

```txt
http://localhost:4200/
```

---

# Comandos Úteis

---

## Gerar componente

```bash
ng generate component nome-componente
```

ou

```bash
ng g c nome-componente
```

---

## Gerar service

```bash
ng generate service nome-service
```

---

## Build do projeto

```bash
ng build
```

Os arquivos compilados ficarão em:

```txt
dist/
```

---

# Testes

---

## Rodar testes unitários

```bash
ng test
```

---

## Rodar testes end-to-end

```bash
ng e2e
```

---

# Comunicação com Backend

A comunicação com o backend FastAPI será feita utilizando:

```txt
HttpClient
```


Prática Profissional - Projeto de Software

Universidade São Francisco
