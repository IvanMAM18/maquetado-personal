

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MenuBar({ userData }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Inicio");
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (itemName, href, e) => {
    e.preventDefault();
    setActiveItem(itemName);
    navigate(href);
  };

  const menuItems = [
    { 
      name: "Inicio", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      href: "/"
    },
    { 
      name: "Embarcación", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">  
          <circle cx="12" cy="12" r="10" />  <circle cx="12" cy="12" r="4" />  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />  <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        </svg>
      ),
      href: "/registros/expo"
    },
    { 
      name: "Usuarios", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      href: "/registros/foro"
    },
    { 
      name: "Perfil", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">  
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      href: "/perfil"
    },
    { 
      name: "Cerrar sesión", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">  
          <path stroke="none" d="M0 0h24v24H0z"/>  
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  
          <path d="M20 12h-13l3 -3m0 6l-3 -3" />
        </svg>
      ),
      href: "/logout",
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">  
      <path stroke="none" d="M0 0h24v24H0z"/>  
      <line x1="20" y1="6" x2="9" y2="6" />  
      <line x1="20" y1="12" x2="13" y2="12" />  
      <line x1="20" y1="18" x2="9" y2="18" />  
      <path d="M4 8l4 4l-4 4" />
    </svg>
  );

  const OpenIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">  
      <path stroke="none" d="M0 0h24v24H0z"/>  
      <line x1="4" y1="6" x2="20" y2="6" />  
      <line x1="4" y1="12" x2="20" y2="12" />  
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );

  const CustomIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
      <path stroke="none" d="M0 0h24v24H0z"/>  
      <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />  
      <circle cx="12" cy="6" r="3" />
    </svg>
  );

  // Estilos mejorados sin conflictos
  const getItemStyle = (isActive, isMenuOpen) => {
    const baseStyle = {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      color: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: 'transparent',
      marginTop: '8px',
      marginBottom: '8px',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }
    };

    const activeStyle = isActive ? {
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fontWeight: '500'
    } : {};

    const closedStyle = !isMenuOpen ? {
      width: '44px',
      borderRadius: '50%',
      justifyContent: 'center',
      padding: '12px',
      marginLeft: 'auto',
      marginRight: 'auto'
    } : {
      width: '100%',
      borderRadius: '8px',
      justifyContent: 'flex-start'
    };

    return { ...baseStyle, ...activeStyle, ...closedStyle };
  };

  return (
    <>
      {isMobile && !isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: '#168284',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
          onClick={toggleMenu}
        >
          <OpenIcon />
        </div>
      )}

      <div 
        style={{
          backgroundColor: '#168284',
          background: 'linear-gradient(135deg, #168284 0%, #1a9b9e 100%)',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 12px',
          justifyContent: 'space-between',
          position: isMobile ? 'fixed' : 'relative',
          zIndex: 999,
          transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease, width 0.3s ease',
          width: isOpen ? '240px' : '68px'
        }}
      >
        <div style={{ width: '100%' }}>
          <div 
            onClick={toggleMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isOpen ? 'flex-start' : 'center',
              width: isOpen ? '100%' : '44px',
              padding: '12px',
              cursor: 'pointer',
              marginBottom: '8px',
              borderRadius: '8px',
              marginLeft: isOpen ? '0' : 'auto',
              marginRight: isOpen ? '0' : 'auto',
              ':hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onMouseEnter={() => !isOpen && setHoveredItem('Menú')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <CustomIcon />
              {!isOpen && hoveredItem === 'Menú' && (
                <div style={{
                  position: 'absolute',
                  left: '50px',
                  backgroundColor: '#1a9b9e',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  zIndex: 1000,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  Menú
                </div>
              )}
            </span>
            {isOpen && (
              <span style={{ 
                color: '#fff', 
                marginLeft: '12px', 
                fontWeight: 'bold', 
                fontSize: '1.1rem',
                whiteSpace: 'nowrap'
              }}>
                Turismo Nautico
              </span>
            )}
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <li
              onClick={toggleMenu}
              style={getItemStyle(false, isOpen)}
              onMouseEnter={() => !isOpen && setHoveredItem('Cerrar menú')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginRight: isOpen ? '12px' : '0',
                position: 'relative'
              }}>
                {isOpen ? <CloseIcon /> : <OpenIcon />}
                {!isOpen && hoveredItem === 'Cerrar menú' && (
                  <div style={{
                    position: 'absolute',
                    left: '50px',
                    backgroundColor: '#1a9b9e',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    Cerrar menú
                  </div>
                )}
              </span>
              {isOpen && <span>Cerrar menú</span>}
            </li>

            {menuItems.slice(0, 3).map((item) => (
              <li
                key={item.name}
                onClick={(e) => handleItemClick(item.name, item.href, e)}
                style={getItemStyle(activeItem === item.name, isOpen)}
                onMouseEnter={() => !isOpen && setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a 
                  href={item.href}
                  onClick={(e) => handleItemClick(item.name, item.href, e)}
                  style={{ 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center',
                    width: '100%',
                    color: 'inherit'
                  }}
                >
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginRight: isOpen ? '12px' : '0',
                    position: 'relative'
                  }}>
                    {item.icon}
                    {!isOpen && hoveredItem === item.name && (
                      <div style={{
                        position: 'absolute',
                        left: '50px',
                        backgroundColor: '#1a9b9e',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        zIndex: 1000,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}>
                        {item.name}
                      </div>
                    )}
                  </span>
                  {isOpen && <span>{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ width: '100%' }}>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {menuItems.slice(3).map((item) => (
              <li
                key={item.name}
                onClick={(e) => handleItemClick(item.name, item.href, e)}
                style={getItemStyle(activeItem === item.name, isOpen)}
                onMouseEnter={() => !isOpen && setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a 
                  href={item.href}
                  onClick={(e) => handleItemClick(item.name, item.href, e)}
                  style={{ 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center',
                    width: '100%',
                    color: 'inherit'
                  }}
                >
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginRight: isOpen ? '12px' : '0',
                    position: 'relative'
                  }}>
                    {item.icon}
                    {!isOpen && hoveredItem === item.name && (
                      <div style={{
                        position: 'absolute',
                        left: '50px',
                        backgroundColor: '#1a9b9e',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        zIndex: 1000,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}>
                        {item.name}
                      </div>
                    )}
                  </span>
                  {isOpen && <span>{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}