import React, { useRef, useEffect } from 'react';

// Vídeo de fundo do Hero (mobile e desktop). Para trocar, coloque o novo
// arquivo em /public/hero/ e atualize o caminho abaixo.
const HERO_VIDEO_SRC = '/hero/hero-ocean.mp4';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Garante o autoplay do vídeo em qualquer dispositivo: força `muted` no DOM
  // e tenta play repetidamente. Alguns sistemas (ex.: iOS em Modo de Baixo
  // Consumo) bloqueiam autoplay mesmo com vídeo mudo — nesses casos, o
  // primeiro toque/clique do usuário em QUALQUER lugar da página libera o
  // play automaticamente, sem exibir nenhum botão (destrave silencioso).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;

    let unlocked = false;
    const tryPlay = () => {
      if (unlocked) return;
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.then(() => { unlocked = true; }).catch(() => {});
      }
    };

    tryPlay();
    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('canplay', tryPlay);
    v.addEventListener('playing', () => { unlocked = true; });

    // Qualquer gesto do usuário conta como interação válida para o navegador
    // liberar o autoplay — tentamos o play de novo nesses eventos.
    const events: Array<[string, AddEventListenerOptions?]> = [
      ['touchstart', { passive: true }],
      ['touchend', { passive: true }],
      ['click', undefined],
      ['scroll', { passive: true }],
      ['keydown', undefined],
    ];
    events.forEach(([evt, opts]) => window.addEventListener(evt, tryPlay, opts));
    document.addEventListener('visibilitychange', tryPlay);

    return () => {
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
      events.forEach(([evt, opts]) => window.removeEventListener(evt, tryPlay, opts));
      document.removeEventListener('visibilitychange', tryPlay);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '60px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
      }}
    >
      {/* Fundo: vídeo em qualquer dispositivo (mobile e desktop) */}
      <video
        ref={videoRef}
        className="hero-bg-video"
        src={HERO_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="JP Surf Boards"
      />

      {/* Dark gradient overlay for legibility */}
      <div className="hero-video-overlay" />

      {/* Background Grid (subtle, above video) */}
      <div className="tech-grid-overlay" style={{ opacity: 0.25 }} />

      {/* Editorial Red Bar on Right edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(180deg, var(--accent) 0%, var(--accent-dark) 60%, transparent 100%)',
          zIndex: 3,
        }}
      />

      {/* Main Content Layout — centered */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 5vw',
          position: 'relative',
          zIndex: 3,
        }}
        className="hero-main-container"
      >
        <div style={{ maxWidth: '860px', width: '100%' }} className="hero-content">
          {/* Kicker / eyebrow */}
          <div
            className="text-mono hero-kicker"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.6rem',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '2rem',
            }}
          >
            <span style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
            Shapes Artesanais · Florianópolis, SC
            <span style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
          </div>

          {/* Headline */}
          <h1
            className="text-anton"
            aria-label="JP Surf Boards — Pranchas de Surf Sob Medida em Florianópolis, SC"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              textShadow: '0 2px 40px rgba(0, 0, 0, 0.6)',
            }}
          >
            Sob medida
            <span style={{ display: 'block', color: 'var(--accent)' }}>
              para o seu surf
            </span>
          </h1>

          {/* Slogan */}
          <div
            style={{
              marginTop: '2rem',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              letterSpacing: '0.06em',
              color: 'var(--accent)',
            }}
            className="text-mono"
          >
            "It comes in waves"
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            className="hero-ctas"
          >
            <a href="#catalog" className="btn-premium">
              Ver os modelos ➔
            </a>
            <a href="#about" className="btn-premium-outline">
              A fábrica
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          display: block;
        }
        .hero-video-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse at center, rgba(5, 5, 5, 0.3) 0%, rgba(5, 5, 5, 0.72) 100%),
            linear-gradient(180deg, rgba(5, 5, 5, 0.6) 0%, transparent 22%, transparent 62%, rgba(5, 5, 5, 0.85) 100%);
          pointer-events: none;
        }


        @media (max-width: 600px) {
          .hero-ctas {
            margin-top: 1.75rem !important;
            width: 100%;
          }
          .hero-ctas a {
            width: 100%;
            justify-content: center;
          }
          .hero-kicker {
            font-size: 0.5rem !important;
            letter-spacing: 0.3em !important;
          }
        }
      `}</style>
    </section>
  );
};
