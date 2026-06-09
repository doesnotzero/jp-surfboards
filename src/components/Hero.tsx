import React from 'react';

export const Hero: React.FC = () => {
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
      {/* Background Grid */}
      <div className="tech-grid-overlay" />
      
      {/* Editorial Red Bar on Right edge of Grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(180deg, var(--accent) 0%, var(--accent-dark) 60%, transparent 100%)',
          zIndex: 2,
        }}
      />



      {/* Main Content Layout */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 480px',
          alignItems: 'center',
          padding: '0 80px 0 52px',
          position: 'relative',
          zIndex: 2,
          gap: '2rem',
        }}
        className="hero-main-container"
      >
        {/* Left Side Info */}
        <div style={{ paddingRight: '2vw' }} className="hero-left-side">
          <div
            className="text-mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.58rem',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '2rem',
            }}
          >
            <span style={{ width: '28px', height: '1px', background: 'var(--accent)' }} />
            Handcrafted Performance Surfboards
          </div>
          
          <h1
            className="text-anton"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 8.5rem)',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          >
            JP
            <span
              style={{
                display: 'block',
                lineHeight: 0.82,
                color: 'var(--accent)',
              }}
            >
              SURF
            </span>
            BOARDS
          </h1>

          {/* Mobile-only Hero Image (displays below title on mobile) */}
          <div className="mobile-hero-img-box">
            <img
              src="/hero/inicio.webp"
              alt="JP Surf Boards"
              className="mobile-hero-img"
              loading="eager"
            />
            <div className="mobile-hero-img-border" />
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
            className="hero-taglines"
          >
            <span style={taglineItemStyle}>Handcrafted</span>
            <span style={taglineItemStyle}>Performance</span>
            <span style={taglineItemStyle}>Custom Shapes</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }} className="hero-ctas">
            <a href="#catalog" className="btn-premium">
              Catálogo técnico ➔
            </a>
            <a href="#about" className="btn-premium-outline">
              A fábrica
            </a>
          </div>
        </div>

        {/* Right Side Image Showcase (Desktop Only) */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '1.5rem',
          }}
          className="hero-right-side"
        >
          <div className="hero-image-frame-container">
            <div className="hero-image-frame">
              <img
                src="/hero/inicio.webp"
                alt="JP Surf Boards Workshop Design"
                className="hero-desktop-img"
                loading="eager"
              />
              <div className="hero-img-overlay-lines" />
            </div>
            
            {/* Fine Technical Line Overlay */}
            <div className="hero-tech-line-h" />
            <div className="hero-tech-line-v" />
            

            <span
              className="text-mono"
              style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.48rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                whiteSpace: 'nowrap',
              }}
            >
              [ SHAPER INICIO ]
            </span>
          </div>
        </div>
      </div>

      {/* Model Shortcuts Bottom bar */}
      <div
        style={{
          padding: '1.25rem 4vw 1.25rem 52px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 2,
        }}
        className="hero-foot-bar"
      >
        <span
          className="text-mono"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(138, 138, 138, 0.4)',
          }}
        >
          Modelos
        </span>
        <div
          className="text-mono hero-foot-links"
          style={{
            display: 'flex',
            gap: '2.2rem',
            marginLeft: 'auto',
          }}
        >
          <a href="#performance" style={footLinkStyle}>
            Performance
          </a>
          <a href="#fish" style={footLinkStyle}>
            Fish
          </a>
          <a href="#funboard" style={footLinkStyle}>
            Funboard
          </a>
          <a href="#longboard" style={footLinkStyle}>
            Longboard
          </a>
          <a href="#step-up" style={footLinkStyle}>
            Step Up
          </a>
          <a href="#custom" style={footLinkStyle}>
            Heavy Water
          </a>
          <a href="#bus-driver" style={footLinkStyle}>
            Bus Driver
          </a>
        </div>
      </div>

      <style>{`
        .hero-image-frame-container {
          position: relative;
          width: 360px;
          height: 520px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-image-frame-container:hover {
          transform: rotate(-1.5deg) scale(1.015);
        }
        .hero-image-frame {
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          background: var(--surface-2);
        }
        .hero-desktop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
        .hero-image-frame-container:hover .hero-desktop-img {
          opacity: 0.95;
        }
        .hero-img-overlay-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(179, 18, 23, 0.02) 20px,
            rgba(179, 18, 23, 0.02) 21px
          );
        }
        .hero-tech-line-h {
          display: none;
        }
        .hero-tech-line-v {
          display: none;
        }
        
        /* Mobile Specific Style */
        .mobile-hero-img-box {
          display: none;
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        .mobile-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          border: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 0.85;
        }
        .mobile-hero-img-border {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border: 1px solid var(--accent);
          opacity: 0.2;
          margin: 4px;
        }

        @media (max-width: 1024px) {
          .hero-main-container {
            grid-template-columns: 1fr !important;
            padding: 3rem 5vw 3rem 52px !important;
            min-height: calc(100vh - 60px) !important;
          }
          .hero-right-side {
            display: none !important;
          }
          .hero-foot-links {
            display: none !important;
          }
          .mobile-hero-img-box {
            display: block !important;
          }
        }
        @media (max-width: 900px) {
          .hero-main-container {
            padding-left: 36px !important;
          }
          .hero-foot-bar {
            padding-left: 36px !important;
          }
        }
        @media (max-width: 600px) {
          .hero-main-container {
            padding-left: 5vw !important;
            padding-right: 5vw !important;
          }
          .hero-foot-bar {
            padding-left: 5vw !important;
          }
          .hero-taglines {
            margin-top: 1.5rem !important;
          }
          .hero-ctas {
            margin-top: 1.5rem !important;
            width: 100%;
          }
          .hero-ctas a {
            width: 100%;
            justify-content: center;
          }
        }
        .hero-foot-links a:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </section>
  );
};

const taglineItemStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.62rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
};



const footLinkStyle: React.CSSProperties = {
  fontSize: '0.52rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
};
