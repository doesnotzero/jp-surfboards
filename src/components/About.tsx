import React from 'react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}
      className="reveal-on-scroll"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '70vh',
        }}
        className="about-inner-container"
      >
        {/* Left Side: Philosophy and Details */}
        <div
          style={{
            padding: '80px 5vw 80px 52px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="about-text-side"
        >
          <div
            className="text-mono"
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'block' }} />
            A fábrica
          </div>
          
          <h2
            className="text-anton"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 0.9,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          >
            ALMA<br />
            <span style={{ color: 'var(--accent)' }}>ARTESANAL.</span>
          </h2>
          
          <p
            style={{
              marginTop: '2rem',
              maxWidth: '450px',
              fontSize: '0.88rem',
              color: 'var(--muted)',
              lineHeight: 1.85,
            }}
          >
            Dentro da oficina, cada prancha nasce do contato entre a mão, o foam, a resina e o mar. A JP Surf Boards desenvolve shapes artesanais em Florianópolis para surfistas que procuram performance, controle e identidade.
          </p>
          
          <p
            style={{
              marginTop: '0.75rem',
              maxWidth: '450px',
              fontSize: '0.88rem',
              color: 'var(--muted)',
              lineHeight: 1.85,
            }}
          >
            Cada prancha é trabalhada individualmente — do blank à laminação final. Não fazemos pranchas em série. Fazemos a sua prancha, sob medida para as suas ondas e o seu surf.
          </p>
          
          {/* Tech Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              margin: '2rem 0 2.25rem',
            }}
          >
            <span className="text-mono tech-badge active">Shape manual</span>
            <span className="text-mono tech-badge">Florianópolis, SC</span>
            <span className="text-mono tech-badge active">Blank virgem</span>
            <span className="text-mono tech-badge">Laminação artesanal</span>
            <span className="text-mono tech-badge active">Sob medida</span>
          </div>

          <a
            href="https://maps.app.goo.gl/fua5vJzU6ZHoHSvk7?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium-outline"
            style={{ alignSelf: 'flex-start' }}
          >
            Ver no Google Maps
          </a>
        </div>

        {/* Right Side: Visual Factory Photo */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0',
          }}
          className="about-visual-side"
        >
          {/* Big background stamp */}
          <div
            className="text-anton"
            style={{
              position: 'absolute',
              bottom: '-2rem',
              left: '-2rem',
              fontSize: 'clamp(6rem, 15vw, 14rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: 'var(--text)',
              opacity: 0.012,
              lineHeight: 1,
              pointerEvents: 'none',
            }}
          >
            JP
          </div>

          {/* Premium Framed Image */}
          <div className="about-photo-wrapper">
            <img
              src="/gallery/factory-about.webp"
              alt="JP Surf Boards Factory Workshop"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                opacity: 0.85,
                transition: 'opacity 0.3s ease, transform 0.6s ease',
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <style>{`
        .tech-badge {
          font-size: 0.52rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 0.35rem 0.8rem;
          transition: all 0.2s ease;
        }
        .tech-badge.active {
          border-color: var(--accent);
          color: var(--accent);
        }
        .about-photo-wrapper {
          width: 95%;
          max-width: 600px;
          aspect-ratio: 16/9;
          background: var(--surface-2);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }
        .about-photo-grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 14px,
            rgba(179, 18, 23, 0.035) 14px,
            rgba(179, 18, 23, 0.035) 15px
          );
        }
        .about-visual-side:hover .about-photo-wrapper {
          transform: scale(1.02);
          border-color: var(--accent);
        }
        .about-visual-side:hover .about-photo-wrapper img {
          opacity: 0.95;
        }
        @media (max-width: 1024px) {
          .about-inner-container {
            grid-template-columns: 1fr !important;
          }
          .about-visual-side {
            min-height: 45vh;
          }
        }
        @media (max-width: 900px) {
          .about-text-side {
            padding-left: 36px !important;
          }
        }
        @media (max-width: 600px) {
          .about-text-side {
            padding-left: 5vw !important;
            padding-right: 5vw !important;
          }
        }
      `}</style>
    </section>
  );
};
