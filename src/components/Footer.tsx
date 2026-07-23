import React from 'react';
import { boards } from '../data/boards';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '3.5rem 4vw 2rem 52px',
        position: 'relative',
        zIndex: 2,
      }}
      className="reveal-on-scroll"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '2.5rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '2.5rem',
        }}
        className="footer-grid-container"
      >
        {/* Brand signature */}
        <div>
          <div
            className="text-anton"
            style={{
              fontSize: '1.4rem',
              letterSpacing: '0.14em',
              color: 'var(--text)',
              marginBottom: '0.6rem',
            }}
          >
            JP <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>SURF</span> BOARDS
          </div>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--muted)',
              lineHeight: 1.65,
              maxWidth: '240px',
              marginBottom: '1.25rem',
            }}
          >
            Pranchas de surf de alta performance, shapadas sob medida em Florianópolis, SC. Foco total em performance, controle e identidade.
          </p>
          <p
            className="text-mono"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              fontStyle: 'italic',
              marginBottom: '1.25rem',
            }}
          >
            "It comes in waves"
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-configurator'))}
            className="text-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.4rem 1rem',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            +55 (48) 99166-3544
          </button>
        </div>

        {/* Catalog */}
        <div className="footer-col-item">
          <h4
            className="text-mono"
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1.1rem',
            }}
          >
            Catálogo
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {boards.map((board) => (
              <li key={board.id}>
                <a href={`#${board.id}`} style={footerLinkStyle}>
                  {board.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sitemap */}
        <div className="footer-col-item">
          <h4
            className="text-mono"
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1.1rem',
            }}
          >
            Fábrica
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <li>
              <a href="#about" style={footerLinkStyle}>
                A Oficina
              </a>
            </li>
            <li>
              <a href="#order" style={footerLinkStyle}>
                O Processo
              </a>
            </li>
            <li>
              <a href="#gallery" style={footerLinkStyle}>
                Laboratório
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col-item">
          <h4
            className="text-mono"
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1.1rem',
            }}
          >
            Contato
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <li>
              <a
                href="#configurator"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-configurator'));
                }}
                style={footerLinkStyle}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/fua5vJzU6ZHoHSvk7?g_st=ic" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>
                Google Maps
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jp.surfboards?igsh=OHBrZHE5NDk1MXg0" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>
                Instagram
              </a>
            </li>
            <li className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
              Florianópolis, SC
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom info */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span className="text-mono" style={copyrightStyle}>
          © {new Date().getFullYear()} JP Surf Boards — Todos os direitos reservados.
        </span>
        <span className="text-mono" style={copyrightStyle}>
          Shaped in Florianópolis — SC
        </span>
        <span className="text-mono" style={copyrightStyle}>
          Desenvolvido por{' '}
          <a
            href="https://www.instagram.com/doesnotzero.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
          >
            doesnotzero.dev
          </a>
        </span>
      </div>

      <style>{`
        .footer-credit-link {
          color: var(--muted);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .footer-credit-link:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
        @media (max-width: 900px) {
          footer {
            padding-left: 36px !important;
          }
          .footer-grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          footer {
            padding-left: 5vw !important;
            padding-right: 5vw !important;
          }
          .footer-grid-container {
            grid-template-columns: 1fr !important;
            gap: 1.8rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

const footerLinkStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: 'var(--muted)',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
};

const copyrightStyle: React.CSSProperties = {
  fontSize: '0.52rem',
  letterSpacing: '0.12em',
  color: 'rgba(138, 138, 138, 0.35)',
  textTransform: 'uppercase',
};
