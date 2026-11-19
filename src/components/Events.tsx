import { ArrowUpRight } from 'lucide-react';
import { eventTypes } from '../data/events';
import { whatsappLink } from '../data/site';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

export function Events() {
  return (
    <section id="eventos" aria-labelledby="events-title" className="bg-sand py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-cocoa">Eventos</p>
            <h2 id="events-title" className="section-title mt-6 max-w-[38rem]">
              O cenário perfeito para celebrar.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1rem] leading-[1.75] text-cocoa/80">
              Recebemos celebrações de diferentes formatos, sempre com a mesma atenção à gastronomia e ao
              atendimento.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {eventTypes.map((event, i) => (
            <Reveal as="li" key={event.id} delay={i * 90}>
              <a
                href={whatsappLink(event.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${event.title}: solicitar orçamento pelo WhatsApp`}
                className="group block transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5"
              >
                <div className="photo-zoom relative overflow-hidden">
                  <Photo
                    image={event.image}
                    ratio={3 / 4}
                    widths={[400, 700, 1000]}
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <span className="absolute top-4 left-4 font-display text-lg text-paper tabular-nums drop-shadow">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="text-[1.9rem] leading-none">{event.title}</h3>
                  <ArrowUpRight
                    className="mt-1 size-5 shrink-0 text-cocoa transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 max-w-[18rem] text-[0.95rem] leading-relaxed text-cocoa/80">
                  {event.text}
                </p>
                <span className="link-draw mt-5 inline-block pb-0.5 text-[0.72rem] font-medium tracking-[0.2em] text-cocoa uppercase">
                  Pedir orçamento
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
