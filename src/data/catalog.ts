import { templateCopy, templateStyles } from './templates'

export type DemoKind =
  | 'aurora' | 'beam' | 'ripple' | 'dots' | 'spotlight' | 'card' | 'grid'
  | 'bento' | 'menu' | 'text' | 'flip' | 'typewriter' | 'encrypted' | 'squiggle'
  | 'sticky' | 'timeline' | 'dock' | 'banner' | 'globe' | 'cards' | 'pin'
  | 'parallax' | 'comparison' | 'template' | 'button' | 'logos'
  | 'vortex' | 'wavy' | 'collision' | '3d-card' | 'glare-card' | 'card-spotlight'
  | 'focus-cards' | 'expandable-cards' | 'infinite-cards' | 'macbook' | 'lens'
  | 'animated-tooltip' | '3d-pin' | 'moving-border' | 'hero-highlight' | 'wobble-card'
  | 'lamp' | 'meteors' | 'sparkles' | 'following-pointer' | 'apple-carousel'
  | 'link-preview' | 'colourful-text' | 'canvas-reveal'

export type CatalogType = 'component' | 'effect' | 'block' | 'template'

export type CatalogItem = {
  slug: string
  name: string
  type: CatalogType
  category: string
  description: string
  tags: string[]
  demo: DemoKind
  source: string
  featured?: boolean
  fresh?: boolean
}

export const categories = [
  'Backgrounds', 'Cards', 'Text animations', 'Navigation', 'Scroll & reveal',
  'Interactive', 'Sections', 'Templates',
]

