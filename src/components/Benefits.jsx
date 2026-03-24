import React from 'react';
import './Benefits.css';
const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Redes de Voz y Datos",
      description: "Diseño e implementación de redes empresariales de alta disponibilidad. Garantizamos conectividad robusta, escalable y segura para operaciones críticas de negocio.",
      details: [
        "Redes LAN/WAN corporativas",
        "Telefonía IP empresarial",
        "Conectividad redundante 99.9%"
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" // Network cables
    },
    {
      id: 2,
      title: "Sistemas Integrales de Seguridad",
      description: "Soluciones de seguridad perimetral y control de accesos para protección integral de instalaciones. Cumplimiento de normativas internacionales de seguridad física y lógica.",
      details: [
        "Videovigilancia IP de alta definición",
        "Control de accesos biométrico",
        "Monitoreo 24/7 en tiempo real"
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" // Security camera
    },
    {
      id: 3,
      title: "Automatización RPA",
      description: "Implementación de automatización robótica de procesos para optimización operativa. Reducción de costos y eliminación de errores en procesos repetitivos de alto volumen.",
      details: [
        "Automatización de procesos back-office",
        "Integración con sistemas legacy",
        "ROI medible en 6-12 meses"
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" // Technology/automation
    },
    {
      id: 4,
      title: "Soluciones Gubernamentales",
      description: "Equipo especializado en tecnologías para el sector público, enfocado en la operación, seguridad y continuidad de servicios críticos. Implementamos estándares y protocolos alineados a normativas gubernamentales para garantizar un funcionamiento confiable y eficiente.",
      details: [
        "Soluciones especializadas para dependencias públicas",
        "Atención prioritaria y tiempos de respuesta controlados",
        "Soluciones conforme a lineamientos institucionales"
      ],
      image: "https://st4.depositphotos.com/11394376/23030/i/450/depositphotos_230308484-stock-photo-flag-mexico-soldiers-arm-flag.jpg" // Support/tech
    }
  ];

  return (
    <section className="benefits-section">
      {/* Imagen Hero Superior */}
      <div className="benefits-hero">
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" 
            alt="Tecnología y Redes" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
      </div>

      {/* Contenedor de Beneficios */}
      <div className="benefits-container">
        {/* Header de Sección */}
        <div className="benefits-header">
          <div className="section-number">02</div>
          <h2 className="benefits-title">
            Soluciones Tecnológicas de<br/>Nivel Empresarial
          </h2>
          <div className="title-underline"></div>
          <p className="benefits-subtitle">
            Servicios especializados diseñados para cumplir con los más altos estándares 
            de calidad, seguridad y disponibilidad que su organización requiere.
          </p>
        </div>

        {/* Cards de Beneficios */}
        <div className="benefits-list">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id} 
              className={`benefit-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
            >
              {/* Imagen */}
              <div className="benefit-image-wrapper">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="benefit-image"
                />
                <div className="image-number">{String(benefit.id).padStart(2, '0')}</div>
              </div>

              {/* Contenido */}
              <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
                
                <ul className="benefit-details">
                  {benefit.details.map((detail, idx) => (
                    <li key={idx} className="detail-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer de Sección */}
        <div className="benefits-footer">
          <div className="footer-cta">
            <p className="footer-text">
              ¿Requiere una solución personalizada para su organización?
            </p>
            <a href="#contacto" className="contact-link">
              Solicitar Consultoría Técnica
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;