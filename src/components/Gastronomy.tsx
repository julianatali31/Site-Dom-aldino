import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { gastronomy } from '../data/gastronomy';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

export function Gastronomy() {
  const [active, setActive] = useState(gastronomy[0].id);

  return (
    <section
      id="gastronomia"
      aria-labelledby="gastronomy-title"
      className="relative bg-ink py-24 text-paper sm:py-32 lg:py-40"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-gold">Experiência gastronômica</p>
            <h2 id="gastronomy-title" className="section-title mt-6 max-w-[40rem]">
              Uma gastronomia que encanta também pelos olhos.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1rem] leading-[1.75] text-paper/65">
              Da recepção ao brinde final, cada etapa do serviço tem sabor, cor e apresentação pensados para o
              seu evento.
            </p>
          </Reveal>
        </div>

        {/* Desktop: lista editorial com imagem que acompanha o item em foco */}
        <div className="mt-20 hidden gap-12 lg:grid lg:grid-cols-12">
          <ol className="lg:col-span-5">
            {gastronomy.map((item, i) => {
              const isActive = item.id === active;
              return (
                <li key={item.id} className="border-t border-paper/12 last:border-b">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(item.id)}
                    onFocus={() => setActive(item.id)}
                    onClick={() => setActive(item.id)}
                    aria-pressed={isActive}
                    aria-controls="gastronomy-preview"
                    className="group grid w-full grid-cols-[3rem_1fr] items-baseline gap-x-4 py-7 text-left"
                  >
                    <span
                      className={`font-display text-lg tabular-nums transition-colors duration-300 ${
                        isActive ? 'text-gold' : 'text-paper/35'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span
                        className={`block font-display text-[2.6rem] leading-none transition-[color,transform] duration-500 ease-[var(--ease-out-soft)] ${
                          isActive ? 'translate-x-2 text-paper' : 'text-paper/45 group-hover:text-paper/75'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-soft)] ${
                          isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[26rem] pt-4 pl-2 text-[0.95rem] leading-relaxed text-paper/65">
                            {item.text}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div id="gastronomy-preview" aria-live="polite" className="relative lg:col-span-7">
            <div className="relative aspect-[5/4] overflow-hidden">
              {gastronomy.map((item) => (
                <div
                  key={item.id}
                  aria-hidden={item.id !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] ${
                    item.id === active ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
                  }`}
                >
                  <Photo
                    image={item.image}
                    ratio={5 / 4}
                    sizes="55vw"
                    widths={[800, 1200, 1600]}
                    className="size-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-4 -z-0 size-24 border-t border-r border-gold/50"
            />
          </div>
        </div>

        {/* Mobile e tablet: blocos empilhados com foto */}
        <ol className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-x-6 lg:hidden">
          {gastronomy.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 2) * 80} className={i === 0 ? 'sm:col-span-2' : ''}>
              <div className="photo-zoom overflow-hidden">
                <Photo
                  image={item.image}
                  ratio={i === 0 ? 3 / 2 : 4 / 3}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={`${i === 0 ? 'aspect-[3/2]' : 'aspect-[4/3]'} w-full object-cover`}
                />
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-display text-base text-gold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[2rem] leading-none">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/65">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-paper/12 pt-10 sm:flex-row sm:items-center">
          <p className="max-w-[34rem] font-display text-[1.5rem] leading-snug text-paper/85 italic">
            Converse com a equipe para conhecer as opções de cardápio para o seu evento.
          </p>
          <a href="#contato" className="btn btn-outline-light shrink-0">
            Montar meu evento
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
