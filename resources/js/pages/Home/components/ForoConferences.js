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

const SectionHeader = ({ title }) => {
  const { isMobile } = useScreenSize();
  
  return (
    <div style={{ 
      fontSize: isMobile ? "1.8rem" : "clamp(1.5rem, 4vw, 2.5rem)",
      color: "#4A2044",
      fontWeight: 700,
      position: "relative",
      textAlign: 'center',
    }}>
      {title}
    </div>
  );
};

const InfoItem = ({ title, name }) => {
  const { isMobile } = useScreenSize();
  
  return (
    <div style={{ 
      padding: isMobile ? "3vh 2vh" : "2vh",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      backgroundColor: '#FFF',
      boxShadow: isMobile ? 'none' : '0 2px 12px rgba(0,0,0,0.08)',
      border: isMobile ? '1px solid #eee' : 'none',
      ':hover': {
        backgroundColor: "#FBF5F8",
        transform: isMobile ? 'none' : 'translateY(-3px)'
      }
    }}>
      <div style={{ 
        color: "#4A2044",
        fontWeight: 600,
        fontSize: isMobile ? "1.1rem" : "clamp(0.95rem, 1.3vw, 1.2rem)",
        lineHeight: 1.4,
        marginBottom: isMobile ? '1vh' : '0.8vw'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: isMobile ? "0.95rem" : "clamp(0.85rem, 1.1vw, 1rem)",
        color: "#666",
        lineHeight: 1.3
      }}>
        {name}
      </div>
    </div>
  );
};

