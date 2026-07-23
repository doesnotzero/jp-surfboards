import React from 'react';

interface ProcessStep {
  label: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    label: "BLOCO",
    title: "Bloco Premium",
    description: "Tudo começa com matéria-prima de primeira: blocos de alta qualidade (PU ou EPS), escolhidos pela densidade e pelo rocker ideais para o seu peso e o seu tipo de onda. Base firme, leve e durável."
  },
  {
    label: "SHAPE",
    title: "Shaping de Precisão",
    description: "Cada modelo é desenhado com precisão milimétrica: outline, concaves, caimento de bordas e distribuição de flutuação calculados em cada detalhe, unindo tecnologia e anos de experiência do shaper."
  },
  {
    label: "LAMINAÇÃO",
    title: "Tecido Importado",
    description: "Laminação com tecido de fibra importado e resina de alta qualidade — o que há de melhor no mercado. Camadas calculadas para o equilíbrio perfeito entre leveza, flexibilidade e resistência."
  },
  {
    label: "ACABAMENTO",
    title: "Acabamento de Precisão",
    description: "Lixamento fino, instalação dos copos de quilha (FCS II ou Futures), polimento e arte personalizada. Um acabamento impecável do bico à rabeta."
  },
  {
    label: "MAR",
    title: "Pronta para o Mar",
    description: "Sua prancha finalizada, revisada e embalada com proteção. Pronta para fazer o que foi feita para fazer: entrar no mar."
  }
];

export const Process: React.FC = () => {
  return (
    <section
      id="order"
      style={{
        background: 'var(--surface-2)',
        padding: '80px 4vw 80px 52px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}
      className="reveal-on-scroll"
    >
      {/* Background decoration */}
      <div className="diagonal-lines" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 2,
        }}
        className="process-header"
      >
        <h2
          className="text-anton"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
            lineHeight: 0.88,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}
        >
          DO BLOCO<br />
          <span style={{ color: 'var(--accent)' }}>AO MAR.</span>
        </h2>
        <div
          className="text-mono"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}
        >
          JP Surf Boards — Florianópolis, SC
          <br />
          27°38'08"S / 48°28'19"W
        </div>
      </div>

      {/* Horizontal Pipeline Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          border: '1px solid var(--border)',
          marginBottom: '3.5rem',
          position: 'relative',
          zIndex: 2,
          background: 'var(--surface)',
        }}
        className="process-grid"
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="process-step-card"
            style={{
              borderRight: idx === steps.length - 1 ? 'none' : '1px solid var(--border)',
              padding: '2.5rem 1.8rem',
              position: 'relative',
              transition: 'background-color 0.2s ease',
            }}
          >
            {/* Arrow decoration */}
            {idx < steps.length - 1 && (
              <span
                className="text-mono step-arrow-icon"
                style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  background: 'var(--surface)',
                  padding: '0 4px',
                  zIndex: 2,
                  transition: 'background-color 0.2s ease',
                }}
              >
                ➔
              </span>
            )}
            
            <div
              className="text-mono"
              style={{
                fontSize: '0.52rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.8rem',
              }}
            >
              {step.label}
            </div>
            
            <h4
              className="text-anton"
              style={{
                fontSize: '1.25rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '0.75rem',
              }}
            >
              {step.title}
            </h4>
            
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Location / Google Map */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '3.5rem' }}>
        <div
          className="text-mono"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'block' }} />
          Onde a mágica acontece
        </div>

        <div
          className="process-map-frame"
          style={{
            position: 'relative',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: 'var(--surface)',
          }}
        >
          <iframe
            title="Localização JP Surf Boards — Florianópolis, SC"
            src="https://www.google.com/maps?q=-27.6355404,-48.4718412&z=16&hl=pt-BR&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              border: 0,
              width: '100%',
              height: '100%',
              display: 'block',
              filter: 'grayscale(0.25) contrast(1.05)',
            }}
          />
          {/* Technical corner marks */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', width: '10px', height: '10px', borderTop: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '10px', height: '10px', borderTop: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '10px', height: '10px', borderBottom: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '10px', height: '10px', borderBottom: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)', pointerEvents: 'none' }} />
        </div>

        <a
          href="https://maps.app.goo.gl/fua5vJzU6ZHoHSvk7?g_st=ic"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium-outline"
          style={{ marginTop: '1.5rem', display: 'inline-flex' }}
        >
          Abrir no Google Maps ➔
        </a>
      </div>

      {/* Process Footer CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '2.5rem',
          position: 'relative',
          zIndex: 2,
        }}
        className="process-footer"
      >
        <p
          style={{
            maxWidth: '420px',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            lineHeight: 1.65,
          }}
        >
          Falar diretamente com o shaper no WhatsApp é o canal ideal para alinhar suas medidas, volume ideal e tirar dúvidas técnicas sobre a laminação.
        </p>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-configurator'));
          }}
          className="btn-premium"
          style={{ cursor: 'pointer' }}
        >
          Iniciar Atendimento ➔
        </button>
      </div>

      <style>{`
        .process-map-frame {
          height: 420px;
        }
        @media (max-width: 900px) {
          .process-map-frame {
            height: 320px;
          }
        }
        @media (max-width: 600px) {
          .process-map-frame {
            height: 260px;
          }
        }
        .process-step-card:hover {
          background-color: var(--surface-2) !important;
        }
        .process-step-card:hover .step-arrow-icon {
          background-color: var(--surface-2) !important;
        }
        @media (max-width: 1024px) {
          .process-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .process-step-card {
            border-right: 1px solid var(--border) !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .process-step-card:nth-child(even) {
            border-right: none !important;
          }
          .process-step-card:last-child {
            border-bottom: none !important;
          }
          .step-arrow-icon {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          #order {
            padding-left: 36px !important;
          }
        }
        @media (max-width: 600px) {
          #order {
            padding-left: 5vw !important;
            padding-right: 5vw !important;
          }
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .process-step-card {
            border-right: none !important;
            padding: 2rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
