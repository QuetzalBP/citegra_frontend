import React from 'react';
import './IntroSec.css';

const IntroSec = () => {
  return (
    <section id="siguiente-seccion" className="intro-section">
      <div className="intro-container">
        {/* Encabezado corporativo */}
        <div className="intro-header">
          <div className="section-number">01</div>
          <h2 className="intro-title">
            Excelencia en Integración de<br/>
            Sistemas Tecnológicos Empresariales
          </h2>
          <div className="title-underline"></div>
        </div>

        {/* Contenido principal con diseño más serio */}
        <div className="intro-content">
          <div className="intro-main-text">
            <p className="lead-paragraph">
              Citegra es un integrador de sistemas especializado en la implementación 
              de infraestructuras tecnológicas críticas para organizaciones de alto nivel. 
              Nuestra trayectoria nos posiciona como aliado estratégico en proyectos que 
              demandan precisión técnica, disponibilidad garantizada y cumplimiento normativo.
            </p>
          </div>

          <div className="intro-dual-column">
            <div className="column-item">
              <h3 className="column-title">Nuestra Expertise</h3>
              <p className="column-text">
                Implementamos soluciones de telecomunicaciones empresariales, sistemas 
                integrales de seguridad perimetral y automatización de procesos mediante 
                RPA. Cada proyecto es ejecutado bajo metodologías certificadas y estándares 
                internacionales de calidad.
              </p>
            </div>
            <div className="column-item">
              <h3 className="column-title">Compromiso con Resultados</h3>
              <p className="column-text">
                Garantizamos implementaciones sin interrupciones operativas, con métricas 
                de rendimiento verificables y soporte técnico especializado. Nuestros 
                clientes confían en nuestra capacidad para entregar proyectos dentro de 
                presupuesto y plazos establecidos.
              </p>
            </div>
          </div>
        </div>

        {/* Métricas empresariales */}
        <div className="intro-metrics">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="metric-value">850+</div>
              <div className="metric-label">Proyectos Implementados</div>
              <div className="metric-sublabel">En sector corporativo</div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="metric-value">120+</div>
              <div className="metric-label">Clientes Corporativos</div>
              <div className="metric-sublabel">SEDENA y empresas líderes</div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className="metric-value">99.8%</div>
              <div className="metric-label">Uptime Garantizado</div>
              <div className="metric-sublabel">SLA verificado anualmente</div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="metric-value">ISO 9001</div>
              <div className="metric-label">Certificación de Calidad</div>
              <div className="metric-sublabel">Procesos certificados</div>
            </div>
          </div>
        </div>

        {/* Separador corporativo */}
        <div className="intro-separator">
          <div className="separator-line"></div>
        </div>

        {/* Call to action sutil */}
        <div className="intro-cta">
          <p className="cta-text">
            Descubra cómo nuestras soluciones pueden optimizar la infraestructura tecnológica de su organización
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSec;