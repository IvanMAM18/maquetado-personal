import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function MenuBar({ userData, onToggle, darkMode, toggleDarkMode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [activeItem, setActiveItem] = useState(() => {
        const path = location.pathname;
        if (path.includes('embarcaciones')) return 'Embarcación';
        if (path.includes('embarcacionesCarruselA')) return 'EmbarcaciónCarruselA';
        if (path.includes('embarcacionesCarruselB')) return 'EmbarcaciónCarruselB';
        if (path.includes('usuarios')) return 'Usuarios';
        if (path.includes('perfil')) return 'Perfil';
        return 'Inicio';
    });

    const colors = {
        light: {
            menuBackground: '#ffffff',            
            menuGradient: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(244, 244, 244) 100%)',     
            textColor: '#168284',                  
            activeTextColor: '#168284',            
            hoverTooltip: '#f0f9f9',                
            iconColor: '#168284',                
            activeBg: '#C9DFE1',                    
            hoverBg: 'rgba(22, 130, 132, 0.08)',  
            shadow: '0 2px 8px rgba(0,0,0,0.05)'
        },
        dark: {
            menuBackground: '#1e1e1e',
            menuGradient: 'linear-gradient(135deg, #1e1e1e 0%, #1E1E1E 100%)',
            textColor: 'rgba(255, 255, 255, 0.8)',
            activeTextColor: '#ffffff',
            hoverTooltip: '#2a2a2a',
            iconColor: '#ffffff',
            activeBg: 'rgba(255, 255, 255, 0.2)',
            hoverBg: 'rgba(255, 255, 255, 0.1)',
            shadow: '0 2px 5px rgba(0,0,0,0.2)'
        }
    };

    const currentColors = darkMode ? colors.dark : colors.light;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setIsOpen(true);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('embarcaciones')) setActiveItem('Embarcación');
        else if (path.includes('embarcacionesCarruselA')) setActiveItem('EmbarcaciónCarruselA');
        else if (path.includes('embarcacionesCarruselB')) setActiveItem('EmbarcaciónCarruselB');
        else if (path.includes('usuarios')) setActiveItem('Usuarios');
        else if (path.includes('perfil')) setActiveItem('Perfil');
        else setActiveItem('Inicio');
    }, [location.pathname]);

    const handleItemClick = (itemName, href, e) => {
        e.preventDefault();
        setActiveItem(itemName);
        navigate(href);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/logout');
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/entrar';
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            window.location.href = '/entrar';
        }
    };

    const HomeIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={currentColors.iconColor} strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    );

    const BoatIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={currentColors.iconColor} strokeWidth="2">  
            <circle cx="12" cy="12" r="10" />  
            <circle cx="12" cy="12" r="4" />  
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />  
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />  
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />  
            <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />  
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        </svg>
    );

    const UsersIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke={currentColors.iconColor} fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
    );

    const ProfileIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={currentColors.iconColor} strokeWidth="2">  
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  
            <circle cx="12" cy="7" r="4" />
        </svg>
    );

    const LogoutIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke={currentColors.iconColor} fill="none">  
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  
            <path d="M20 12h-13l3 -3m0 6l-3 -3" />
        </svg>
    );

    const mainItems = [
        { name: "Inicio", icon: <HomeIcon />, href: "/" },
        { name: "Embarcaciónes Carrusel A", icon: <BoatIcon />, href: "/embarcaciones_carrusel_A" },
        { name: "Embarcaciónes Carrusel B", icon: <BoatIcon />, href: "/embarcaciones_carrusel_B" },
        { name: "Usuarios", icon: <UsersIcon />, href: "/usuarios" }
    ];

    const profileItems = [
        { name: "Perfil", icon: <ProfileIcon />, href: "/perfil" },
        { name: "Cerrar sesión", icon: <LogoutIcon />, href: "/logout", onClick: handleLogout }
    ];

    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggle) onToggle(!newState);
    };

    const CloseIcon = () => (
        <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke={currentColors.iconColor} fill="none">  
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <line x1="20" y1="6" x2="13" y2="6" />  
            <line x1="20" y1="12" x2="11" y2="12" />  
            <line x1="20" y1="18" x2="13" y2="18" />  
            <path d="M8 8l-4 4l4 4" />
        </svg>
    );

    const OpenIcon = () => (
        <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke={currentColors.iconColor} fill="none">  
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <line x1="4" y1="6" x2="20" y2="6" />  
            <line x1="4" y1="12" x2="20" y2="12" />  
            <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
    );

    const CustomIcon = () => (
        <svg width="30" height="30" viewBox="0 0 24 24" strokeWidth="3" stroke={currentColors.iconColor} fill="none">  
            <circle cx="12" cy="5" r="3" />  
            <line x1="12" y1="22" x2="12" y2="8" />  
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
    );

    const getItemStyle = (isActive, isMenuOpen) => {
        const baseStyle = {
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            color: currentColors.textColor,
            backgroundColor: 'transparent',
            marginTop: '8px',
            marginBottom: '8px',
            ':hover': {
                backgroundColor: currentColors.hoverBg
            }
        };

        const activeStyle = isActive ? {
            color: currentColors.activeTextColor,
            backgroundColor: currentColors.activeBg,
            fontWeight: '500'
        } : {};

        const closedStyle = !isMenuOpen ? {
            width: '44px',
            borderRadius: '50%',
            justifyContent: 'center',
            padding: '12px',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative'
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
                        backgroundColor: currentColors.menuBackground,
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: currentColors.shadow,
                        cursor: 'pointer',
                    }}
                    onClick={toggleMenu}
                >
                    <OpenIcon />
                </div>
            )}

            <div 
                style={{
                    backgroundColor: currentColors.menuBackground,
                    background: currentColors.menuGradient,
                    boxShadow: currentColors.shadow,
                    height: '95.8vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: isMobile ? 'fixed' : 'sticky',
                    padding: isOpen ? '4vh 2vh 2vh 2vh' : '0',
                    margin: '20px 0 0 20px',
                    borderRadius: '8px',
                    top: 0,
                    left: 0,
                    zIndex: 999,
                    transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
                    transition: 'transform 0.3s ease, width 0.3s ease',
                    width: isOpen ? '240px' : '68px',
                    overflowY: 'auto'
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
                            cursor: 'pointer',
                            marginBottom: '4vh',
                            marginTop: isOpen ? '0' : '4vh',
                            borderRadius: '8px',
                            marginLeft: isOpen ? '0' : 'auto',
                            marginRight: isOpen ? '0' : 'auto',
                            ':hover': {
                                backgroundColor: currentColors.hoverBg
                            }
                        }}
                        onMouseEnter={() => !isOpen && setHoveredItem('Menú')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <CustomIcon />
                        </span>
                        {isOpen && (
                            <span style={{ 
                                color: currentColors.activeTextColor, 
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
                        marginBottom: '8px'
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
                            }}>
                                {isOpen ? <CloseIcon /> : <OpenIcon />}
                            </span>
                            {isOpen && <span style={{ color: currentColors.textColor }}>Cerrar menú</span>}
                        </li>

                        {mainItems.map((item, index) => (
                            <li
                                key={item.name}
                                onClick={(e) => handleItemClick(item.name, item.href, e)}
                                style={getItemStyle(activeItem === item.name, isOpen)}
                                onMouseEnter={() => !isOpen && setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <a 
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleItemClick(item.name, item.href, e);
                                    }}
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
                                    }}>
                                        {item.icon}
                                    </span>
                                    {isOpen && <span style={{ color: currentColors.textColor }}>{item.name}</span>}
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
                        {profileItems.map((item, index) => (
                            <li
                                key={item.name}
                                onClick={(e) => item.onClick ? item.onClick(e) : handleItemClick(item.name, item.href, e)}
                                style={getItemStyle(activeItem === item.name, isOpen)}
                                onMouseEnter={() => !isOpen && setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <a 
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (item.onClick) {
                                            item.onClick(e);
                                        } else {
                                            handleItemClick(item.name, item.href, e);
                                        }
                                    }}
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
                                    }}>
                                        {item.icon}
                                    </span>
                                    {isOpen && <span style={{ color: currentColors.textColor }}>{item.name}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Tooltips flotantes */}
            {!isOpen && hoveredItem === 'Menú' && (
                <div style={{
                    position: 'fixed',
                    left: '88px',
                    top: '5.5vh',
                    backgroundColor: currentColors.hoverTooltip,
                    color: currentColors.activeTextColor,
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    zIndex: 9999,
                    boxShadow: currentColors.shadow
                }}>
                    Menú
                </div>
            )}

            {!isOpen && hoveredItem === 'Cerrar menú' && (
                <div style={{
                    position: 'fixed',
                    left: '88px',
                    top: '13.5vh',
                    backgroundColor: currentColors.hoverTooltip,
                    color: currentColors.activeTextColor,
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    zIndex: 9999,
                    boxShadow: currentColors.shadow
                }}>
                    Abrir menú
                </div>
            )}

            {!isOpen && mainItems.map((item, index) => (
                hoveredItem === item.name && (
                    <div key={`tooltip-${item.name}`} style={{
                        position: 'fixed',
                        left: '88px',
                        top: `${18 + (index * 5)}vh`,
                        backgroundColor: currentColors.hoverTooltip,
                        color: currentColors.textColor,
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        zIndex: 9999,
                        boxShadow: currentColors.shadow,
                        pointerEvents: 'none'
                    }}>
                        {item.name}
                    </div>
                )
            ))}

            {!isOpen && profileItems.map((item, index) => (
                hoveredItem === item.name && (
                    <div key={`tooltip-${item.name}`} style={{
                        position: 'fixed',
                        left: '88px',
                        top: `${67.5 + (mainItems.length * 5) + (index * 5)}vh`,
                        backgroundColor: currentColors.hoverTooltip,
                        color: currentColors.textColor,
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        zIndex: 9999,
                        boxShadow: currentColors.shadow,
                        pointerEvents: 'none'
                    }}>
                        {item.name}
                    </div>
                )
            ))}
        </>
    );
}