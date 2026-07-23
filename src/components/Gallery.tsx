import React, { useState, useEffect } from 'react';

interface GalleryItem {
  title: string;
  subtitle: string;
  imgSrc: string;
}

export const Gallery: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: GalleryItem[] = [
    {
      title: "O Shaper JP",
      subtitle: "Florianópolis, SC",
      imgSrc: "/gallery/factory-about.webp",
    },
    {
      title: "Linhas do Outline",
      subtitle: "Shaping Lab / 01",
      imgSrc: "/gallery/shaping-outline.webp",
    },
    {
      title: "Laminação em Resina",
      subtitle: "Glassing Room / 02",
      imgSrc: "/gallery/glassing-work.webp",
    },
    {
      title: "Lixamento de Precisão",
      subtitle: "Sanding Lab / 03",
      imgSrc: "/gallery/finish-sanding.webp",
    },
    {
      title: "Pronta para o Surf",
      subtitle: "Fábrica / 04",
      imgSrc: "/gallery/ready-to-surf.webp",
    }
  ];

  const closeModal = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  const next = () => setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      else if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
      else if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, items.length]);

  return (
    <section
      id="gallery"
      style={{
        background: 'var(--bg)',
        padding: '80px 4vw 80px 52px',
        borderBottom: '1px solid var(--border)',
      }}
      className="reveal-on-scroll"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '3rem',
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
            Shaping & Laboratory
          </div>
          <h2 className="text-anton" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)', textTransform: 'uppercase' }}>
            Galeria do Processo
          </h2>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="gallery-grid-container">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`gallery-item g-card-${idx + 1}`}
            role="button"
            tabIndex={0}
            aria-label={`Ampliar: ${item.title}`}
            onClick={() => setOpenIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenIndex(idx);
              }
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--surface-2)',
                transition: 'all 0.3s ease',
              }}
              className="photo-card"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  opacity: 0.8,
                  transition: 'transform 0.5s ease, opacity 0.5s ease',
                }}
                loading="lazy"
              />
              {/* Expand hint */}
              <span className="text-mono gallery-expand">⤢</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div className="glb" role="dialog" aria-modal="true" aria-label="Galeria do processo" onClick={closeModal}>
          <button className="glb-close" onClick={closeModal} aria-label="Fechar">✕</button>
          <div className="glb-stage">
            <button className="glb-nav" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Foto anterior">‹</button>
            <div className="glb-img-wrap" onClick={(e) => e.stopPropagation()}>
              <img key={items[openIndex].imgSrc} src={items[openIndex].imgSrc} alt={items[openIndex].title} />
              <span className="glb-corner tl" />
              <span className="glb-corner tr" />
              <span className="glb-corner bl" />
              <span className="glb-corner br" />
            </div>
            <button className="glb-nav" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Próxima foto">›</button>
          </div>
          <div className="glb-caption">
            <span className="text-mono glb-sub">
              {String(openIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      <style>{`
        .gallery-item { position: relative; }
        .gallery-expand {
          position: absolute;
          top: 12px;
          right: 14px;
          font-size: 0.9rem;
          color: var(--text);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .gallery-item:hover .gallery-expand { opacity: 0.85; }

        /* Lightbox */
        .glb {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(5, 5, 5, 0.94);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 2rem;
          animation: glbFade 0.22s ease;
        }
        @keyframes glbFade { from { opacity: 0; } to { opacity: 1; } }
        .glb-close {
          align-self: flex-end;
          background: none;
          border: none;
          color: var(--text);
          font-size: 1.4rem;
          line-height: 1;
          cursor: pointer;
          padding: 2px 8px;
          transition: color 0.15s ease;
          flex-shrink: 0;
        }
        .glb-close:hover { color: var(--accent); }
        .glb-stage {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
        }
        .glb-img-wrap {
          position: relative;
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          padding: 0.5rem;
        }
        .glb-img-wrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          animation: glbFade 0.25s ease;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.55);
        }
        .glb-corner { position: absolute; width: 14px; height: 14px; pointer-events: none; }
        .glb-corner.tl { top: 0; left: 0; border-top: 1.5px solid var(--accent); border-left: 1.5px solid var(--accent); }
        .glb-corner.tr { top: 0; right: 0; border-top: 1.5px solid var(--accent); border-right: 1.5px solid var(--accent); }
        .glb-corner.bl { bottom: 0; left: 0; border-bottom: 1.5px solid var(--accent); border-left: 1.5px solid var(--accent); }
        .glb-corner.br { bottom: 0; right: 0; border-bottom: 1.5px solid var(--accent); border-right: 1.5px solid var(--accent); }
        .glb-nav {
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
        .glb-nav:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
        .glb-caption {
          flex-shrink: 0;
          text-align: center;
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .glb-sub { font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); }
        @media (max-width: 600px) {
          .glb { padding: 1rem; }
          .glb-nav { width: 38px; height: 38px; font-size: 1.2rem; }
          .glb-stage { gap: 0.4rem; }
          .glb-close {
            width: 42px;
            height: 42px;
            border: 1px solid var(--accent);
            color: var(--accent);
            font-size: 1.2rem;
          }
        }

        .gallery-grid-container {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 200px;
          gap: 0;
        }

        .gallery-item {
          cursor: pointer;
        }
        
        /* Staggered Grid Mapping Classes */
        .g-card-1 { grid-column: span 8; grid-row: span 2; }
        .g-card-2 { grid-column: span 4; grid-row: span 1; }
        .g-card-3 { grid-column: span 4; grid-row: span 1; }
        .g-card-4 { grid-column: span 6; grid-row: span 2; }
        .g-card-5 { grid-column: span 6; grid-row: span 2; }

        .photo-card {
          background: var(--surface-2);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          will-change: border-color, box-shadow;
        }
        
        .photo-card:hover {
          border-color: var(--accent) !important;
          box-shadow: inset 0 0 40px rgba(179, 18, 23, 0.1);
        }
        
        .photo-card:hover img {
          transform: scale(1.02);
          opacity: 1 !important;
        }

        @media (max-width: 900px) {
          #gallery {
            padding-left: 36px !important;
          }
          .gallery-grid-container {
            grid-template-columns: repeat(6, 1fr) !important;
            grid-auto-rows: 160px !important;
            gap: 0 !important;
          }
          .g-card-1 { grid-column: span 6 !important; grid-row: span 2 !important; }
          .g-card-2 { grid-column: span 3 !important; grid-row: span 1 !important; }
          .g-card-3 { grid-column: span 3 !important; grid-row: span 1 !important; }
          .g-card-4 { grid-column: span 6 !important; grid-row: span 1 !important; }
          .g-card-5 { grid-column: span 6 !important; grid-row: span 1 !important; }
        }

        @media (max-width: 600px) {
          #gallery {
            padding-left: 5vw !important;
            padding-right: 5vw !important;
          }
          .gallery-grid-container {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 260px !important;
            gap: 0 !important;
          }
          .gallery-item {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
};
export default Gallery;
