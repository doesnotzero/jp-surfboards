import React from 'react';

interface GalleryItem {
  title: string;
  subtitle: string;
  imgSrc: string;
}

export const Gallery: React.FC = () => {
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
          <h2 className="text-anton" style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', textTransform: 'uppercase' }}>
            Galeria do Processo
          </h2>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="gallery-grid-container">
        {items.map((item, idx) => (
          <div key={idx} className={`gallery-item g-card-${idx + 1}`}>
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
            </div>
          </div>
        ))}
      </div>

      <style>{`
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
