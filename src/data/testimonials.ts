/**
 * DEPOIMENTOS
 * -----------
 * Inclua aqui somente avaliações reais, com autorização de quem escreveu.
 * Enquanto a lista estiver vazia, a seção de depoimentos não aparece no site.
 *
 * Exemplo de formato (remova as barras para usar):
 *
 * {
 *   quote: 'Texto do depoimento, exatamente como o cliente escreveu.',
 *   author: 'Nome e sobrenome do cliente',
 *   event: 'Casamento',          // opcional
 *   source: 'Google',            // opcional: onde a avaliação foi publicada
 * },
 */
export type Testimonial = {
  quote: string;
  author: string;
  event?: string;
  source?: string;
};

export const testimonials: Testimonial[] = [];
