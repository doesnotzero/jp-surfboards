import React, { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Catalog } from './components/Catalog';
import { Process } from './components/Process';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Configurator } from './components/Configurator';

const App: React.FC = () => {
  const stringerRef = useRef<HTMLDivElement>(null);
  const widgetsRef = useRef<HTMLDivElement>(null);
  const stickyCtaRef = useRef<HTMLDivElement>(null);

  // Esconde a barra fixa "Falar com a fábrica" quando o rodapé (que já tem
  // os links de contato) entra na tela — evita ficar sobreposta e redundante.
  useEffect(() => {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl || !stickyCtaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        stickyCtaRef.current?.classList.toggle('is-hidden', entry.isIntersecting);
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  // Scroll tracker via DOM direto (sem setState) — evita re-render do site
  // inteiro a cada frame de scroll, que era a causa do travamento no mobile.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      if (stringerRef.current) stringerRef.current.style.height = `${progress}%`;
      if (widgetsRef.current) {
        widgetsRef.current.classList.toggle('is-visible', window.scrollY > 400);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer for Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once animated in
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Find all revealable elements
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Stringer (Vertical board centerline progress) */}
      <div className="stringer-line">
        <div ref={stringerRef} className="stringer-line-progress" />
      </div>

      {/* Main Assembly */}
      <Header />
      
      <main>
        <Hero />
        <About />
        <Catalog />
        <Process />
        <Gallery />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />

      {/* Premium Shaper Consultation Advisor Modal */}
      <Configurator />

      {/* Stacked Floating Action Widgets (Bottom Right) */}
      <div ref={widgetsRef} className="float-widgets-container">
        {/* Instagram Widget */}
        <a
          href="https://www.instagram.com/jp.surfboards?igsh=OHBrZHE5NDk1MXg0"
          target="_blank"
          rel="noopener noreferrer"
          className="float-action-btn float-ig-btn"
          data-tooltip="Ver no Instagram"
          aria-label="Instagram da JP Surf Boards"
        >
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#FFFFFF' }}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>

        {/* WhatsApp Advisor Widget */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-configurator'))}
          className="float-action-btn float-wa-btn"
          data-tooltip="Encontrar minha prancha"
          aria-label="Iniciar consultoria de shape"
        >
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#FFFFFF' }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.533 5.85L.057 23.427a.75.75 0 0 0 .916.916l5.577-1.476A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.932 0-3.742-.522-5.295-1.432l-.38-.225-3.944 1.044 1.044-3.944-.225-.38A9.952 9.952 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
        </button>
      </div>

      {/* Mobile Sticky CTA bar */}
      <div ref={stickyCtaRef} className="mobile-sticky-cta">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-configurator'))}
          className="btn-premium"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Falar com a fábrica ➔
        </button>
      </div>

      <style>{`
        .float-widgets-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 600;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          opacity: 0;
          transform: translateY(16px) scale(0.9);
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .float-widgets-container.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .float-action-btn {
          width: 52px;
          height: 52px;
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 25px rgba(0,0,0,0.5);
          outline: none;
          padding: 0;
        }

        .float-action-btn svg {
          width: 22px !important;
          height: 22px !important;
        }

        .float-action-btn:hover {
          background: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(179, 18, 23, 0.4);
        }

        /* Pulse de atenção no WhatsApp */
        .float-wa-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid var(--accent);
          animation: waPulse 2.4s ease-out infinite;
          pointer-events: none;
        }
        .float-wa-btn:hover::before {
          animation: none;
        }
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        /* Tooltip styling */
        .float-action-btn::after {
          content: attr(data-tooltip);
          position: absolute;
          right: 130%;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          background: rgba(5, 5, 5, 0.96);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 0.45rem 0.8rem;
          font-size: 0.52rem;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .float-action-btn:hover::after {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        .mobile-sticky-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 590;
          background: #050505;
          border-top: 1px solid var(--border);
          padding: 0.65rem 1rem;
          transform: translateY(0);
          transition: transform 0.25s ease;
        }
        .mobile-sticky-cta.is-hidden {
          transform: translateY(100%);
        }

        @media (max-width: 768px) {
          .float-widgets-container {
            display: none !important;
          }
          .float-action-btn {
            width: 46px;
            height: 46px;
          }
          .float-action-btn svg {
            width: 20px !important;
            height: 20px !important;
          }
          .float-action-btn::after {
            display: none !important; /* Hide tooltips on mobile */
          }
          .mobile-sticky-cta {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default App;
