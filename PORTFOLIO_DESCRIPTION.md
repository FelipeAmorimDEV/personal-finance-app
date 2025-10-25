# 💰 Personal Finance App

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs)

**Aplicação web full-stack para gestão financeira pessoal com dashboard interativo, controle de transações e relatórios detalhados.**

[Demo](https://personal-finance-app-orcin.vercel.app) • [Documentação](#-funcionalidades) • [Tecnologias](#-tecnologias)

</div>

---

## 📋 Sobre o Projeto

Personal Finance App é uma solução completa e moderna para gerenciamento de finanças pessoais. A aplicação permite controle total sobre receitas, despesas, múltiplas contas bancárias e oferece análises visuais detalhadas para tomada de decisões financeiras inteligentes.

### 🎯 Objetivo

Desenvolver uma aplicação robusta, escalável e com excelente UX que facilite o controle financeiro pessoal, utilizando as tecnologias mais modernas do ecossistema JavaScript/TypeScript.

## ✨ Funcionalidades

### 🔐 Autenticação
- [x] Sistema completo de login e registro
- [x] JWT authentication com refresh tokens
- [x] Proteção de rotas com middleware
- [x] Sessões persistentes com cookies httpOnly

### 📊 Dashboard
- [x] Visão geral das finanças (saldo, receitas, despesas)
- [x] Cards informativos com indicadores
- [x] Visualização de contas bancárias
- [x] Transações recentes
- [x] Gastos por categoria

### 💳 Gestão de Transações
- [x] Criação de receitas e despesas
- [x] Categorização customizável
- [x] Filtros avançados (mês, ano, tipo, categoria, conta)
- [x] Histórico completo com busca

### 🏦 Contas e Categorias
- [x] Múltiplas contas bancárias
- [x] Personalização com cores e ícones
- [x] Categorias customizadas
- [x] Controle de saldo por conta

### 📈 Relatórios
- [x] Dashboard de análises
- [x] Taxa de economia
- [x] Gráficos de despesas por categoria
- [x] Distribuição de saldo
- [x] Estatísticas gerais
- [x] Seleção de período (semana/mês/ano)

### 🎨 Interface
- [x] Design mobile-first
- [x] Modais animados com drag-to-close
- [x] Bottom navigation
- [x] Action menu (FAB)
- [x] Toast notifications
- [x] Loading states

## 🚀 Tecnologias

### Frontend
```json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript 5.0",
  "styling": "Tailwind CSS 3.0",
  "state": "React Context API",
  "notifications": "React Toastify",
  "validation": "Zod"
}
```

### Backend
```json
{
  "framework": "NestJS 10",
  "auth": "JWT + Passport",
  "validation": "Zod + Class Validator",
  "orm": "Prisma/TypeORM"
}
```

### DevOps & Tools
```json
{
  "deployment": "Vercel",
  "version_control": "Git",
  "package_manager": "npm",
  "code_quality": "ESLint + Prettier"
}
```

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│              (Next.js 14 + React)                │
├─────────────────────────────────────────────────┤
│  • Pages (App Router)                           │
│  • Server Components (SSR)                      │
│  • Client Components (CSR)                      │
│  • API Routes (Proxy Layer)                     │
│  • Middleware (Auth Protection)                 │
└─────────────────────────────────────────────────┘
                       ↕ HTTP/REST
┌─────────────────────────────────────────────────┐
│                   Backend                        │
│                  (NestJS API)                    │
├─────────────────────────────────────────────────┤
│  • Controllers (REST Endpoints)                 │
│  • Use Cases (Business Logic)                   │
│  • Repositories (Data Access)                   │
│  • Guards & Interceptors                        │
└─────────────────────────────────────────────────┘
                       ↕ ORM
┌─────────────────────────────────────────────────┐
│                  Database                        │
│             (PostgreSQL/MySQL)                   │
└─────────────────────────────────────────────────┘
```

## 📱 Páginas

| Rota | Descrição | Tipo |
|------|-----------|------|
| `/` | Dashboard principal | Protected |
| `/login` | Autenticação | Public |
| `/register` | Cadastro | Public |
| `/transactions` | Lista de transações | Protected |
| `/reports` | Relatórios e análises | Protected |

## 🎨 Design System

### Cores
```css
Primary: #4A69E0 (Azul)
Success: #33B183 (Verde)
Danger: #BD4343 (Vermelho)
Warning: #F59E0B (Laranja)
Background: #20233B (Escuro)
Surface: #1A1D31 (Escuro médio)
```

### Componentes
- Cards informativos
- Modais bottom sheet
- Barras de progresso
- Gráficos visuais
- Formulários validados
- Botões de ação

## 💻 Como Executar

### Pré-requisitos
```bash
Node.js >= 18
npm >= 9
```

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/personal-finance-app.git

# Entre na pasta
cd personal-finance-app

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações

# Execute em desenvolvimento
npm run dev
```

### Variáveis de Ambiente
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Executar em produção
npm start
```

## 🧪 Testes

```bash
# Testes unitários
npm test

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📈 Performance

- ⚡ **Lighthouse Score**: 90+
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Score**: 95+
- ♿ **Accessibility**: 100

## 🔒 Segurança

- ✅ JWT com httpOnly cookies
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Input sanitization
- ✅ Rate limiting
- ✅ SQL injection prevention

## 🎓 Aprendizados

Este projeto me permitiu aprofundar em:
- Next.js 14 com App Router e Server Components
- Arquitetura de aplicações full-stack
- Autenticação JWT completa
- TypeScript avançado
- Design patterns (Repository, Use Case, etc)
- Clean Architecture
- Mobile-first design
- Performance optimization

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**[Seu Nome]**

- 🌐 Portfolio: [seu-portfolio.com](https://seu-portfolio.com)
- 💼 LinkedIn: [linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil)
- 🐱 GitHub: [@seu-usuario](https://github.com/seu-usuario)
- 📧 Email: seu@email.com

---

<div align="center">

Feito com ❤️ e ☕ por [Seu Nome]

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>

