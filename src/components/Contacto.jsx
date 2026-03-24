import React, { useState } from 'react';
import './Contacto.css';

// Ajusta esta URL si tu backend corre en otro puerto o dominio
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/contact/`
  : "https://backend-citegra.onrender.com/api/contact/";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    asunto: '',
    descripcion: ''
  });
  const [focused,   setFocused]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err.message ||
        "Ocurrió un error al enviar su mensaje. Por favor intente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', correo: '', telefono: '', asunto: '', descripcion: '' });
    setSubmitted(false);
    setError('');
  };

  return (
    <section id="contacto" className="contact-section">

      {/* Franja superior decorativa */}
      <div className="contact-topbar">
        <div className="topbar-content">
          <span className="topbar-label">04</span>
          <div className="topbar-divider" />
          <span className="topbar-text">Inicie una conversación con nuestro equipo</span>
        </div>
      </div>

      <div className="contact-wrapper">

        {/* Columna izquierda — Info */}
        <div className="contact-info">
          <div className="info-sticky">

            <h2 className="contact-heading">
              Hablemos de<br/>
              <em>su próximo</em><br/>
              proyecto
            </h2>

            <p className="contact-lead">
              Nuestro equipo de ingenieros especializados está listo 
              para escuchar sus necesidades y diseñar una solución 
              a la medida de su organización.
            </p>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">Correo</span>
                <a href="mailto:contacto@citegra.com" className="detail-value">
                  citegraweb@gmail.com
                </a>
              </div>
              <div className="detail-item">
                <span className="detail-label">Teléfono</span>
                <a href="tel:+525500000000" className="detail-value">
                  (55) 2575 2629
                </a>
              </div>
              <div className="detail-item">
                <span className="detail-label">Horario</span>
                <span className="detail-value">Lun – Sab · 09:00 – 18:00</span>
              </div>
            </div>

            <div className="social-block">
              <span className="social-heading">Síguenos</span>
              <div className="social-links">

                <a
                  href="https://facebook.com/citegra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <div className="social-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </div>
                  <div className="social-info">
                    <span className="social-name">Facebook</span>
                    <span className="social-handle">@citegra</span>
                  </div>
                  <svg className="social-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/company/citegra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <div className="social-icon-wrap instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
</svg>
                  </div>
                  <div className="social-info">
                    <span className="social-name">Linkedin</span>
                    <span className="social-handle">@citegra</span>
                  </div>
                  <svg className="social-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* Columna derecha — Formulario */}
        <div className="contact-form-col">
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>

              <div className="form-row">
                <div className={`field-group ${focused === 'nombre' ? 'focused' : ''} ${formData.nombre ? 'filled' : ''}`}>
                  <label className="field-label" htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre" name="nombre" type="text" className="field-input"
                    value={formData.nombre} onChange={handleChange}
                    onFocus={() => setFocused('nombre')} onBlur={() => setFocused('')}
                    required autoComplete="off"
                  />
                  <div className="field-line" />
                </div>

                <div className={`field-group ${focused === 'correo' ? 'focused' : ''} ${formData.correo ? 'filled' : ''}`}>
                  <label className="field-label" htmlFor="correo">Correo electrónico</label>
                  <input
                    id="correo" name="correo" type="email" className="field-input"
                    value={formData.correo} onChange={handleChange}
                    onFocus={() => setFocused('correo')} onBlur={() => setFocused('')}
                    required autoComplete="off"
                  />
                  <div className="field-line" />
                </div>
              </div>

              <div className="form-row">
                <div className={`field-group ${focused === 'telefono' ? 'focused' : ''} ${formData.telefono ? 'filled' : ''}`}>
                  <label className="field-label" htmlFor="telefono">Número de teléfono</label>
                  <input
                    id="telefono" name="telefono" type="tel" className="field-input"
                    value={formData.telefono} onChange={handleChange}
                    onFocus={() => setFocused('telefono')} onBlur={() => setFocused('')}
                    autoComplete="off"
                  />
                  <div className="field-line" />
                </div>

                <div className={`field-group ${focused === 'asunto' ? 'focused' : ''} ${formData.asunto ? 'filled' : ''}`}>
                  <label className="field-label" htmlFor="asunto">Asunto</label>
                  <input
                    id="asunto" name="asunto" type="text" className="field-input"
                    value={formData.asunto} onChange={handleChange}
                    onFocus={() => setFocused('asunto')} onBlur={() => setFocused('')}
                    required autoComplete="off"
                  />
                  <div className="field-line" />
                </div>
              </div>

              <div className={`field-group field-group-full ${focused === 'descripcion' ? 'focused' : ''} ${formData.descripcion ? 'filled' : ''}`}>
                <label className="field-label" htmlFor="descripcion">Descripción del proyecto</label>
                <textarea
                  id="descripcion" name="descripcion" className="field-input field-textarea"
                  value={formData.descripcion} onChange={handleChange}
                  onFocus={() => setFocused('descripcion')} onBlur={() => setFocused('')}
                  required rows={5}
                />
                <div className="field-line" />
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="form-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <div className="form-footer">
                <p className="form-privacy">
                  Su información es tratada con estricta confidencialidad.<br/>
                  No compartimos datos con terceros.
                </p>
                <button
                  type="submit"
                  className={`submit-btn ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="btn-loader">
                      <span className="loader-dot" />
                      <span className="loader-dot" />
                      <span className="loader-dot" />
                    </span>
                  ) : (
                    <>
                      <span>Enviar mensaje</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

            </form>
          ) : (

            <div className="success-state">
              <div className="success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="success-title">Mensaje enviado</h3>
              <p className="success-text">
                Hemos recibido su mensaje. Un especialista de nuestro equipo 
                se pondrá en contacto con usted en un plazo máximo de 24 horas hábiles.
              </p>
              <button className="reset-btn" onClick={resetForm}>
                Enviar otro mensaje
              </button>
            </div>

          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;