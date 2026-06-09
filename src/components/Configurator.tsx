import React, { useState, useEffect } from 'react';
import { boards } from '../data/boards';
import { validateEmail } from '../utils/debounce';

interface ConfiguratorOpenEvent extends CustomEvent<{ modelId?: string }> {
  detail: { modelId?: string };
}

interface ConfiguratorData {
  name: string;
  phone: string;
  email: string;
  level: string;
  waveType: string;
  goal: string;
  modelId: string;
  weight?: string;
  height?: string;
}

interface ValidationError {
  name?: string;
  phone?: string;
  email?: string;
  level?: string;
  waveType?: string;
  goal?: string;
  modelId?: string;
}

export const Configurator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ValidationError>({});
  const [formData, setFormData] = useState<ConfiguratorData>({
    name: '',
    phone: '',
    email: '',
    level: '',
    waveType: '',
    goal: '',
    modelId: '',
    weight: '',
    height: ''
  });

  // Listen to open events from other components
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as ConfiguratorOpenEvent;
      const modelId = customEvent.detail?.modelId;
      if (modelId) {
        setFormData((prev) => ({ ...prev, modelId }));
      }
      setIsOpen(true);
      setStep(1);
      setErrors({});
    };
    window.addEventListener('open-configurator', handleOpen);
    return () => window.removeEventListener('open-configurator', handleOpen);
  }, []);


  const stepsList = [
    { num: 1, name: "Identificação" },
    { num: 2, name: "Nível" },
    { num: 3, name: "Ondas" },
    { num: 4, name: "Objetivo" },
    { num: 5, name: "Modelo" },
    { num: 6, name: "Resumo" }
  ];

  const handleNext = () => {
    const newErrors: ValidationError = {};

    // Validation logic
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
      }
      if (formData.email && !validateEmail(formData.email)) {
        newErrors.email = 'Email inválido';
      }
    } else if (step === 2 && !formData.level) {
      newErrors.level = 'Selecione seu nível de surf';
    } else if (step === 3 && !formData.waveType) {
      newErrors.waveType = 'Selecione o tipo de onda';
    } else if (step === 4 && !formData.goal) {
      newErrors.goal = 'Selecione seu objetivo';
    } else if (step === 5 && !formData.modelId) {
      newErrors.modelId = 'Escolha um modelo';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const selectOption = (field: keyof ConfiguratorData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedBoard = boards.find((b) => b.id === formData.modelId);

  const saveToLocalDatabase = () => {
    try {
      const currentSubmissions = JSON.parse(localStorage.getItem('jp_shaper_consultations') || '[]');
      const newSubmission = {
        ...formData,
        boardName: selectedBoard ? selectedBoard.name : 'Modelo Customizado',
        date: new Date().toISOString()
      };
      currentSubmissions.push(newSubmission);
      localStorage.setItem('jp_shaper_consultations', JSON.stringify(currentSubmissions));
      console.log('Dados salvos no banco local:', newSubmission);
    } catch (e) {
      console.error('Falha ao salvar no local storage:', e);
    }
  };

  const handleSendWhatsApp = () => {
    saveToLocalDatabase();

    const text = `Olá JP! Acabei de finalizar o meu configurador técnico no site da JP Surf Boards:
    
- *Nome:* ${formData.name}
- *Telefone:* ${formData.phone}
- *Email:* ${formData.email || 'Não informado'}
- *Nível de Surf:* ${formData.level}
- *Tipo de Onda:* ${formData.waveType}
- *Objetivo no Surf:* ${formData.goal}
- *Modelo Escolhido:* ${selectedBoard ? selectedBoard.name : 'Modelo Custom'} (${selectedBoard ? selectedBoard.category : ''})
- *Peso/Altura:* ${formData.weight ? formData.weight + 'kg' : 'Não informado'} / ${formData.height ? formData.height + 'cm' : 'Não informado'}

Gostaria de alinhar as medidas, volume ideal e conversar sobre as especificações do bloco e laminação!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5548991663544?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="configurator-overlay">
      <div className="configurator-modal">
        {/* Close Button */}
        <button className="configurator-close-btn" onClick={() => setIsOpen(false)}>×</button>

        {/* Progress bar */}
        {step <= 6 && (
          <div className="configurator-progress-container">
            <div className="configurator-steps-labels">
              {stepsList.map((s) => (
                <span 
                  key={s.num} 
                  className={`text-mono step-label-item ${s.num === step ? 'active' : ''} ${s.num < step ? 'completed' : ''}`}
                >
                  {s.name}
                </span>
              ))}
            </div>
            <div className="configurator-progress-bar-bg">
              <div 
                className="configurator-progress-bar-fill" 
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal content */}
        <div className="configurator-content">
          {step === 1 && (
            <div className="configurator-step reveal-step">
              <span className="text-mono config-badge">Etapa 01 // Dados Pessoais</span>
              <h3 className="text-anton config-title">COMO DEVO TE CHAMAR?</h3>
              <p className="config-subtitle">Inicie sua consultoria de shape preenchendo suas informações para arquivamento técnico.</p>
              
              <div className="config-form-group">
                <div className="config-input-wrapper">
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => selectOption('name', e.target.value)}
                    className={`config-input text-mono ${errors.name ? 'input-error' : ''}`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="input-error-message">{errors.name}</span>}
                </div>
                <div className="config-input-wrapper">
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp (com DDD)"
                    value={formData.phone}
                    onChange={(e) => selectOption('phone', e.target.value)}
                    className={`config-input text-mono ${errors.phone ? 'input-error' : ''}`}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="input-error-message">{errors.phone}</span>}
                </div>
                <div className="config-input-wrapper">
                  <input
                    type="email"
                    placeholder="Seu e-mail (opcional)"
                    value={formData.email}
                    onChange={(e) => selectOption('email', e.target.value)}
                    className={`config-input text-mono ${errors.email ? 'input-error' : ''}`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="input-error-message">{errors.email}</span>}
                </div>

                <div className="config-input-row">
                  <div className="config-input-wrapper">
                    <input
                      type="number"
                      placeholder="Peso (kg)"
                      value={formData.weight}
                      onChange={(e) => selectOption('weight', e.target.value)}
                      className="config-input text-mono"
                    />
                  </div>
                  <div className="config-input-wrapper">
                    <input
                      type="number"
                      placeholder="Altura (cm)"
                      value={formData.height}
                      onChange={(e) => selectOption('height', e.target.value)}
                      className="config-input text-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="configurator-step reveal-step">
              <span className="text-mono config-badge">Etapa 02 // Nível de Surf</span>
              <h3 className="text-anton config-title">QUAL SEU NÍVEL DE SURF ATUAL?</h3>
              <p className="config-subtitle">O volume e outline ideal dependem diretamente de sua habilidade em ler a onda e executar manobras.</p>
              
              <div className="config-grid-options">
                {[
                  { value: 'Iniciante', label: 'Iniciante / Evolução', desc: 'Foco em estabilidade, paddle fácil, drop seguro e entrar na onda com tranquilidade.' },
                  { value: 'Intermediário', label: 'Intermediário', desc: 'Dropa com facilidade, corre a parede da onda, executa manobras básicas como rasgadas e cutbacks.' },
                  { value: 'Avançado', label: 'Avançado', desc: 'Surf crítico na parte forte da onda, batidas e rasgadas fortes no vertical, gerando a própria velocidade.' },
                  { value: 'Expert', label: 'Expert / Competidor', desc: 'Surf de alta performance, aéreos, tubos profundos, manobras inovadoras em qualquer seção.' }
                ].map((opt) => (
                  <div 
                    key={opt.value}
                    onClick={() => selectOption('level', opt.value)}
                    className={`config-card-option ${formData.level === opt.value ? 'selected' : ''}`}
                  >
                    <div className="config-card-dot" />
                    <h4 className="text-mono opt-title">{opt.label}</h4>
                    <p className="opt-desc">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="configurator-step reveal-step">
              <span className="text-mono config-badge">Etapa 03 // Tipo de Onda</span>
              <h3 className="text-anton config-title">QUAIS ONDAS VOCÊ PREFERE SURFAR?</h3>
              <p className="config-subtitle">O rocker (curvatura da prancha) e a rabeta variam de acordo com a curvatura e força da onda.</p>
              
              <div className="config-grid-options">
                {[
                  { value: 'Pequenas e Cheias', label: 'Pequenas e Cheias', desc: 'Ondas mais fracas e cheias de verão. Exige pranchas mais planas com drive natural abundante.' },
                  { value: 'Médiase Diárias', label: 'Médias do Dia a Dia', desc: 'Ondas normais da praia local (de 0.5m a 1.5m). Flexibilidade de manobra e paddle equilibrado.' },
                  { value: 'Grandes e Fortes', label: 'Grandes e Fortes', desc: 'Ondas volumosas e com pressão. Exige pranchas maiores com rocker agressivo e caimento de borda afiado.' },
                  { value: 'Pesadas e Tubulares', label: 'Pesadas e Tubulares', desc: 'Lajes, fundos de pedra ou reef. Pranchas com caimento fino de borda e rabeta estreita (pin) para tração.' }
                ].map((opt) => (
                  <div 
                    key={opt.value}
                    onClick={() => selectOption('waveType', opt.value)}
                    className={`config-card-option ${formData.waveType === opt.value ? 'selected' : ''}`}
                  >
                    <div className="config-card-dot" />
                    <h4 className="text-mono opt-title">{opt.label}</h4>
                    <p className="opt-desc">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="configurator-step reveal-step">
              <span className="text-mono config-badge">Etapa 04 // Objetivo no Surf</span>
              <h3 className="text-anton config-title">QUAL SEU PRINCIPAL OBJETIVO?</h3>
              <p className="config-subtitle">O que você mais deseja priorizar no comportamento da sua nova prancha?</p>
              
              <div className="config-grid-options">
                {[
                  { value: 'Mais Remada e Estabilidade', label: 'Mais Remada e Conforto', desc: 'Entrar nas ondas antes de todo mundo, ter excelente sustentação sob os pés e facilidade no drop.' },
                  { value: 'Manobras Verticais e Rápidas', label: 'Manobras Radicais / Performance', desc: 'Batidas verticais, curvas de raio curto, aéreos e respostas instantâneas.' },
                  { value: 'Velocidade e Flow nas Seções', label: 'Velocidade e Flow', desc: 'Flutuar sobre as seções gordas da onda, conectando manobras com velocidade constante.' },
                  { value: 'Estilo Clássico e Gliding', label: 'Linha Clássica / Gliding', desc: 'Trimagem suave, caminhadas até o bico (noseriding) e curvas amplas com muito estilo.' }
                ].map((opt) => (
                  <div 
                    key={opt.value}
                    onClick={() => selectOption('goal', opt.value)}
                    className={`config-card-option ${formData.goal === opt.value ? 'selected' : ''}`}
                  >
                    <div className="config-card-dot" />
                    <h4 className="text-mono opt-title">{opt.label}</h4>
                    <p className="opt-desc">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="configurator-step reveal-step">
              <span className="text-mono config-badge">Etapa 05 // Modelo de Prancha</span>
              <h3 className="text-anton config-title">SELECIONE O SHAPE BASE</h3>
              <p className="config-subtitle">Este modelo servirá como ponto de partida para a customização final do Shaper.</p>
              
              <div className="config-grid-boards">
                {boards.map((b) => (
                  <div 
                    key={b.id}
                    onClick={() => selectOption('modelId', b.id)}
                    className={`config-board-card ${formData.modelId === b.id ? 'selected' : ''}`}
                  >
                    <div className="config-board-img-box">
                      <img src={b.thumbImage} alt={b.name} />
                    </div>
                    <div className="config-board-meta">
                      <span className="text-mono board-cat">{b.category}</span>
                      <h4 className="text-anton board-name">{b.name}</h4>
                      <p className="board-specs">{b.sizes} // {b.volume}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="configurator-step reveal-step">
              <span className="text-mono config-badge">Etapa 06 // Resumo da Ficha</span>
              <h3 className="text-anton config-title">RESUMO DE SUA FICHA TÉCNICA</h3>
              <p className="config-subtitle">Confira a simulação de seu setup técnico antes de enviar ao shaper.</p>
              
              <div className="configurator-summary-box">
                <div className="summary-section">
                  <h4 className="text-mono section-header">DADOS DO SURFISTA</h4>
                  <div className="summary-grid">
                    <div><span>Nome:</span> <strong>{formData.name}</strong></div>
                    <div><span>WhatsApp:</span> <strong>{formData.phone}</strong></div>
                    <div><span>E-mail:</span> <strong>{formData.email || 'Não informado'}</strong></div>
                    <div><span>Peso / Altura:</span> <strong>{formData.weight ? formData.weight + ' kg' : 'N/A'} / {formData.height ? formData.height + ' cm' : 'N/A'}</strong></div>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-section">
                  <h4 className="text-mono section-header">PERFIL DE SURF</h4>
                  <div className="summary-grid">
                    <div><span>Nível Técnico:</span> <strong>{formData.level}</strong></div>
                    <div><span>Ondas Desejadas:</span> <strong>{formData.waveType}</strong></div>
                    <div><span>Objetivo de Surf:</span> <strong>{formData.goal}</strong></div>
                  </div>
                </div>

                {selectedBoard && (
                  <>
                    <div className="summary-divider" />
                    <div className="summary-section">
                      <h4 className="text-mono section-header">MODELO PREVISTO</h4>
                      <div className="summary-board-block">
                        <div className="summary-board-img">
                          <img src={selectedBoard.thumbImage} alt={selectedBoard.name} />
                        </div>
                        <div className="summary-board-info">
                          <span className="text-mono text-accent">{selectedBoard.category}</span>
                          <h3 className="text-anton">{selectedBoard.name}</h3>
                          <p>{selectedBoard.description}</p>
                          <div className="summary-board-specs text-mono">
                            <span>TAMANHOS BASE: {selectedBoard.sizes}</span>
                            <span>VOLUME ESTIMADO: {selectedBoard.volume}</span>
                            <span>RABETA: {selectedBoard.tail}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="configurator-step reveal-step text-center">
              <span className="text-mono config-badge">Ficha Finalizada</span>
              <h3 className="text-anton config-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--accent)' }}>FICHA CONCLUÍDA!</h3>
              <p className="config-subtitle" style={{ maxWidth: '480px', margin: '1rem auto 2.5rem' }}>
                Os dados da sua prancha foram salvos em nosso banco técnico com sucesso. Agora, clique no botão abaixo para abrir o WhatsApp e enviar as especificações diretamente para o Shaper dar início ao seu atendimento personalizado.
              </p>
              
              <button 
                onClick={handleSendWhatsApp} 
                className="btn-premium"
                style={{ fontSize: '0.85rem', padding: '16px 40px', margin: '0 auto' }}
              >
                Acessar WhatsApp do Shaper ➔
              </button>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        {step <= 6 && (
          <div className="configurator-actions">
            {step > 1 && (
              <button onClick={handleBack} className="btn-premium-outline config-btn-back">
                Voltar
              </button>
            )}
            
            <button 
              onClick={handleNext} 
              className="btn-premium config-btn-next" 
              style={{ marginLeft: 'auto' }}
            >
              {step === 6 ? 'Finalizar Ficha ➔' : 'Continuar ➔'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .configurator-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 5, 5, 0.95);
          backdrop-filter: blur(16px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeInOverlay 0.25s ease-out;
        }

        .configurator-modal {
          background: var(--surface);
          border: 1px solid var(--border);
          width: 100%;
          max-width: 820px;
          height: 90vh;
          max-height: 720px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.85);
          animation: slideUpModal 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .configurator-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: none;
          color: var(--muted);
          font-size: 2rem;
          cursor: pointer;
          line-height: 1;
          transition: color 0.15s ease;
          z-index: 10;
        }
        .configurator-close-btn:hover {
          color: var(--accent);
        }

        .configurator-progress-container {
          padding: 1.5rem 2.5rem 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .configurator-steps-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .step-label-item {
          font-size: 0.45rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          transition: color 0.2s ease;
        }
        .step-label-item.active {
          color: var(--accent);
        }
        .step-label-item.completed {
          color: var(--text);
        }
        .configurator-progress-bar-bg {
          width: 100%;
          height: 1.5px;
          background: var(--border);
        }
        .configurator-progress-bar-fill {
          height: 100%;
          background: var(--accent);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 4px var(--accent);
        }

        .configurator-content {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 2.5rem;
        }

        .configurator-step {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .config-badge {
          font-size: 0.5rem;
          letter-spacing: 0.25em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .config-title {
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          line-height: 1;
          letter-spacing: 0.02em;
          margin-bottom: 0.5rem;
        }

        .config-subtitle {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 600px;
        }

        /* Form styling */
        .config-form-group {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          max-width: 500px;
        }
        .config-input-wrapper {
          position: relative;
        }
        .config-input {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 1rem 1.25rem;
          color: var(--text);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .config-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 8px rgba(179, 18, 23, 0.15);
        }
        .config-input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* Option Grid */
        .config-grid-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .config-card-option {
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 1.5rem;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }
        .config-card-option:hover {
          border-color: var(--accent);
          background: rgba(179, 18, 23, 0.02);
        }
        .config-card-option.selected {
          border-color: var(--accent);
          background: rgba(179, 18, 23, 0.05);
          box-shadow: 0 0 15px rgba(179, 18, 23, 0.1);
        }
        .config-card-dot {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: transparent;
        }
        .config-card-option.selected .config-card-dot {
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 6px var(--accent);
        }
        .opt-title {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text);
          margin-bottom: 0.5rem;
          padding-right: 20px;
        }
        .opt-desc {
          font-size: 0.7rem;
          color: var(--muted);
          line-height: 1.5;
        }

        /* Boards Grid */
        .config-grid-boards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .config-board-card {
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 1rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.2s ease;
          text-align: center;
        }
        .config-board-card:hover {
          border-color: var(--accent);
        }
        .config-board-card.selected {
          border-color: var(--accent);
          background: rgba(179, 18, 23, 0.05);
          box-shadow: 0 0 15px rgba(179, 18, 23, 0.1);
        }
        .config-board-img-box {
          width: 100%;
          aspect-ratio: 1;
          background: #FFFFFF;
          margin-bottom: 0.75rem;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
        }
        .config-board-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .config-board-meta {
          width: 100%;
        }
        .board-cat {
          font-size: 0.45rem;
          letter-spacing: 0.18em;
          color: var(--accent);
          display: block;
          margin-bottom: 0.2rem;
          text-transform: uppercase;
        }
        .board-name {
          font-size: 0.78rem;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          letter-spacing: 0.05em;
        }
        .board-specs {
          font-size: 0.58rem;
          color: var(--muted);
        }

        /* Summary Box */
        .configurator-summary-box {
          border: 1px solid var(--border);
          background: var(--surface-2);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .section-header {
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          color: var(--accent);
          margin-bottom: 1rem;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem 2rem;
        }
        .summary-grid div {
          font-size: 0.75rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          padding-bottom: 0.3rem;
        }
        .summary-grid span {
          color: var(--muted);
        }
        .summary-grid strong {
          color: var(--text);
          font-weight: 500;
        }
        .summary-divider {
          height: 1px;
          background: var(--border);
        }
        .summary-board-block {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        .summary-board-img {
          width: 80px;
          height: 120px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
        }
        .summary-board-img img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .summary-board-info {
          flex: 1;
        }
        .summary-board-info h3 {
          font-size: 1.5rem;
          margin: 0.1rem 0 0.4rem;
        }
        .summary-board-info p {
          font-size: 0.72rem;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        .summary-board-specs {
          display: flex;
          gap: 1.5rem;
          font-size: 0.52rem;
          color: var(--accent);
        }
        .text-accent {
          color: var(--accent);
        }

        .configurator-actions {
          padding: 1.25rem 2.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          background: var(--surface);
        }

        .text-center {
          text-align: center;
        }

        /* Animations */
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal-step {
          animation: revealAnimation 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes revealAnimation {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile styling */
        @media (max-width: 1024px) {
          .config-grid-boards {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .configurator-modal {
            height: 100vh;
            max-height: 100vh;
          }
          .configurator-progress-container {
            padding: 1rem 1.5rem 0.5rem;
          }
          .step-label-item {
            font-size: 0.4rem;
            letter-spacing: 0.05em;
          }
          .configurator-content {
            padding: 1.5rem;
          }
          .configurator-actions {
            padding: 1rem 1.5rem;
          }
          .config-grid-options {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .config-grid-boards {
            grid-template-columns: repeat(2, 1fr);
          }
          .summary-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }
          .summary-board-block {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .summary-board-img {
            width: 100%;
            height: 140px;
          }
        }
        @media (max-width: 480px) {
          .step-label-item {
            display: none;
          }
          .step-label-item.active {
            display: inline-block;
            font-size: 0.5rem;
          }
          .config-grid-boards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
