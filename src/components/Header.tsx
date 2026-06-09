import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Apply overflow hidden to body when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4vw 0 52px',
          background: isScrolled ? 'rgba(5, 5, 5, 0.96)' : 'rgba(5, 5, 5, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          transition: 'background 0.2s ease, border-color 0.2s ease',
        }}
      >
        <a
          href="#hero"
          className="text-anton"
          style={{
            fontSize: '1.1rem',
            letterSpacing: '0.18em',
            color: 'var(--text)',
            textDecoration: 'none',
          }}
        >
          JP <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>SURF</span> BOARDS
        </a>

        {/* Desktop Menu */}
        <ul
          className="text-mono"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            listStyle: 'none',
          }}
        >
          <li className="desktop-only-item">
            <a href="#about" style={navLinkStyle}>
              Fábrica
            </a>
          </li>
          <li className="desktop-only-item">
            <a href="#catalog" style={navLinkStyle}>
              Catálogo
            </a>
          </li>
          <li className="desktop-only-item">
            <a href="#order" style={navLinkStyle}>
              Encomenda
            </a>
          </li>
          <li className="desktop-only-item">
            <a href="#gallery" style={navLinkStyle}>
              Galeria
            </a>
          </li>
        </ul>

        {/* CTA */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-configurator'))}
          className="nav-cta-btn desktop-only-item text-mono"
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '0.5rem 1.2rem',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Falar com a fábrica
        </button>

        {/* Hamburger */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            zIndex: 601,
          }}
          className="mobile-hamburger"
        >
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--text)',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              transition: 'transform 0.25s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--text)',
              opacity: isMobileMenuOpen ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--text)',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              transition: 'transform 0.25s ease',
            }}
          />
        </button>
      </nav>

      {/* Mobile Nav Drawer */}
      <nav
        className="text-anton"
        style={{
          display: isMobileMenuOpen ? 'flex' : 'none',
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--bg)',
          zIndex: 499,
          flexDirection: 'column',
          padding: '3rem 5vw 3rem 52px',
          gap: '0',
          borderTop: '1px solid var(--border)',
          overflowY: 'auto',
          animation: 'fadeIn 0.25s ease',
        }}
      >
        <a href="#about" onClick={closeMobileMenu} style={mobileLinkStyle}>
          Fábrica
        </a>
        <a href="#catalog" onClick={closeMobileMenu} style={mobileLinkStyle}>
          Catálogo
        </a>
        <a href="#order" onClick={closeMobileMenu} style={mobileLinkStyle}>
          Encomenda
        </a>
        <a href="#gallery" onClick={closeMobileMenu} style={mobileLinkStyle}>
          Galeria
        </a>
        <a
          href="#configurator"
          onClick={(e) => {
            e.preventDefault();
            closeMobileMenu();
            window.dispatchEvent(new CustomEvent('open-configurator'));
          }}
          style={{
            ...mobileLinkStyle,
            color: 'var(--accent)',
            borderBottom: 'none',
          }}
        >
          Falar no WhatsApp
        </a>
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .desktop-only-item {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .nav-cta-btn:hover {
          background: var(--accent) !important;
          color: #fff !important;
          box-shadow: 0 0 10px rgba(179, 18, 23, 0.2);
        }
      `}</style>
    </>
  );
};

const navLinkStyle: React.CSSProperties = {
  fontSize: '0.62rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
};

// We will add styling to hover inside code or globally
const mobileLinkStyle: React.CSSProperties = {
  fontSize: '2rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--text)',
  textDecoration: 'none',
  padding: '1.2rem 0',
  borderBottom: '1px solid var(--border)',
  transition: 'color 0.15s ease',
  display: 'block',
};
