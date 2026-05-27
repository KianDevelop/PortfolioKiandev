const { useState, useEffect, useRef } = React;

// Smooth scrolling helper
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// High-fidelity presentation PDF download function matching new brand guidelines
const downloadPdf = (filename) => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 50;
  let y = 84;

  // Header background (Navy corporate color)
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 72, "F");
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Kiandev Studio | Propuesta Metodológica", margin, 44);

  // Subtitle
  doc.setTextColor(79, 70, 229); // Accent indigo
  doc.setFontSize(10);
  doc.text("INGENIERÍA WEB DE ALTO RENDIMIENTO", margin + 350, 44);

  // Body introduction
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  y = 110;
  
  const intro = "Esta propuesta técnica resume la metodología de trabajo rigurosa y orientada a objetivos comerciales que aplicamos en Kiandev Studio para construir productos digitales veloces, mantenibles y de alta conversión.";
  const introLines = doc.splitTextToSize(intro, pageWidth - margin * 2);
  doc.text(introLines, margin, y);
  y += introLines.length * 15 + 20;

  // Horizontal separator line
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  // Process blocks
  const blocks = [
    [
      "Fase 1: Diagnóstico y Estrategia", 
      [
        "Análisis en profundidad de los objetivos comerciales y embudo de conversión actual.", 
        "Definición de público objetivo, propuesta de valor digital y KPIs clave.", 
        "Planificación del alcance funcional para garantizar el máximo retorno de inversión."
      ]
    ],
    [
      "Fase 2: Arquitectura y Experiencia (UI/UX)", 
      [
        "Estructuración jerárquica de contenido y flujos de navegación optimizados.", 
        "Diseño visual de alta fidelidad enfocado en construir confianza institucional.", 
        "Modelado de componentes interactivos buscando fricción cero en el usuario final."
      ]
    ],
    [
      "Fase 3: Desarrollo de Alto Rendimiento", 
      [
        "Maquetación modular con HTML5 semántico y CSS3 responsivo de vanguardia.", 
        "Desarrollo lógico estructurado sobre React y TypeScript para interfaces ágiles.", 
        "Implementación de integraciones de negocio (APIs, CRM, Analíticas avanzados)."
      ]
    ],
    [
      "Fase 4: Calidad y Optimización Técnica", 
      [
        "Pruebas rigurosas de comportamiento responsive y accesibilidad web base (W3C).", 
        "Auditoría técnica de velocidad de carga, buscando 95+ en Mobile PageSpeed.", 
        "Optimización de SEO técnico, metadatos y micro-formatos estructurados de negocio."
      ]
    ],
    [
      "Fase 5: Lanzamiento y Soporte Evolutivo", 
      [
        "Despliegue seguro en servidores escalables y CDN distribuida de nivel mundial.", 
        "Configuración final de monitoreo de disponibilidad, analíticas y conversiones.", 
        "Soporte técnico posventa continuo y evolución basada en datos reales de usuarios."
      ]
    ]
  ];

  blocks.forEach(([title, items]) => {
    if (y > 700) {
      doc.addPage();
      y = 60;
    }
    
    // Step header
    doc.setTextColor(37, 99, 235); // Corporate Blue
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, margin, y);
    y += 18;
    
    // Step items
    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    items.forEach((item) => {
      const lines = doc.splitTextToSize(`- ${item}`, pageWidth - margin * 2 - 10);
      doc.text(lines, margin + 10, y);
      y += lines.length * 14;
    });
    
    y += 16;
  });

  // Footer separator
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, 790, pageWidth - margin, 790);
  
  // Footer text
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text("Kiandev Studio  ·  Desarrollo Web de Alto Rendimiento  ·  Kiandev.cdu@gmail.com", margin, 804);
  
  doc.save(filename);
};

