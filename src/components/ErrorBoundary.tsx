import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--bg)',
            color: 'var(--text)',
            flexDirection: 'column',
            gap: '2rem',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2rem', color: 'var(--accent)' }}>
            Algo deu errado
          </h1>
          <p style={{ maxWidth: '500px', fontSize: '1rem' }}>
            Desculpa, encontramos um erro inesperado. Por favor, recarregue a página.
          </p>
          {this.state.error && (
            <details
              style={{
                maxWidth: '600px',
                textAlign: 'left',
                background: 'var(--surface)',
                padding: '1rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
              }}
            >
              <summary>Detalhes do erro</summary>
              <pre style={{ marginTop: '0.5rem', overflowX: 'auto' }}>
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
