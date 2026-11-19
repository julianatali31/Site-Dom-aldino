import { navItems, site, whatsappLink } from '../data/site';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="container-site pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[24rem] text-[0.95rem] leading-relaxed text-paper/60">
              {site.description}
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.instagram.handle}`}
                className="inline-flex size-11 items-center justify-center border border-paper/20 transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="size-[1.1rem]" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conversar pelo WhatsApp"
                className="inline-flex size-11 items-center justify-center border border-paper/20 transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                <WhatsAppIcon className="size-[1.1rem]" />
              </a>
            </div>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-7">
            <h2 className="font-sans text-[0.7rem] font-medium tracking-[0.24em] text-gold uppercase">
              Navegação
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="link-draw inline-block py-1.5 text-[0.95rem] text-paper/75 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="font-sans text-[0.7rem] font-medium tracking-[0.24em] text-gold uppercase">
              Contato
            </h2>
            <address className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-paper/75 not-italic">
              <p>
                {site.address.street}
                <br />
                {site.address.district}
                <br />
                {site.address.city}
              </p>
              <p className="flex flex-col">
                <a href={site.phoneHref} className="link-draw self-start py-1 hover:text-paper">
                  {site.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="link-draw self-start py-1 break-all hover:text-paper"
                >
                  {site.email}
                </a>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw self-start py-1 hover:text-paper"
                >
                  {site.instagram.handle}
                </a>
              </p>
            </address>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 font-display text-[18vw] leading-[0.8] tracking-[-0.03em] text-paper/[0.06] select-none lg:text-[11.5rem]"
        >
          Dom Aldino
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-paper/10 pt-6 text-[0.78rem] text-paper/45 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.fullName}. Todos os direitos reservados.
          </p>
          <p>
            {site.city} · {site.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
