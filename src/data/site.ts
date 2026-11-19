/**
 * Dados institucionais do Dom Aldino.
 * Tudo o que aparece no site sobre a empresa sai deste arquivo:
 * ao alterar um contato aqui, ele muda em todas as seções.
 */
export const site = {
  name: 'Dom Aldino',
  fullName: 'Dom Aldino Gastronomia em Eventos',
  tagline: 'Gastronomia em Eventos',
  city: 'Passo Fundo',
  state: 'RS',
  description:
    'Casa de eventos em Passo Fundo para casamentos, formaturas, confraternizações empresariais e celebrações sociais, com buffet completo, gastronomia variada e carta de bebidas.',
  address: {
    street: 'Rua Rio de Janeiro, nº 391',
    district: 'Bairro Santa Maria',
    city: 'Passo Fundo - RS',
  },
  phoneDisplay: '(54) 99644-4113',
  phoneHref: 'tel:+5554996444113',
  whatsappNumber: '5554996444113',
  email: 'prettojack@bol.com.br',
  instagram: {
    handle: '@domaldino_gastronomia',
    url: 'https://www.instagram.com/domaldino_gastronomia/',
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city}`;

const mapsQuery = encodeURIComponent('Rua Rio de Janeiro, 391, Santa Maria, Passo Fundo - RS');
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

/** Monta o link do WhatsApp com uma mensagem já escrita. */
export function whatsappLink(message = 'Olá! Gostaria de solicitar um orçamento para um evento.') {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'contato', label: 'Contato' },
] as const;
