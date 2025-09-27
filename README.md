# Sistema de Pedidos de Massas - Fetuccine

## Descrição
Sistema completo de pedidos de massas italianas desenvolvido com React, TypeScript e Encore.dev. Permite aos clientes montar suas massas personalizadas escolhendo tipo de massa, molho e ingredientes adicionais.

## Funcionalidades
- 🍝 **Construtor de Massas Interativo**: Interface intuitiva para montar massas personalizadas
- 🛒 **Carrinho de Compras**: Sistema completo de carrinho com adição/remoção de itens
- 📱 **Interface Responsiva**: Design moderno e responsivo para todos os dispositivos
- 🎨 **UI/UX Moderna**: Interface elegante com Tailwind CSS e componentes Radix UI
- 📊 **Gestão de Pedidos**: Sistema completo de acompanhamento de pedidos
- 🗄️ **Banco de Dados**: Estrutura robusta com PostgreSQL

## Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework de CSS utilitário
- **Radix UI** - Componentes acessíveis
- **React Query** - Gerenciamento de estado do servidor
- **React Router** - Roteamento

### Backend
- **Encore.dev** - Framework para desenvolvimento de APIs
- **PostgreSQL** - Banco de dados
- **TypeScript** - Tipagem estática

## Estrutura do Projeto
```
├── frontend/          # Aplicação React
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── context/       # Context API para estado global
│   ├── hooks/         # Hooks customizados
│   └── utils/         # Utilitários
├── backend/           # API Encore.dev
│   ├── menu/          # Serviços do cardápio
│   ├── orders/        # Serviços de pedidos
│   └── db/            # Configuração do banco
└── package.json       # Configuração do workspace
```

## Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Encore.dev CLI (opcional)

### Instalação
1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

### Desenvolvimento
1. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Acesse a aplicação em: http://localhost:5173

### Banco de Dados
O sistema utiliza PostgreSQL com migrações automáticas. Os dados de exemplo incluem:
- Tipos de massa (Fettuccine, Espaguete, Penne, etc.)
- Molhos (Alfredo, Marinara, Carbonara, etc.)
- Ingredientes (Proteínas, Vegetais, Queijos)

## Funcionalidades Principais

### 1. Construtor de Massas
- Seleção de tipo de massa
- Escolha de molho
- Adição de ingredientes opcionais
- Cálculo automático de preço

### 2. Carrinho de Compras
- Adição/remoção de itens
- Ajuste de quantidades
- Cálculo de total
- Finalização de pedido

### 3. Gestão de Pedidos
- Criação de pedidos
- Acompanhamento de status
- Informações do cliente
- Histórico de pedidos

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
