import { testimonials } from '../data/testimonials';
import { Reveal } from './Reveal';

/**
 * Seção de depoimentos.
 * Só aparece quando houver avaliações reais em src/data/testimonials.ts.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="border-t border-ink/10 bg-paper py-24 sm:py-32"
    >
      <div className="container-site">
        <Reveal>
          <p className="eyebrow text-gold-ink">Depoimentos</p>
          <h2 id="testimonials-title" className="section-title mt-6 max-w-[36rem]">
            A experiência dos clientes.
          </h2>
        </Reveal>

        <ul
          className={`mt-16 grid gap-x-12 gap-y-14 ${
            testimonials.length > 1 ? 'md:grid-cols-2' : ''
          } ${testimonials.length > 2 ? 'lg:grid-cols-3' : ''}`}
        >
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.author + i} delay={i * 90}>
              <figure className="flex h-full flex-col border-t border-gold/60 pt-8">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-gold">
                  “
                </span>
                <blockquote className="mt-2 font-display text-[1.45rem] leading-snug text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 text-sm text-stone">
                  <span className="font-medium text-ink">{t.author}</span>
                  {t.event && <span> · {t.event}</span>}
                  {t.source && (
                    <span className="block text-xs tracking-wide text-stone/80">via {t.source}</span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
