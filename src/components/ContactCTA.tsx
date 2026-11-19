import { images } from '../data/images';
import { whatsappLink } from '../data/site';
import { WhatsAppIcon } from './BrandIcons';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

export function ContactCTA() {
  return (
    <section
      id="orcamento"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-ink py-28 text-paper sm:py-36 lg:py-48"
    >
      <div className="absolute inset-0 -z-10">
        <Photo image={images.cta} widths={[768, 1280, 1920]} className="size-full object-cover" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      </div>

      <div className="container-site">
        <Reveal className="max-w-[44rem]">
          <p className="eyebrow text-gold">Orçamento</p>
          <h2
            id="cta-title"
            className="mt-6 font-display text-[2.8rem] leading-[1] sm:text-6xl lg:text-[5rem]"
          >
            Vamos planejar seu próximo evento?
          </h2>
          <p className="mt-7 max-w-[30rem] text-[1.05rem] leading-[1.75] text-paper/75">
            Conte um pouco sobre sua celebração e descubra como podemos tornar esse momento ainda mais
            especial.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold mt-10 w-full sm:w-auto"
          >
            <WhatsAppIcon className="size-[1.1rem]" />
            Solicitar orçamento pelo WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
