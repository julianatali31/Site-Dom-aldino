import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { navItems, site, whatsappLink } from '../data/site';
import { useScrolled } from '../hooks/useScrolled';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLockBody } from '../hooks/useLockBody';
import { Logo } from './Logo';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const scrolled = useScrolled(48);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-500 ${
          solid ? 'bg-ink/95 shadow-[0_1px_0_rgba(182,154,103,0.18)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ${
            scrolled ? 'h-[4.5rem]' : 'h-20 lg:h-24'
          }`}
        >
          <a href="#inicio" aria-label={`${site.fullName}, voltar ao início`} onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative py-2 text-[0.82rem] tracking-[0.06em] transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 ${
                      active === item.id
                        ? 'text-paper after:scale-x-100'
                        : 'text-paper/70 after:scale-x-0 hover:text-paper hover:after:scale-x-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contato" className="btn btn-gold hidden min-h-11 px-5 sm:inline-flex">
              Solicitar orçamento
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="size-6" strokeWidth={1.5} />
              ) : (
                <Menu className="size-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-ink lg:hidden"
      >
        <nav aria-label="Navegação mobile" className="container-site flex min-h-full flex-col pt-8 pb-10">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.id} className="border-b border-paper/10">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-[2rem] leading-tight text-paper"
                  style={{ animation: `hero-in 600ms var(--ease-out-soft) ${60 + i * 45}ms both` }}
                >
                  {item.label}
                  <ArrowRight className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold w-full"
            >
              <WhatsAppIcon className="size-4" />
              Solicitar orçamento
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light w-full"
            >
              <InstagramIcon className="size-4" />
              {site.instagram.handle}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
