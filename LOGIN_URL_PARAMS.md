# 🔐 Login com Parâmetros de URL

## 📋 Funcionalidade

A página de login agora aceita parâmetros de URL para preencher automaticamente os campos de email e senha. Isso é útil para:

- ✅ **Testes rápidos** durante desenvolvimento
- ✅ **Demos** para clientes
- ✅ **Links pré-preenchidos** para usuários específicos
- ✅ **Automação** de testes E2E

## 🚀 Como Usar

### **URLs de Exemplo:**

```bash
# Login básico
http://localhost:3000/login?email=usuario@teste.com&password=123456

# Com caracteres especiais (URL encoded)
http://localhost:3000/login?email=user%40example.com&password=senha%40123

# Apenas email
http://localhost:3000/login?email=admin@teste.com

# Apenas senha
http://localhost:3000/login?password=admin123
```

### **Parâmetros Suportados:**

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `email` | string | Email do usuário | `usuario@teste.com` |
| `password` | string | Senha do usuário | `123456` |

### **Caracteres Especiais:**

Para caracteres especiais, use URL encoding:

```javascript
// Exemplo com @ e espaços
const email = "user@example.com";
const password = "senha com espaços";

// URL encoded
const encodedEmail = encodeURIComponent(email); // user%40example.com
const encodedPassword = encodeURIComponent(password); // senha%20com%20espa%C3%A7os

// URL final
const url = `http://localhost:3000/login?email=${encodedEmail}&password=${encodedPassword}`;
```

## 💻 Implementação Técnica

### **Código Adicionado:**

```typescript
// src/app/login/page.tsx
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();

  // Preenche os campos com parâmetros da URL
  useEffect(() => {
    const urlEmail = searchParams.get('email');
    const urlPassword = searchParams.get('password');
    
    if (urlEmail) {
      setEmail(decodeURIComponent(urlEmail));
    }
    
    if (urlPassword) {
      setPassword(decodeURIComponent(urlPassword));
    }
  }, [searchParams]);
}
```

### **Fluxo de Funcionamento:**

```
1. Usuário acessa URL com parâmetros
   ↓
2. useSearchParams() captura os parâmetros
   ↓
3. useEffect() executa na montagem do componente
   ↓
4. decodeURIComponent() decodifica os valores
   ↓
5. setState() preenche os campos automaticamente
   ↓
6. Usuário pode editar ou submeter diretamente
```

## 🔒 Considerações de Segurança

### **⚠️ Avisos Importantes:**

1. **Nunca use em produção** com senhas reais
2. **URLs ficam no histórico** do navegador
3. **Logs do servidor** podem capturar as URLs
4. **Use apenas para desenvolvimento** e demos

### **✅ Boas Práticas:**

```typescript
// Para desenvolvimento - OK
http://localhost:3000/login?email=test@test.com&password=test123

// Para demos - OK (com dados fictícios)
https://demo.app.com/login?email=demo@demo.com&password=demo123

// Para produção - ❌ NUNCA FAÇA ISSO
https://app.com/login?email=real@user.com&password=realPassword
```

## 🧪 Casos de Uso

### **1. Desenvolvimento Local:**
```bash
# Teste rápido com usuário de desenvolvimento
http://localhost:3000/login?email=dev@test.com&password=dev123
```

### **2. Demos para Clientes:**
```bash
# Link pré-preenchido para demonstração
https://demo.app.com/login?email=demo@company.com&password=demo2024
```

### **3. Testes E2E:**
```javascript
// Cypress/Playwright
cy.visit('/login?email=test@e2e.com&password=test123');
// Campos já preenchidos, pode submeter diretamente
```

### **4. Documentação/README:**
```markdown
## 🚀 Teste Rápido

Acesse: http://localhost:3000/login?email=admin@test.com&password=admin123

Os campos serão preenchidos automaticamente!
```

## 🎯 Exemplos Práticos

### **Para Desenvolvedores:**
```bash
# Usuário admin para testes
http://localhost:3000/login?email=admin@test.com&password=admin123

# Usuário comum
http://localhost:3000/login?email=user@test.com&password=user123

# Usuário com dados especiais
http://localhost:3000/login?email=test%2Bspecial@domain.com&password=pass%40word
```

### **Para Demos:**
```bash
# Demo corporativo
https://demo.app.com/login?email=demo@company.com&password=Demo2024!

# Demo individual
https://demo.app.com/login?email=john@demo.com&password=Demo123
```

### **Para Testes:**
```javascript
// Jest/Testing Library
const { getByDisplayValue } = render(<LoginPage />);
expect(getByDisplayValue('test@example.com')).toBeInTheDocument();
```

## 🔧 Customizações Futuras

### **Possíveis Melhorias:**

```typescript
// 1. Auto-submit após preenchimento
useEffect(() => {
  if (urlEmail && urlPassword && autoSubmit) {
    handleSubmit();
  }
}, [urlEmail, urlPassword]);

// 2. Validação de parâmetros
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// 3. Limpeza de URL após uso
const clearUrlParams = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

// 4. Suporte a mais campos
const urlName = searchParams.get('name');
const urlRemember = searchParams.get('remember') === 'true';
```

## 📱 Compatibilidade

- ✅ **Desktop** - Chrome, Firefox, Safari, Edge
- ✅ **Mobile** - iOS Safari, Chrome Mobile
- ✅ **Tablet** - iPad, Android tablets
- ✅ **PWA** - Progressive Web App

## 🎉 Conclusão

Esta funcionalidade torna o desenvolvimento e demonstrações muito mais eficientes, permitindo acesso rápido à aplicação com credenciais pré-definidas.

**Lembre-se:** Use apenas para desenvolvimento e demos, nunca em produção com dados reais!
