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
            A ligação de Johnny com o mar vem desde criança, encantado com as primeiras paredes corridas e as primeiras batidas — logo todos à sua volta sabiam que aquela relação não pararia por ali. Aos 8 anos teve o primeiro contato com uma sala de shape, e desde então o interesse nunca mais parou de crescer.
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
            Seu tio, André Diehl — que hoje brilha no céu —, já fazia pranchas naquela época, e foi por esse olhar familiar que o menino descobriu um mundo inteiro. Ainda jovem, mudou-se para Florianópolis atrás de um sonho: shapar para a galera local e para grandes surfistas.
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
            Desde então acorda e dorme focado nos estudos e testes para aprimorar cada vez mais o seu trabalho — hoje reconhecido pela qualidade e pelo comprometimento em fazer boas pranchas e bons consertos. <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>"Surf é minha vida"</span>, completa Johnny.
          </p>
          
          {/* Slogan em destaque */}
          <div
            style={{
              margin: '2.5rem 0 2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <span style={{ width: '40px', height: '1px', background: 'var(--accent)', display: 'block', flexShrink: 0 }} />
            <span
              className="text-anton"
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                lineHeight: 1,
              }}
            >
              "It comes in waves"
            </span>
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
          width: 100%;
          max-width: 620px;
          aspect-ratio: 4/5;
          max-height: 78vh;
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
