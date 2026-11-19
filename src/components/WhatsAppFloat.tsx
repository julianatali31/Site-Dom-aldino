import { whatsappLink } from '../data/site';
import { useScrolled } from '../hooks/useScrolled';
import { WhatsAppIcon } from './BrandIcons';

/** Atalho discreto para o WhatsApp, visível depois da primeira dobra. */
export function WhatsAppFloat() {
  const visible = useScrolled(700);
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar orçamento pelo WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-ink text-gold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-gold/40 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