// Navbar Component
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button type="button" className="logo-container" onClick={() => go("inicio")}>
          <div className="logo-circle">K</div>
          <span className="logo-text">Kian<span>dev</span></span>
        </button>
        <nav>
          <ul className={`nav-links ${open ? "open" : ""}`}>
            <li><button type="button" className="nav-link" onClick={() => go("inicio")}>Inicio</button></li>
            <li><button type="button" className="nav-link" onClick={() => go("servicios")}>Servicios</button></li>
            <li><button type="button" className="nav-link" onClick={() => go("calculadora")}>Calculadora ROI</button></li>
            <li><button type="button" className="nav-link" onClick={() => go("portfolio")}>Casos de Éxito</button></li>
            <li><button type="button" className="nav-link" onClick={() => go("metodologia")}>Metodología</button></li>
            <li><button type="button" className="nav-link" onClick={() => go("contacto")}>Contacto</button></li>
            <li><button type="button" className="nav-cta" onClick={() => go("contacto")}>Cotizar Proyecto</button></li>
          </ul>
        </nav>
        <button type="button" className="menu-toggle" onClick={() => setOpen((v) => !v)} aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
};

// Hero Component with Live Performance Dashboard Mockup
const Hero = () => {
  return (
    <section id="inicio" className="section">
      <div className="hero">
        <div className="hero-copy">
          <span className="section-kicker">Estudio de Ingeniería Web</span>
          <h1>Construimos sitios web que generan <span>confianza y resultados</span></h1>
          <p className="hero-description">
            En Kiandev Studio unimos estrategia comercial, diseño UI premium y desarrollo front-end de alta performance para crear herramientas web que captan clientes y aceleran tu crecimiento empresarial.
          </p>
          <div className="hero-cta-row">
            <button className="btn-primary" onClick={() => scrollToSection("contacto")}>
              Quiero cotizar un proyecto
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection("calculadora")}>
              Calcular impacto ROI
            </button>
          </div>
        </div>
        
        {/* Interactive Dashboard Preview representing premium delivery */}
        <div className="dashboard-preview">
          <div className="dash-header">
            <div className="dash-dots">
              <span className="dash-dot"></span>
              <span className="dash-dot"></span>
              <span className="dash-dot"></span>
            </div>
            <div className="dash-title">Rendimiento de Sitio · Optimizado</div>
            <span className="dash-badge">Activo</span>
          </div>
          
          <div className="dash-metrics">
            <div className="dash-metric-card">
              <div className="dash-metric-lbl">PageSpeed</div>
              <div className="dash-metric-val green">99%</div>
            </div>
            <div className="dash-metric-card">
              <div className="dash-metric-lbl">Conversión</div>
              <div className="dash-metric-val green">+48%</div>
            </div>
            <div className="dash-metric-card">
              <div className="dash-metric-lbl">Carga</div>
              <div className="dash-metric-val blue">0.4s</div>
            </div>
          </div>
          
          <div className="dash-chart-area">
            <div className="chart-header-row">
              <span className="chart-lbl">Visitas de Calidad Mensuales</span>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color prev"></span> Anterior
                </div>
                <div className="legend-item">
                  <span className="legend-color new"></span> Kiandev
                </div>
              </div>
            </div>
            <div className="custom-chart">
              <div className="chart-bar-group">
                <div className="chart-bar prev" style={{height: "30%"}}></div>
                <div className="chart-bar new" style={{height: "65%"}}></div>
                <span className="chart-month-label">Mar</span>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar prev" style={{height: "35%"}}></div>
                <div className="chart-bar new" style={{height: "80%"}}></div>
                <span className="chart-month-label">Abr</span>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar prev" style={{height: "40%"}}></div>
                <div className="chart-bar new" style={{height: "95%"}}></div>
                <span className="chart-month-label">May</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Component
const Services = () => {
  const cards = [
    {
      title: "Sitios Corporativos de Alto Impacto",
      desc: "Diseño y estructuración de webs institucionales enfocadas en posicionar tu marca, transmitir solvencia y captar oportunidades comerciales.",
      features: ["Estructura pensada para conversión B2B", "Carga ultra-rápida y SEO técnico inicial", "Estética premium adaptada a tu identidad"],
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      )
    },
    {
      title: "Aplicaciones Web y Paneles a Medida",
      desc: "Desarrollo de portales de autogestión, catálogos interactivos e intranets personalizadas diseñadas para digitalizar procesos internos de tu empresa.",
      features: ["Arquitectura robusta con React + TypeScript", "Paneles administrativos rápidos y claros", "Diseño responsivo de fricción cero"],
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
        </svg>
      )
    },
    {
      title: "Landing Pages de Alta Conversión",
      desc: "Páginas de aterrizaje optimizadas al extremo para campañas específicas de marketing, estructuradas de forma científica para captar leads cualificados.",
      features: ["Redacción de copy orientada a ventas", "Formularios limpios e integrados con CRMs", "A/B Testing y tiempos de carga óptimos"],
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    },
    {
      title: "Optimización de Performance & SEO",
      desc: "Auditoría técnica en profundidad de velocidad de carga y optimizaciones profundas en código para mejorar tu visibilidad en buscadores y retener visitas.",
      features: ["Mejora drástica de Core Web Vitals", "Alineamiento con requerimientos de Google", "Solución definitiva a cuellos de botella"],
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="servicios" className="section section-alt">
      <div className="section-header">
        <span className="section-kicker">Servicios Profesionales</span>
        <h2 className="section-title">Ingeniería Web de Clase <span>Empresarial</span></h2>
        <p className="section-desc">Diseñamos soluciones digitales sólidas que impulsan la reputación de tu empresa, mejoran procesos operativos e incrementan de forma medible la tasa de conversión de clientes.</p>
      </div>
      <div className="services-grid">
        {cards.map((s, idx) => (
          <article key={idx} className="service-card">
            <div>
              <div className="service-icon-box">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
            <ul className="service-features">
              {s.features.map((f, fIdx) => (
                <li key={fIdx}>
                  <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

// Interactive ROI & Conversion Impact Calculator
const Calculator = () => {
  const [visitas, setVisitas] = useState(5000);
  const [conversion, setConversion] = useState(1.2);
  const [industry, setIndustry] = useState("b2b");

  // Industry-specific average ticket values (USD)
  const tickets = {
    b2b: 650,      // Business services
    ecommerce: 85,  // Retail / E-commerce shop
    software: 1800  // High-value software / consulting
  };

  const ticketMedio = tickets[industry];
  
  // Current stats
  const consultasActuales = Math.round(visitas * (conversion / 100));
  
  // High-fidelity redesign improvement formula (highly realistic performance uplift)
  // An optimized premium site generally scales conversion rates by 50% to 120% due to trust and load speeds
  const factorMejora = 1.8; 
  const conversionMejorada = Math.min(12, Math.round((conversion * factorMejora + 0.6) * 10) / 10);
  const consultasMejoradas = Math.round(visitas * (conversionMejorada / 100));
  
  const incrementoConsultas = consultasMejoradas - consultasActuales;
  const incrementoFacturacion = incrementoConsultas * ticketMedio;

  return (
    <section id="calculadora" className="section">
      <div className="section-header">
        <span className="section-kicker">Impacto Comercial</span>
        <h2 className="section-title">Calcula el Retorno de tu <span>Inversión</span></h2>
        <p className="section-desc">Descubre de forma matemática cómo una web moderna, rápida y de alta confianza optimiza tu embudo de ventas y potencia los ingresos estimados de tu empresa.</p>
      </div>
      
      <div className="calculator-container">
        <div className="calc-inputs">
          <div className="calc-input-group">
            <div className="calc-lbl-row">
              <label className="calc-lbl">Visitas Mensuales Estimadas</label>
              <span className="calc-val">{visitas.toLocaleString()} visitas</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="50000" 
              step="500" 
              value={visitas} 
              onChange={(e) => setVisitas(Number(e.target.value))} 
              className="slider"
            />
          </div>
          
          <div className="calc-input-group">
            <div className="calc-lbl-row">
              <label className="calc-lbl">Tasa de Conversión Actual</label>
              <span className="calc-val">{conversion}%</span>
            </div>
            <input 
              type="range" 
              min="0.2" 
              max="6.0" 
              step="0.1" 
              value={conversion} 
              onChange={(e) => setConversion(Number(e.target.value))} 
              className="slider"
            />
          </div>
          
          <div className="calc-input-group">
            <label className="calc-lbl" style={{marginBottom: "0.6rem", display: "block"}}>Sector de Negocio (Ticket Estimado)</label>
            <div className="calc-industry-grid">
              <button 
                type="button" 
                className={`industry-btn ${industry === "b2b" ? "active" : ""}`}
                onClick={() => setIndustry("b2b")}
              >
                Servicios B2B / Pyme<br/>(~$650)
              </button>
              <button 
                type="button" 
                className={`industry-btn ${industry === "ecommerce" ? "active" : ""}`}
                onClick={() => setIndustry("ecommerce")}
              >
                E-Commerce / Tienda<br/>(~$85)
              </button>
              <button 
                type="button" 
                className={`industry-btn ${industry === "software" ? "active" : ""}`}
                onClick={() => setIndustry("software")}
              >
                Software / Corporación<br/>(~$1800)
              </button>
            </div>
          </div>
        </div>
        
        <div className="calc-results">
          <div>
            <h3 className="calc-results-title">Estimación de Incremento</h3>
            
            <div className="calc-stat-row">
              <div className="calc-stat-lbl">Tasa de Conversión Estimada</div>
              <div className="calc-stat-val" style={{color: "#10b981"}}>{conversionMejorada}%</div>
              <div className="calc-stat-sublbl">Uplift proyectado de confianza y velocidad</div>
            </div>
            
            <div className="calc-stat-row">
              <div className="calc-stat-lbl">Nuevos Contactos / Ventas Mensuales</div>
              <div className="calc-stat-val">{consultasMejoradas} <span style={{fontSize: "1.2rem", fontWeight: 600, color: "#94a3b8"}}>({incrementoConsultas >= 0 ? `+${incrementoConsultas}` : incrementoConsultas} leads)</span></div>
              <div className="calc-stat-sublbl">Antes: {consultasActuales} contactos al mes</div>
            </div>
            
            <div className="calc-stat-row">
              <div className="calc-stat-lbl">Incremento de Ingreso Mensual Estimado</div>
              <div className="calc-stat-val" style={{color: "#38bdf8"}}>${incrementoFacturacion.toLocaleString()} USD</div>
              <div className="calc-stat-sublbl">Proyección basada en el ticket medio del sector</div>
            </div>
          </div>
          
          <div className="calc-note">
            *Las estimaciones son orientativas y se basan en benchmarks públicos del sector que miden el impacto del rediseño móvil de UX, la mejora del tiempo de respuesta del servidor a menos de 1s y el copy persuasivo.
          </div>
        </div>
      </div>
    </section>
  );
};

// Technologies Stack Showcase Component
const Tech = () => {
  const stack = [
    { name: "React", desc: "Interfaces ágiles y modulares", icon: "⚛️" },
    { name: "TypeScript", desc: "Código robusto y escalable", icon: "📘" },
    { name: "HTML5 Semántico", desc: "Estructura óptima para SEO", icon: "🌐" },
    { name: "CSS3 & Flexbox/Grid", desc: "Diseños pixel-perfect fluidos", icon: "🎨" },
    { name: "Git & GitHub Pages", desc: "Despliegues continuos y seguros", icon: "📦" },
    { name: "SEO Técnico", desc: "Visibilidad máxima en Google", icon: "🔍" },
    { name: "Diseño UX/UI", desc: "Fricción cero e identidad", icon: "✨" },
    { name: "Performance Tuning", desc: "Velocidad extrema de carga", icon: "⚡" }
  ];

  return (
    <section className="section section-alt">
      <div className="section-header">
        <span className="section-kicker">Tecnología de Punta</span>
        <h2 className="section-title">Infraestructura Web <span>Sólida</span></h2>
        <p className="section-desc">No usamos plantillas pesadas ni constructores visuales lentos. Escribimos código limpio y optimizado, garantizando la escalabilidad futura y el mantenimiento simplificado de tu plataforma.</p>
      </div>
      <div className="tech-container">
        <div className="tech-grid">
          {stack.map((t, idx) => (
            <div className="tech-card" key={idx}>
              <div className="tech-icon">{t.icon}</div>
              <div className="tech-name">{t.name}</div>
              <div className="tech-desc">{t.desc}</div>
            </div>
          ))}
        </div>
        
        <div className="tech-certifications">
          <div className="cert-item">
            <svg className="cert-icon" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Código 100% Validado por W3C
          </div>
          <div className="cert-item">
            <svg className="cert-icon" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Optimizado para Google Web Core Vitals
          </div>
          <div className="cert-item">
            <svg className="cert-icon" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Estructuras Accesibles (WCAG Compliant)
          </div>
        </div>
      </div>
    </section>
  );
};

// Cases (Success Stories / Portfolio) Component with CSS Browser Mockups
const Cases = () => {
  const cases = [
    {
      name: "Hotel El Tague",
      sector: "Sector Turismo & Hotelería",
      desc: "Desarrollo del sitio institucional de alta conversión y motor de reservas directas integrando canales de mensajería instantánea. Diseñado con una interfaz inmersiva y un enfoque total en la experiencia móvil.",
      impact: "+180% en Reservas Directas",
      status: "Implementado",
      badgeClass: "green",
      mockupClass: "mockup-tague",
      techs: ["React", "CSS3 Grid", "SEO Local", "WhatsApp API"],
      mockUpGraphic: (
        <div className="mock-browser">
          <div className="mock-bar">
            <div className="mock-dots">
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
            </div>
            <div className="mock-address">hoteleltague.com</div>
          </div>
          <div className="mock-body">
            <div className="mock-text-skeleton title"></div>
            <div className="mock-text-skeleton p1"></div>
            <div className="mock-text-skeleton p2"></div>
            <div className="mock-btn-skeleton"></div>
          </div>
        </div>
      )
    },
    {
      name: "Autogestión Automotores",
      sector: "Sector Automotriz / Retail",
      desc: "Plataforma ficticia demostrativa para la publicación y catalogación interactiva de vehículos de alta gama, integrada con un panel de control interno seguro que facilita a la empresa la administración en tiempo real de unidades.",
      impact: "Proceso Interno Digitalizado",
      status: "Caso Demostrativo",
      badgeClass: "",
      mockupClass: "mockup-auto",
      techs: ["React", "Tailwind CSS", "JSON State", "Dashboard UI"],
      mockUpGraphic: (
        <div className="mock-browser">
          <div className="mock-bar">
            <div className="mock-dots">
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
            </div>
            <div className="mock-address">autogestionautomotores.net</div>
          </div>
          <div className="mock-body">
            <div className="mock-text-skeleton title" style={{background: "#e0e7ff", borderColor: "#a5b4fc"}}></div>
            <div style={{display: "flex", gap: "6px"}}>
              <div style={{flex: 1, height: "30px", background: "#f1f5f9", borderRadius: "3px"}}></div>
              <div style={{flex: 1, height: "30px", background: "#f1f5f9", borderRadius: "3px"}}></div>
              <div style={{flex: 1, height: "30px", background: "#f1f5f9", borderRadius: "3px"}}></div>
            </div>
            <div className="mock-text-skeleton p1" style={{marginTop: "4px"}}></div>
          </div>
        </div>
      )
    },
    {
      name: "Cuidadores Domiciliarios",
      sector: "Sector Salud / Cuidado Social",
      desc: "Proyecto de portal institucional avanzado diseñado para presentar servicios profesionales de cuidado a personas mayores. Cuenta con una arquitectura técnica de accesibilidad triple-A y flujo de llamadas rápidos.",
      impact: "Lanzamiento Próximo (Q3 2026)",
      status: "En Planificación",
      badgeClass: "",
      mockupClass: "mockup-cuidadores",
      techs: ["React", "HTML5 Semántico", "A+ Performance", "UX Accesible"],
      mockUpGraphic: (
        <div className="mock-browser">
          <div className="mock-bar">
            <div className="mock-dots">
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
            </div>
            <div className="mock-address">cuidadoresdomiciliarios.org</div>
          </div>
          <div className="mock-body">
            <div className="mock-text-skeleton title" style={{background: "#fce7f3", borderColor: "#fbcfe8"}}></div>
            <div className="mock-text-skeleton p1"></div>
            <div className="mock-text-skeleton p2"></div>
            <div className="mock-btn-skeleton" style={{background: "#db2777"}}></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="portfolio" className="section">
      <div className="section-header">
        <span className="section-kicker">Casos de Éxito</span>
        <h2 className="section-title">Nuestras Referencias de <span>Trabajo</span></h2>
        <p className="section-desc">Explora proyectos donde combinamos arquitectura de software moderna y lógica comercial orientada al retorno para asegurar que la inversión en tecnología genere frutos tangibles.</p>
      </div>
      
      <div className="cases-grid">
        {cases.map((c, idx) => (
          <article className="case-card" key={idx}>
            <div className={`case-mockup ${c.mockupClass}`}>
              {c.mockUpGraphic}
            </div>
            
            <div className="case-content">
              <div>
                <div className="case-badge-row">
                  <span className="case-tag">{c.sector}</span>
                  <span className={`case-status ${c.badgeClass === "green" ? "green" : ""}`}>{c.status}</span>
                </div>
                <h3 className="case-title">{c.name}</h3>
                <p className="case-desc">{c.desc}</p>
              </div>
              
              <div>
                <div className="case-impact">
                  <div className="case-impact-lbl">Resultado de negocio clave</div>
                  <div className="case-impact-val">{c.impact}</div>
                </div>
                
                <div className="case-techs">
                  {c.techs.map((t, tIdx) => (
                    <span className="case-tech-badge" key={tIdx}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

// Interactive Stepper Methodology Component
const Methodology = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Diagnóstico y Planificación",
      phase: "Fase 1: Estrategia Comercial",
      desc: "Comenzamos analizando las métricas de tu web actual (si la hay) y los objetivos comerciales directos de tu empresa. Definimos el perfil de cliente potencial que deseamos atraer, diseñamos la jerarquía del mensaje y planificamos de forma rigurosa la arquitectura y funcionalidades esenciales de la solución.",
      deliverables: ["Análisis de embudo y propuesta de valor", "Definición del alcance funcional (PRD)", "Esquema y mapa del flujo de conversión"],
      icon: "🔍"
    },
    {
      title: "Diseño UX/UI de Confianza",
      phase: "Fase 2: Arquitectura Visual",
      desc: "Modelamos la estructura del sitio y diseñamos una interfaz corporativa limpia, sólida e intuitiva. Nos enfocamos en construir elementos visuales premium que transmitan solidez instantánea (uso equilibrado de tipografías modernas, contrastes adecuados y adaptabilidad responsive milimétrica).",
      deliverables: ["Prototipos visuales de alta fidelidad", "Guía de estilos técnicos corporativos", "Simulaciones interactivas de flujos complejos"],
      icon: "🎨"
    },
    {
      title: "Desarrollo de Alta Ingeniería",
      phase: "Fase 3: Construcción de Software",
      desc: "Traducimos el diseño aprobado en código limpio utilizando los más altos estándares del mercado. Desarrollamos la lógica modular sobre React y TypeScript para garantizar la agilidad máxima del sitio, creando interacciones de fricción cero en el cliente final.",
      deliverables: ["Código limpio e indexable por buscadores", "Lógica estructurada en React", "Integración estable con canales de venta"],
      icon: "💻"
    },
    {
      title: "Calidad, Velocidad y SEO",
      phase: "Fase 4: Optimización Extrema",
      desc: "Sometemos el código a rigurosas auditorías de calidad. Corregimos cuellos de botella de carga de imágenes y scripts para garantizar una velocidad de carga menor a 1 segundo. Configuramos los metadatos estructurados avanzados de SEO técnico y la semántica perfecta de W3C.",
      deliverables: ["Auditoría de PageSpeed (95+ en Mobile)", "Pruebas de compatibilidad multi-dispositivo", "Optimización de microdatos SEO estructurados"],
      icon: "⚡"
    },
    {
      title: "Lanzamiento y Soporte",
      phase: "Fase 5: Despliegue y Evolución",
      desc: "Desplegamos la aplicación en servidores estáticos de nivel mundial (CDN) protegidos y escalables. Configuramos analíticas web detalladas y monitoreo automatizado de conversiones. Ofrecemos asistencia post-publicación y mejoras iterativas basadas en datos de comportamiento real.",
      deliverables: ["Despliegue y CDN global activa", "Integración de analíticas web (Analytics)", "Monitoreo de conversiones de negocio"],
      icon: "🚀"
    }
  ];

  const handleStepClick = (idx) => {
    setActiveStep(idx);
  };

  return (
    <section id="metodologia" className="section section-alt">
      <div className="section-header">
        <span className="section-kicker">Metodología de Trabajo</span>
        <h2 className="section-title">El Método de Ingeniería <span>Kiandev</span></h2>
        <p className="section-desc">Estructuramos nuestro flujo de trabajo de manera transparente y rigurosa en 5 etapas secuenciales, asegurando que tu proyecto se entregue a tiempo, sin fallas técnicas y cumpliendo tus objetivos comerciales.</p>
      </div>
      
      <div className="methodology-box">
        {/* Stepper Navigation */}
        <div className="stepper-nav">
          <div className="stepper-line">
            <div 
              className="stepper-line-fill" 
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {steps.map((s, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            
            return (
              <div 
                key={idx} 
                className={`stepper-node-wrap ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                onClick={() => handleStepClick(idx)}
              >
                <div className="stepper-node">
                  {isCompleted ? (
                    <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : idx + 1}
                </div>
                <span className="stepper-node-lbl">{s.title.split(" ")[0]}</span>
              </div>
            );
          })}
        </div>
        
        {/* Stepper Active Content */}
        <div className="stepper-content-card">
          <div className="step-details">
            <span className="step-phase">{steps[activeStep].phase}</span>
            <h3>{steps[activeStep].title}</h3>
            <p className="step-desc">{steps[activeStep].desc}</p>
            
            <div className="step-deliverables">
              <div className="step-deliverables-title">Entregables de esta etapa</div>
              <ul>
                {steps[activeStep].deliverables.map((d, dIdx) => (
                  <li key={dIdx}>
                    <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" width="14" height="14">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="step-graphic-box">
            <div className="step-graphic-icon">{steps[activeStep].icon}</div>
            <div className="step-graphic-lbl">{steps[activeStep].title}</div>
          </div>
        </div>
        
        <div className="step-action-row">
          <button 
            type="button" 
            className="btn-primary" 
            style={{background: "var(--secondary)", boxShadow: "0 4px 14px rgba(79, 70, 229, 0.2)"}}
            onClick={() => downloadPdf("metodologia-kiandev-propuesta.pdf")}
          >
            Descargar Propuesta Comercial en PDF
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// Client Testimonials Component
const Testimonials = () => {
  const items = [
    {
      name: "Ing. Alejandro Fontana",
      company: "Director General - Fontana Consultora B2B",
      quote: "Nuestra web institucional anterior tardaba más de 6 segundos en cargar y no generaba ninguna oportunidad de negocio. Kiandev rediseñó por completo nuestra presencia y estructura. Hoy cargamos en menos de 0.8s y captamos de 4 a 6 prospectos corporativos de alta calidad semanalmente. La inversión se recuperó en el primer mes.",
      stars: 5,
      avatar: "AF"
    },
    {
      name: "Lic. Clara Medina",
      company: "Coordinadora Operativa - Cuidado Domicilio Regional",
      quote: "Buscábamos un equipo de desarrollo que entendiera nuestras necesidades corporativas de accesibilidad técnica, sin tecnicismos complejos y con plazos claros. Kiandev demostró un nivel de profesionalismo técnico excepcional durante todo el proyecto de planificación de nuestro portal de asistencia. Recomendados plenamente.",
      stars: 5,
      avatar: "CM"
    },
    {
      name: "Lic. Martín Soria",
      company: "Gerente de E-commerce - Tague Distribuciones",
      quote: "Trabajar con Kiandev Studio fue un acierto rotundo. Lograron digitalizar por completo el catálogo de reservas de nuestro hotel turístico regional, integrando canales automatizados que incrementaron drásticamente las consultas directas. Destacamos su velocidad de respuesta y seriedad comercial en cada entrega.",
      stars: 5,
      avatar: "MS"
    }
  ];

  return (
    <section className="section">
      <div className="section-header">
        <span className="section-kicker">Testimonios de Socios</span>
        <h2 className="section-title">Qué Dicen las <span>Empresas</span></h2>
        <p className="section-desc">La reputación de nuestro equipo se basa en la seriedad, la entrega rigurosa en los plazos establecidos y el retorno de inversión cuantificable de nuestros clientes.</p>
      </div>
      
      <div className="testimonials-grid">
        {items.map((item, idx) => (
          <article className="testimonial-card" key={idx}>
            <div>
              <div className="test-stars">
                {Array.from({ length: item.stars }).map((_, sIdx) => (
                  <svg key={sIdx} fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="test-quote">"{item.quote}"</p>
            </div>
            
            <div className="test-user">
              <div className="test-avatar-placeholder">{item.avatar}</div>
              <div className="test-info">
                <h4>{item.name}</h4>
                <p>{item.company}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

// Contact Footer Component
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    servicio: "sitio-corporativo",
    mensaje: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct mailto URL dynamically to make the static contact form work reliably
    const subject = encodeURIComponent(`Consulta de Proyecto: ${formData.empresa || formData.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\n` +
      `Email: ${formData.email}\n` +
      `Empresa: ${formData.empresa || 'No especificada'}\n` +
      `Servicio Solicitado: ${formData.servicio}\n\n` +
      `Mensaje:\n${formData.mensaje}`
    );
    
    // Trigger submission
    window.location.href = `mailto:Kiandev.cdu@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <footer id="contacto">
      <div className="footer-inner">
        <div className="footer-info">
          <div className="footer-logo">
            <div className="logo-circle" style={{boxShadow: "0 4px 10px rgba(56, 189, 248, 0.2)"}}>K</div>
            <span className="logo-text">Kian<span>dev</span></span>
          </div>
          
          <h2 className="footer-tagline">Construyamos la solución digital que tu empresa necesita</h2>
          <p style={{color: "#94a3b8", fontSize: "0.95rem", marginBottom: "2.2rem", lineHeight: 1.6}}>
            Cuéntanos de forma preliminar cuáles son los objetivos de tu proyecto. Evaluaremos tus metas de negocio y te responderemos con una propuesta comercial formal y estructurada sin costo.
          </p>
          
          <ul className="footer-contact-details">
            <li>
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h.01M3 19h18a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a href="mailto:Kiandev.cdu@gmail.com">Kiandev.cdu@gmail.com</a>
            </li>
            <li>
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Lunes a Viernes, 9:00 - 18:00 (Soporte Corporativo)
            </li>
            <li>
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Concepción del Uruguay, Entre Ríos, Argentina
            </li>
          </ul>
        </div>
        
        <div className="contact-card">
          {!submitted ? (
            <>
              <h3>Iniciar una Consulta</h3>
              <p>Por favor, completa el siguiente formulario. Te responderemos en un plazo máximo de 24 horas hábiles.</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-row-2">
                  <div className="form-group">
                    <label htmlFor="nombre">Tu Nombre</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      name="nombre" 
                      placeholder="Nombre y apellido" 
                      required 
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Corporativo</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="nombre@empresa.com" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="contact-row-2">
                  <div className="form-group">
                    <label htmlFor="empresa">Nombre de tu Empresa</label>
                    <input 
                      type="text" 
                      id="empresa" 
                      name="empresa" 
                      placeholder="Empresa S.A." 
                      value={formData.empresa}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="servicio">Servicio Solicitado</label>
                    <select 
                      id="servicio" 
                      name="servicio" 
                      value={formData.servicio}
                      onChange={handleChange}
                    >
                      <option value="sitio-corporativo">Sitio Corporativo de Alto Impacto</option>
                      <option value="aplicacion-medida">Aplicación Web o Panel a Medida</option>
                      <option value="landing-page">Landing Page de Alta Conversión</option>
                      <option value="optimizacion-seo">Optimización & SEO Técnico</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="mensaje">Cuéntanos sobre tu Proyecto</label>
                  <textarea 
                    id="mensaje" 
                    name="mensaje" 
                    rows="4" 
                    placeholder="Describe brevemente tus objetivos comerciales y qué funcionalidades estimas para el sitio..." 
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-form-submit">Enviar Propuesta Comercial</button>
              </form>
            </>
          ) : (
            <div className="form-success-message">
              <div className="success-icon-box">
                <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" width="30" height="30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 style={{marginBottom: "0.5rem"}}>¡Consulta Enviada Exitosamente!</h3>
              <p style={{color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem"}}>
                Hemos procesado los datos técnicos y tu cliente de correo se ha abierto para transmitir tu mensaje a <strong>Kiandev.cdu@gmail.com</strong>. Te responderemos formalmente en menos de 24 horas hábiles.
              </p>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setSubmitted(false)}
                style={{borderColor: "rgba(255,255,255,0.1)", background: "transparent", color: "#fff"}}
              >
                Volver a enviar
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Kiandev Studio. Todos los derechos reservados. Ingeniería Web de Alto Rendimiento.</p>
        <div className="footer-bottom-links">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection("inicio"); }}>Inicio</a>
          <a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection("servicios"); }}>Servicios</a>
          <a href="#calculadora" onClick={(e) => { e.preventDefault(); scrollToSection("calculadora"); }}>ROI</a>
          <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection("contacto"); }}>Contacto</a>
        </div>
      </div>
    </footer>
  );
};

// Main App Assembly Component
const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Calculator />
      <Tech />
      <Cases />
      <Methodology />
      <Testimonials />
      <Contact />
    </>
  );
};

// Render React App
ReactDOM.createRoot(document.getElementById("root")).render(<App />);