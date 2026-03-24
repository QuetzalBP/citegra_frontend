import React, { useState } from 'react';
import './Ventajas.css';
import NetworkPlanner from './NetworkPlanner';

const Ventajas = () => {
  const ventajas = [
    {
      id: 1,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: "Escalabilidad Garantizada",
      description: "Infraestructuras diseñadas para crecer con su negocio sin necesidad de reemplazos costosos."
    },
    {
      id: 2,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: "Seguridad Integral",
      description: "Protección multicapa con cumplimiento de estándares internacionales ISO 27001."
    },
    {
      id: 3,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: "Implementación Rápida",
      description: "Metodologías ágiles que reducen tiempos de despliegue hasta en un 40%."
    },
    {
      id: 4,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: "Garantía de Servicio",
      description: "SLA del 99.9% con penalizaciones contractuales por incumplimiento."
    },
    {
      id: 5,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Equipo Certificado",
      description: "Ingenieros con certificaciones Cisco CCNP, Microsoft Azure, y CompTIA Security+."
    },
    {
      id: 6,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: "ROI Comprobable",
      description: "Retorno de inversión medible con métricas claras en 12-18 meses."
    },
    {
      id: 7,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
      title: "Monitoreo Proactivo",
      description: "Centro de operaciones NOC 24/7 con alertas predictivas basadas en IA."
    },
    {
      id: 8,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: "Documentación Completa",
      description: "Manuales técnicos, diagramas de red y procedimientos de operación detallados."
    }
  ];

  return (
    <section id="ventajas-section" className="ventajas-section">
      <div className="ventajas-container">
        {/* Header */}
        <div className="ventajas-header">
          <div className="section-number">03</div>
          <h2 className="ventajas-title">
            Ventajas Competitivas que<br/>
            Marcan la Diferencia
          </h2>
          <div className="title-underline"></div>
          <p className="ventajas-subtitle">
            Factores diferenciadores que posicionan a Citegra como su mejor opción 
            en integración de sistemas tecnológicos empresariales.
          </p>
        </div>

        {/* Grid de Ventajas */}
        <div className="ventajas-grid">
          {ventajas.map((ventaja) => (
            <div key={ventaja.id} className="ventaja-card">
              <div className="ventaja-icon">
                {ventaja.icon}
              </div>
              <h3 className="ventaja-title">{ventaja.title}</h3>
              <p className="ventaja-description">{ventaja.description}</p>
            </div>
          ))}
        </div>

        {/* Separador */}
        <div className="planner-divider">
          <div className="divider-line"></div>
        </div>

        {/* Anchor para el Navbar — invisible, compensa altura del navbar */}
        <div
          id="planificador-section"
          style={{ position: 'relative', top: '-100px', visibility: 'hidden', pointerEvents: 'none' }}
        />

        {/* Network Planner Header */}
        <div className="planner-header">
          <div className="planner-badge">Herramienta Interactiva</div>
          <h3 className="planner-title">
            Planificador de Arquitectura de Red
          </h3>
          <p className="planner-subtitle">
            Diseñe visualmente su infraestructura tecnológica. Arrastre y conecte 
            dispositivos para visualizar su arquitectura de red en tiempo real.
          </p>
        </div>

        {/* Network Planner Component */}
        <NetworkPlanner />
      </div>
    </section>
  );
};

export default Ventajas;