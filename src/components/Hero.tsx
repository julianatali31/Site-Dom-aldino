import { ArrowDown, ArrowRight } from 'lucide-react';
import { images } from '../data/images';
import { site } from '../data/site';
import { Photo } from './Photo';

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper"
    >
      <div className="absolute inset-0 -z-10">
        <Photo
          image={images.hero}
          priority
          widths={[768, 1280, 1920, 2400]}
          className="size-full animate-hero-zoom object-cover"
        />
        {/* Tom quente + sobreposição escura para garantir a leitura do texto */}
        <div className="absolute inset-0 bg-cocoa/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      </div>

      <div className="container-site pt-32 pb-14 sm:pb-20 lg:pb-24">
        <div className="max-w-[54rem]">
          <p className="eyebrow animate-hero-in text-gold [animation-delay:150ms]">
            {site.tagline} · {site.city}, {site.state}
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-hero-in text-[4.1rem] leading-[0.9] tracking-[-0.02em] [animation-delay:250ms] sm:text-[6.5rem] lg:text-[8.5rem]"
          >
            Dom Aldino
            <span className="sr-only">
              {' '}
              — {site.tagline} em {site.city}
            </span>
          </h1>

          <p className="mt-7 max-w-[34rem] animate-hero-in font-display text-[1.65rem] leading-[1.15] text-paper italic [animation-delay:400ms] sm:text-[2.1rem]">
            Momentos especiais merecem uma experiência à altura.
          </p>

          <p className="mt-5 max-w-[30rem] animate-hero-in text-[0.98rem] leading-relaxed text-paper/75 [animation-delay:520ms]">
            Gastronomia, cuidado e dedicação em cada detalhe para transformar eventos em experiências
            memoráveis.
          </p>

          <div className="mt-9 flex animate-hero-in flex-col gap-3 [animation-delay:640ms] sm:flex-row">
            <a href="#gastronomia" className="btn btn-outline-light">
              Conheça nossos serviços
            </a>
            <a href="#contato" className="btn btn-gold">
              Solicite um orçamento
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 hidden animate-hero-in items-end justify-between border-t border-paper/15 pt-6 [animation-delay:800ms] md:flex">
          <ul className="flex gap-8 text-[0.75rem] tracking-[0.22em] text-paper/65 uppercase">
            <li>Casamentos</li>
            <li>Formaturas</li>
            <li>Corporativos</li>
            <li>Sociais</li>
          </ul>
          <a
            href="#sobre"
            className="group inline-flex items-center gap-3 text-[0.75rem] tracking-[0.22em] text-paper/65 uppercase transition-colors hover:text-paper"
          >
            Role para conhecer
            <ArrowDown
              className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
