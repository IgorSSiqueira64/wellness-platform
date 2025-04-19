# Wellness Platform

Uma plataforma de bem-estar com sessões de áudio motivacionais e meditativas.

## Funcionalidades

- Player de áudio interativo
- Sessões motivacionais
- Acompanhamento de progresso
- Interface acessível
- Persistência de dados

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS

## Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/wellness-platform.git
cd wellness-platform
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse `http://localhost:3000`

## Deploy

O projeto está configurado para deploy automático no GitHub Pages. Cada push na branch `main` irá:

1. Construir o projeto
2. Gerar os arquivos estáticos
3. Fazer deploy no GitHub Pages

Acesse: https://seu-usuario.github.io/wellness-platform

## Estrutura do Projeto

```
wellness-platform/
├── app/
│   ├── sessoes/
│   │   └── motivacao/
│   └── page.tsx
├── components/
│   └── audio-player.tsx
├── public/
│   └── audio/
└── styles/
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 