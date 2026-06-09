import React from 'react';
import { boards } from '../data/boards';

export const Catalog: React.FC = () => {
  return (
    <section id="catalog" style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* Catalog Section Header */}
      <div
        className="reveal-on-scroll"
        style={{
          padding: '80px 5vw 48px 52px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '3rem',
          flexWrap: 'wrap',
          background: 'var(--bg)',
        }}
      >
        <div>
          <div
            className="text-mono"
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'block' }} />
            Modelos Disponíveis
          </div>
          <h2 className="text-anton" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)', textTransform: 'uppercase' }}>
            CATÁLOGO TÉCNICO
          </h2>
        </div>
        <p
          className="text-mono"
          style={{
            maxWidth: '320px',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          Cada shape foi projetado sob parâmetros específicos de hidrodinâmica, volume e rocker. Encontre a prancha ideal para o seu nível e o tipo de onda que quer surfar.
        </p>
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
                <div
                  className="text-mono desktop-only-item"
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: isAlt ? 'auto' : '2rem',
                    right: isAlt ? '2rem' : 'auto',
                    zIndex: 3,
                    fontSize: '0.52rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(138, 138, 138, 0.4)',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ display: 'block' }}>SETUP: {board.fins}</span>
                  <span style={{ display: 'block' }}>COORDS: {board.coordinates}</span>
                </div>

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
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Card Corner accents (Technical red marks) */}
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)' }} />
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)' }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)' }} />
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)' }} />

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
                    JP SURFBOARDS // {board.category.toUpperCase()}
                  </div>

                  {/* Main Surfboard Image */}
                  <div
                    className="board-img-wrapper"
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px',
                    }}
                  >
                    <img
                      src={board.mainImage}
                      alt={`${board.category} — ${board.name}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const svgFallback = target.nextElementSibling as HTMLElement;
                        if (svgFallback) svgFallback.style.display = 'block';
                      }}
                      loading="lazy"
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

                  {/* Bottom details inside card */}
                  <div
                    className="text-mono"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '0.45rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(5, 5, 5, 0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {board.sizes} // {board.volume}
                  </div>
                </div>
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

                <div
                  className="text-mono"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.58rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                  }}
                >
                  <span style={{ width: '14px', height: '1px', background: 'var(--accent)', display: 'block' }} />
                  {board.category}
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

                {/* Tech tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
                  {board.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-mono catalog-feel-tag"
                      style={{
                        fontSize: '0.5rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: tIdx === 0 ? 'var(--accent)' : 'var(--muted)',
                        border: '1px solid var(--border)',
                        borderColor: tIdx === 0 ? 'rgba(179, 18, 23, 0.3)' : 'var(--border)',
                        padding: '0.28rem 0.7rem',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Specs Blueprint Table */}
                <div
                  style={{
                    borderTop: '1px solid var(--border)',
                    marginBottom: '2.5rem',
                    width: '100%',
                    maxWidth: '420px',
                  }}
                >
                  <div className="spec-row-item">
                    <span className="spec-key text-mono">Tamanhos</span>
                    <span className="spec-val text-mono">{board.sizes}</span>
                  </div>
                  <div className="spec-row-item highlight-row">
                    <span className="spec-key text-mono">Volume</span>
                    <span className="spec-val text-mono">{board.volume}</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="spec-key text-mono">Quilhas Setup</span>
                    <span className="spec-val text-mono">{board.fins}</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="spec-key text-mono">Rabeta (Tail)</span>
                    <span className="spec-val text-mono">{board.tail}</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="spec-key text-mono">Tipo de Rocker</span>
                    <span className="spec-val text-mono">{board.rocker}</span>
                  </div>
                  <div className="spec-row-item">
                    <span className="spec-key text-mono">Indicado para</span>
                    <span className="spec-val text-mono">{board.waveType}</span>
                  </div>
                </div>

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
        .catalog-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          border-color: var(--accent) !important;
          box-shadow: 0 35px 70px rgba(0, 0, 0, 0.75) !important;
        }
        .catalog-card:hover img {
          transform: scale(1.04) rotate(-1.5deg);
        }
        .spec-row-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--border);
          padding: 0.8rem 0;
          transition: background-color 0.2s ease;
        }
        .spec-row-item:hover {
          background-color: rgba(255, 255, 255, 0.01);
        }
        .spec-key {
          font-size: 0.62rem;
          color: rgba(138, 138, 138, 0.4);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .spec-val {
          font-size: 0.62rem;
          color: var(--text);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-align: right;
        }
        .highlight-row .spec-val {
          color: var(--accent);
          font-weight: 700;
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
