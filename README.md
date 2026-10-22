# Aceternity UI Component Explorer (v2.0 Live Edition)

Catálogo interativo de alta fidelidade para o ecossistema público de componentes **Aceternity UI**. Traz **62 estudos de componentes/efeitos/blocos** e **8 templates**, agora com correspondência real, física tátil, Canvas interativo e controles ao vivo.

## O Que Foi Melhorado & Adicionado

- **Demos com Correspondência Real**:
  - **3D Card Effect**: Cálculo de inclinação em 3D real com `perspective(1000px)`, `rotateX`/`rotateY` e camadas elevadas em `translateZ`.
  - **Vortex**: Canvas 2D animado com dezenas de partículas em espiral gravitacional que reagem ao mouse.
  - **Wavy Background**: Ondas senoidais fluidas contínuas em Canvas 2D com gradientes dinâmicos.
  - **Background Beams With Collision**: Feixes laser que descem e geram explosão de fagulhas e partículas na colisão.
  - **Card Spotlight**: Halo de luz suave com máscara em grade de pontos que acompanha cirurgicamente o cursor.
  - **Glare Card**: Efeito holográfico arco-íris iridescente reativo ao ângulo de visão.
  - **Focus Cards**: Desfoque e escurecimento inteligente dos cartões vizinhos ao focar com o mouse.
  - **Expandable Cards**: Expansão fluida de cards em modal com `framer-motion layoutId`.
  - **Infinite Moving Cards**: Carrossel contínuo de depoimentos com pausa suave no hover e gradientes nas bordas.
  - **Macbook Pro 3D**: Chassi do notebook com abertura de tela configurável e app interativo.
  - **Lens**: Lupa com zoom real de 2.5x que amplia qualquer área inspecionada.
  - **Animated Tooltip**: Avatares com tooltip que segue o ponteiro com física de mola e rotação orgânica.
  - **3D Pin**: Pino suspenso no ar com feixe vertical de luz e anéis concêntricos de radar pulsante.
  - **Moving Border**: Ponto luminoso em gradiente cônico que percorre o contorno do botão em loop contínuo.
  - **Hero Highlight**: Marcador fluorescente gradiente animado que se desenha sobre o texto.
  - **Wobble Card**: Amortecimento físico elástico com inércia reativa ao cursor.
- **Playground Interativo nos Detalhes**:
  - Seletor de esquema de cores (Violet, Cyan, Emerald, Amber, Rose) aplicado em tempo real aos componentes e canvas.
  - Controle de velocidade da animação (0.5x, 1x, 2x).
  - Campo para testar texto personalizado ao vivo em componentes de tipografia.
- **Modo Cinema (Tela Cheia)**:
  - Botão para expandir qualquer demonstração em imersão total com suporte a tecla `ESC`.
- **Feedback Tátil & Efeitos Sonoros Sutis**:
  - Sintetizador puro via Web Audio API (sem dependências externas) com botão de áudio On/Off na barra superior.
- **Código de Produção**:
  - Abas de código com TSX, CSS e Usage prontos para copiar e colar diretamente em projetos React / Next.js.

## Executar

```bash
# Com npm ou pnpm
npm run dev
# ou
pnpm dev
```

Para compilar em produção: `npm run build` ou `pnpm build`.
