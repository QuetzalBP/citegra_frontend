import React, { useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear partículas de red con profundidad (efecto 3D)
    class NetworkParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random(); // Profundidad para efecto 3D (0 = lejos, 1 = cerca)
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = (Math.random() - 0.5) * 0.002; // Movimiento en Z
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Mantener las partículas dentro del canvas
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (this.z < 0.2 || this.z > 1) this.vz *= -1;
      }

      draw() {
        const size = 1.5 + this.z * 2.5; // Tamaño basado en profundidad
        const opacity = 0.4 + this.z * 0.6; // Opacidad basada en profundidad
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 181, 246, ${opacity})`;
        ctx.fill();
      }
    }

    // Crear MUCHAS más partículas (150 para una red super densa)
    for (let i = 0; i < 150; i++) {
      particles.push(new NetworkParticle());
    }

    // Dibujar líneas entre partículas cercanas
    const drawConnections = () => {
      const maxDistance = 200; // Aumentado para más conexiones

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Calcular opacidad basada en distancia y profundidad
            const baseOpacity = 1 - distance / maxDistance;
            const avgDepth = (particles[i].z + particles[j].z) / 2;
            const opacity = baseOpacity * (0.15 + avgDepth * 0.5);

            // Grosor de línea basado en profundidad (efecto 3D)
            const lineWidth = 0.3 + avgDepth * 1.2;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(66, 165, 245, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }
    };

    // Animación principal
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar conexiones primero (en el fondo)
      drawConnections();

      // Actualizar y dibujar partículas
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Limpieza
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('siguiente-seccion');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="hero-header">
      {/* Canvas de red animada */}
      <canvas ref={canvasRef} className="network-canvas"></canvas>

      {/* Partículas flotantes */}
      <div className="particles">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="particle"></div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="hero-content">
        <img 
          src="./CitegraBlanco.svg" 
          alt="Logo Citegra" 
          className="hero-logo"
        />
        <p>
          Soluciones en Tecnologías de la Información y las Comunicaciones, con 
          experiencia en implementación de soluciones de Telecomunicaciones, 
          Sistemas Integrales de Seguridad y Automatización RPA
        </p>
        <a href="#siguiente-seccion" className="cta-button">
          Nuestras soluciones
        </a>
      </div>

      {/* Indicador de scroll */}
      <div className="scroll-indicator" onClick={handleScrollDown}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </header>
  );
};

export default Header;