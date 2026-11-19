import { images, type ImageAsset } from './images';

export type EventType = {
  id: string;
  title: string;
  text: string;
  image: ImageAsset;
  /** mensagem que abre no WhatsApp ao pedir orçamento deste tipo de evento */
  whatsappMessage: string;
};

export const eventTypes: EventType[] = [
  {
    id: 'casamentos',
    title: 'Casamentos',
    text: 'Gastronomia e cuidado para celebrar momentos únicos.',
    image: images.events.casamentos,
    whatsappMessage: 'Olá! Gostaria de um orçamento para um casamento.',
  },
  {
    id: 'formaturas',
    title: 'Formaturas',
    text: 'Uma comemoração especial merece uma experiência inesquecível.',
    image: images.events.formaturas,
    whatsappMessage: 'Olá! Gostaria de um orçamento para uma formatura.',
  },
  {
    id: 'corporativos',
    title: 'Eventos corporativos',
    text: 'Soluções gastronômicas para encontros e confraternizações empresariais.',
    image: images.events.corporativos,
    whatsappMessage: 'Olá! Gostaria de um orçamento para um evento corporativo.',
  },
  {
    id: 'sociais',
    title: 'Eventos sociais',
    text: 'Celebrações e encontros planejados para reunir pessoas especiais.',
    image: images.events.sociais,
    whatsappMessage: 'Olá! Gostaria de um orçamento para um evento social.',
  },
];

export const eventOptions = [
  'Casamento',
  'Formatura',
  'Evento corporativo',
  'Evento social',
  'Outro',
] as const;
