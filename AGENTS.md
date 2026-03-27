# E-Commerce Micro Frontends Project

## Visão Geral
Este é um projeto de micro frontends usando Module Federation com Vite. O host (porta 3000) carrega remotes de auth, products e orders de forma dinâmica.

## Arquitetura

### Estrutura de Apps
- **host** (porta 3000): Aplicação principal que carrega os MFEs
- **auth** (porta 3005): Páginas de Login e Registro
- **products** (porta 3006): Catálogo de produtos
- **orders** (porta 3007): Página de pedidos

### Estrutura de Diretórios
```
apps/
  host/          # Host application
  auth/          # Auth remote
  products/      # Products remote
  orders/        # Orders remote
libs/
  shared/        # API clients, types, stores
  shared-ui/     # UI components (shadcn/ui)
```

## Configuração Module Federation

### host/vite.config.ts
```typescript
shared: {
  react: {
    requiredVersion: "^18.3.0",
    singleton: true,
  },
  "react-dom": {
    requiredVersion: "^18.3.0",
    singleton: true,
  },
}
```
**IMPORTANTE**: O host deve compartilhar apenas React. Cada remote deve ter suas próprias cópias das libs que usa.

### remotes (auth, products, orders)/vite.config.ts
```typescript
shared: ["react", "react-dom"]
```
**IMPORTANTE**: Não compartilhe outras libs (queryClient, zustand, etc) entre apps. Cada app deve ter sua própria instância.

## Configuração de Providers

### Regra Principal
**CADA APP REMOTE DEVE TER SEU PROPRIO PROVIDER**

O Module Federation não funciona bem com contexto compartilhado entre boundaries. Cada remote deve encapsular seus próprios providers.

### Auth - bootstrap.tsx
```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function AuthApp() {
  const [queryClient] = useState(() => new QueryClient({...}));
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage /> {/* ou RegisterPage baseado na rota */}
    </QueryClientProvider>
  );
}
export { AuthApp };
```

### Products - bootstrap.tsx
```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function ProductsApp() {
  const [queryClient] = useState(() => new QueryClient({...}));
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsPage />
    </QueryClientProvider>
  );
}
export { ProductsPageWithNuqs };
```

### Orders - já tem seu próprio QueryProvider
O orders já foi configurado com `OrdersQueryProvider` em main.tsx.

## O que NÃO fazer

### 1. NÃO pré-carregue MFEs
```typescript
// ERRADO - causa race conditions
useEffect(() => {
  Promise.all([import("auth/..."), import("products/...")]);
}, []);
```
Isso causa "Invalid hook call" aleatório.

### 2. NÃO compartilhe libs além do React
```typescript
// ERRADO - causa problemas de contexto
shared: {
  react: { singleton: true },
  "@tanstack/react-query": { singleton: true }, // NÃO FAÇA ISSO
  nuqs: { singleton: true }, // NÃO FAÇA ISSO
}
```

### 3. NÃO use NuqsAdapter no host para remote
Cada remote que usa nuqs deve ter seu próprio `NuqsAdapter`.

### 4. NÃO exponha main.tsx que faz bootstrap
Se o main.tsx tem `ReactDOM.createRoot()`, separe em:
- `main.tsx`: só exports
- `bootstrap.tsx`: componente com providers

## Resolvendo Problemas

### "Invalid hook call"
**Causa**: Múltiplas instâncias do React ou race condition no carregamento.
**Solução**:
1. Limpar cache: `rm -rf apps/*/node_modules/.vite`
2. Verificar se cada remote tem seus próprios providers
3. Não pré-carregar MFEs

### "No QueryClient set"
**Causa**: Componente usando useQuery sem provider.
**Solução**: Cada remote deve ter seu próprio `QueryClientProvider`.

### "nuqs requires an adapter"
**Causa**: NuqsAdapter não encontrado.
**Solução**: Cada app que usa nuqs deve importar e usar `NuqsAdapter` localmente.

## Comandos

```bash
# Limpar cache
rm -rf apps/*/node_modules/.vite

# Dev servers
npm run dev:host      # porta 3000
npm run dev:auth       # porta 3005
npm run dev:products   # porta 3006
npm run dev:orders     # porta 3007
```

## Versionamento de Dependências

Todas as libs devem ter a MESMA versão em todo o workspace:
- react: ^18.3.0
- react-dom: ^18.3.0
- @tanstack/react-query: ^5.60.0
- zustand: ^5.0.0
- nuqs: ^2.8.0
- zod: ^3.23.0
- axios: ^1.7.0
- react-hook-form: ^7.53.0

## Fluxo de Autenticação

1. Token armazenado no localStorage via authStore (zustand persist)
2. API client (axios) intercepta 401 e tenta refresh
3. Se refresh falha, redireciona para /auth/login
4. Logout limpa token e localStorage

### Auth Store (zustand)
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (response: AuthResponse) => void;
  logout: () => void;
  checkTokenExpiration: () => boolean; // Verifica JWT exp
}
```

## Pastas e Arquivos Importantes

### Host
- `apps/host/src/App.tsx` - Router principal com lazy loading de MFEs
- `apps/host/src/components/Providers.tsx` - QueryClientProvider (só para o host)
- `apps/host/src/stores/authStore.ts` - Estado de autenticação

### Remotes
- `apps/{auth,products,orders}/src/bootstrap.tsx` - Componente com providers
- `apps/{auth,products,orders}/src/main.tsx` - Só exports (não faz bootstrap)

### libs/shared
- `libs/shared/src/api/client.ts` - Axios instances com interceptors
- `libs/shared/src/stores/authStore.ts` - Store compartilhado (se necessário)
- `libs/shared-ui/src/` - Componentes UI (Card, Button, Input, etc)
