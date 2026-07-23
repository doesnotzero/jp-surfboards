import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Bruno Goulart",
    role: "Cliente",
    text: "Tive uma excelente experiência com o serviço do Johnny, sempre muito atencioso e sangue bom. Conseguiu entregar uma prancha exatamente como eu precisava. Recomendo demais",
    rating: 5,
  },
  {
    name: "Eliza Almeida",
    role: "Local Guide",
    text: "Ótimo serviço de conserto de prancha, ficou perfeito! O Johnny é super gente fina e foi muito rápido na entrega.",
    rating: 5,
  },
  {
    name: "Bruno Curtarelli",
    role: "Local Guide",
    text: "Johnny é muito atencioso e profissional. Conserto foi bem rápido e com excelente qualidade, muito caprichoso.",
    rating: 5,
  },
  {
    name: "Marcio Silvaz",
    role: "Cliente",
    text: "Serviço de qualidade, levei minha prancha para conserto e nem parece que foi arrumada de tão bom que ficou! Recomendo!!!",
    rating: 5,
  },
  {
    name: "Gabriel Steinert",
    role: "Local Guide",
    text: "Serviço e atendimento de altíssima qualidade, super indico!!",
    rating: 5,
  },
  {
    name: "Ramiro Garcia-Olano",
    role: "Surfista",
    text: "Obrigado Johnny por tornar perfeita a experiência de comprar minha primeira prancha de surf. Agradeço seu profissionalismo, generosidade e boas vibrações. You are THE MAN!!!",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--bg)',
        padding: '80px 5vw 80px 52px',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div className="reveal-on-scroll" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
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
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)' }} />
            Avaliações de Clientes
          </div>
          <h2 className="text-anton" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            O QUE FALAM SOBRE NÓS
          </h2>
          <p
            className="text-mono"
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              color: 'var(--muted)',
              maxWidth: '500px',
            }}
          >
            Avaliações reais de surfistas que confiaram na JP Surf Boards para suas pranchas de alta performance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                border: '1px solid var(--border)',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.01)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(179, 18, 23, 0.05)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255, 255, 255, 0.01)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
              }}
            >
              {/* Rating Stars */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} style={{ color: 'var(--accent)', fontSize: '1rem' }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--text)',
                  fontStyle: 'italic',
                  flex: 1,
                }}
              >
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <p
                  className="text-mono"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                  }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-mono"
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Google Maps */}
        <div
          style={{
            marginTop: '4rem',
            textAlign: 'center',
            padding: '2rem',
            border: '1px solid var(--border)',
            borderRadius: '4px',
          }}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            Veja todas as avaliações no Google Maps:
          </p>
          <a
            href="https://maps.app.goo.gl/CN2iYgn2mGvGCeiEA?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium"
            style={{ cursor: 'pointer' }}
          >
            Ver Avaliações no Maps ↗
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #testimonials {
            padding: 60px 5vw !important;
          }
        }

        @media (max-width: 600px) {
          #testimonials {
            padding: 40px 5vw !important;
          }
          #testimonials h2 {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
