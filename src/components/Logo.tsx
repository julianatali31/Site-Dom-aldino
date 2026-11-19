type LogoProps = {
  tone?: 'light' | 'dark';
  className?: string;
};

/**
 * Assinatura tipográfica provisória.
 * Quando houver o logotipo oficial, substitua este bloco por <img src="/logo.svg" />.
 */
export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const color = tone === 'light' ? 'text-paper' : 'text-ink';
  return (
    <span className={`flex flex-col leading-none ${color} ${className}`}>
      <span className="font-display text-[1.65rem] font-medium tracking-[0.01em]">Dom Aldino</span>
      <span className="mt-1 text-[0.58rem] font-medium tracking-[0.34em] text-gold uppercase">
        Gastronomia em Eventos
      </span>
    </span>
  );
}
