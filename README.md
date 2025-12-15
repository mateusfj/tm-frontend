## TM Frontend

Aplicação frontend em Angular 21, utilizando PrimeNG e Tailwind, para o teste técnico da TM Digital.

---

## ✅ Pré-requisitos

- Node.js **18+** (recomendado)
- NPM **11+** (o projeto usa `"packageManager": "npm@11.6.2"`)
- Git instalado (opcional, se for clonar o repositório)

Verifique suas versões com:

```bash
node -v
npm -v
```

---

## 🚀 Instalação

1. Clone o repositório (ou faça o download do código-fonte):

```bash
git clone https://github.com/mateusfj/tm-frontend.git
cd tm-frontend
```

2. Instale as dependências:

```bash
npm install
```

---

## 💻 Executar em desenvolvimento

Use o script de desenvolvimento já configurado no `package.json`:

```bash
npm start
```

Por padrão, o Angular irá subir em:

- URL: http://localhost:4200/

Qualquer alteração nos arquivos `src/` recarrega automaticamente a aplicação no navegador.

---

## 🗂️ Estrutura geral (resumo)

- `src/app/core` &rarr; layout principal (header, sidebar, etc.)
- `src/app/features` &rarr; módulos de funcionalidade (dashboard, leads, properties)
- `src/app/shared` &rarr; componentes compartilhados e serviços comuns
- `src/environments` &rarr; arquivos de configuração de ambiente

Caso seja necessário configurar URLs de API ou chaves específicas, ajuste os arquivos em `src/environments/` antes de rodar o build de produção.

---

## 🔗 Referências

- Angular CLI: https://angular.dev/tools/cli
- PrimeNG: https://primeng.org/
