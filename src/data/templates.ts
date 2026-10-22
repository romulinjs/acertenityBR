export type TemplateCopy = {
  brand: string
  nav: string[]
  eyebrow: string
  headline: [string, string]
  description: string
  action: string
  footer: string
}

export const templateCopy: Record<string, TemplateCopy> = {
  'saas-launch': { brand: 'northstar', nav: ['Product', 'Pricing'], eyebrow: 'DESIGNING WHAT COMES NEXT', headline: ['Find your', 'northstar.'], description: 'Tools and ideas for a clearer way forward.', action: 'Explore the experience', footer: 'INDEPENDENT THINKING' },
  'studio-portfolio': { brand: 'FRAME / 01', nav: ['Work', 'Studio'], eyebrow: 'SELECTED WORK / 2022—26', headline: ['Form follows', 'feeling.'], description: 'An independent creative studio working across digital and culture.', action: 'View selected work', footer: 'NYC · LONDON · EVERYWHERE' },
  'agency-home': { brand: 'FORMS & CO.', nav: ['Services', 'Work'], eyebrow: 'STRATEGY × DESIGN', headline: ['Make room', 'for better.'], description: 'We build brands and digital products with something to say.', action: 'Meet the studio', footer: 'INDEPENDENT DIGITAL AGENCY' },
  'product-waitlist': { brand: 'NEXT / 01', nav: ['The product', 'Updates'], eyebrow: 'EARLY ACCESS · OPEN', headline: ['A clearer way', 'to create.'], description: 'A little more space for your next big idea.', action: 'Join the waitlist', footer: '1,284 PEOPLE ALREADY IN' },
  'dashboard-overview': { brand: 'NORTHSTAR / APP', nav: ['Overview', 'Projects'], eyebrow: 'WORKSPACE / OVERVIEW', headline: ['Your work,', 'in focus.'], description: 'A quieter way to keep projects moving.', action: 'Open workspace', footer: '3 PROJECTS · 8 TASKS' },
  'docs-home': { brand: 'AC / DOCS', nav: ['Components', 'Guides'], eyebrow: 'DEVELOPMENT DOCUMENTATION', headline: ['Build at', 'your pace.'], description: 'Everything you need to start, customize, and ship.', action: 'Read the guide', footer: 'SEARCH 62 COMPONENTS' },
  'creative-saas': { brand: 'MOTION / STUDIO', nav: ['Editor', 'Pricing'], eyebrow: 'YOUR NEXT CREATIVE TOOL', headline: ['Turn ideas', 'into feeling.'], description: 'Create vivid product stories without slowing the team down.', action: 'Explore the studio', footer: 'MADE FOR THE IN-BETWEEN' },
  'personal-brand': { brand: 'Marin Vale', nav: ['Writing', 'About'], eyebrow: 'DESIGNER · WRITER · MAKER', headline: ['Make things', 'with meaning.'], description: 'Independent designer building thoughtful digital experiences.', action: 'Selected work', footer: 'AVAILABLE FOR SELECT PROJECTS' },
}

export const templateStyles: Record<string, string> = {
  'saas-launch': `.landing-page.template-saas-launch { background: radial-gradient(ellipse at 50% 15%, #4a327655, transparent 44%), #09090c; }\n.landing-page.template-saas-launch .landing-hero { margin: 50px auto 20px; text-align: center; }`,
  'studio-portfolio': `.landing-page.template-studio-portfolio { background: radial-gradient(ellipse at 12% 92%, #85513b36, transparent 40%), linear-gradient(155deg, #171316, #0d0c0f); }\n.landing-page.template-studio-portfolio .brand, .landing-page.template-studio-portfolio h1 { font-family: Georgia, serif; }\n.landing-page.template-studio-portfolio .landing-hero { margin: 44px auto 20px 5%; text-align: left; }`,
  'agency-home': `.landing-page.template-agency-home { background: radial-gradient(ellipse at 90% 10%, #7651b546, transparent 45%), linear-gradient(145deg, #14111a, #0c0b10); }\n.landing-page.template-agency-home .landing-hero { max-width: 620px; margin: 46px auto; }`,
  'product-waitlist': `.landing-page.template-product-waitlist { background: radial-gradient(ellipse at 50% 0, #35618c55, transparent 55%), linear-gradient(160deg, #10151c, #0b0c11); }\n.landing-page.template-product-waitlist .landing-hero { max-width: 520px; border: 1px solid #a9d4ff20; border-radius: 16px; padding: 24px; background: #10192399; }`,
  'dashboard-overview': `.landing-page.template-dashboard-overview { background-image: linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px), radial-gradient(ellipse at 85% 0, #54478255, transparent 46%); background-size: 30px 30px, 30px 30px, auto; }\n.landing-page.template-dashboard-overview .landing-hero { max-width: 720px; border: 1px solid #ffffff1b; border-radius: 12px; padding: 26px; background: #101016d9; text-align: left; }`,
  'docs-home': `.landing-page.template-docs-home { background: radial-gradient(ellipse at 12% 12%, #286b5344, transparent 47%), linear-gradient(155deg, #111815, #0b0d0c); }\n.landing-page.template-docs-home .landing-hero { margin: 44px auto 20px 7%; text-align: left; }\n.landing-page.template-docs-home .landing-hero::after { content: 'Search the documentation…'; display: block; margin-top: 12px; border: 1px solid #ffffff20; border-radius: 6px; padding: 10px; color: #928f99; }`,
  'creative-saas': `.landing-page.template-creative-saas { background: radial-gradient(ellipse at 80% 80%, #824ba844, transparent 46%), radial-gradient(ellipse at 20% 20%, #314e9255, transparent 40%), #0e0d13; }\n.landing-page.template-creative-saas .landing-hero h1 em { color: #d6b5ff; }`,
  'personal-brand': `.landing-page.template-personal-brand { background: radial-gradient(ellipse at 85% 12%, #88613b38, transparent 43%), linear-gradient(160deg, #171410, #0e0c0b); }\n.landing-page.template-personal-brand .brand, .landing-page.template-personal-brand h1 { font-family: Georgia, serif; font-weight: 500; }\n.landing-page.template-personal-brand .landing-hero { margin: 44px auto 20px 6%; text-align: left; }`,
}