export const catalogItems: CatalogItem[] = [
  // Destaques / Novos
  { slug: 'lamp-effect', name: 'Lamp Effect', type: 'block', category: 'Sections', description: 'Cone de iluminação cinematográfico superior que destaca a headline principal de uma landing page.', tags: ['Lamp', 'Luz', 'Hero', 'Trending'], demo: 'lamp', source: 'https://ui.aceternity.com/components/lamp-effect', featured: true, fresh: true },
  { slug: 'sparkles', name: 'Sparkles Core', type: 'effect', category: 'Backgrounds', description: 'Campo de partículas cintilantes em Canvas com brilho estelar aleatório e máscara radial.', tags: ['Canvas', 'Sparkles', 'Hero', 'Trending'], demo: 'sparkles', source: 'https://ui.aceternity.com/components/sparkles', featured: true, fresh: true },
  { slug: 'meteors', name: 'Meteors Effect', type: 'effect', category: 'Cards', description: 'Chuva contínua de meteoros cadentes com rastro brilhante atravessando o fundo do card.', tags: ['Meteors', 'Rastro', 'Card', 'Trending'], demo: 'meteors', source: 'https://ui.aceternity.com/components/meteors', featured: true, fresh: true },
  { slug: 'apple-cards-carousel', name: 'Apple Cards Carousel', type: 'component', category: 'Cards', description: 'Carrossel horizontal estilo Apple Store com transição de expansão suave ao clique.', tags: ['Apple', 'Carousel', 'Modal', 'Trending'], demo: 'apple-carousel', source: 'https://ui.aceternity.com/components/apple-cards-carousel', featured: true, fresh: true },
  { slug: 'following-pointer', name: 'Following Pointer', type: 'component', category: 'Interactive', description: 'Cursor colaborativo customizado com nome e avatar que segue o ponteiro com física suave.', tags: ['Cursor', 'Figma', 'Interação'], demo: 'following-pointer', source: 'https://ui.aceternity.com/components/following-pointer', featured: true, fresh: true },
  { slug: 'link-preview', name: 'Link Preview', type: 'component', category: 'Interactive', description: 'Links de texto que revelam um popup dinâmico com pré-visualização de imagem ao passar o mouse.', tags: ['Preview', 'Tooltip', 'Hover'], demo: 'link-preview', source: 'https://ui.aceternity.com/components/link-preview', featured: true, fresh: true },
  { slug: 'colourful-text', name: 'Colourful Text', type: 'effect', category: 'Text animations', description: 'Tipografia com gradiente dinâmico de cores em transição contínua letra por letra.', tags: ['Cores', 'Texto', 'Loop'], demo: 'colourful-text', source: 'https://ui.aceternity.com/components/colourful-text', featured: true, fresh: true },
  { slug: 'canvas-reveal-effect', name: 'Canvas Reveal Effect', type: 'effect', category: 'Backgrounds', description: 'Matriz dot-matrix de pontos que se revelam dinamicamente ao aproximar o ponteiro.', tags: ['Shader', 'Matrix', 'Hover'], demo: 'canvas-reveal', source: 'https://ui.aceternity.com/components/canvas-reveal-effect', featured: true, fresh: true },

  // Backgrounds
  { slug: 'aurora-background', name: 'Aurora Background', type: 'effect', category: 'Backgrounds', description: 'Gradientes fluidos e luminosos transformam qualquer seção em um céu de aurora dinâmico.', tags: ['Gradiente', 'Animado', 'Hero'], demo: 'aurora', source: 'https://ui.aceternity.com/components/aurora-background', featured: true },
  { slug: 'background-beams', name: 'Background Beams', type: 'effect', category: 'Backgrounds', description: 'Feixes SVG cruzam o plano atrás do conteúdo, criando profundidade para heros e chamadas.', tags: ['SVG', 'Hero', 'Motion'], demo: 'beam', source: 'https://ui.aceternity.com/components/background-beams', featured: true },
  { slug: 'background-lines', name: 'Background Lines', type: 'effect', category: 'Backgrounds', description: 'Linhas onduladas e luminosas formam um plano gráfico em movimento contínuo.', tags: ['SVG', 'Linhas', 'Motion'], demo: 'beam', source: 'https://ui.aceternity.com/components/background-lines' },
  { slug: 'background-ripple-effect', name: 'Background Ripple Effect', type: 'effect', category: 'Backgrounds', description: 'Uma grade de células responde ao ponteiro e ao clique com ondas de expansão.', tags: ['Ripple', 'Clique', 'Hover'], demo: 'ripple', source: 'https://ui.aceternity.com/components/background-ripple-effect', featured: true },
  { slug: 'background-beams-collision', name: 'Background Beams With Collision', type: 'effect', category: 'Backgrounds', description: 'Feixes laser colidem em tempo real na barreira criando uma explosão de fagulhas dinâmicas.', tags: ['Feixes', 'Colisão', 'Canvas'], demo: 'collision', source: 'https://ui.aceternity.com/components/background-beams-with-collision', featured: true },
  { slug: 'dotted-glow-background', name: 'Dotted Glow Background', type: 'effect', category: 'Backgrounds', description: 'Uma malha de pontos pulsa com brilho suave e densidade ajustável.', tags: ['Pontos', 'Glow', 'CSS'], demo: 'dots', source: 'https://ui.aceternity.com/components/dotted-glow-background' },
  { slug: 'wavy-background', name: 'Wavy Background', type: 'effect', category: 'Backgrounds', description: 'Ondas senoidais multicamadas em Canvas geram um fundo expressivo e fluido.', tags: ['Ondas', 'Gradiente', 'Canvas'], demo: 'wavy', source: 'https://ui.aceternity.com/components/wavy-background', featured: true },
  { slug: 'vortex', name: 'Vortex', type: 'effect', category: 'Backgrounds', description: 'Centenas de partículas orbitam em espiral e convergem para o vórtice atraído pelo cursor.', tags: ['Partículas', 'Canvas', 'Física'], demo: 'vortex', source: 'https://ui.aceternity.com/components/vortex', featured: true },
  { slug: 'hero-highlight', name: 'Hero Highlight', type: 'effect', category: 'Backgrounds', description: 'Uma luz acompanha o cursor e revela uma faixa fluorescente desenhada sobre palavras-chave.', tags: ['Cursor', 'Highlight', 'Hero'], demo: 'hero-highlight', source: 'https://ui.aceternity.com/components/hero-highlight', featured: true },
  { slug: 'spotlight', name: 'Spotlight', type: 'effect', category: 'Backgrounds', description: 'Um halo radial percorre a superfície e chama atenção para uma área específica.', tags: ['Radial', 'Cursor', 'Glow'], demo: 'spotlight', source: 'https://ui.aceternity.com/components/spotlight' },
  { slug: 'spotlight-new', name: 'Spotlight New', type: 'effect', category: 'Backgrounds', description: 'Luzes suaves em gradiente iluminam a composição a partir de duas bordas.', tags: ['Gradiente', 'Luz', 'CSS'], demo: 'spotlight', source: 'https://ui.aceternity.com/components/spotlight-new' },

  // Cards
  { slug: 'card-spotlight', name: 'Card Spotlight', type: 'component', category: 'Cards', description: 'Um spotlight circular acompanha o mouse dentro do card revelando uma grade e brilho radial.', tags: ['Card', 'Cursor', 'Hover'], demo: 'card-spotlight', source: 'https://ui.aceternity.com/components/card-spotlight', featured: true },
  { slug: '3d-card-effect', name: '3D Card Effect', type: 'component', category: 'Cards', description: 'Perspectiva tridimensional real onde o card inclina e seus elementos flutuam no eixo Z.', tags: ['3D', 'Tilt', 'Hover'], demo: '3d-card', source: 'https://ui.aceternity.com/components/3d-card-effect', featured: true },
  { slug: 'wobble-card', name: 'Wobble Card', type: 'component', category: 'Cards', description: 'Movimento, inércia elástica e amortecimento físico respondem à posição do ponteiro.', tags: ['Inércia', 'Hover', 'Física'], demo: 'wobble-card', source: 'https://ui.aceternity.com/components/wobble-card', featured: true },
  { slug: 'glare-card', name: 'Glare Card', type: 'component', category: 'Cards', description: 'Lâmina holográfica e reflexo iridescente arco-íris acompanham o ângulo do cursor.', tags: ['Holográfico', 'Hover', 'Reflexo'], demo: 'glare-card', source: 'https://ui.aceternity.com/components/glare-card', featured: true },
  { slug: 'expandable-cards', name: 'Expandable Cards', type: 'component', category: 'Cards', description: 'Cards interativos que expandem suavemente em modal com Framer Motion layoutId.', tags: ['Expansível', 'Modal', 'LayoutId'], demo: 'expandable-cards', source: 'https://ui.aceternity.com/components/expandable-card', featured: true },
  { slug: 'focus-cards', name: 'Focus Cards', type: 'component', category: 'Cards', description: 'O cartão sob foco ganha destaque enquanto os demais recuam e ficam desfocados suavemente.', tags: ['Hover', 'Foco', 'Desfoque'], demo: 'focus-cards', source: 'https://ui.aceternity.com/components/focus-cards', featured: true },
  { slug: 'layout-grid', name: 'Layout Grid', type: 'component', category: 'Cards', description: 'Uma grade de cartões em proporções variadas abre detalhes ao selecionar um item.', tags: ['Grid', 'Clique', 'Layout'], demo: 'grid', source: 'https://ui.aceternity.com/components/layout-grid', featured: true },
  { slug: 'card-stack', name: 'Card Stack', type: 'component', category: 'Cards', description: 'Um conjunto de cartões empilhados alterna o item em foco com uma transição curta.', tags: ['Stack', 'Carrossel', 'Motion'], demo: 'cards', source: 'https://ui.aceternity.com/components/cards' },
  { slug: 'background-overlay-card', name: 'Background Overlay Card', type: 'component', category: 'Cards', description: 'Uma camada de mídia e contraste aparece ao passar o mouse sobre o cartão.', tags: ['Overlay', 'Hover', 'Card'], demo: 'card', source: 'https://ui.aceternity.com/components/cards' },

  // Sections & Bento
  { slug: 'bento-grid', name: 'Bento Grid', type: 'block', category: 'Sections', description: 'Uma composição modular apresenta benefícios, métricas e mídia em painéis de tamanhos diferentes.', tags: ['Bento', 'Features', 'Grid'], demo: 'bento', source: 'https://ui.aceternity.com/blocks/feature-sections', featured: true },
  { slug: 'feature-cards-gradient', name: 'Feature Cards — Gradient', type: 'block', category: 'Sections', description: 'Uma seção de funcionalidades organiza títulos curtos e descrições em cards com gradiente.', tags: ['Features', 'Gradiente', 'Seção'], demo: 'bento', source: 'https://ui.aceternity.com/blocks/feature-sections' },
  { slug: 'hero-mesh-gradient', name: 'Hero Section — Mesh Gradient', type: 'block', category: 'Sections', description: 'Uma composição de headline, ação e malha multicolorida serve como ponto de entrada de uma landing page.', tags: ['Hero', 'Mesh', 'CTA'], demo: 'template', source: 'https://ui.aceternity.com/blocks/hero-sections' },
  { slug: 'hero-beams-grid', name: 'Hero Section — Beams & Grid', type: 'block', category: 'Sections', description: 'Uma grade sutil e feixes SVG enquadram o título e os botões de uma página de produto.', tags: ['Hero', 'Grid', 'Beams'], demo: 'template', source: 'https://ui.aceternity.com/blocks/hero-sections' },
  { slug: 'hero-mousemove', name: 'Hero Section — Mousemove', type: 'block', category: 'Sections', description: 'Um hero de produto com uma camada visual nomeada para exploração pelo ponteiro.', tags: ['Hero', 'Cursor', 'Background'], demo: 'template', source: 'https://ui.aceternity.com/blocks/hero-sections' },

  // Navigation
  { slug: 'navbar-menu', name: 'Navbar Menu', type: 'component', category: 'Navigation', description: 'Itens da barra revelam um mega menu animado ao passar o mouse ou receber foco.', tags: ['Menu', 'Hover', 'Responsive'], demo: 'menu', source: 'https://ui.aceternity.com/components/navbar-menu', featured: true },
  { slug: 'sidebar', name: 'Sidebar', type: 'component', category: 'Navigation', description: 'Uma barra lateral expansível se abre ao hover e se adapta à navegação móvel.', tags: ['Sidebar', 'Responsive', 'Dark'], demo: 'menu', source: 'https://ui.aceternity.com/components/sidebar' },
  { slug: 'floating-navbar', name: 'Floating Navbar', type: 'component', category: 'Navigation', description: 'Uma navbar fixa recua durante a rolagem para baixo e reaparece ao voltar para cima.', tags: ['Sticky', 'Scroll', 'Navbar'], demo: 'menu', source: 'https://ui.aceternity.com/components/floating-navbar' },
  { slug: 'resizable-navbar', name: 'Resizable Navbar', type: 'component', category: 'Navigation', description: 'A navegação reduz sua largura durante o scroll e oferece uma versão compacta para mobile.', tags: ['Scroll', 'Responsive', 'Navbar'], demo: 'menu', source: 'https://ui.aceternity.com/components/resizable-navbar' },
  { slug: 'floating-dock', name: 'Floating Dock', type: 'component', category: 'Navigation', description: 'Ícones de navegação em uma dock flutuante estilo macOS que ampliam ao hover.', tags: ['Dock', 'Ícones', 'Hover'], demo: 'dock', source: 'https://ui.aceternity.com/components/floating-dock', featured: true },
  { slug: 'sticky-banner', name: 'Sticky Banner', type: 'component', category: 'Navigation', description: 'Uma faixa de anúncio fixa pode desaparecer depois de um pequeno trecho de scroll.', tags: ['Banner', 'Sticky', 'Anúncio'], demo: 'banner', source: 'https://ui.aceternity.com/components/sticky-banner' },

  // Text Animations
  { slug: 'text-generate-effect', name: 'Text Generate Effect', type: 'effect', category: 'Text animations', description: 'Palavras surgem em sequência com uma transição de opacidade e deslocamento.', tags: ['Texto', 'Fade', 'Entrada'], demo: 'text', source: 'https://ui.aceternity.com/components/text-generate-effect', featured: true },
  { slug: 'typewriter-effect', name: 'Typewriter Effect', type: 'effect', category: 'Text animations', description: 'Uma frase é digitada caractere a caractere com cursor e pausa entre trechos.', tags: ['Typewriter', 'Texto', 'Loop'], demo: 'typewriter', source: 'https://ui.aceternity.com/components/typewriter-effect', featured: true },
  { slug: 'flip-words', name: 'Flip Words', type: 'effect', category: 'Text animations', description: 'Uma palavra troca por outra dentro de uma frase, criando uma headline variável.', tags: ['Texto', 'Rotação', 'Loop'], demo: 'flip', source: 'https://ui.aceternity.com/components/flip-words', featured: true },
  { slug: 'encrypted-text', name: 'Encrypted Text', type: 'effect', category: 'Text animations', description: 'Caracteres embaralhados se resolvem gradualmente no texto final revelado.', tags: ['Texto', 'Scramble', 'Reveal'], demo: 'encrypted', source: 'https://ui.aceternity.com/components/encrypted-text', featured: true },
  { slug: 'squiggly-text', name: 'Squiggly Text', type: 'effect', category: 'Text animations', description: 'Uma deformação ondulada em SVG dá movimento às letras sem esconder a mensagem.', tags: ['SVG', 'Texto', 'Distortion'], demo: 'squiggle', source: 'https://ui.aceternity.com/components/squiggly-text' },
  { slug: 'text-reveal-card', name: 'Text Reveal Card', type: 'component', category: 'Text animations', description: 'Uma segunda camada de texto aparece quando o visitante explora o card.', tags: ['Card', 'Hover', 'Reveal'], demo: 'card', source: 'https://ui.aceternity.com/components/text-reveal-card' },

  // Scroll & Reveal
  { slug: 'tracing-beam', name: 'Tracing Beam', type: 'effect', category: 'Scroll & reveal', description: 'Um traço vertical acompanha a leitura e ilumina o percurso de uma seção longa.', tags: ['Scroll', 'SVG', 'Leitura'], demo: 'timeline', source: 'https://ui.aceternity.com/components/tracing-beam', featured: true },
  { slug: 'sticky-scroll-reveal', name: 'Sticky Scroll Reveal', type: 'effect', category: 'Scroll & reveal', description: 'O conteúdo permanece fixo enquanto painéis seguintes entram em cena durante a rolagem.', tags: ['Sticky', 'Scroll', 'Reveal'], demo: 'sticky', source: 'https://ui.aceternity.com/components/sticky-scroll-reveal' },
  { slug: 'parallax-scroll', name: 'Parallax Scroll', type: 'effect', category: 'Scroll & reveal', description: 'Colunas e camadas se deslocam em ritmos distintos para gerar uma composição parallax.', tags: ['Parallax', 'Scroll', 'Grid'], demo: 'parallax', source: 'https://ui.aceternity.com/components/parallax-scroll' },
  { slug: 'timeline', name: 'Timeline', type: 'component', category: 'Scroll & reveal', description: 'Marcos de uma história ou roadmap se organizam em um fluxo vertical legível.', tags: ['Timeline', 'Roadmap', 'Scroll'], demo: 'timeline', source: 'https://ui.aceternity.com/components/timeline' },
  { slug: 'macbook-scroll', name: 'Macbook Scroll', type: 'effect', category: 'Scroll & reveal', description: 'Chassi de Macbook Pro com perspectiva tridimensional e abertura de tampa configurável.', tags: ['Macbook', 'Produto', '3D'], demo: 'macbook', source: 'https://ui.aceternity.com/components/macbook-scroll', featured: true },
  { slug: 'container-scroll-animation', name: 'Container Scroll Animation', type: 'effect', category: 'Scroll & reveal', description: 'Um painel inclina e se aproxima em 3D conforme a rolagem percorre a seção.', tags: ['Scroll', '3D', 'Macbook'], demo: 'macbook', source: 'https://ui.aceternity.com/components/container-scroll-animation' },
  { slug: 'hero-parallax', name: 'Hero Parallax', type: 'effect', category: 'Scroll & reveal', description: 'Cartões de produto se movem em diferentes camadas enquanto a hero rola.', tags: ['Parallax', 'Scroll', 'Produto'], demo: 'parallax', source: 'https://ui.aceternity.com/components/hero-parallax' },

  // Interactive
  { slug: '3d-pin', name: '3D Pin', type: 'component', category: 'Interactive', description: 'Card elevado flutua no ar sustentado por um feixe vertical de luz e círculos concêntricos de radar.', tags: ['3D', 'Hover', 'Pin'], demo: '3d-pin', source: 'https://ui.aceternity.com/components/3d-pin', featured: true },
  { slug: 'pin-container', name: 'Pin Container', type: 'effect', category: 'Interactive', description: 'Um card elevado flutua no ar sustentado por um feixe de luz e anéis concêntricos.', tags: ['Pin', 'Scroll', '3D'], demo: '3d-pin', source: 'https://ui.aceternity.com/components/3d-pin' },
  { slug: 'moving-border', name: 'Moving Border', type: 'effect', category: 'Interactive', description: 'Um gradiente cônico percorre o contorno do botão ou card em 360 graus.', tags: ['Border', 'Conic', 'CTA'], demo: 'moving-border', source: 'https://ui.aceternity.com/components/moving-border', featured: true },
  { slug: 'hover-border-gradient', name: 'Hover Border Gradient', type: 'effect', category: 'Interactive', description: 'O contorno ganha brilho e contraste quando o card é explorado pelo cursor.', tags: ['Hover', 'Gradiente', 'Borda'], demo: 'moving-border', source: 'https://ui.aceternity.com/components/hover-border-gradient' },
  { slug: 'infinite-moving-cards', name: 'Infinite Moving Cards', type: 'component', category: 'Interactive', description: 'Depoimentos deslizam em uma esteira infinita contínua que pausa ao passar o mouse.', tags: ['Loop', 'Carrossel', 'Marquee'], demo: 'infinite-cards', source: 'https://ui.aceternity.com/components/infinite-moving-cards', featured: true },
  { slug: 'compare', name: 'Compare', type: 'component', category: 'Interactive', description: 'Um controle arrastável revela duas versões lado a lado dentro do mesmo quadro.', tags: ['Slider', 'Arrastar', 'Comparação'], demo: 'comparison', source: 'https://ui.aceternity.com/components/compare', featured: true },
  { slug: 'lens', name: 'Lens', type: 'component', category: 'Interactive', description: 'Uma lupa circular acompanha o cursor e amplia a área de inspeção em 2.5x com alta nitidez.', tags: ['Lupa', 'Cursor', 'Zoom'], demo: 'lens', source: 'https://ui.aceternity.com/components/lens', featured: true },
  { slug: 'animated-tooltip', name: 'Animated Tooltip', type: 'component', category: 'Interactive', description: 'Avatares interativos revelam uma tooltip dinâmica que segue o mouse com física de mola.', tags: ['Tooltip', 'Mola', 'Hover'], demo: 'animated-tooltip', source: 'https://ui.aceternity.com/components/animated-tooltip', featured: true },
  { slug: 'globe', name: 'Globe', type: 'component', category: 'Interactive', description: 'Uma esfera pontilhada com rotas conecta localizações em uma composição de dados globais.', tags: ['Globo', 'SVG', 'Rotas'], demo: 'globe', source: 'https://ui.aceternity.com/components' },
]

