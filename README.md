# Dom Aldino Gastronomia em Eventos — site institucional

Site institucional em React + Vite + TypeScript + Tailwind CSS (v4) + Lucide React.

## Rodar localmente

```bash
npm install
npm run dev        # ambiente de desenvolvimento
npm run build      # gera a versão final em /dist
npm run preview    # testa a versão final
```

## Estrutura

```
src/
  components/   Header, Hero, About, Gastronomy, Events, Gallery,
                Testimonials, ContactCTA, Contact, Footer
                + Photo, Reveal, Logo, BrandIcons, WhatsAppFloat
  data/         site.ts (contatos), images.ts (fotos), gastronomy.ts,
                events.ts, testimonials.ts
  hooks/        rolagem, seção ativa, revelação, trava de rolagem
```

Todo o conteúdo editável está em `src/data/`.

## O que trocar antes de publicar

1. **Fotografias** — `src/data/images.ts`. As fotos atuais são provisórias (Unsplash, licença livre).
   Coloque as fotos reais em `public/fotos/` e troque o `src` (ex.: `'/fotos/hero.jpg'`) e o `alt`.
   Recomendado: JPG/WebP com até 2400px de largura para o hero e 1600px para as demais.
2. **Logotipo** — `src/components/Logo.tsx` usa uma assinatura tipográfica provisória.
3. **Depoimentos** — `src/data/testimonials.ts`. Inclua apenas avaliações reais e autorizadas;
   enquanto a lista estiver vazia, a seção não aparece.
4. **Imagem de compartilhamento** — salve `public/og-image.jpg` (1200x630).
5. **Domínio** — descomente a tag `canonical` em `index.html` com o endereço definitivo.

## Funcionalidades

- Header transparente sobre o hero que fica sólido ao rolar; destaque da seção ativa.
- Menu mobile em tela cheia (fecha com Esc ou ao escolher um item).
- Galeria em mosaico com lightbox (setas do teclado, Esc, gesto de deslizar no celular).
- Formulário com validação que abre o WhatsApp (54) 99644-4113 com a mensagem pronta.
- Botões de orçamento por tipo de evento com mensagem específica no WhatsApp.
- Mapa do Google incorporado e link "Como chegar".
- SEO básico (title, description, Open Graph, dados estruturados schema.org).
- Fontes hospedadas no próprio site, imagens responsivas com carregamento sob demanda,
  respeito a `prefers-reduced-motion`.
