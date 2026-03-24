// Footer

import React, { useEffect, useRef } from 'react';
import './Footer.css';

/* ─── Animación de circuitos PCB ─────────────────────────────────────────── */
const CircuitCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Paleta actualizada (tonos azules) ──────────────────────────────── */
    const C = {
      trace:   'rgba(100, 181, 246, 0.12)',   // pista apagada
      glow:    'rgba(33, 150, 243, 0.9)',     // frente del pulso
      tail:    'rgba(66, 165, 245, 0.5)',     // cola del pulso
      node:    'rgba(100, 181, 246, 0.6)',    // nodo (círculo)
      nodeDim: 'rgba(100, 181, 246, 0.12)',
      chip:    'rgba(33, 150, 243, 0.05)',    // relleno chips
      chipStr: 'rgba(100, 181, 246, 0.2)',    // stroke chips
    };

    /* ── Genera la grilla de trazas ─────────── */
    const CELL = 20;
    const cols = Math.ceil(canvas.width  / CELL) + 1;
    const rows = Math.ceil(canvas.height / CELL) + 1;

    /* Nodos: cada intersección tiene probabilidad de existir */
    const nodes = [];
    const nodeMap = {};
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.55) {
          const n = { x: c * CELL, y: r * CELL, r: Math.random() < 0.08 ? 5 : 3 };
          nodes.push(n);
          nodeMap[`${c},${r}`] = n;
        }
      }
    }

    /* Trazas: conectan nodos adyacentes (H y V) con prob */
    const traces = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const here = nodeMap[`${c},${r}`];
        if (!here) continue;
        // horizontal
        const right = nodeMap[`${c + 1},${r}`];
        if (right && Math.random() < 0.6) {
          traces.push({ ax: here.x, ay: here.y, bx: right.x, by: right.y, len: CELL });
        }
        // vertical
        const down = nodeMap[`${c},${r + 1}`];
        if (down && Math.random() < 0.6) {
          traces.push({ ax: here.x, ay: here.y, bx: down.x, by: down.y, len: CELL });
        }
      }
    }

    /* Chips: rectángulos decorativos sobre algunas intersecciones */
    const chips = [];
    nodes.forEach(n => {
      if (Math.random() < 0.06) {
        const w = CELL * (1 + Math.floor(Math.random() * 2));
        const h = CELL * (0.6 + Math.random() * 0.8);
        chips.push({ x: n.x - w / 2, y: n.y - h / 2, w, h });
      }
    });

    /* ── Pulsos eléctricos ───────────────────── */
    class Pulse {
      constructor() { this.reset(); }
      reset() {
        const t = traces[Math.floor(Math.random() * traces.length)];
        this.ax  = t.ax; this.ay = t.ay;
        this.bx  = t.bx; this.by = t.by;
        this.len = t.len;
        this.progress = 0;
        this.speed    = 0.006 + Math.random() * 0.001;
        this.tailLen  = 0.25 + Math.random() * 0.3;
        this.alive    = true;
      }
      update() {
        this.progress += this.speed;
        if (this.progress > 1 + this.tailLen) this.alive = false;
      }
      draw() {
        const front = Math.min(this.progress, 1);
        const tail  = Math.max(0, this.progress - this.tailLen);

        const fx = this.ax + (this.bx - this.ax) * front;
        const fy = this.ay + (this.by - this.ay) * front;
        const tx = this.ax + (this.bx - this.ax) * tail;
        const ty = this.ay + (this.by - this.ay) * tail;

        const grad = ctx.createLinearGradient(tx, ty, fx, fy);
        grad.addColorStop(0,   'rgba(100, 181, 246, 0)');
        grad.addColorStop(0.6, C.tail);
        grad.addColorStop(1,   C.glow);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(fx, fy);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 2.5;
        ctx.shadowColor = C.glow;
        ctx.shadowBlur  = 10;
        ctx.stroke();
        ctx.shadowBlur  = 0;

        /* Punto brillante en el frente */
        if (this.progress <= 1) {
          ctx.beginPath();
          ctx.arc(fx, fy, 3, 0, Math.PI * 2);
          ctx.fillStyle   = '#64b5f6';
          ctx.shadowColor = C.glow;
          ctx.shadowBlur  = 14;
          ctx.fill();
          ctx.shadowBlur  = 0;
        }
      }
    }

    const MAX_PULSES = 40;
    const pulses = Array.from({ length: MAX_PULSES }, () => new Pulse());

    /* ── Loop principal ─────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Chips de fondo */
      chips.forEach(c => {
        ctx.fillStyle   = C.chip;
        ctx.strokeStyle = C.chipStr;
        ctx.lineWidth   = 1;
        ctx.fillRect(c.x, c.y, c.w, c.h);
        ctx.strokeRect(c.x, c.y, c.w, c.h);
        /* Pines del chip */
        const pins = Math.floor(c.h / 10);
        for (let i = 0; i < pins; i++) {
          const py = c.y + (i + 1) * (c.h / (pins + 1));
          ctx.strokeStyle = C.chipStr;
          ctx.beginPath(); ctx.moveTo(c.x - 6, py);  ctx.lineTo(c.x, py); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(c.x + c.w, py); ctx.lineTo(c.x + c.w + 6, py); ctx.stroke();
        }
      });

      /* Trazas apagadas */
      ctx.lineWidth   = 1.5;
      ctx.strokeStyle = C.trace;
      traces.forEach(t => {
        ctx.beginPath();
        ctx.moveTo(t.ax, t.ay);
        ctx.lineTo(t.bx, t.by);
        ctx.stroke();
      });

      /* Nodos apagados */
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = C.nodeDim;
        ctx.fill();
      });

      /* Pulsos */
      pulses.forEach(p => {
        p.update();
        p.draw();
        if (!p.alive) p.reset();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="circuit-canvas" />;
};

/* ─── Footer ─────────────────────────────────────────────────────────────── */
const Footer = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      {/* Canvas de circuitos */}
      <CircuitCanvas />

      {/* Capa de contenido encima del canvas */}
      <div className="footer-content">

        {/* ── Franja superior ── */}
        <div className="footer-topline">
          <span className="footer-topline-text">
            Soluciones de Alto Valor para Organizaciones Exigentes
          </span>
          <div className="footer-topline-rule" />
        </div>

        {/* ── Grid principal ── */}
        <div className="footer-grid">

          {/* Columna 1 — Marca */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo">
              <img src="./CitegraBlanco.svg" alt="Citegra" className="footer-logo-img" />
              <span className="footer-logo-text">CITEGRA</span>
            </div>
            <p className="footer-tagline">
              Formados con el propósito de proporcionar soluciones de Alto Valor a nuestros clientes.
            </p>
            <div className="footer-social">
              <a
                href="https://facebook.com/citegra"
                target="_blank"
                rel="noopener noreferrer"
                className="fsocial-btn"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/citegra/"
                target="_blank"
                rel="noopener noreferrer"
                className="fsocial-btn instagram"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0289d100" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#ffffff7d" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
</svg>
              </a>
            </div>
          </div>

          {/* Columna 2 — Navegación */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navegación</h4>
            <ul className="footer-links">
              {[
                { label: 'Inicio',        action: scrollToTop },
                { label: 'Beneficios',    action: () => scrollToSection('siguiente-seccion') },
                { label: 'Ventajas',      action: () => scrollToSection('ventajas-section') },
                { label: 'Planificador',  action: () => scrollToSection('planificador-section') },
                { label: 'Contacto',      action: () => scrollToSection('contacto') },
              ].map(link => (
                <li key={link.label}>
                  <button className="footer-link-btn" onClick={link.action}>
                    <span className="link-arrow">→</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Servicios */}
          <div className="footer-col">
            <h4 className="footer-col-title">Servicios</h4>
            <ul className="footer-links">
              {[
                'Telecomunicaciones Empresariales',
                'Sistemas de Seguridad Integral',
                'Automatización RPA',
                'Infraestructura de Red',
                'Videovigilancia IP',
                'Soporte Técnico NOC 24/7',
              ].map(s => (
                <li key={s}>
                  <span className="footer-service-item">
                    <span className="service-dot" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contacto</h4>

            <div className="footer-contact-items">
              {/* Ubicación */}
              <div className="fcontact-item">
                <div className="fcontact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className="fcontact-label">Ubicación</span>
                  <span className="fcontact-value">
                    Lomas de Chapultepec III Secc,<br/>
                    Miguel Hidalgo, CDMX 11000, MX
                  </span>
                </div>
              </div>

              {/* Teléfono */}
              <div className="fcontact-item">
                <div className="fcontact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 15 16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/>
                  </svg>
                </div>
                <div>
                  <span className="fcontact-label">Teléfono</span>
                  <a href="tel:+525525752629" className="fcontact-value fcontact-link">
                    (55) 2575 2629
                  </a>
                </div>
              </div>

              {/* Correo */}
              <div className="fcontact-item">
                <div className="fcontact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span className="fcontact-label">Correo</span>
                  <a href="mailto:contacto@citegra.com.mx" className="fcontact-value fcontact-link">
                    contacto@citegra.com.mx
                  </a>
                </div>
              </div>

              {/* Mapa mini */}
              <a
                href="https://www.google.com/maps/@19.4442397,-99.213161,3a,75y,118.27h,102.79t/data=!3m7!1e1!3m5!1sj0nfbeGrRRX8VvvzaCb5mQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-12.792596592979422%26panoid%3Dj0nfbeGrRRX8VvvzaCb5mQ%26yaw%3D118.26543775676616!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDIwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-chip"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                Ver en Google Maps
              </a>
            </div>
          </div>

        </div>

        {/* ── Franja inferior ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© {new Date().getFullYear()} Citegra. Todos los derechos reservados. </span>
          </div>
          <div className="footer-bottom-badges">
            <span className="footer-badge">ISO 9001</span>
            <span className="footer-badge">CDMX, México</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;