import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Manejar scroll para cambiar estilos y visibilidad
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Cambiar fondo cuando se hace scroll
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Ocultar/mostrar navbar según dirección del scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll hacia abajo - ocultar
        setVisible(false);
        setMobileMenuOpen(false); // Cerrar menú móvil
      } else {
        // Scroll hacia arriba - mostrar
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Cerrar menú móvil al hacer click fuera
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Smooth scroll a secciones — usa getBoundingClientRect para precisión total
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 88; // altura navbar + margen de seguridad
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY - navHeight;

      window.scrollTo({
        top: absoluteTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Scroll al inicio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${visible ? '' : 'navbar-hidden'}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo" onClick={scrollToTop}>
             <img 
              src={scrolled ? "./CitegraNegro.svg" : "./CitegraBlanco.svg"}
              alt="Citegra" 
              className="logo-image"
            />
          </div>

          {/* Navigation Links - Desktop */}
          <ul className="navbar-menu">
            <li className="nav-item">
              <button 
                onClick={scrollToTop}
                className="nav-link"
              >
                Inicio
              </button>
            </li>
            <li className="nav-item">
              <button 
                onClick={() => scrollToSection('siguiente-seccion')}
                className="nav-link"
              >
                Beneficios
              </button>
            </li>
            <li className="nav-item">
              <button 
                onClick={() => scrollToSection('ventajas-section')}
                className="nav-link"
              >
                Ventajas
              </button>
            </li>
            <li className="nav-item">
              <button 
                onClick={() => scrollToSection('planificador-section')}
                className="nav-link"
              >
                Planificador
              </button>
            </li>
            <li className="nav-item">
              <button 
                onClick={() => scrollToSection('contacto')}
                className="nav-link nav-link-contact"
              >
                Contacto
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <ul className="mobile-menu-list">
          <li>
            <button onClick={scrollToTop} className="mobile-nav-link">
              Inicio
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('siguiente-seccion')} className="mobile-nav-link">
              Beneficios
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('ventajas-section')} className="mobile-nav-link">
              Ventajas
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('planificador-section')} className="mobile-nav-link">
              Planificador
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contacto')} className="mobile-nav-link mobile-nav-link-contact">
              Contacto
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;