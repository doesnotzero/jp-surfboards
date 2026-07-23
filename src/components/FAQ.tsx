import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Quanto tempo demora para a prancha ficar pronta?',
    answer: 'Normalmente de 4 a 6 semanas depois que o pedido é confirmado. Esse tempo cobre todo o processo, do shape ao acabamento. Em Florianópolis, dá para consultar prazos mais rápidos pelo WhatsApp.',
  },
  {
    question: 'Dá para escolher as cores e a arte da prancha?',
    answer: 'Sim! Cada prancha é personalizada. Você escolhe as cores e os desenhos do seu jeito. Fale com o JP para ver as opções.',
  },
  {
    question: 'Como faço para encomendar?',
    answer: 'É só clicar em "Falar com a Fábrica" e enviar suas informações (nível, tipo de onda, peso e altura). O JP fala com você no WhatsApp para alinhar os detalhes, combinar o valor e agendar a produção.',
  },
  {
    question: 'Vocês enviam para fora do Brasil?',
    answer: 'Sim, enviamos para o mundo todo. O frete muda conforme o país. Fale com o JP para ele calcular o envio e os prazos.',
  },
  {
    question: 'A prancha tem garantia?',
    answer: 'Toda prancha sai daqui revisada e com a qualidade conferida. Damos suporte nos primeiros 30 dias. Defeitos de fabricação são cobertos; o desgaste normal do uso não entra na garantia.',
  },
  {
    question: 'Como cuidar da prancha?',
    answer: 'Guarde em um lugar fresco e à sombra. Depois de surfar, lave com água doce. Evite deixar no sol forte ou no carro quente, que estraga a resina. Se aparecer algum furinho, conserte logo para não entrar água.',
  },
  {
    question: 'Posso trocar se não gostar?',
    answer: 'Como cada prancha é feita sob medida, não fazemos troca automática. Se tiver qualquer problema, fale com o JP em até 7 dias após receber que a gente resolve junto.',
  },
  {
    question: 'Vocês têm pranchas prontas em estoque?',
    answer: 'Não. Cada prancha é feita sob encomenda, para você receber exatamente o que pediu. É isso que garante a personalização e a qualidade em cada detalhe.',
  },
];

export const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        background: 'var(--bg)',
        padding: '80px 5vw 80px 52px',
        borderTop: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div className="reveal-on-scroll" style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
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
            Dúvidas Frequentes
          </div>
          <h2 className="text-anton" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)', textTransform: 'uppercase' }}>
            PERGUNTAS COMUNS
          </h2>
        </div>

        {/* FAQ List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {faqItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: expandedIndex === index ? 'rgba(179, 18, 23, 0.05)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (expandedIndex !== index) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedIndex !== index) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                <span
                  className="text-mono"
                  style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                    color: 'var(--text)',
                    fontWeight: expandedIndex === index ? 600 : 400,
                    flex: 1,
                  }}
                >
                  {item.question}
                </span>
                <span
                  style={{
                    color: 'var(--accent)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.3s ease',
                    transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </span>
              </button>

              {expandedIndex === index && (
                <div
                  style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    background: 'rgba(179, 18, 23, 0.02)',
                    borderTop: '1px solid var(--border)',
                    animation: 'slideDown 0.3s ease',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      color: 'var(--muted)',
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          style={{
            marginTop: '3rem',
            padding: '2rem',
            border: '1px solid var(--accent)',
            background: 'rgba(179, 18, 23, 0.05)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginBottom: '1rem' }}>
            Ainda tem dúvidas?
          </p>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-configurator'));
            }}
            className="btn-premium"
            style={{ cursor: 'pointer' }}
          >
            Fale com a Fábrica
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          #faq {
            padding: 60px 5vw !important;
          }
        }

        @media (max-width: 600px) {
          #faq {
            padding: 40px 5vw !important;
          }
          #faq button {
            padding: 1.25rem !important;
          }
          #faq .text-mono {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
};
