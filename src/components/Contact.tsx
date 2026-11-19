import {
  cloneElement,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { ArrowUpRight, Check, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react';
import { eventOptions } from '../data/events';
import { fullAddress, mapsDirectionsUrl, mapsEmbedUrl, site, whatsappLink } from '../data/site';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { Reveal } from './Reveal';

type FormValues = {
  name: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: '', phone: '', eventType: '', date: '', guests: '', message: '' };

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/** Formata o telefone enquanto a pessoa digita: (54) 99999-9999 */
function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 3) errors.name = 'Informe seu nome completo.';
  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 10) errors.phone = 'Informe um telefone com DDD, por exemplo (54) 99999-9999.';
  if (!values.eventType) errors.eventType = 'Escolha o tipo de evento.';
  if (!values.date) errors.date = 'Informe a data prevista.';
  else if (values.date < todayISO()) errors.date = 'A data prevista precisa ser hoje ou depois.';
  const guests = Number(values.guests);
  if (!values.guests) errors.guests = 'Informe o número aproximado de convidados.';
  else if (!Number.isInteger(guests) || guests < 1) errors.guests = 'Use um número inteiro maior que zero.';
  if (values.message.length > 1000) errors.message = 'A mensagem pode ter no máximo 1000 caracteres.';
  return errors;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function buildMessage(v: FormValues) {
  const lines = [
    'Olá! Gostaria de solicitar um orçamento.',
    '',
    `*Nome:* ${v.name.trim()}`,
    `*Telefone/WhatsApp:* ${v.phone}`,
    `*Tipo de evento:* ${v.eventType}`,
    `*Data prevista:* ${formatDate(v.date)}`,
    `*Convidados (aprox.):* ${v.guests}`,
  ];
  if (v.message.trim()) lines.push('', `*Mensagem:* ${v.message.trim()}`);
  return lines.join('\n');
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [sent, setSent] = useState(false);
  const minDate = useMemo(todayISO, []);

  const update =
    (field: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = field === 'phone' ? maskPhone(e.target.value) : e.target.value;
      const next = { ...values, [field]: value };
      setValues(next);
      setSent(false);
      if (touched[field]) setErrors(validate(next));
    };

  const blur = (field: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, phone: true, eventType: true, date: true, guests: true, message: true });
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }
    window.open(whatsappLink(buildMessage(values)), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const show = (field: keyof FormValues) => (touched[field] ? errors[field] : undefined);

  return (
    <section id="contato" aria-labelledby="contact-title" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-x-12">
        {/* Informações e mapa */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-gold-ink">Contato</p>
            <h2 id="contact-title" className="section-title mt-6">
              Fale com o Dom Aldino.
            </h2>
            <p className="mt-6 max-w-[28rem] text-[1rem] leading-[1.75] text-stone">
              Envie os detalhes do seu evento pelo formulário ou chame diretamente no WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={100} as="dl" className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            <ContactRow icon={<MapPin className="size-[1.1rem]" strokeWidth={1.5} />} label="Endereço">
              <span className="block">{site.address.street}</span>
              <span className="block">
                {site.address.district}, {site.address.city}
              </span>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw mt-2 inline-flex items-center gap-1.5 py-1 text-sm text-gold-ink"
              >
                <Navigation className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                Como chegar
              </a>
            </ContactRow>
            <ContactRow icon={<Phone className="size-[1.1rem]" strokeWidth={1.5} />} label="Telefone">
              <a href={site.phoneHref} className="link-draw py-1">
                {site.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow icon={<WhatsAppIcon className="size-[1.1rem]" />} label="WhatsApp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-draw py-1">
                {site.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="size-[1.1rem]" strokeWidth={1.5} />} label="E-mail">
              <a href={`mailto:${site.email}`} className="link-draw py-1 break-all">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow icon={<InstagramIcon className="size-[1.1rem]" />} label="Instagram">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw py-1"
              >
                {site.instagram.handle}
              </a>
            </ContactRow>
          </Reveal>

          <Reveal delay={160} className="mt-10 overflow-hidden bg-sand">
            <iframe
              title={`Mapa: ${fullAddress}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/3] w-full border-0 grayscale-[35%] sepia-[12%]"
            />
          </Reveal>
        </div>

        {/* Formulário */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal className="bg-sand/60 p-6 sm:p-10 lg:sticky lg:top-28 lg:p-12">
            <h3 className="text-[2.1rem] leading-tight">Solicite seu orçamento</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">
              Preencha os dados abaixo. Ao enviar, abrimos o WhatsApp com a sua mensagem pronta.
            </p>

            <form noValidate onSubmit={onSubmit} className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field id="name" label="Nome" error={show('name')} className="sm:col-span-2">
                <input
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={update('name')}
                  onBlur={blur('name')}
                  placeholder="Seu nome completo"
                  className="form-field"
                />
              </Field>

              <Field id="phone" label="Telefone / WhatsApp" error={show('phone')}>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={values.phone}
                  onChange={update('phone')}
                  onBlur={blur('phone')}
                  placeholder="(54) 99999-9999"
                  className="form-field"
                />
              </Field>

              <Field id="eventType" label="Tipo de evento" error={show('eventType')}>
                <select
                  value={values.eventType}
                  onChange={update('eventType')}
                  onBlur={blur('eventType')}
                  className={`form-field cursor-pointer appearance-none bg-[length:12px] bg-[right_2px_center] bg-no-repeat ${
                    values.eventType ? '' : 'text-stone/70'
                  }`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%23171717' stroke-width='1.5'%3E%3Cpath d='M1 1.5 6 6.5l5-5'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {eventOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-ink">
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="date" label="Data prevista" error={show('date')}>
                <input
                  type="date"
                  min={minDate}
                  value={values.date}
                  onChange={update('date')}
                  onBlur={blur('date')}
                  className="form-field"
                />
              </Field>

              <Field id="guests" label="Número aproximado de convidados" error={show('guests')}>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={values.guests}
                  onChange={update('guests')}
                  onBlur={blur('guests')}
                  placeholder="Ex.: 120"
                  className="form-field"
                />
              </Field>

              <Field id="message" label="Mensagem" optional error={show('message')} className="sm:col-span-2">
                <textarea
                  rows={4}
                  value={values.message}
                  onChange={update('message')}
                  onBlur={blur('message')}
                  placeholder="Conte um pouco sobre a sua celebração"
                  className="form-field resize-y"
                />
              </Field>

              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-gold w-full sm:w-auto">
                  <Send className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  Enviar pelo WhatsApp
                </button>

                <p role="status" aria-live="polite" className="mt-5 min-h-6 text-sm text-cocoa">
                  {sent && (
                    <span className="inline-flex items-start gap-2">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold-ink"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>
                        Abrimos o WhatsApp com a sua mensagem. Para concluir, toque em enviar na conversa. Se
                        ela não abriu,{' '}
                        <a
                          href={whatsappLink(buildMessage(values))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 underline underline-offset-4"
                        >
                          clique aqui
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>
                        .
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-5">
      <dt className="pt-0.5 text-gold-ink">
        <span aria-hidden="true">{icon}</span>
        <span className="sr-only">{label}</span>
      </dt>
      <dd className="text-[0.98rem] leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

type FieldProps = {
  id: keyof FormValues;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactElement<InputHTMLAttributes<HTMLElement>>;
};

function Field({ id, label, error, optional, className = '', children }: FieldProps) {
  const errorId = useId();
  const fieldId = `field-${id}`;
  const child = cloneElement(children, {
    id: fieldId,
    name: id,
    required: !optional,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  });

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="block text-[0.72rem] font-medium tracking-[0.16em] text-cocoa uppercase"
      >
        {label}
        {optional && <span className="ml-2 tracking-normal text-stone normal-case">(opcional)</span>}
      </label>
      {child}
      {error && (
        <p id={errorId} className="mt-2 text-[0.82rem] text-[#9b3b2a]">
          {error}
        </p>
      )}
    </div>
  );
}
