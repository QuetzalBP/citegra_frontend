import { useEffect, useState, useRef } from "react";
import "./WelcomeModal.css";

const STORAGE_KEY = "citegra_wm_v1";

const features = [
  { icon: "◈", title: "Voz empresarial",    desc: "Telefonía IP y contact center a escala con uptime garantizado." },
  { icon: "◉", title: "Datos de alto valor", desc: "Fibra, MPLS y SD-WAN para operaciones críticas sin interrupciones." },
  { icon: "◐", title: "Presencia local",     desc: "Soporte 24/7 en tu idioma y zona horaria." },
  { icon: "◑", title: "Seguridad total",     desc: "Zero Trust y cifrado end-to-end certificado." },
];

export default function WelcomeModal() {
  const [visible, setVisible]  = useState(false);
  const [closing, setClosing]  = useState(false);
  const [active,  setActive]   = useState(0);
  const ivRef                  = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    ivRef.current = setInterval(() => setActive(p => (p + 1) % features.length), 3200);
    return () => clearInterval(ivRef.current);
  }, [visible]);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 360);
  };

  const pick = (i) => { setActive(i); clearInterval(ivRef.current); };

  if (!visible) return null;

  return (
    <div
      className={`wm-backdrop ${closing ? "wm-backdrop--out" : ""}`}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div className={`wm-modal ${closing ? "wm-modal--out" : ""}`} role="dialog" aria-modal="true" aria-label="Bienvenida a Citegra">

        <div className="wm-bg" aria-hidden="true">
          <div className="wm-bg__glow wm-bg__glow--a" />
          <div className="wm-bg__glow wm-bg__glow--b" />
          <div className="wm-bg__grid" />
        </div>

        <button className="wm-close" onClick={close} aria-label="Cerrar">✕</button>

        <div className="wm-brand">
          <div className="wm-brand__logo">
            <span className="wm-brand__wordmark">CITEGRA</span>
          </div>
          <span className="wm-brand__tagline">Soluciones de voz y datos</span>
        </div>

        <div className="wm-hero">
          <p className="wm-hero__eyebrow">Bienvenido</p>
          <h1 className="wm-hero__title">
            <span className="wm-desktop-text">¿Buscas soluciones de voz<br />y datos de alto valor?</span>
            <span className="wm-mobile-text">Voz y datos de alto valor</span>
          </h1>
          <p className="wm-hero__sub">
            <span className="wm-desktop-text">En Citegra conectamos tu negocio con infraestructura de clase mundial — segura, escalable y con soporte local 24/7.</span>
            <span className="wm-mobile-text">Infraestructura de clase mundial con soporte local 24/7.</span>
          </p>
        </div>

        <div className="wm-features">
          {features.map((f, i) => (
            <button key={i} className={`wm-feature ${i === active ? "wm-feature--active" : ""}`} onClick={() => pick(i)}>
              <span className="wm-feature__icon" aria-hidden="true">{f.icon}</span>
              <div className="wm-feature__body">
                <strong className="wm-feature__title">{f.title}</strong>
                <span className="wm-feature__desc">{f.desc}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="wm-dots" aria-hidden="true">
          {features.map((_, i) => (
            <span key={i} className={`wm-dot ${i === active ? "wm-dot--active" : ""}`} />
          ))}
        </div>

        <div className="wm-footer">
          <button className="wm-btn-done" onClick={close}>
            Hecho
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}