# Neureon - Plataforma de Bem-estar Mental

Neureon é uma plataforma de meditação e bem-estar mental que oferece áudios de meditação e conteúdos para potencializar sua cognição e bem-estar mental.

## 🚀 Melhorias Implementadas

1. **Correção de Problemas de Codificação UTF-8**
   - Implementado um utilitário para corrigir caracteres especiais em português
   - Adicionado middleware para garantir headers de codificação corretos
   - Utilização de HOC (High Order Component) para aplicação automática das correções

2. **Workflows de CI/CD**
   - Criado workflow simplificado main.yml para integração e deploy contínuos
   - Workflow otimizado deploy.yml para GitHub Pages
   - Configuração de cache e otimização de build

3. **Configuração Next.js**
   - Ajuste de next.config.mjs para melhor compatibilidade com GitHub Pages
   - Configuração de i18n para suporte a português brasileiro
   - Adição de headers para melhorar segurança e desempenho

## 🛠️ Tecnologias Utilizadas

- **Next.js** - Framework React com renderização híbrida
- **Tailwind CSS** - Framework CSS utilitário
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **GitHub Actions** - Para workflows de CI/CD

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar em modo de produção
npm start
```

## 📦 Deployment

O projeto está configurado para deploy automático no GitHub Pages através de GitHub Actions. Sempre que houver um push para a branch main, o workflow de CI/CD será acionado.

## 🧩 Estrutura do Projeto

```
wellness-platform/
├── .github/          # Configurações de GitHub Actions
├── app/              # Páginas e componentes da aplicação
├── components/       # Componentes React reutilizáveis
├── lib/              # Funções utilitárias e helpers
├── public/           # Arquivos estáticos
├── styles/           # Estilos globais
└── ...               # Outros arquivos de configuração
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## ✨ Features

- **Sessões de Meditação**: Áudios com diferentes frequências para diferentes objetivos
- **Sistema de Assinatura**: Acesso a conteúdo premium através de assinatura
- **Interface Moderna**: Design elegante e responsivo
- **Experiência Personalizada**: Recomendações baseadas nas preferências do usuário 