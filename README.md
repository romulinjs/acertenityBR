# Aceternity UI Component Explorer

Clone independente de exploração para o catálogo público de componentes Aceternity UI. A amostra traz **62 estudos de componentes/efeitos/blocos** e **8 templates**, organizados em coleções.

## Funcionalidades

- Busca textual global com `⌘K`/`Ctrl+K`, pesquisa por tags, categoria e descrição, filtros, ordenação e coleções salvas no navegador.
- Páginas individuais com preview, código TSX/CSS/uso em abas, copiar trecho e comando de instalação, link da referência e itens relacionados.
- Demos que respondem a hover, clique, scroll ou arraste, entre elas aurora, feixes SVG, ripple, spotlight, grade selecionável, mega menu, texto animado, comparação, timeline, cards em perspectiva e prévias de templates.
- Layout responsivo, modo de movimento reduzido e controle de movimento em demos.

O clone usa conteúdo e código próprios, com links transparentes para as páginas de referência. A lista é representativa e não pretende reproduzir literalmente todas as entradas ou o código proprietário do site original.

## Executar

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Para compilar: `pnpm build`. O projeto usa React, TypeScript, Vite, Framer Motion, React Router e Lucide. O manifesto de rotas para a prévia está em `public/manus-routes.json`.

## Estrutura

- `src/data/catalog.ts`: dados do catálogo, coleções e snippets de código editáveis.
- `src/data/templates.ts`: textos e estilos compartilhados pelos oito templates e por seus snippets.
- `src/components/DemoPreview.tsx`: demos reutilizáveis de componentes e templates.
- `src/components/CodeBlock.tsx`: abas, destaque de sintaxe e cópia de código.
- `src/clipboard.ts`: cópia com fallback quando a Clipboard API não está disponível.
- `src/App.tsx`: shell, navegação, pesquisa, filtros e páginas de detalhe.
- `src/styles.css`: linguagem visual e responsividade.
- `RESEARCH.md`: observações e fontes oficiais consultadas.