export const templateItems: CatalogItem[] = [
  { slug: 'saas-launch', name: 'SaaS Launchpad Pro', type: 'template', category: 'Templates', description: 'Landing page completa para software com hero iluminado, prova social, tabela de planos e FAQ.', tags: ['SaaS', 'Landing page', 'Pricing'], demo: 'template', source: 'https://ui.aceternity.com/templates/saas-launch', featured: true },
  { slug: 'studio-portfolio', name: 'Creative Studio Portfolio', type: 'template', category: 'Templates', description: 'Portfólio editorial para estúdios criativos e arquitetura com galeria imersiva e tipografia refinada.', tags: ['Portfolio', 'Studio', 'Editorial'], demo: 'template', source: 'https://ui.aceternity.com/templates/studio-portfolio', featured: true },
  { slug: 'agency-home', name: 'Digital Agency Showcase', type: 'template', category: 'Templates', description: 'Página de agência focada em conversão, apresentação de cases e depoimentos em carrossel.', tags: ['Agência', 'Serviços', 'Cases'], demo: 'template', source: 'https://ui.aceternity.com/templates/agency-home', featured: true },
  { slug: 'product-waitlist', name: 'Viral Product Waitlist', type: 'template', category: 'Templates', description: 'Landing de lançamento de produto com formulário interativo de lista de espera e contador ao vivo.', tags: ['Waitlist', 'Launch', 'Form'], demo: 'template', source: 'https://ui.aceternity.com/templates/product-waitlist', featured: true },
  { slug: 'dashboard-overview', name: 'Analytics Cloud Dashboard', type: 'template', category: 'Templates', description: 'Painel escuro de métricas em tempo real com gráficos, sidebar colapsável e feed de eventos.', tags: ['Dashboard', 'Analytics', 'App'], demo: 'template', source: 'https://ui.aceternity.com/templates/dashboard-overview', featured: true },
  { slug: 'docs-home', name: 'Developer Docs Hub', type: 'template', category: 'Templates', description: 'Portal de documentação e API com busca rápida, navegação hierárquica e blocos de código com cópia.', tags: ['Docs', 'Search', 'API'], demo: 'template', source: 'https://ui.aceternity.com/templates/docs-home', featured: true },
  { slug: 'creative-saas', name: 'Workflow Automation SaaS', type: 'template', category: 'Templates', description: 'Apresentação de plataforma B2B com diagramas de nós, visualização interativa de pipelines e CTA.', tags: ['SaaS', 'Product', 'Features'], demo: 'template', source: 'https://ui.aceternity.com/templates/creative-saas', featured: true },
  { slug: 'personal-brand', name: 'Design Engineer Portfolio', type: 'template', category: 'Templates', description: 'Página pessoal minimalista com manifesto, projetos em produção, artigos e links sociais.', tags: ['Personal', 'Portfolio', 'Minimal'], demo: 'template', source: 'https://ui.aceternity.com/templates/personal-brand', featured: true },
]

