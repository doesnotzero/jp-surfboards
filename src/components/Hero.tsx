import React, { useRef, useEffect, useState } from 'react';

// Fundo do Hero. Para trocar, coloque os arquivos em /public/hero/ e atualize
// os caminhos abaixo. No DESKTOP roda o vídeo; no MOBILE mostra uma imagem
// (mais leve/rápida — evita travar e o autoplay bloqueado do iOS).
const HERO_VIDEO_SRC = '/hero/hero-ocean.mp4';
const HERO_VIDEO_POSTER = '/hero/inicio.webp';
const HERO_MOBILE_IMAGE = '/hero/inicio.webp';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Decide já na primeira renderização (app client-side, window existe).
  const [useVideo, setUseVideo] = useState<boolean>(
    () => !(typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches)
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const apply = () => setUseVideo(!mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Garante o autoplay do vídeo (desktop): força `muted` no DOM e tenta play.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    tryPlay();
    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('canplay', tryPlay);
    return () => {
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
    };
  }, [useVideo]);

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
      {/* Fundo: vídeo no desktop, imagem no mobile */}
      {useVideo ? (
        <video
          ref={videoRef}
          className="hero-bg-video"
          src={HERO_VIDEO_SRC}
          poster={HERO_VIDEO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="JP Surf Boards"
        />
      ) : (
        <img
          className="hero-bg-video"
          src={HERO_MOBILE_IMAGE}
          alt="JP Surf Boards — Florianópolis"
          loading="eager"
        />
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
