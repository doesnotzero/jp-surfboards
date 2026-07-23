import React, { useRef, useEffect, useState } from 'react';

// Vídeo de fundo do Hero (mobile e desktop). Para trocar, coloque o novo
// arquivo em /public/hero/ e atualize o caminho abaixo.
const HERO_VIDEO_SRC = '/hero/hero-ocean.mp4';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTapToPlay, setNeedsTapToPlay] = useState(false);

  // Garante o autoplay do vídeo em qualquer dispositivo: força `muted` no DOM
  // e tenta play em vários gatilhos. Alguns sistemas (ex.: iOS em Modo de
  // Baixo Consumo) bloqueiam autoplay mesmo com vídeo mudo — nesse caso,
  // mostramos um botão discreto para o usuário iniciar com um toque.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;

    let settled = false;
    const markPlaying = () => {
      settled = true;
      setNeedsTapToPlay(false);
    };
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.then(markPlaying).catch(() => {
          if (!settled) setNeedsTapToPlay(true);
        });
      } else {
        markPlaying();
      }
    };

    tryPlay();
    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('canplay', tryPlay);
    v.addEventListener('playing', markPlaying);

    // Alguns navegadores liberam o autoplay após a primeira interação do
    // usuário — tenta novamente nesses gatilhos.
    const retry = () => tryPlay();
    window.addEventListener('touchstart', retry, { passive: true, once: true });
    window.addEventListener('scroll', retry, { passive: true, once: true });
    document.addEventListener('visibilitychange', retry);

    // Se depois de um tempo ainda não tocou, mostra o botão de play manual.
    const timer = window.setTimeout(() => {
      if (!settled && v.paused) setNeedsTapToPlay(true);
    }, 1200);

    return () => {
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
      v.removeEventListener('playing', markPlaying);
      window.removeEventListener('touchstart', retry);
      window.removeEventListener('scroll', retry);
      document.removeEventListener('visibilitychange', retry);
      window.clearTimeout(timer);
    };
  }, []);

  const handleManualPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play()
      .then(() => setNeedsTapToPlay(false))
      .catch(() => {});
  };

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

      {/* Botão de play manual — aparece só se o navegador bloquear o autoplay */}
      {needsTapToPlay && (
        <button
          type="button"
          className="hero-play-fallback"
          onClick={handleManualPlay}
          aria-label="Reproduzir vídeo de fundo"
        >
          ▶
        </button>
      )}

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
        .hero-play-fallback {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          background: rgba(5, 5, 5, 0.6);
          color: var(--text);
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .hero-play-fallback:hover {
          background: var(--accent);
          transform: translate(-50%, -50%) scale(1.06);
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