export const allItems = [...catalogItems, ...templateItems]

const commonUsage = `import { motion } from "framer-motion";\n\n// Instalação necessária: pnpm add framer-motion lucide-react clsx tailwind-merge\n// Copie os arquivos abaixo para seu projeto React / Next.js.`

export function snippetsFor(item: CatalogItem) {
  const rawTitle = item.name.replace(/[^\p{L}\p{N}]+/gu, '') || 'Showcase'
  const title = /^[A-Za-z_$]/.test(rawTitle) ? rawTitle : `Example${rawTitle}`
  const template = item.demo === 'template' ? (templateCopy[item.slug] ?? templateCopy['saas-launch']) : undefined

  const tsxByDemo: Record<DemoKind, string> = {
    lamp: `export function ${title}() {\n  return (\n    <div className="lamp-container">\n      <div className="lamp-beam-left" />\n      <div className="lamp-beam-right" />\n      <div className="lamp-glow" />\n      <h1 className="lamp-title">Build websites the right way</h1>\n    </div>\n  );\n}`,
    sparkles: `export function ${title}() {\n  return (\n    <div className="sparkles-container">\n      <SparklesCore minSize={0.6} maxSize={2.4} particleDensity={100} />\n      <h1 className="sparkles-title">Aceternity UI</h1>\n    </div>\n  );\n}`,
    meteors: `export function ${title}() {\n  return (\n    <div className="meteors-card">\n      <Meteors number={20} />\n      <h3>Meteors Effect</h3>\n      <p>Card com rastro de meteoros luminosos em movimento contínuo.</p>\n    </div>\n  );\n}`,
    'apple-carousel': `export function ${title}() {\n  return (\n    <div className="apple-carousel">\n      {cards.map(card => <AppleCard key={card.id} card={card} />)}\n    </div>\n  );\n}`,
    'following-pointer': `export function ${title}() {\n  return (\n    <FollowerPointerCard title="Designer">\n      <div className="content-card">Passe o cursor para ver o ponteiro customizado.</div>\n    </FollowerPointerCard>\n  );\n}`,
    'link-preview': `export function ${title}() {\n  return (\n    <p>\n      Visite o <LinkPreview url="https://tailwindcss.com">Tailwind CSS</LinkPreview> para mais detalhes.\n    </p>\n  );\n}`,
    'colourful-text': `export function ${title}() {\n  return (\n    <h1>\n      Make your websites look <ColourfulText text="10x better" />\n    </h1>\n  );\n}`,
    'canvas-reveal': `export function ${title}() {\n  return (\n    <CanvasRevealEffect animationSpeed={3} containerClassName="bg-black" colors={[[125, 211, 252]]} />\n  );\n}`,
    aurora: `export function ${title}() {\n  return (\n    <section className="aurora-hero">\n      <div className="aurora-layer" aria-hidden="true" />\n      <div className="hero-copy">\n        <p>IDEIAS QUE GANHAM FORMA</p>\n        <h1>Interfaces com <span>movimento.</span></h1>\n        <button>Explorar coleção <span aria-hidden="true">↗</span></button>\n      </div>\n    </section>\n  );\n}`,
    beam: `export function ${title}() {\n  return (\n    <div className="beam-stage">\n      <svg className="beam-lines" viewBox="0 0 800 360" aria-hidden="true">\n        <path d="M0 280 C190 60 450 420 800 95" />\n        <path d="M40 340 C280 120 480 20 780 260" />\n      </svg>\n      <div className="stage-content">\n        <span>CAMADA DE FUNDO</span>\n        <h2>Deixe a luz<br />fazer o trabalho.</h2>\n      </div>\n    </div>\n  );\n}`,
    ripple: `export function ${title}() {\n  return <div className="ripple-grid">\n    {Array.from({ length: 36 }, (_, index) => (\n      <button key={index} aria-label={\`Célula \${index + 1}\`}\n        onClick={(event) => event.currentTarget.classList.add("is-active")} />\n    ))}\n  </div>;\n}`,
    dots: `export function ${title}() {\n  return <div className="dot-field" aria-hidden="true">\n    <div className="dot-field__glow" />\n  </div>;\n}`,
    spotlight: `export function ${title}() {\n  return (\n    <section className="spotlight-panel">\n      <div className="spotlight-panel__light" aria-hidden="true" />\n      <div className="spotlight-panel__content">\n        <span>UM DETALHE, OUTRA SENSAÇÃO</span>\n        <h2>Foco que acompanha<br />o seu <em>olhar.</em></h2>\n      </div>\n    </section>\n  );\n}`,
    card: `export function ${title}() {\n  return (\n    <article className="interactive-card">\n      <div className="interactive-card__shine" aria-hidden="true" />\n      <span className="eyebrow">COLEÇÃO / 01</span>\n      <h3>Detalhes que<br />respondem a você.</h3>\n      <p>Explore com o cursor para ver a camada de luz se mover.</p>\n      <button>Ver detalhes <span aria-hidden="true">↗</span></button>\n    </article>\n  );\n}`,
    grid: `export function ${title}() {\n  return <div className="layout-grid">\n    {cards.map((card) => <button className="layout-grid__item" key={card.id}>\n      <span>{card.index}</span><strong>{card.title}</strong>\n    </button>)}\n  </div>;\n}`,
    bento: `export function ${title}() {\n  return <section className="bento-grid">\n    <article className="bento-grid__lead"><span>WORKSPACE</span><h2>Um só lugar.<br />Mais espaço para criar.</h2></article>\n    <article><span>01 / COLABORAÇÃO</span><p>Ideias compartilhadas, sempre em movimento.</p></article>\n    <article><span>02 / VELOCIDADE</span><p>Do primeiro rascunho à próxima entrega.</p></article>\n  </section>;\n}`,
    menu: `export function ${title}() {\n  return <nav className="nav-demo" aria-label="Navegação principal">\n    <a className="nav-demo__brand" href="#top">northstar<span>®</span></a>\n    <div className="nav-demo__links">\n      <button>Produto <span>⌄</span></button><a href="#sobre">Sobre</a><a href="#notas">Notas</a>\n    </div>\n    <button className="nav-demo__cta">Entrar em contato ↗</button>\n  </nav>;\n}`,
    text: `export function ${title}() {\n  return <h2 className="generated-copy">\n    {"Faça a próxima ideia acontecer.".split(" ").map((word, index) =>\n      <motion.span key={word + index} initial={{ opacity: 0, y: 10 }}\n        animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>\n        {word}{" "}\n      </motion.span>\n    )}\n  </h2>;\n}`,
    flip: `export function ${title}() {\n  return <p className="flip-copy">Crie algo <span className="flip-word">inesquecível</span></p>;\n}`,
    typewriter: `export function ${title}() {\n  const [text, setText] = useState("");\n  const phrase = "Interfaces que contam histórias.";\n  useEffect(() => {\n    const timer = window.setInterval(() => setText((value) =>\n      phrase.slice(0, value.length + 1)), 72);\n    return () => window.clearInterval(timer);\n  }, []);\n  return <h2>{text}<span className="cursor" aria-hidden="true">|</span></h2>;\n}`,
    encrypted: `export function ${title}() {\n  return <p className="encrypted-copy" aria-label="Criatividade em movimento">\n    {revealedText}\n  </p>;\n}`,
    squiggle: `export function ${title}() {\n  return <h2 className="squiggly-copy">\n    Movimento com intenção.\n  </h2>;\n}`,
    sticky: `export function ${title}() {\n  return <section className="sticky-story">\n    <div className="sticky-story__visual">A ideia, em camadas.</div>\n    <div className="sticky-story__steps">\n      {steps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.copy}</p></article>)}\n    </div>\n  </section>;\n}`,
    timeline: `export function ${title}() {\n  return <ol className="timeline">\n    {milestones.map((item) => <li key={item.date}>\n      <time>{item.date}</time><h3>{item.title}</h3><p>{item.copy}</p>\n    </li>)}\n  </ol>;\n}`,
    dock: `export function ${title}() {\n  return <nav className="floating-dock" aria-label="Atalhos">\n    {items.map((item) => <a key={item.label} href={item.href} title={item.label}>\n      <item.icon aria-hidden="true" />\n    </a>)}\n  </nav>;\n}`,
    banner: `export function ${title}() {\n  return <aside className="announcement">\n    <span className="announcement__dot" />Uma nova coleção chegou.\n    <a href="#colecao">Conheça agora ↗</a>\n  </aside>;\n}`,
    globe: `export function ${title}() {\n  return <div className="globe-stage" role="img" aria-label="Rotas conectando uma rede global">\n    <div className="globe-stage__sphere"><span /><span /><span /></div>\n    <div className="globe-stage__orbit" />\n  </div>;\n}`,
    cards: `export function ${title}() {\n  return <div className="card-stack">\n    {items.map((item) => <article key={item.title}><span>{item.label}</span>\n      <h3>{item.title}</h3><p>{item.description}</p></article>)}\n  </div>;\n}`,
    pin: `export function ${title}() {\n  return <section className="pin-section">\n    <div className="pin-section__frame">\n      <span>PINNED VIEW</span><h2>Continue explorando<br />enquanto a história avança.</h2>\n    </div>\n  </section>;\n}`,
    parallax: `export function ${title}() {\n  return <div className="parallax-columns">\n    {columns.map((column, index) => <div className="parallax-column" data-speed={index + 1} key={index}>\n      {column.map((tile) => <article key={tile.title}>{tile.title}</article>)}\n    </div>)}\n  </div>;\n}`,
    comparison: `export function ${title}() {\n  return <div className="comparison-demo">\n    <div className="comparison-demo__after">AFTER</div>\n    <div className="comparison-demo__before">BEFORE</div>\n    <input type="range" min="0" max="100" defaultValue="52" aria-label="Compare as versões" />\n  </div>;\n}`,
    template: `export function ${title}() {\n  return <main className="landing-page">\n    <nav><a className="brand" href="#top">northstar®</a><a href="#features">Produto</a><a href="#pricing">Planos</a><button>Começar ↗</button></nav>\n    <section className="landing-hero"><p>UMA NOVA FORMA DE FAZER</p>\n      <h1>Transforme ideias em<br /><span>momentos de clareza.</span></h1>\n      <p>Ferramentas para o próximo capítulo do seu trabalho.</p>\n      <button>Explorar a experiência</button></section>\n  </main>;\n}`,
    button: `export function ${title}() {\n  return <button className="moving-border-button">\n    <span className="moving-border-button__glow" aria-hidden="true" />\n    <span>Começar a explorar <b aria-hidden="true">↗</b></span>\n  </button>;\n}`,
    logos: `export function ${title}() {\n  return <div className="logo-marquee" aria-label="Marcas que usam o produto">\n    {logos.map((logo) => <span key={logo}>{logo}</span>)}\n  </div>;\n}`,
    vortex: `export function ${title}() {\n  // Canvas animado com partículas em vórtice gravitacional\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n  return (\n    <div className="vortex-container">\n      <canvas ref={canvasRef} />\n      <div className="vortex-content">\n        <h2>Vortex Particle System</h2>\n      </div>\n    </div>\n  );\n}`,
    wavy: `export function ${title}() {\n  // Canvas fluido com ondas senoidais multicamadas em blur\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n  return (\n    <div className="wavy-wrapper">\n      <canvas ref={canvasRef} />\n      <h1>Wavy Gradient Background</h1>\n    </div>\n  );\n}`,
    collision: `export function ${title}() {\n  // Feixes laser com colisão e fagulhas em partículas\n  return (\n    <div className="beams-collision-stage">\n      <canvas className="beams-canvas" />\n      <h2>Beams With Collision</h2>\n    </div>\n  );\n}`,
    '3d-card': `export function ${title}() {\n  const [rot, setRot] = useState({ x: 0, y: 0 });\n  return (\n    <div className="card-3d-perspective">\n      <div className="card-3d-body" style={{ transform: \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\` }}>\n        <h3 style={{ transform: "translateZ(50px)" }}>3D Depth Card</h3>\n        <button style={{ transform: "translateZ(40px)" }}>Interagir ↗</button>\n      </div>\n    </div>\n  );\n}`,
    'glare-card': `export function ${title}() {\n  const [pos, setPos] = useState({ x: 50, y: 50 });\n  return (\n    <div className="glare-card" onPointerMove={(e) => {/* calcula pos */}}>\n      <div className="glare-foil" style={{ background: \`radial-gradient(circle at \${pos.x}% \${pos.y}%, rgba(255,255,255,0.4), transparent)\` }} />\n      <h3>Holographic Glare</h3>\n    </div>\n  );\n}`,
    'card-spotlight': `export function ${title}() {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  return (\n    <div className="card-spotlight" onMouseMove={(e) => setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}>\n      <div className="spotlight-layer" style={{ background: \`radial-gradient(300px circle at \${pos.x}px \${pos.y}px, rgba(167,139,250,0.25), transparent)\` }} />\n      <h3>Card Spotlight</h3>\n    </div>\n  );\n}`,
    'focus-cards': `export function ${title}() {\n  const [hovered, setHovered] = useState<number | null>(null);\n  return (\n    <div className="focus-cards-grid">\n      {cards.map((c, i) => (\n        <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}\n          className={hovered !== null && hovered !== i ? "is-dimmed" : "is-active"}>\n          <h4>{c.title}</h4>\n        </div>\n      ))}\n    </div>\n  );\n}`,
    'expandable-cards': `export function ${title}() {\n  const [selected, setSelected] = useState(null);\n  return (\n    <div className="expandable-wrapper">\n      {items.map(item => (\n        <motion.div layoutId={item.id} onClick={() => setSelected(item)}>\n          <h3>{item.title}</h3>\n        </motion.div>\n      ))}\n    </div>\n  );\n}`,
    'infinite-cards': `export function ${title}() {\n  return (\n    <div className="infinite-marquee-wrapper">\n      <div className="infinite-marquee-track">\n        {testimonials.map((t, i) => <Card key={i} {...t} />)}\n      </div>\n    </div>\n  );\n}`,
    macbook: `export function ${title}() {\n  const [angle, setAngle] = useState(25);\n  return (\n    <div className="macbook-3d-scene">\n      <div className="macbook-lid" style={{ transform: \`rotateX(\${angle}deg)\` }}>\n        <div className="screen-content">App Studio Retina</div>\n      </div>\n      <div className="macbook-base" />\n    </div>\n  );\n}`,
    lens: `export function ${title}() {\n  const [pos, setPos] = useState({ x: 50, y: 50 });\n  return (\n    <div className="lens-container" onPointerMove={(e) => {/* atualiza pos */}}>\n      <div className="lens-target" />\n      <div className="lens-loupe" style={{ left: \`\${pos.x}%\`, top: \`\${pos.y}%\` }} />\n    </div>\n  );\n}`,
    'animated-tooltip': `export function ${title}() {\n  return (\n    <div className="tooltip-avatars">\n      {users.map(u => (\n        <div key={u.id} className="avatar-item">\n          <span className="tooltip-popup">{u.name}</span>\n          <div className="avatar-img">{u.initials}</div>\n        </div>\n      ))}\n    </div>\n  );\n}`,
    '3d-pin': `export function ${title}() {\n  return (\n    <div className="pin-3d-container">\n      <div className="pin-card-floating">Aceternity 3D Pin</div>\n      <div className="pin-light-beam" />\n      <div className="pin-radar-rings" />\n    </div>\n  );\n}`,
    'moving-border': `export function ${title}() {\n  return (\n    <div className="moving-border-btn">\n      <div className="moving-conic-beam" />\n      <button>Moving Border CTA ↗</button>\n    </div>\n  );\n}`,
    'hero-highlight': `export function ${title}() {\n  return (\n    <h1>\n      Criatividade com <span className="hero-highlight-marker">marcação luminosa</span>\n    </h1>\n  );\n}`,
    'wobble-card': `export function ${title}() {\n  const [xy, setXY] = useState({ x: 0, y: 0 });\n  return (\n    <div className="wobble-card" style={{ transform: \`translate(\${xy.x}px, \${xy.y}px)\` }}>\n      <h3>Elastic Wobble Card</h3>\n    </div>\n  );\n}`,
  }

  const cssByDemo: Record<DemoKind, string> = {
    lamp: `.lamp-container { position: relative; display: flex; min-height: 350px; justify-content: center; background: #09090b; }`,
    sparkles: `.sparkles-container { position: relative; width: 100%; height: 300px; background: #000; }`,
    meteors: `.meteors-card { position: relative; overflow: hidden; border-radius: 16px; background: #111; }`,
    'apple-carousel': `.apple-carousel { display: flex; gap: 16px; overflow-x: auto; }`,
    'following-pointer': `.follower-card { cursor: none; position: relative; }`,
    'link-preview': `.link-preview-popup { position: absolute; z-index: 50; border-radius: 12px; }`,
    'colourful-text': `.colourful-text span { transition: color 0.5s ease; }`,
    'canvas-reveal': `.canvas-reveal { background-size: 12px 12px; }`,
    aurora: `.aurora-hero { position: relative; overflow: hidden; background: #08080c; }\n.aurora-layer { position: absolute; inset: -35%; background: radial-gradient(ellipse at 20% 45%, #6538d7aa, transparent 42%), radial-gradient(ellipse at 80% 50%, #146cc599, transparent 38%); filter: blur(70px); animation: drift 14s ease-in-out infinite alternate; }\n@keyframes drift { to { transform: translate3d(4%, -3%, 0) rotate(8deg); } }`,
    beam: `.beam-stage { position: relative; overflow: hidden; background: #09090c; }\n.beam-lines { position: absolute; inset: 0; width: 100%; height: 100%; }\n.beam-lines path { fill: none; stroke: #8b5cf6; stroke-width: 1.2; stroke-dasharray: 8 10; animation: dash 10s linear infinite; }\n@keyframes dash { to { stroke-dashoffset: -180; } }`,
    ripple: `.ripple-grid { display: grid; grid-template-columns: repeat(6, 1fr); }\n.ripple-grid button { aspect-ratio: 1; border: 1px solid #ffffff12; background: transparent; transition: background .45s, box-shadow .45s; }\n.ripple-grid button:hover, .ripple-grid button.is-active { background: #8b5cf655; box-shadow: 0 0 28px #8b5cf677; }`,
    dots: `.dot-field { background-image: radial-gradient(#a78bfa 1px, transparent 1.6px); background-size: 21px 21px; mask-image: radial-gradient(ellipse, #000 15%, transparent 75%); animation: pulse 4s ease-in-out infinite alternate; }\n@keyframes pulse { to { opacity: .4; } }`,
    spotlight: `.spotlight-panel { position: relative; isolation: isolate; overflow: hidden; }\n.spotlight-panel__light { position: absolute; z-index: -1; inset: -50%; background: radial-gradient(circle at var(--x, 50%) var(--y, 45%), #a78bfa44, transparent 28%); }`,
    card: `.interactive-card { position: relative; isolation: isolate; overflow: hidden; border: 1px solid #ffffff20; border-radius: 24px; background: linear-gradient(145deg, #15121e, #09090c); transition: transform .35s, border-color .35s; }\n.interactive-card:hover { transform: translateY(-5px) rotateX(2deg); border-color: #9b7bf477; }\n.interactive-card__shine { position: absolute; inset: -1px; z-index: -1; background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), #8b5cf633, transparent 38%); }`,
    grid: `.layout-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.layout-grid__item { min-height: 110px; border: 1px solid #ffffff15; border-radius: 16px; background: #111116; text-align: left; transition: .25s; }\n.layout-grid__item:hover { background: #191522; transform: translateY(-3px); }`,
    bento: `.bento-grid { display: grid; grid-template-columns: 1.35fr 1fr; gap: 12px; }\n.bento-grid article { min-height: 170px; border: 1px solid #ffffff14; border-radius: 20px; padding: 22px; background: linear-gradient(145deg, #18151f, #101013); }\n.bento-grid__lead { grid-row: span 2; }`,
    menu: `.nav-demo { display: flex; align-items: center; justify-content: space-between; border: 1px solid #ffffff18; border-radius: 999px; padding: 10px 14px 10px 20px; background: #101014dd; backdrop-filter: blur(18px); }\n.nav-demo__links { display: flex; gap: 22px; align-items: center; }\n.nav-demo__cta { border-radius: 999px; background: #f4f0ff; color: #16121e; padding: 11px 15px; }`,
    text: `.generated-copy span { display: inline-block; background: linear-gradient(90deg,#fff,#bda9ff); color: transparent; background-clip: text; }`,
    flip: `.flip-word { display: inline-block; color: #c4b5fd; animation: flip-in .55s cubic-bezier(.2,.75,.2,1); }\n@keyframes flip-in { from { opacity: 0; transform: translateY(20px) rotateX(-40deg); } to { opacity: 1; transform: none; } }`,
    typewriter: `.cursor { color: #c4b5fd; animation: blink .8s steps(2) infinite; }\n@keyframes blink { 50% { opacity: 0; } }`,
    encrypted: `.encrypted-copy { color: #c4b5fd; font: 600 1.4rem ui-monospace, monospace; letter-spacing: .08em; }`,
    squiggle: `.squiggly-copy { text-decoration: underline wavy #a78bfa; text-decoration-thickness: 2px; text-underline-offset: 10px; }`,
    sticky: `.sticky-story { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }\n.sticky-story__visual { position: sticky; top: 24px; display: grid; place-items: center; min-height: 300px; border-radius: 20px; background: radial-gradient(ellipse,#5c3fa044,#13111b 65%); }`,
    timeline: `.timeline { border-left: 1px solid #ffffff22; list-style: none; padding-left: 24px; }\n.timeline li { position: relative; padding: 0 0 26px; }\n.timeline li::before { content: ''; position: absolute; left: -29px; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: #a78bfa; box-shadow: 0 0 14px #a78bfa; }`,
    dock: `.floating-dock { display: flex; gap: 7px; padding: 10px; border: 1px solid #ffffff1a; border-radius: 20px; background: #111116dd; box-shadow: 0 18px 50px #0008; }\n.floating-dock a { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 12px; transition: transform .2s, background .2s; }\n.floating-dock a:hover { transform: translateY(-6px) scale(1.08); background: #ffffff12; }`,
    banner: `.announcement { display: flex; align-items: center; gap: 10px; border: 1px solid #ffffff16; border-radius: 14px; background: #111116; padding: 13px 16px; }\n.announcement__dot { width: 7px; height: 7px; border-radius: 50%; background: #a78bfa; box-shadow: 0 0 14px #a78bfa; }`,
    globe: `.globe-stage__sphere { position: relative; width: 190px; aspect-ratio: 1; border: 1px solid #a78bfa44; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #8b5cf655, #11131e 65%); box-shadow: inset -15px -12px 34px #0009, 0 0 48px #8b5cf622; }\n.globe-stage__orbit { position: absolute; inset: 22% -12%; border: 1px solid #c4b5fd55; border-radius: 50%; transform: rotate(-23deg); }`,
    cards: `.card-stack { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }\n.card-stack article { border: 1px solid #ffffff16; border-radius: 18px; padding: 19px; background: #121217; transition: transform .25s; }\n.card-stack article:hover { transform: translateY(-4px); }`,
    pin: `.pin-section__frame { position: sticky; top: 15vh; min-height: 270px; border-radius: 22px; padding: 30px; background: linear-gradient(130deg,#201738,#0d1018); border: 1px solid #ffffff20; }`,
    parallax: `.parallax-columns { display: flex; gap: 12px; overflow: hidden; }\n.parallax-column { flex: 1; display: grid; gap: 12px; }\n.parallax-column article { min-height: 130px; display: grid; place-items: center; border-radius: 15px; background: linear-gradient(145deg,#29213b,#111116); }`,
    comparison: `.comparison-demo { position: relative; min-height: 240px; overflow: hidden; border-radius: 20px; background: linear-gradient(140deg,#594988,#211d30); }\n.comparison-demo__after { position: absolute; inset: 0 48% 0 0; background: linear-gradient(140deg,#3b414f,#20232a); }\n.comparison-demo input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; }`,
    template: `.landing-page { min-height: 340px; padding: 22px; background: radial-gradient(ellipse at 50% 15%,#4a327655,transparent 44%),#09090c; }\n.landing-page nav { display: flex; justify-content: space-between; align-items: center; }\n.landing-hero { max-width: 660px; margin: 50px auto 20px; text-align: center; }\n.landing-hero h1 span { color: #c4b5fd; }`,
    button: `.moving-border-button { position: relative; overflow: hidden; border: 1px solid #a78bfa77; border-radius: 999px; background: #121019; color: white; padding: 14px 20px; }\n.moving-border-button__glow { position: absolute; inset: -40%; background: conic-gradient(from var(--angle,0deg),transparent 65%,#c4b5fd); animation: spin 4s linear infinite; }\n@keyframes spin { to { --angle: 360deg; } }`,
    logos: `.logo-marquee { display: flex; gap: 32px; width: max-content; color: #c9c5d2; animation: marquee 24s linear infinite; }\n.logo-marquee:hover { animation-play-state: paused; }\n@keyframes marquee { to { transform: translateX(-30%); } }`,
    vortex: `.vortex-container { position: relative; width: 100%; height: 350px; background: #09090d; overflow: hidden; }`,
    wavy: `.wavy-wrapper { position: relative; width: 100%; height: 320px; background: #09090e; }`,
    collision: `.beams-collision-stage { position: relative; width: 100%; height: 340px; background: #08080d; }`,
    '3d-card': `.card-3d-perspective { perspective: 1000px; }\n.card-3d-body { transform-style: preserve-3d; transition: transform 0.1s ease-out; }`,
    'glare-card': `.glare-card { position: relative; overflow: hidden; border-radius: 20px; background: #121118; }\n.glare-foil { position: absolute; inset: 0; mix-blend-mode: screen; pointer-events: none; }`,
    'card-spotlight': `.card-spotlight { position: relative; overflow: hidden; border-radius: 16px; background: #0d0d12; }\n.spotlight-layer { position: absolute; inset: 0; pointer-events: none; }`,
    'focus-cards': `.focus-cards-grid { display: flex; gap: 16px; }\n.is-dimmed { filter: blur(4px) brightness(0.5); transform: scale(0.96); }\n.is-active { transform: scale(1.04); }`,
    'expandable-cards': `.expandable-wrapper { display: flex; flex-direction: column; gap: 12px; }`,
    'infinite-cards': `.infinite-marquee-track { display: flex; gap: 16px; animation: marquee 20s linear infinite; }\n.infinite-marquee-track:hover { animation-play-state: paused; }`,
    macbook: `.macbook-3d-scene { perspective: 1000px; }\n.macbook-lid { transform-origin: bottom center; transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1); }`,
    lens: `.lens-container { position: relative; overflow: hidden; cursor: crosshair; }\n.lens-loupe { position: absolute; width: 120px; height: 120px; border-radius: 50%; border: 2px solid #a78bfa; overflow: hidden; pointer-events: none; }`,
    'animated-tooltip': `.tooltip-avatars { display: flex; align-items: center; }\n.tooltip-popup { position: absolute; top: -50px; background: #121118; border-radius: 8px; padding: 6px 10px; }`,
    '3d-pin': `.pin-3d-container { perspective: 1000px; }\n.pin-card-floating { transform: rotateX(30deg); }\n.pin-radar-rings { width: 80px; height: 80px; border-radius: 50%; border: 1px solid #a78bfa; }`,
    'moving-border': `.moving-border-btn { position: relative; padding: 2px; border-radius: 999px; overflow: hidden; }\n.moving-conic-beam { position: absolute; inset: -100%; background: conic-gradient(from 0deg, transparent 70%, #a78bfa); animation: spin 3s linear infinite; }`,
    'hero-highlight': `.hero-highlight-marker { background: linear-gradient(to right, #a78bfa, #c084fc); color: #08080c; border-radius: 4px; padding: 2px 6px; }`,
    'wobble-card': `.wobble-card { transition: transform 0.12s cubic-bezier(0.2,0.8,0.2,1); }`,
  }

  const templateComponent = template ? `export function ${title}() {
  const navigation = ${JSON.stringify(template.nav)};
  return (
    <main className="landing-page template-${item.slug}">
      <nav aria-label="Primary navigation">
        <a className="brand" href="#top">${template.brand}<sup>®</sup></a>
        <div className="nav-links">
          {navigation.map((label) => <a href="#section" key={label}>{label}</a>)}
        </div>
        <button type="button">${template.nav[0]} ↗</button>
      </nav>
      <section className="landing-hero">
        <p className="eyebrow">${template.eyebrow}</p>
        <h1>${template.headline[0]}<br /><em>${template.headline[1]}</em></h1>
        <p>${template.description}</p>
        <button type="button">${template.action} <span aria-hidden="true">↗</span></button>
      </section>
      <footer>${template.footer}</footer>
    </main>
  );
}` : tsxByDemo[item.demo]

  const styles = template ? `${cssByDemo.template}\n\n${templateStyles[item.slug] ?? ''}` : cssByDemo[item.demo]
  return { 'Component.tsx': templateComponent, 'styles.css': styles, 'Usage': commonUsage }
}
