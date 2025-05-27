import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Hook personalizado para detectar tamaño de pantalla
const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

const SectionTitle = ({ children }) => {
  const { isMobile } = useScreenSize();
  
  return (
    <div style={{
      position: "relative",
      textAlign: "center",
      margin: "0 0 2vw 0",
    }}>
      <div style={{
        position: "absolute",
        top: "40%",
        left: 0,
        right: 0,
        height: isMobile ? "2px" : "4px",
        backgroundColor: "#A6326F",
        transform: "translateY(-50%)",
        zIndex: 1
      }}></div>
      <div style={{ 
        fontSize: isMobile ? "clamp(3rem, 6vw, 4rem)" : "clamp(3.5rem, 7.5vw, 5.5rem)",
        position: "relative",
        display: "inline-block",
        backgroundColor: "#FFFFFF",
        padding: isMobile ? "0 4vw" : "0 2vw",
        zIndex: 2,
        color: "#4A2044",
        lineHeight: 1.2
      }}>
        {children}
      </div>
    </div>
  );
};

export default function RegisterSection() {
  const { isMobile } = useScreenSize();

  return (
    <div style={{ 
      width: "90%", 
      maxWidth: "1300px",
      padding: isMobile ? "4vw 3vw" : "2vw 1.5vw", 
      margin: "0 auto",
      boxSizing: "border-box",
      fontFamily: "'Arial', sans-serif"
    }}>
      {/* Sección de Registro */}
      <SectionTitle>REGISTRO</SectionTitle>
      
      <div style={{
        width: '100%',
        margin: '0 auto 40px auto',
        padding: isMobile ? '6vw' : '5vw',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          fontSize: isMobile ? "1.8rem" : "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: '700',
          color: '#4A2044',
          textAlign: 'center',
          margin: '0 0 25px 0',
          lineHeight: '1.3'
        }}>
          ¿Qué es Foro Emprendedor?
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontSize: isMobile ? "1rem" : "clamp(1rem, 1.1vw, 1.2rem)",
          color: '#333',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          <p style={{ margin: '0', textAlign: 'justify' }}>
            Es un foro donde los emprendedores tienen la oportunidad de recibir asesoría 
            para fortalecer sus proyectos y empresas, compartir sus ideas con una audiencia
            más amplia, recibir retroalimentación, establecer contactos con posibles socios
            comerciales e inversores, y aprender de otros emprendedores y expertos en la industria.
          </p>
          
          <p style={{ margin: '0', textAlign: 'justify' }}>
            Buscamos que el foro del emprendedor en esta edición, así como en las pasadas
            ediciones sea una excelente fuente de inspiración, aprendizaje y oportunidades de
            networking, donde puedan descubrir nuevas empresas y productos innovadores, obtener
            información sobre las últimas tendencias en el mundo del emprendimiento y encontrar
            recursos útiles para apoyar sus propios proyectos empresariales.
          </p>
          
          <p style={{ margin: '0', textAlign: 'justify' }}>
            El foro del emprendedor es una plataforma importante donde buscamos fomentar la 
            colaboración, la innovación y el crecimiento dentro del ecosistema emprendedor, brindando
            oportunidades tanto para los emprendedores como para aquellos interesados en el mundo
            empresarial.
          </p>
          
          <p style={{ 
            margin: '0', 
            textAlign: 'justify', 
            fontWeight: '700',
            color: '#4A2044' 
          }}>
            NOTA: <br/>"¿Cómo puedo participar en las conferencias y capacitaciones?<br/>
            Solamente tienes que registrarte y ya tienes apartado tu
            lugar, recuerda llenar cada uno de los espacios solicitados
            ya que eso nos ayuda a poder ubicar tu tipo de
            emprendimiento."
          </p>
        </div>
        
        {/* <div style={{ textAlign: 'center' }}>
          <NavLink 
            to="/foro-emprendedores-registro" //Puede ser foro o expo
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#D85C76',
              color: 'white',
              fontWeight: '700',
              padding: '12px 32px',
              borderRadius: '5px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: isMobile ? "1.1rem" : 'clamp(1rem, 1.1vw, 1.2rem)',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              ':hover': {
                backgroundColor: '#C04A62'
              }
            }}
          >
            REGISTRATE
          </NavLink>
        </div> */}
      </div>
      
      {/* Sección Beneficios */}
      <div style={{
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
      }}>
        <SectionTitle>BENEFICIOS</SectionTitle>
        
        <p style={{
          fontSize: isMobile ? "1rem" : "clamp(1rem, 1.1vw, 1.2rem)",
          color: '#333',
          lineHeight: '1.6',
          textAlign: 'justify',
          margin: '0 0 20px 0'
        }}>
          Participar en Foro Emprendedor puede ofrecerte una serie de
          beneficios significativos, tanto para crecimiento personal
          como para el desarrollo de tu negocio. Aquí tienes algunos
          de los beneficios más destacados:
        </p>
        
        {[
          "Adquisición de conocimientos",
          "Desarrollo de habilidades",
          "Inspiración y motivación",
          "Visibilidad y exposición",
          "Networking",
          "Retroalimentación instantánea",
          "Oportunidades de ventas",
          "Aprendizaje",
          "Validación del mercado",
          "Promoción de la marca"
        ].map((benefit, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4 style={{
              fontSize: isMobile ? "1.3rem" : "clamp(1.2rem, 1.5vw, 1.5rem)",
              color: '#D85C76',
              margin: '0 0 10px 0',
              fontWeight: '600'
            }}>
              {benefit}:
            </h4>
            <p style={{
              fontSize: isMobile ? "1rem" : "clamp(1rem, 1.1vw, 1.2rem)",
              color: '#333',
              lineHeight: '1.6',
              textAlign: 'justify',
              margin: '0'
            }}>
              {[
                "Las capacitaciones y conferencias proporcionan acceso a información actualizada y conocimientos relevantes en áreas clave para el emprendimiento, como estrategia empresarial, marketing, finanzas, gestión de proyectos, liderazgo, entre otros. Esto te permite estar al tanto de las últimas tendencias y mejores prácticas en el mundo empresarial.",
                "Estos eventos ofrecen la oportunidad de desarrollar y mejorar tus habilidades empresariales, como la comunicación efectiva, la negociación, la resolución de problemas, la toma de decisiones, el trabajo en equipo y el pensamiento estratégico. Esto te ayuda a ser un emprendedor más competente y eficaz.",
                "Escuchar las experiencias y los éxitos de otros emprendedores exitosos puede inspirarte y motivarte a perseguir tus propias metas empresariales. Las conferencias suelen contar con ponentes que comparten historias inspiradoras y consejos prácticos que pueden impulsar tu espíritu emprendedor.",
                "Participar en Foro Emprendedor te brinda la oportunidad de poner tu negocio frente a una amplia audiencia de clientes potenciales, inversores, medios de comunicación y otros emprendedores. Esto puede aumentar la visibilidad de tu marca y ayudarte a llegar a nuevos clientes.",
                "Las exposiciones son excelentes lugares para establecer contactos y crear relaciones comerciales. Puedes conectarte con otros emprendedores, posibles socios comerciales, proveedores y clientes potenciales. Estas conexiones pueden ser valiosas para el crecimiento futuro de tu negocio.",
                "Interactuar directamente con los ponentes, panelistas y asistentes a la expo te brinda la oportunidad de obtener retroalimentación inmediata sobre tu producto o servicio Esto puede ayudarte a identificar áreas de mejora y hacer ajustes en tu estrategia comercial.",
                "Las exposiciones son entornos propicios para generar ventas directas. Los asistentes a menudo están interesados en descubrir nuevos productos y servicios, lo que puede traducirse en ventas en el lugar o en el futuro cercano.",
                "Participar en una expo te expone a una variedad de ideas, tendencias y prácticas comerciales innovadoras. Puedes asistir a conferencias, talleres y paneles de discusión que te ayuden a expandir tus conocimientos y habilidades como emprendedor.",
                "La respuesta de los asistentes a tu stand puede servir como una forma de validar tu idea de negocio y tu producto o servicio. Si recibes una respuesta positiva, esto puede confirmar que estás en el camino correcto.",
                "Una exposición te brinda la oportunidad de promocionar tu marca de manera efectiva a través de materiales promocionales, demostraciones en vivo y actividades interactivas. Esto puede ayudarte a crear conciencia de marca y a diferenciarte de la competencia.",
              ][index]}
            </p>
          </div>
        ))}
        
        <p style={{
          fontSize: isMobile ? "1rem" : "clamp(1rem, 1.1vw, 1.2rem)",
          color: '#4A2044',
          lineHeight: '1.6',
          textAlign: 'justify',
          margin: '20px 0 0 0',
          fontWeight: '700'
        }}>
          En resumen, participar en una expo para emprendedores puede
          ser una excelente manera de impulsar tu negocio, establecer
          contactos clave y aprender de otros profesionales del
          sector.
        </p>
      </div>

      {/* Sección Frase */}
        <div style={{
            backgroundColor: '#4A2044',
            color: 'white',
            borderRadius: '4px',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            margin: '40px 0 0',
            width: '100%',
            boxSizing: 'border-box'
            }}>
            <div style={{
                fontSize: isMobile ? "1.5rem" : 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: '600',
                fontStyle: 'italic',  // Esta línea añade el estilo cursiva
                textAlign: 'center',
                width: '100%'
            }}>
                "Si lo dejas una vez, se convierte en un hábito. No lo dejes nunca".
            </div>
        </div>
    </div>
  );
}