export default function ForoConferences() {
  const { isMobile } = useScreenSize();

  return (
    <div style={{ 
      width: "90%", 
      maxWidth: "1300px",
      padding: isMobile ? "4vw 3vw" : "2vw 1.5vw", 
      margin: "0 auto",
      boxSizing: "border-box"
    }}>
      {/* Título principal */}
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
          fontSize: "clamp(3.5rem, 7.5vw, 5.5rem)",
          position: "relative",
          display: "inline-block",
          backgroundColor: "#FFFFFF",
          padding: isMobile ? "0 4vw" : "0 2vw",
          zIndex: 2,
          color: "#4A2044",
          lineHeight: 1.2
        }}>
          PONENTES
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: isMobile ? '5vw' : '3vw',
        padding: "1vh 0"
      }}>
        <SectionHeader title="Panelistas" />
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isMobile ? '4vw' : '2vw',
          width: '100%'
        }}>
          {/* Lista de panelistas */}
          <InfoItem title="Lic. Alejandra Varela" name="Directora de Mercadotecnia y Gerente de CEDIS La Paz Quesos Varela" />
          <InfoItem title="Elizabeth Ybarra" name="Socio de Desarrollo Agrícola en Agricolé" />
          <InfoItem title="Tomás Cantor Bertín" name="Director Ejecutivo Inmobiliria Rancho La Laguna" />
          <InfoItem title="M.C. Jesús Alfredo de la Peña Morales" name="Coordinador de Vinculación, Innovación y Transferencia de Conocimiento a la Sociedad (COVITECS) del CIBNOR" />
          <InfoItem title="Karlotta Rieve" name="Project Manager I Hatch Innovation Services" />
          <InfoItem title="M.C. Marco Medina" name="Director Ejecutivo de 'Arrecifes Sato Umi'" />
          <InfoItem title="Dr. Karla Suzeth Trejo Berumen" name="Subcoordinadora de Emprendimiento e Incubación de Base Científico y Tecnológico del CIBNOR" />
        </div>

        <SectionHeader title="Ponentes" />
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isMobile ? '4vw' : '2vw'
        }}>
          <InfoItem title="Lic. Pablo Fenech" name="Director de Nacional Financiera en BCS" />
          <InfoItem title="Lic. Fernando Ojeda Marín" name="Consultor Independiente en Innovación" />
        </div>

        <SectionHeader title="Conferencia" />
        <div style={{ 
          textAlign: 'center', 
          width: '100%'
        }}>
          <div style={{ 
            fontWeight: 700, 
            fontSize: isMobile ? "1.3rem" : "clamp(1.1rem, 1.8vw, 1.5rem)",
            marginBottom: isMobile ? '3vw' : '1vw',
            color: '#4A2044',
            lineHeight: 1.3,
            padding: isMobile ? '0 4vw' : '0 2vw'
          }}>
            "La Casa del Emprendedor municipal La Paz – Un Modelo de Éxito"
          </div>
          <InfoItem 
            title="Dr. Karla Suzeth Trejo Berumen"
            name="Participan: Subcoordinadora de Emprendimiento e Incubación de Base Científico y Tecnológico del CIBNOR" 
          />
        </div>

        <SectionHeader title="Panel y Taller" />
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '6vw' : '3vw',
          width: '100%'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '3vw' : '2vw' }}>
            <div style={{ 
              fontWeight: 600, 
              textAlign: 'center', 
              fontSize: isMobile ? "1.2rem" : "clamp(1rem, 1.6vw, 1.4rem)",
              color: '#4A2044',
              padding: isMobile ? '1vw 0' : '0.5vw'
            }}>
              "Historias que inspiran"
            </div>
            <InfoItem title="Lic. Alejandra Varela" name="Participan: Directora de Mercadotecnia y Gerente de CEDIS La Paz Quesos Varela" />
            <InfoItem title="Elizabeth Ybarra" name="Socio de Desarrollo Agrícola en Agricolé" />
            <InfoItem title="Tomás Cantor Bertín" name="C.O. Inmobiliaria Rancho La Laguna" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '3vw' : '2vw' }}>
            <div style={{ 
              fontWeight: 600, 
              textAlign: 'center', 
              fontSize: isMobile ? "1.2rem" : "clamp(1rem, 1.6vw, 1.4rem)",
              color: '#4A2044',
              padding: isMobile ? '1vw 0' : '0.5vw'
            }}>
              "Emprendimientos de Alto Impacto"
            </div>
            <InfoItem title="M.C. Jesús Alfredo de la Peña Morales" name="Participan: Coordinador de Vinculación, Innovación y Transferencia de Conocimiento a la Sociedad (COVITECS) del CIBNOR" />
            <InfoItem title="Karlotta Rieve" name="Project Manager I Hatch Innovation Services" />
            <InfoItem title="M.C. Marco Medina" name="Director Ejecutivo de 'Arrecifes Sato Umi'" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '3vw' : '2vw' }}>
            <div style={{ 
              fontWeight: 600, 
              textAlign: 'center', 
              fontSize: isMobile ? "1.2rem" : "clamp(1rem, 1.6vw, 1.4rem)",
              color: '#4A2044',
              padding: isMobile ? '1vw 0' : '0.5vw'
            }}>
              ¿Por qué algunos de los emprendimientos fracasan?
            </div>
            <InfoItem title="Dr. Karla Suzeth Trejo Berumen" name="Participan: Subcoordinadora de Emprendimiento e Incubación de Base Científico y Tecnológico del CIBNOR" />
            <InfoItem title="Lic. Pablo Fenech" name="Director de Nacional Financiera en BCS" />
            <InfoItem title="Lic. Fernando Ojeda Marín" name="Consultor Independiente en Innovación" />
          </div>
        </div>
      </div>

      {/* Boton de descarga Itinerario */}
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
          textAlign: 'center',
          width: '100%'
        }}>
          ITINERARIO FORO DEL EMPRENDEDOR - ABRIL 2025
        </div>
        <a 
            href="assets/doc/ITINERARIO_FORO_DEL_EMPRENDEDOR_ABRIL_2025.pdf"
            download="ITINERARIO_FORO_DEL_EMPRENDEDOR_ABRIL_2025.pdf"
            target="_blank"
          style={{
            backgroundColor: '#D85C76',
            color: 'white',
            borderRadius: '4px',
            padding: '14px 30px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: isMobile ? "1.1rem" : 'clamp(1rem, 2vw, 1.3rem)',
            textAlign: 'center',
            transition: 'background-color 0.3s ease',
            whiteSpace: 'nowrap',
            width: 'fit-content',
            border: 'none',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#C04A62'
            }
          }}
        >
          Descargar PDF
        </a>
      </div>
    </div>
  );
}