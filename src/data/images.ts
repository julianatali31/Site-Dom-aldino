/**
 * FOTOGRAFIAS DO SITE
 * -------------------
 * Todas as imagens estão centralizadas aqui.
 *
 * As URLs abaixo são fotografias provisórias (Unsplash, licença livre) que
 * apenas representam o tipo de cena de cada espaço. O ideal é substituí-las
 * pelas fotos reais dos eventos do Dom Aldino:
 *
 *   1. Coloque os arquivos em /public/fotos/ (ex.: /public/fotos/hero.jpg).
 *   2. Troque o valor `src` correspondente por '/fotos/hero.jpg'.
 *   3. Ajuste o texto `alt` para descrever a foto real.
 *
 * Se uma foto não carregar, o componente <Photo> mostra um fundo neutro
 * no lugar, sem quebrar o layout.
 */
export type ImageAsset = {
  src: string;
  alt: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  hero: {
    src: unsplash('photo-1519167758481-83f550bb49b3'),
    alt: 'Salão de eventos com mesas postas e iluminação suave',
  },
  about: {
    src: unsplash('photo-1414235077428-338989a2e8c0'),
    alt: 'Prato finalizado com cuidado na apresentação',
  },
  aboutDetail: {
    src: unsplash('photo-1555244162-803834f70033'),
    alt: 'Mesa de buffet montada para um evento',
  },
  gastronomy: {
    entradas: {
      src: unsplash('photo-1541014741259-de529411b96a'),
      alt: 'Entradas servidas em pequenas porções',
    },
    buffet: {
      src: unsplash('photo-1555244162-803834f70033'),
      alt: 'Buffet completo montado com travessas',
    },
    saladas: {
      src: unsplash('photo-1512621776951-a57141f2eefd'),
      alt: 'Salada fresca com folhas e legumes coloridos',
    },
    quentes: {
      src: unsplash('photo-1544025162-d76694265947'),
      alt: 'Prato quente de carne grelhada',
    },
    bebidas: {
      src: unsplash('photo-1470337458703-46ad1756a187'),
      alt: 'Taças e drinks preparados no bar',
    },
  },
  events: {
    casamentos: {
      src: unsplash('photo-1519741497674-611481863552'),
      alt: 'Casal de noivos em uma celebração de casamento',
    },
    formaturas: {
      src: unsplash('photo-1627556704302-624286467c65'),
      alt: 'Formando segurando o capelo no dia da formatura',
    },
    corporativos: {
      src: unsplash('photo-1511578314322-379afb476865'),
      alt: 'Encontro empresarial em um salão de eventos',
    },
    sociais: {
      src: unsplash('photo-1527529482837-4698179dc6ce'),
      alt: 'Convidados brindando com espumante durante a celebração',
    },
  },
  cta: {
    src: unsplash('photo-1517248135467-4c7edcad34c4'),
    alt: 'Salão iluminado preparado para receber convidados',
  },
} satisfies Record<string, ImageAsset | Record<string, ImageAsset>>;

export type GalleryImage = ImageAsset & {
  /** proporção da foto na galeria */
  shape: 'portrait' | 'landscape' | 'square';
};

export const gallery: GalleryImage[] = [
  {
    src: unsplash('photo-1530023367847-a683933f4172'),
    alt: 'Mesa decorada com guardanapos e flores para uma recepção',
    shape: 'portrait',
  },
  {
    src: unsplash('photo-1504674900247-0877df9cc836'),
    alt: 'Prato principal servido à mesa',
    shape: 'landscape',
  },
  { src: unsplash('photo-1510812431401-41d2bd2722f3'), alt: 'Vinho sendo servido na taça', shape: 'square' },
  {
    src: unsplash('photo-1511795409834-ef04bbd61622'),
    alt: 'Decoração do salão com luzes e mesas',
    shape: 'landscape',
  },
  {
    src: unsplash('photo-1546069901-ba9599a7e63c'),
    alt: 'Prato colorido com ingredientes frescos',
    shape: 'portrait',
  },
  {
    src: unsplash('photo-1528605248644-14dd04022da1'),
    alt: 'Convidados reunidos à mesa durante a festa',
    shape: 'landscape',
  },
  {
    src: unsplash('photo-1514362545857-3bc16c4c7d1b'),
    alt: 'Drinks preparados para os convidados',
    shape: 'portrait',
  },
  { src: unsplash('photo-1467003909585-2f8a72700288'), alt: 'Peixe grelhado com legumes', shape: 'square' },
  {
    src: unsplash('photo-1519225421980-715cb0215aed'),
    alt: 'Mesa comprida posta com flores e taças',
    shape: 'landscape',
  },
  {
    src: unsplash('photo-1551218808-94e220e084d2'),
    alt: 'Detalhe de prato finalizado pela cozinha',
    shape: 'portrait',
  },
];
