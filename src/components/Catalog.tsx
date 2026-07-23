import React, { useState, useEffect } from 'react';
import { boards, type Board } from '../data/boards';
import { useSwipe } from '../utils/useSwipe';

/**
 * Card branco do produto com álbum de fotos.
 * A primeira imagem exibida é a principal; se houver mais de uma foto
 * (board.gallery), aparece uma tira de miniaturas para trocar a imagem.
 * Clicar na imagem abre um modal (lightbox) para ver em tela cheia.
 */
const BoardImageCard: React.FC<{ board: Board }> = ({ board }) => {
  const images =
    board.gallery && board.gallery.length > 0 ? board.gallery : [board.mainImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const hasAlbum = images.length > 1;

  // Fotos reais do modelo — o índice 0 da galeria é a "capa"/logo, então o
  // lightbox mostra apenas as fotos de verdade (sem a arte da logo).
  const photos = images.length > 1 ? images.slice(1) : images;
  const [modalOpen, setModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openModal = () => {
    setPhotoIndex(activeIndex > 0 ? activeIndex - 1 : 0);
    setModalOpen(true);
  };
  const prevPhoto = () => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % photos.length);
  const swipeHandlers = useSwipe(nextPhoto, prevPhoto);

  // Teclado (ESC / setas) + trava de scroll do body enquanto aberto
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
      else if (e.key === 'ArrowLeft') setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
      else if (e.key === 'ArrowRight') setPhotoIndex((i) => (i + 1) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen, photos.length]);

  return (
    <>
    <div className="catalog-album" style={{ zIndex: 2, position: 'relative' }}>
      {/* Premium Catalog Box (Off-White high contrast card) */}
      <div
        className="catalog-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          aspectRatio: '2/3',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.75rem 1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          transition:
            'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Card Corner accents (Technical red marks) */}
        <div style={{ position: 'absolute', top: '8px', left: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)' }} />
        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)' }} />
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)' }} />
        <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)' }} />

        {/* Album counter badge */}
        {hasAlbum && (
          <div
            className="text-mono"
            style={{
              position: 'absolute',
              top: '12px',
              right: '14px',
              fontSize: '0.45rem',
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              zIndex: 3,
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
          </div>
        )}

        {/* Shaper metadata stamp inside the card */}
        <div
          className="text-mono"
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.45rem',
            letterSpacing: '0.2em',
            color: 'rgba(5, 5, 5, 0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          JP SURFBOARDS // {board.name.toUpperCase()}
        </div>

        {/* Expand hint */}
        <div
          className="text-mono catalog-expand-hint"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '14px',
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            color: 'rgba(5, 5, 5, 0.5)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          ⤢ Ampliar
        </div>

        {/* Main Surfboard Image (clique abre o modal) */}
        <div
          className="board-img-wrapper"
          role="button"
          tabIndex={0}
          aria-label={`Ampliar fotos de ${board.name}`}
          onClick={openModal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openModal();
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            cursor: 'zoom-in',
          }}
        >
          <img
            key={activeImage}
            src={activeImage}
            alt={`Prancha de surf ${board.name} (${board.category}) — JP Surf Boards, Florianópolis`}
            loading="lazy"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            }}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const svgFallback = target.nextElementSibling as HTMLElement;
              if (svgFallback) svgFallback.style.display = 'block';
            }}
          />

          {/* Fallback silhouette if image fails */}
          <svg
            style={{ display: 'none', width: '60%', opacity: 0.12 }}
            viewBox="0 0 200 460"
            fill="none"
            stroke="#050505"
            strokeWidth="1.5"
          >
            <path d="M100 10C135 10 162 48 165 125C168 188 165 290 158 355C148 408 130 450 100 460C70 450 52 408 42 355C35 290 32 188 35 125C38 48 65 10 100 10Z" />
            <line x1="100" y1="10" x2="100" y2="460" stroke="var(--accent)" strokeDasharray="5 8" />
          </svg>
        </div>

        {/* Bottom details inside card — technical charm */}
        <div
          className="text-mono"
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '88%',
            textAlign: 'center',
            fontSize: '0.46rem',
            letterSpacing: '0.16em',
            lineHeight: 1.7,
            textTransform: 'uppercase',
            color: 'rgba(5, 5, 5, 0.55)',
          }}
        >
          <span style={{ display: 'block' }}>
            {board.spot} · {board.coordinates}
          </span>
        </div>
      </div>

      {/* Thumbnail strip (album) */}
      {hasAlbum && (
        <div className="catalog-thumbs">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              aria-label={`Ver foto ${i + 1} de ${board.name}`}
              aria-pressed={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className={`catalog-thumb${i === activeIndex ? ' is-active' : ''}`}
            >
              <img src={img} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Editorial lightbox */}
    {modalOpen && (
      <div
        className="lb"
        role="dialog"
        aria-modal="true"
        aria-label={`Fotos do modelo ${board.name}`}
        onClick={() => setModalOpen(false)}
      >
        {/* Top bar */}
        <div className="lb-topbar" onClick={(e) => e.stopPropagation()}>
          <div className="lb-title">
            <span className="lb-name text-anton">{board.name}</span>
            <span className="lb-cat text-mono">{board.spot}</span>
          </div>
          <span className="lb-counter text-mono">
            {String(photoIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <button className="lb-close" onClick={() => setModalOpen(false)} aria-label="Fechar">
            ✕
          </button>
        </div>

        {/* Stage (tocar na área escura fecha; arrastar troca de foto no mobile) */}
        <div className="lb-stage" {...swipeHandlers}>
          {photos.length > 1 && (
            <button
              className="lb-nav lb-prev"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              aria-label="Foto anterior"
            >
              ‹
            </button>
          )}
          <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              key={photos[photoIndex]}
              src={photos[photoIndex]}
              alt={`${board.name} — foto ${photoIndex + 1} de ${photos.length}`}
            />
            {/* Technical corner marks */}
            <span className="lb-corner tl" />
            <span className="lb-corner tr" />
            <span className="lb-corner bl" />
            <span className="lb-corner br" />
          </div>
          {photos.length > 1 && (
            <button
              className="lb-nav lb-next"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              aria-label="Próxima foto"
            >
              ›
            </button>
          )}
        </div>

        {/* Dots de posição (mobile) */}
        {photos.length > 1 && (
          <div className="lb-dots" onClick={(e) => e.stopPropagation()}>
            {photos.map((img, i) => (
              <button
                key={img}
                className={`lb-dot${i === photoIndex ? ' is-active' : ''}`}
                onClick={() => setPhotoIndex(i)}
                aria-label={`Ir para a foto ${i + 1}`}
                aria-pressed={i === photoIndex}
              />
            ))}
          </div>
        )}

        {/* Thumbnail rail (desktop) */}
        {photos.length > 1 && (
          <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {photos.map((img, i) => (
              <button
                key={img}
                className={`lb-thumb${i === photoIndex ? ' is-active' : ''}`}
                onClick={() => setPhotoIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-pressed={i === photoIndex}
              >
                <img src={img} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          className="lb-cta btn-premium"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(false);
            window.dispatchEvent(
              new CustomEvent('open-configurator', { detail: { modelId: board.id } })
            );
          }}
        >
          Encomendar esse shape ➔
        </button>
      </div>
    )}
    </>
  );
};

export const Catalog: React.FC = () => {
  return (
    <section id="catalog" style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* Catalog Section Header */}
      <div
        className="reveal-on-scroll catalog-header"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '110px 5vw 64px 52px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        {/* Giant watermark word */}
        <div
          className="text-anton catalog-header-watermark"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            right: '2vw',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(9rem, 24vw, 26rem)',
            lineHeight: 0.8,
            letterSpacing: '0.02em',
            color: 'var(--text)',
            opacity: 0.025,
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          SHAPES
        </div>

        {/* Top meta row */}
        <div
          className="text-mono catalog-header-meta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '3.5rem',
            position: 'relative',
            zIndex: 2,
            fontSize: '0.55rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(138, 138, 138, 0.5)',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>[ Modelos ]</span>
          <span>{String(boards.length).padStart(2, '0')} Modelos · Sob Encomenda</span>
        </div>

        <div className="catalog-header-grid" style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <div
              className="text-mono"
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span style={{ width: '28px', height: '1px', background: 'var(--accent)', display: 'block' }} />
              Modelos Disponíveis
            </div>
            <h2
              className="text-anton"
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                lineHeight: 0.86,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: 'var(--text)',
              }}
            >
              Nossos
              <span style={{ display: 'block', color: 'var(--accent)' }}>Modelos</span>
            </h2>
          </div>

          <div className="catalog-header-copy">
            <p
              style={{
                maxWidth: '420px',
                fontSize: '0.92rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
                marginBottom: '2rem',
              }}
            >
              Na JP, acreditamos que uma boa prancha começa entendendo o surfista. Cada prancha é desenvolvida de forma personalizada, unindo estudo técnico e experiência no mar.
            </p>
            <p
              style={{
                maxWidth: '420px',
                fontSize: '0.92rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
              }}
            >
              O resultado são pranchas que equilibram performance, funcionalidade e um acabamento artístico exclusivo, refletindo a identidade de cada surfista.
            </p>
          </div>
        </div>

        {/* Model index bar */}
        <div
          className="text-mono catalog-header-index"
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: '4rem',
            paddingTop: '1.75rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem 2.2rem',
            alignItems: 'center',
          }}
        >
          {boards.map((board) => (
            <a
              key={board.id}
              href={`#${board.id}`}
              className="catalog-index-link"
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '0.5rem',
                fontSize: '0.6rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
            >
              <span style={{ color: 'var(--accent)', fontSize: '0.5rem' }}>{board.number}</span>
              {board.name}
            </a>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div>
        {boards.map((board, index) => {
          const isAlt = index % 2 !== 0;
          return (
            <div
              key={board.id}
              id={board.id}
              className="board-entry reveal-on-scroll"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Board Visual Frame */}
              <div
                className="board-img-frame"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  order: isAlt ? 2 : 1,
                  padding: '30px 2.5vw',
                }}
              >
                {/* Tech drawing overlays (grid texture) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 24px, rgba(255, 255, 255, 0.003) 24px, rgba(255, 255, 255, 0.003) 25px)',
                  }}
                />

                {/* Big watermark background letter */}
                <div
                  className="text-anton"
                  style={{
                    position: 'absolute',
                    fontSize: 'clamp(8rem, 20vw, 22rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.01em',
                    color: 'var(--text)',
                    opacity: 0.012,
                    whiteSpace: 'nowrap',
                    bottom: '-2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    lineHeight: 1,
                  }}
                >
                  {board.bgWord}
                </div>

                {/* Volume watermark */}
                <div
                  className="text-anton"
                  style={{
                    position: 'absolute',
                    top: '2.5rem',
                    right: '2.5rem',
                    fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                    color: 'var(--accent)',
                    opacity: 0.035,
                    letterSpacing: '0.02em',
                    pointerEvents: 'none',
                    lineHeight: 1,
                    textAlign: 'right',
                  }}
                >
                  {board.volume.replace(/\s+/g, '')}
                </div>

                {/* Outer frame coordinate details (Desktop only) */}


                {/* Premium Catalog Box with photo album */}
                <BoardImageCard board={board} />
              </div>

              {/* Board Info Column */}
              <div
                className="board-info-side"
                style={{
                  padding: '60px 4.5vw',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: 'var(--bg)',
                  order: isAlt ? 1 : 2,
                }}
              >
                {/* Meta Header */}
                <div
                  className="text-mono"
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.38em',
                    textTransform: 'uppercase',
                    color: 'rgba(138, 138, 138, 0.4)',
                    marginBottom: '1rem',
                  }}
                >
                  {board.number} / {String(boards.length).padStart(2, '0')}
                </div>

                <h3
                  className="text-anton"
                  style={{
                    fontSize: 'clamp(2.8rem, 5.5vw, 6.2rem)',
                    lineHeight: 0.88,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    marginBottom: '1.8rem',
                  }}
                >
                  {board.name.split(' ').map((word, idx) => (
                    <span key={idx} style={{ display: 'block' }}>
                      {word}
                    </span>
                  ))}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--muted)',
                    lineHeight: 1.8,
                    maxWidth: '420px',
                    marginBottom: '2rem',
                  }}
                >
                  {board.description}
                </p>

                {/* CTA Action */}
                <div style={{ alignSelf: 'flex-start' }}>
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('open-configurator', { detail: { modelId: board.id } }));
                    }}
                    className="btn-premium"
                    style={{ cursor: 'pointer' }}
                  >
                    Encomendar esse shape ➔
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .catalog-header-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3rem;
          align-items: end;
        }
        .catalog-index-link:hover {
          color: var(--accent) !important;
        }
        @media (max-width: 900px) {
          .catalog-header {
            padding: 80px 36px 48px 36px !important;
          }
          .catalog-header-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            align-items: start !important;
          }
          .catalog-header-watermark {
            opacity: 0.02 !important;
            font-size: 40vw !important;
          }
        }
        @media (max-width: 600px) {
          .catalog-header {
            padding: 64px 5vw 40px 5vw !important;
          }
          .catalog-header-meta {
            letter-spacing: 0.2em !important;
            font-size: 0.48rem !important;
          }
        }
        .catalog-album {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          max-width: 460px;
        }
        .catalog-thumbs {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .catalog-thumb {
          width: 58px;
          height: 58px;
          padding: 3px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          cursor: pointer;
          opacity: 0.55;
          transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .catalog-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .catalog-thumb:hover {
          opacity: 0.85;
          border-color: rgba(179, 18, 23, 0.5);
        }
        .catalog-thumb.is-active {
          opacity: 1;
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        /* Editorial lightbox */
        .lb {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(5, 5, 5, 0.94);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 2rem;
          animation: lbFade 0.22s ease;
        }
        @keyframes lbFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .lb-topbar {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-bottom: 1.1rem;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .lb-title {
          display: flex;
          flex-direction: column;
          line-height: 1.35;
          margin-right: auto;
          min-width: 0;
        }
        .lb-name {
          font-size: 1.15rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text);
        }
        .lb-cat {
          font-size: 0.54rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .lb-counter {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          color: var(--muted);
          flex-shrink: 0;
        }
        .lb-close {
          background: none;
          border: none;
          color: var(--text);
          font-size: 1.35rem;
          line-height: 1;
          cursor: pointer;
          padding: 2px 8px;
          transition: color 0.15s ease;
          flex-shrink: 0;
        }
        .lb-close:hover { color: var(--accent); }
        .lb-stage {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
        }
        .lb-img-wrap {
          position: relative;
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          padding: 0.5rem;
        }
        .lb-img-wrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          animation: lbFade 0.25s ease;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.55);
        }
        .lb-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          pointer-events: none;
        }
        .lb-corner.tl { top: 0; left: 0; border-top: 1.5px solid var(--accent); border-left: 1.5px solid var(--accent); }
        .lb-corner.tr { top: 0; right: 0; border-top: 1.5px solid var(--accent); border-right: 1.5px solid var(--accent); }
        .lb-corner.bl { bottom: 0; left: 0; border-bottom: 1.5px solid var(--accent); border-left: 1.5px solid var(--accent); }
        .lb-corner.br { bottom: 0; right: 0; border-bottom: 1.5px solid var(--accent); border-right: 1.5px solid var(--accent); }
        .lb-nav {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .lb-nav:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .lb-thumbs {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 1.1rem;
          flex-shrink: 0;
        }
        .lb-thumb {
          width: 56px;
          height: 56px;
          padding: 0;
          background: none;
          border: 1px solid var(--border);
          cursor: pointer;
          opacity: 0.5;
          overflow: hidden;
          transition: opacity 0.15s ease, border-color 0.15s ease;
        }
        .lb-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lb-thumb:hover { opacity: 0.85; }
        .lb-thumb.is-active { opacity: 1; border-color: var(--accent); }
        .lb-cta {
          align-self: center;
          margin-top: 1.1rem;
          flex-shrink: 0;
        }
        /* Dots de posição — visíveis só no mobile (substituem a tira de miniaturas) */
        .lb-dots {
          display: none;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.85rem;
          flex-shrink: 0;
        }
        .lb-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.25);
          padding: 0;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .lb-dot.is-active {
          background: var(--accent);
          transform: scale(1.3);
        }
        @media (max-width: 600px) {
          .lb {
            padding: 0.85rem 0.5rem;
            padding-bottom: max(0.85rem, env(safe-area-inset-bottom));
          }
          .lb-name { font-size: 0.9rem; }
          .lb-cat { font-size: 0.5rem; }
          /* No mobile o gesto é arrastar (swipe): esconde setas e miniaturas,
             mostra os dots de posição no lugar. */
          .lb-nav { display: none; }
          .lb-thumbs { display: none; }
          .lb-dots { display: flex; }
          .lb-stage { gap: 0; touch-action: pan-y; }
          .lb-counter { display: none; }
          .lb-topbar { padding-bottom: 0.85rem; }
          .lb-close {
            width: 44px;
            height: 44px;
            border: 1px solid var(--accent);
            color: var(--accent);
            font-size: 1.2rem;
            flex-shrink: 0;
          }
          .lb-cta {
            width: 100%;
            justify-content: center;
            margin-top: 0.9rem;
          }
        }
        .catalog-expand-hint {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .catalog-card:hover .catalog-expand-hint {
          opacity: 1;
        }
        .catalog-card:hover {
          transform: translateY(-8px) !important;
          border-color: var(--accent) !important;
          box-shadow: 0 35px 70px rgba(0, 0, 0, 0.75) !important;
        }
        .catalog-card:hover img {
          transform: scale(1.02);
        }
        .catalog-card {
          contain: layout style paint;
        }
        @media (max-width: 900px) {
          .board-entry {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .board-img-frame {
            order: -1 !important;
            min-height: 420px !important;
            border: none !important;
            border-bottom: 1px solid var(--border) !important;
            padding: 40px 5vw !important;
          }
          .catalog-card {
            max-width: 280px !important;
          }
          .board-info-side {
            order: 1 !important;
            padding: 3rem 36px !important;
          }
          .catalog-card:hover {
            transform: none !important;
          }
          .catalog-card:hover img {
            transform: none !important;
          }
        }
        @media (max-width: 600px) {
          .board-info-side {
            padding: 2.5rem 5vw !important;
          }
          .catalog-card {
            max-width: 250px !important;
          }
        }
        @media (max-width: 900px) {
          .desktop-only-item {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
