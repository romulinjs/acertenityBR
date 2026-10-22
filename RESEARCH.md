# Engenharia reversa — notas da referência

A referência escolhida foi o [catálogo público de componentes Aceternity UI][1]. As páginas consultadas descrevem uma biblioteca de componentes para React/Next.js com Tailwind e Motion. A implementação deste projeto usa os comportamentos e a organização como referência, mas o código e as demos são independentes.

## Padrões observados

**Fundos e heros.** Os exemplos incluem feixes e caminhos SVG, auroras e mesh gradients, ondas, pontos brilhantes, grades, ruído e partículas. Em geral, o texto permanece acima de uma camada visual decorativa. Background Ripple Effect é descrito como uma grade que reage ao hover e clique; Hero Highlight acompanha o cursor; várias outras famílias são descritas como animações contínuas, sem que a documentação confirme acompanhamento do ponteiro. Há exemplos de heros com feixes e grade, luzes cintilantes, ruído, imagens e movimento de mouse. [1] [2] [3] [6] [7] [8] [9]

**Cards e seções de recursos.** A referência separa cards individuais de seções completas. Entre os exemplos estão cards editoriais, overlays que surgem no hover, bento grid e listas de recursos com variações de gradiente ou hover. As descrições confirmam cards que expandem ao clique, itens de layout grid que animam ao selecionar, wobble guiado pelo ponteiro e camadas em perspectiva no 3D Card Effect. [4] [5] [38] [39]

**Navegação.** Há navbar com mega menu animado ao hover, sidebar expansível e responsiva, navbar flutuante que se esconde ao rolar para baixo e reaparece ao subir, navbar que muda de largura durante a rolagem, dock flutuante com variantes desktop/mobile e faixa de anúncio que pode desaparecer após scroll. A documentação explicita estados e opções de controle, mas não permite confirmar todos os detalhes de aparência, acessibilidade e breakpoints. [10] [11] [12] [13] [14] [15]

**Texto e spotlight.** As descrições incluem revelação gradual de palavras, máquina de escrever, troca temporizada de palavras, texto embaralhado que se resolve, distorção ondulada em SVG e card que revela texto no hover. Spotlight e Spotlight New são documentados como efeitos suaves de luz e gradiente; não foi inferido que acompanhem o cursor quando isso não é especificado. [16] [17] [18] [19] [20] [21]

**Scroll e revelação.** A família inclui conteúdo sticky com texto em etapas, transformações de perspectiva guiadas pela rolagem, produto em destaque, hero parallax, grade parallax com colunas em direções opostas, beam ao longo de um percurso SVG e timeline com feixe. As descrições confirmam as famílias de movimento, não valores exatos de gatilho, duração ou easing. [22] [23] [24] [25] [26] [27] [28]

**Interação e 3D.** Foram encontrados exemplos de tilt e profundidade em cards, pin em perspectiva, imagem com separação cromática, canvas pixelado que responde ao cursor, comparador arrastável, foco de cards, lente, hover de card e tooltip animado. A documentação expõe props e modos de interação, mas não comprova, por si só, suporte equivalente a teclado, toque ou redução de movimento em cada componente. [29] [30] [31] [32] [33] [34] [35] [36] [37]

A inspeção textual é representativa, não uma enumeração completa do catálogo. Ela não substitui a inspeção visual e interativa de todos os previews, variantes responsivas ou implementações publicadas; por isso, este clone evita alegar cobertura literal ou reutilizar código-fonte da referência.

## Referências

[1]: https://ui.aceternity.com/components "Aceternity UI Components"
[2]: https://ui.aceternity.com/blocks/hero-sections "Aceternity UI Hero Sections"
[3]: https://ui.aceternity.com/blocks/backgrounds "Aceternity UI Backgrounds"
[4]: https://ui.aceternity.com/components/cards-free "Aceternity UI Cards"
[5]: https://ui.aceternity.com/components/feature-sections-free "Aceternity UI Feature Sections"
[6]: https://ui.aceternity.com/components/background-beams "Background Beams"
[7]: https://ui.aceternity.com/components/aurora-background "Aurora Background"
[8]: https://ui.aceternity.com/components/background-ripple-effect "Background Ripple Effect"
[9]: https://ui.aceternity.com/components/hero-highlight "Hero Highlight"
[10]: https://ui.aceternity.com/components/navbar-menu "Navbar Menu"
[11]: https://ui.aceternity.com/components/sidebar "Sidebar"
[12]: https://ui.aceternity.com/components/floating-navbar "Floating Navbar"
[13]: https://ui.aceternity.com/components/resizable-navbar "Resizable Navbar"
[14]: https://ui.aceternity.com/components/floating-dock "Floating Dock"
[15]: https://ui.aceternity.com/components/sticky-banner "Sticky Banner"
[16]: https://ui.aceternity.com/components/text-generate-effect "Text Generate Effect"
[17]: https://ui.aceternity.com/components/typewriter-effect "Typewriter Effect"
[18]: https://ui.aceternity.com/components/flip-words "Flip Words"
[19]: https://ui.aceternity.com/components/encrypted-text "Encrypted Text"
[20]: https://ui.aceternity.com/components/squiggly-text "Squiggly Text"
[21]: https://ui.aceternity.com/components/text-reveal-card "Text Reveal Card"
[22]: https://ui.aceternity.com/components/sticky-scroll-reveal "Sticky Scroll Reveal"
[23]: https://ui.aceternity.com/components/container-scroll-animation "Container Scroll Animation"
[24]: https://ui.aceternity.com/components/macbook-scroll "Macbook Scroll"
[25]: https://ui.aceternity.com/components/hero-parallax "Hero Parallax"
[26]: https://ui.aceternity.com/components/parallax-scroll "Parallax Scroll"
[27]: https://ui.aceternity.com/components/tracing-beam "Tracing Beam"
[28]: https://ui.aceternity.com/components/timeline "Timeline"
[29]: https://ui.aceternity.com/components/3d-pin "3D Pin"
[30]: https://ui.aceternity.com/components/chromatic-image "Chromatic Image"
[31]: https://ui.aceternity.com/components/pixelated-canvas "Pixelated Canvas"
[32]: https://ui.aceternity.com/components/compare "Compare"
[33]: https://ui.aceternity.com/components/focus-cards "Focus Cards"
[34]: https://ui.aceternity.com/components/lens "Lens"
[35]: https://ui.aceternity.com/components/card-hover-effect "Card Hover Effect"
[36]: https://ui.aceternity.com/components/animated-tooltip "Animated Tooltip"
[37]: https://ui.aceternity.com/components/glare-card "Glare Card"
[38]: https://ui.aceternity.com/components/3d-card-effect "3D Card Effect"
[39]: https://ui.aceternity.com/components/wobble-card "Wobble Card"
