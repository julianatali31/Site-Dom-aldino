import { images } from '../data/images';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const pillars = [
  { title: 'Qualidade dos alimentos', text: 'Ingredientes escolhidos com critério e preparo cuidadoso.' },
  { title: 'Apresentação dos pratos', text: 'Cada travessa pensada para chegar bonita à mesa.' },
  { title: 'Atendimento atencioso', text: 'Uma equipe presente, do primeiro contato ao fim da festa.' },
  { title: 'Organização dos eventos', text: 'Planejamento para que tudo aconteça no tempo certo.' },
  { title: 'Cuidado com cada detalhe', text: 'O que parece pequeno é o que os convidados lembram.' },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="about-title" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6 lg:pt-6">
          <Reveal>
            <p className="eyebrow text-gold-ink">Sobre o Dom Aldino</p>
            <h2 id="about-title" className="section-title mt-6 max-w-[34rem]">
              Mais do que servir, proporcionar <em className="text-cocoa">experiências.</em>
            </h2>
          </Reveal>

          <Reveal
            delay={120}
            className="mt-8 max-w-[33rem] space-y-5 text-[1.02rem] leading-[1.75] text-stone"
          >
            <p>
              O Dom Aldino é uma casa de eventos de Passo Fundo dedicada a receber casamentos, formaturas,
              confraternizações empresariais e celebrações sociais.
            </p>
            <p>
              A gastronomia está no centro de tudo: buffet completo, pratos variados e carta de bebidas,
              preparados e servidos com atenção do início ao fim de cada evento.
            </p>
          </Reveal>

          <Reveal delay={200} as="ol" className="mt-12 max-w-[33rem] border-t border-ink/12">
            {pillars.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-ink/12 py-5">
                <span className="pt-1 font-display text-lg text-gold-ink tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-sans text-[0.98rem] font-medium tracking-normal text-ink">{p.title}</h3>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-stone">{p.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <div className="relative lg:sticky lg:top-28">
            <Reveal className="photo-zoom overflow-hidden xl:ml-[14%]">
              <Photo
                image={images.about}
                ratio={4 / 5}
                sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </Reveal>
            <Reveal
              delay={180}
              className="photo-zoom absolute bottom-[-2.5rem] left-0 hidden w-[38%] overflow-hidden border-[10px] border-paper xl:block"
            >
              <Photo
                image={images.aboutDetail}
                ratio={1}
                widths={[400, 700]}
                sizes="18vw"
                className="aspect-square w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
