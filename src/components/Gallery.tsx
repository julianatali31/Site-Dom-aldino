import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { gallery } from '../data/images';
import { site } from '../data/site';
import { useLockBody } from '../hooks/useLockBody';
import { InstagramIcon } from './BrandIcons';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const shapeClass = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[3/2]',
  square: 'aspect-square',
} as const;

const shapeRatio = { portrait: 4 / 5, landscape: 3 / 2, square: 1 } as const;

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const open = (i: number, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setIndex(i);
  };

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <section id="galeria" aria-labelledby="gallery-title" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow text-gold-ink">Galeria</p>
            <h2 id="gallery-title" className="section-title mt-6 max-w-[36rem]">
              Momentos que merecem ser lembrados.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
            >
              <InstagramIcon className="size-4" />
              Ver mais no Instagram
            </a>
          </Reveal>
        </div>

        <ul className="mt-16 columns-2 gap-3 sm:gap-5 lg:mt-20 lg:columns-3">
          {gallery.map((image, i) => (
            <li key={image.src + i} className="mb-3 break-inside-avoid sm:mb-5">
              <Reveal delay={(i % 3) * 70}>
                <button
                  type="button"
                  onClick={(e) => open(i, e.currentTarget)}
                  aria-label={`Ampliar foto: ${image.alt}`}
                  className="photo-zoom group relative block w-full cursor-zoom-in overflow-hidden"
                >
                  <Photo
                    image={image}
                    ratio={shapeRatio[image.shape]}
                    widths={[400, 700, 1000]}
                    sizes="(min-width: 1024px) 31vw, 48vw"
                    className={`${shapeClass[image.shape]} w-full object-cover`}
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
                  <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center bg-paper/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {index !== null && <Lightbox index={index} onChange={setIndex} onClose={close} />}
    </section>
  );
}

type LightboxProps = {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
};

function Lightbox({ index, onChange, onClose }: LightboxProps) {
  const total = gallery.length;
  const image = gallery[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  useLockBody(true);

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Tab' && dialogRef.current) {
        // mantém o foco dentro do lightbox
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de fotos ampliada"
      className="fixed inset-0 z-[60] flex flex-col bg-ink/[0.97] text-paper"
      style={{ animation: 'hero-in 260ms var(--ease-out-soft) both' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) (delta > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-display text-lg text-paper/70 tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar galeria"
          className="inline-flex size-11 items-center justify-center transition-colors hover:text-gold"
        >
          <X className="size-6" strokeWidth={1.5} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <figure
          key={index}
          className="flex max-h-full"
          style={{ animation: 'hero-in 360ms var(--ease-out-soft) both' }}
        >
          <Photo
            image={image}
            widths={[800, 1400, 2000]}
            sizes="90vw"
            priority
            className="max-h-[calc(100svh-7rem)] w-auto max-w-full object-contain"
          />
        </figure>

        <button
          type="button"
          onClick={prev}
          aria-label="Foto anterior"
          className="absolute left-2 inline-flex size-12 items-center justify-center bg-ink/40 transition-colors hover:text-gold sm:left-6"
        >
          <ChevronLeft className="size-7" strokeWidth={1.25} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Próxima foto"
          className="absolute right-2 inline-flex size-12 items-center justify-center bg-ink/40 transition-colors hover:text-gold sm:right-6"
        >
          <ChevronRight className="size-7" strokeWidth={1.25} />
        </button>
      </div>
    </div>
  );
}
