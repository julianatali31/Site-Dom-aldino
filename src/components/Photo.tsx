import { useState } from 'react';
import type { ImageAsset } from '../data/images';

type PhotoProps = {
  image: ImageAsset;
  /** largura máxima exibida, usada para gerar versões otimizadas */
  widths?: number[];
  sizes?: string;
  /** proporção de recorte (largura / altura) aplicada às imagens remotas */
  ratio?: number;
  className?: string;
  priority?: boolean;
};

const isUnsplash = (src: string) => src.startsWith('https://images.unsplash.com/');

function buildUrl(src: string, width: number, ratio?: number) {
  if (!isUnsplash(src)) return src;
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(width), q: '72' });
  if (ratio) params.set('h', String(Math.round(width / ratio)));
  return `${src}?${params.toString()}`;
}

/**
 * Imagem otimizada: gera srcset responsivo, carrega sob demanda e,
 * se a foto falhar, mostra um fundo neutro no lugar (sem quebrar o layout).
 */
export function Photo({
  image,
  widths = [480, 800, 1200, 1600],
  sizes = '100vw',
  ratio,
  className = '',
  priority = false,
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`bg-gradient-to-br from-sand via-sand-deep to-[#cbb995] ${className}`}
      />
    );
  }

  const remote = isUnsplash(image.src);
  const largest = widths[widths.length - 1];

  return (
    <img
      src={buildUrl(image.src, largest, ratio)}
      srcSet={remote ? widths.map((w) => `${buildUrl(image.src, w, ratio)} ${w}w`).join(', ') : undefined}
      sizes={remote ? sizes : undefined}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-expect-error atributo ainda não tipado no React 18
      fetchpriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
      className={`bg-sand ${className}`}
    />
  );
}
