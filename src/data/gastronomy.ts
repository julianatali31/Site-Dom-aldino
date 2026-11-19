import { images, type ImageAsset } from './images';

export type GastronomyItem = {
  id: string;
  title: string;
  text: string;
  image: ImageAsset;
};

/**
 * Categorias da experiência gastronômica.
 * Os textos descrevem a proposta de cada etapa sem listar pratos:
 * quando houver cardápio definido, ele pode ser incluído aqui.
 */
export const gastronomy: GastronomyItem[] = [
  {
    id: 'entradas',
    title: 'Entradas',
    text: 'O primeiro sabor da festa, pensado para receber os convidados com delicadeza.',
    image: images.gastronomy.entradas,
  },
  {
    id: 'buffet',
    title: 'Buffet',
    text: 'Buffet completo, montado com atenção à apresentação e ao ritmo de cada evento.',
    image: images.gastronomy.buffet,
  },
  {
    id: 'saladas',
    title: 'Saladas',
    text: 'Ingredientes frescos e combinações leves, com cor e textura em cada travessa.',
    image: images.gastronomy.saladas,
  },
  {
    id: 'quentes',
    title: 'Pratos quentes',
    text: 'Preparos servidos no ponto certo, do primeiro ao último convidado.',
    image: images.gastronomy.quentes,
  },
  {
    id: 'bebidas',
    title: 'Carta de bebidas',
    text: 'Uma carta de bebidas para acompanhar a gastronomia e o clima de cada celebração.',
    image: images.gastronomy.bebidas,
  },
];
