import React, { useState, useRef, useEffect } from 'react';
import { 
  Router, 
  Network, 
  Shield, 
  Server, 
  Wifi, 
  Video, 
  HardDrive, 
  Phone,
  Radio,
  Download,
  Trash2,
  Link2,
  Grid3x3,
  FileText,
  X,
  Plus
} from 'lucide-react';
import './NetworkPlanner.css';

const NetworkPlanner = () => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 600 });
  const [showCatalog, setShowCatalog] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [projectName, setProjectName] = useState('Mi Red');
  const [showLabels, setShowLabels] = useState(true);

  // Catálogo de dispositivos disponibles con iconos de Lucide
  const deviceCatalog = [
    { 
      type: 'router', 
      name: 'Router', 
      icon: Router,
      color: '#1565c0',
      description: 'Cisco ASR'
    },
    { 
      type: 'switch', 
      name: 'Switch', 
      icon: Network,
      color: '#0277bd',
      description: 'Catalyst'
    },
    { 
      type: 'firewall', 
      name: 'Firewall', 
      icon: Shield,
      color: '#d32f2f',
      description: 'FortiGate'
    },
    { 
      type: 'server', 
      name: 'Servidor', 
      icon: Server,
      color: '#388e3c',
      description: 'PowerEdge'
    },
    { 
      type: 'wifi', 
      name: 'WiFi AP', 
      icon: Wifi,
      color: '#f57c00',
      description: 'WiFi 6'
    },
    { 
      type: 'Camera', 
      name: 'Cámara', 
      icon: Video,
      color: '#7b1fa2',
      description: 'CCTV 4K'
    },
    { 
      type: 'storage', 
      name: 'Storage', 
      icon: HardDrive,
      color: '#0097a7',
      description: 'NAS'
    },
    { 
      type: 'phone', 
      name: 'Teléfono', 
      icon: Phone,
      color: '#616161',
      description: 'IP Phone'
    },
    { 
      type: 'tower', 
      name: 'Torre', 
      icon: Radio,
      color: '#e65100',
      description: 'Cell Tower'
    }
  ];

  // Responsive canvas
  useEffect(() => {
    const updateCanvasSize = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        setCanvasSize({
          width: rect.width,
          height: isMobile ? 500 : 600
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Agregar dispositivo al canvas
  const addDevice = (deviceType) => {
    const centerX = canvasSize.width / 2 - 40;
    const centerY = canvasSize.height / 2 - 40;
    const offset = devices.length * 20;
    
    const newDevice = {
      id: Date.now(),
      ...deviceType,
      x: Math.min(centerX + offset, canvasSize.width - 100),
      y: Math.min(centerY + offset, canvasSize.height - 100),
      z: Math.random() * 50,
      label: `${deviceType.name} ${devices.filter(d => d.type === deviceType.type).length + 1}`
    };
    setDevices([...devices, newDevice]);
    setShowCatalog(false);
  };

  // Eliminar dispositivo
  const deleteDevice = (deviceId) => {
    setDevices(devices.filter(d => d.id !== deviceId));
    setConnections(connections.filter(c => c.from !== deviceId && c.to !== deviceId));
    setSelectedDevice(null);
  };

  // Iniciar conexión
  const startConnection = (deviceId) => {
    if (connectingFrom === deviceId) {
      setConnectingFrom(null);
    } else if (connectingFrom === null) {
      setConnectingFrom(deviceId);
    } else {
      const newConnection = {
        id: Date.now(),
        from: connectingFrom,
        to: deviceId,
        type: 'ethernet' // Puede ser ethernet, wireless, fiber
      };
      setConnections([...connections, newConnection]);
      setConnectingFrom(null);
    }
  };

  // Editar etiqueta de dispositivo
  const editDeviceLabel = (deviceId, newLabel) => {
    setDevices(devices.map(device => 
      device.id === deviceId ? { ...device, label: newLabel } : device
    ));
  };

  // Limpiar todo
  const clearAll = () => {
    if (window.confirm('¿Está seguro de que desea limpiar todo el diseño?')) {
      setDevices([]);
      setConnections([]);
      setSelectedDevice(null);
      setConnectingFrom(null);
    }
  };



  // Exportar a PNG con alta calidad
  const exportToPNG = () => {
    const exportCanvas = document.createElement('canvas');
    const padding = 40;
    const titleHeight = 60;
    
    exportCanvas.width = canvasSize.width + (padding * 2);
    exportCanvas.height = canvasSize.height + (padding * 2) + titleHeight;
    
    const ctx = exportCanvas.getContext('2d');
    
    // Fondo blanco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    
    // Título del proyecto
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(projectName, exportCanvas.width / 2, 35);
    
    // Fecha y hora
    ctx.font = '12px Arial, sans-serif';
    ctx.fillStyle = '#666';
    const now = new Date();
    ctx.fillText(
      `Creado: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
      exportCanvas.width / 2,
      52
    );
    
    ctx.save();
    ctx.translate(padding, padding + titleHeight);
    
    // Dibujar grid si está activado
    if (showGrid) {
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let i = 0; i <= canvasSize.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasSize.height);
        ctx.stroke();
      }
      for (let i = 0; i <= canvasSize.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasSize.width, i);
        ctx.stroke();
      }
    }
    
    // Dibujar conexiones
    connections.forEach(conn => {
      const fromDevice = devices.find(d => d.id === conn.from);
      const toDevice = devices.find(d => d.id === conn.to);

      if (fromDevice && toDevice) {
        ctx.beginPath();
        ctx.moveTo(fromDevice.x + 40, fromDevice.y + 40);
        ctx.lineTo(toDevice.x + 40, toDevice.y + 40);
        ctx.strokeStyle = '#1565c0';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Punto medio
        const midX = (fromDevice.x + toDevice.x) / 2 + 40;
        const midY = (fromDevice.y + toDevice.y) / 2 + 40;
        ctx.fillStyle = '#1565c0';
        ctx.beginPath();
        ctx.arc(midX, midY, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Dibujar dispositivos
    devices.forEach(device => {
      const x = device.x;
      const y = device.y;
      
      // Sombra
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      
      // Cuadro del dispositivo
      ctx.fillStyle = device.color;
      ctx.beginPath();
      ctx.roundRect(x, y, 80, 80, 8);
      ctx.fill();
      
      ctx.shadowColor = 'transparent';
      
      // Etiqueta del dispositivo
      if (showLabels) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(device.label || device.name, x + 40, y + 70);
      }
      
      // Icono (representado como texto)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(device.type.toUpperCase().substring(0, 4), x + 40, y + 35);
    });
    
    ctx.restore();
    
    // Info adicional en la parte inferior
    ctx.fillStyle = '#888';
    ctx.font = '10px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(
      `Dispositivos: ${devices.length} | Conexiones: ${connections.length}`,
      padding,
      exportCanvas.height - 15
    );
    
    // Descargar
    exportCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName.replace(/\s+/g, '_')}_network.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  // Obtener posición relativa al canvas
  const getRelativePosition = (clientX, clientY) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Mouse/Touch handlers
  const handlePointerDown = (e, device) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedDevice(device.id);
    
    const pos = e.type.includes('touch') 
      ? getRelativePosition(e.touches[0].clientX, e.touches[0].clientY)
      : getRelativePosition(e.clientX, e.clientY);
    
    setDragOffset({
      x: pos.x - device.x,
      y: pos.y - device.y
    });
  };

  const handlePointerMove = (e) => {
    if (isDragging && selectedDevice) {
      e.preventDefault();
      
      const pos = e.type.includes('touch')
        ? getRelativePosition(e.touches[0].clientX, e.touches[0].clientY)
        : getRelativePosition(e.clientX, e.clientY);
      
      const newX = pos.x - dragOffset.x;
      const newY = pos.y - dragOffset.y;

      setDevices(devices.map(device => 
        device.id === selectedDevice
          ? { 
              ...device, 
              x: Math.max(0, Math.min(newX, canvasSize.width - 80)), 
              y: Math.max(0, Math.min(newY, canvasSize.height - 80)) 
            }
          : device
      ));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Dibujar conexiones en canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar grid de fondo
    if (showGrid) {
      ctx.strokeStyle = '#f5f5f5';
      ctx.lineWidth = 1;
      const gridSize = window.innerWidth < 768 ? 30 : 50;
      
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    }

    // Dibujar conexiones
    connections.forEach(conn => {
      const fromDevice = devices.find(d => d.id === conn.from);
      const toDevice = devices.find(d => d.id === conn.to);

      if (fromDevice && toDevice) {
        const avgZ = (fromDevice.z + toDevice.z) / 2;
        const lineWidth = 2 + avgZ / 25;
        const opacity = 0.4 + avgZ / 100;

        ctx.beginPath();
        ctx.moveTo(fromDevice.x + 40, fromDevice.y + 40);
        ctx.lineTo(toDevice.x + 40, toDevice.y + 40);
        ctx.strokeStyle = `rgba(21, 101, 192, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Punto medio
        const midX = (fromDevice.x + toDevice.x) / 2 + 40;
        const midY = (fromDevice.y + toDevice.y) / 2 + 40;
        ctx.fillStyle = '#1565c0';
        ctx.beginPath();
        ctx.arc(midX, midY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [devices, connections, canvasSize, showGrid]);

  return (
    <div className="network-planner" id="planificador-section">
      {/* Toolbar */}
      <div className={`planner-toolbar ${showCatalog ? 'mobile-show' : ''}`}>
        <div className="toolbar-header">
          <div>
            <h4>Dispositivos</h4>
            <input 
              type="text" 
              className="project-name-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Nombre del proyecto"
            />
          </div>
          <button 
            className="mobile-close"
            onClick={() => setShowCatalog(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="device-catalog">
          {deviceCatalog.map((device, index) => {
            const IconComponent = device.icon;
            return (
              <div 
                key={index}
                className="catalog-item"
                onClick={() => addDevice(device)}
              >
                <div className="catalog-icon" style={{ backgroundColor: device.color }}>
                  <IconComponent size={24} color="#ffffff" />
                </div>
                <div className="catalog-info">
                  <span className="catalog-name">{device.name}</span>
                  <span className="catalog-desc">{device.description}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles */}
        <div className="planner-controls">
          <button 
            className={`control-btn ${connectingFrom ? 'active' : ''}`}
            onClick={() => setConnectingFrom(connectingFrom ? null : 'pending')}
            disabled={devices.length < 2}
          >
            <Link2 size={20} />
            {connectingFrom ? 'Seleccione destino' : 'Modo Conectar'}
          </button>
          
          <button 
            className="control-btn"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid3x3 size={20} />
            {showGrid ? 'Ocultar Grid' : 'Mostrar Grid'}
          </button>

          <button 
            className="control-btn"
            onClick={() => setShowLabels(!showLabels)}
          >
            <FileText size={20} />
            {showLabels ? 'Ocultar Etiquetas' : 'Mostrar Etiquetas'}
          </button>
          
          <button 
            className="control-btn success"
            onClick={exportToPNG}
            disabled={devices.length === 0}
          >
            <Download size={20} />
            Exportar PNG
          </button>
          
          <button 
            className="control-btn danger"
            onClick={clearAll}
            disabled={devices.length === 0}
          >
            <Trash2 size={20} />
            Limpiar Todo
          </button>
        </div>

        {/* Estadísticas */}
        <div className="planner-stats">
          <div className="stat">
            <span className="stat-value">{devices.length}</span>
            <span className="stat-label">Dispositivos</span>
          </div>
          <div className="stat">
            <span className="stat-value">{connections.length}</span>
            <span className="stat-label">Conexiones</span>
          </div>
        </div>
      </div>

      {/* Canvas Principal */}
      <div className="planner-canvas-container">
        <div className="canvas-header">
          <div className="canvas-title-group">
            <h4>Área de Diseño: {projectName}</h4>
            <p>Arrastre dispositivos para moverlos • Click para conectar</p>
          </div>
          
          <button 
            className="mobile-add-btn"
            onClick={() => setShowCatalog(!showCatalog)}
          >
            <Plus size={24} />
            Agregar
          </button>
        </div>
        
        <div 
          ref={wrapperRef}
          className="canvas-wrapper"
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <canvas 
            ref={canvasRef}
            className="network-canvas"
          />

          {/* Dispositivos renderizados */}
          {devices.map(device => {
            const IconComponent = device.icon;
            return (
              <div
                key={device.id}
                className={`device-node ${selectedDevice === device.id ? 'selected' : ''} ${connectingFrom === device.id ? 'connecting' : ''}`}
                style={{
                  left: `${device.x}px`,
                  top: `${device.y}px`,
                  backgroundColor: device.color,
                  transform: `scale(${1 + device.z / 100})`,
                  zIndex: Math.floor(device.z)
                }}
                onMouseDown={(e) => handlePointerDown(e, device)}
                onTouchStart={(e) => handlePointerDown(e, device)}
                onClick={() => setSelectedDevice(device.id)}
              >
                <div className="device-icon">
                  <IconComponent size={32} color="#ffffff" />
                </div>
                {showLabels && (
                  <div className="device-label">
                    {device.label || device.name}
                  </div>
                )}
                
                {/* Opciones del dispositivo */}
                {selectedDevice === device.id && (
                  <div className="device-options">
                    <button 
                      className="option-btn connect"
                      onClick={(e) => {
                        e.stopPropagation();
                        startConnection(device.id);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        startConnection(device.id);
                      }}
                      title="Conectar dispositivo"
                    >
                      <Link2 size={16} color="#ffffff" />
                    </button>
                    <button 
                      className="option-btn delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDevice(device.id);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        deleteDevice(device.id);
                      }}
                      title="Eliminar dispositivo"
                    >
                      <Trash2 size={16} color="#ffffff" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Mensaje de ayuda cuando está vacío */}
          {devices.length === 0 && (
            <div className="empty-state">
              <Network size={80} strokeWidth={1.5} />
              <h4>Comience a Diseñar Su Red</h4>
              <p>Toque el botón "Agregar" para seleccionar dispositivos y comenzar a crear su diagrama de red</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkPlanner;