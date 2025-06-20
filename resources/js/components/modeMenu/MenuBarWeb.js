import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Iconos from "../Iconos";
import axios from "axios";

export default function MenuBarWeb({ userData, currentPath, darkMode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    const colors = {
        light: {
            menuBackground: 'rgba(255, 255, 255, 0.9)', // Ya tiene opacidad
            textColor: '#168284',
            activeTextColor: '#168284',
            hoverTooltip: '#f0f9f9',
            iconColor: '#168284',
            activeBg: '#C9DFE1',
            hoverBg: 'rgba(22, 130, 132, 0.08)',
            shadow: '0 2px 8px rgba(0,0,0,0.05)'
        },
        dark: {
            menuBackground: 'rgba(30, 30, 30, 0.9)', // Ya tiene opacidad
            textColor: 'rgba(255, 255, 255, 0.8)',
            activeTextColor: '#ffffff',
            hoverTooltip: '#2a2a2a',
            iconColor: 'rgba(255, 255, 255, 0.8)',
            activeBg: 'rgba(255, 255, 255, 0.2)',
            hoverBg: 'rgba(255, 255, 255, 0.1)',
            shadow: '0 2px 5px rgba(0,0,0,0.2)'
        }
    };

    const currentColors = darkMode ? colors.dark : colors.light;

    const [activeItem, setActiveItem] = useState(() => {
        if (currentPath.includes('usuarios')) return 'Usuarios';
        if (currentPath.includes('perfil')) return 'Perfil';
        return 'Inicio';
    });

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

    const mainItems = [
        { name: "Inicio", icon: <Iconos.home />, href: "/" },
        { name: "Usuarios", icon: <Iconos.users />, href: "/usuarios" }
    ];

    const profileItems = [
        { name: "Perfil", icon: <Iconos.profile />, href: "/perfil" },
        { name: "Cerrar sesión", icon: <Iconos.logout />, href: "/logout", onClick: handleLogout }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const getItemStyle = (isActive) => ({
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        color: currentColors.textColor,
        backgroundColor: isActive ? currentColors.activeBg : 'transparent',
        margin: '8px auto', // Cambiado a 'auto' para centrar
        borderRadius: isOpen ? '8px' : '50%',
        width: isOpen ? 'calc(100% - 24px)' : '44px',
        justifyContent: 'center', // Siempre centrado
        ':hover': {
            backgroundColor: currentColors.hoverBg
        }
    });

    return (
        <>
            <div style={{
                backgroundColor: currentColors.menuBackground, // Ya tiene opacidad
                boxShadow: currentColors.shadow,
                height: '97vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                padding: isOpen ? '4vh 12px 2vh 12px' : '4vh 0', // Ajustado el padding
                margin: '20px 0 0 20px',
                borderRadius: '8px',
                top: 0,
                left: 0,
                zIndex: 999,
                width: isOpen ? '240px' : '68px',
                overflowY: 'auto'
            }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div 
                        onClick={toggleMenu}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isOpen ? 'flex-start' : 'center',
                            width: isOpen ? '100%' : '44px',
                            cursor: 'pointer',
                            marginBottom: '4vh',
                            padding: isOpen ? '0 12px' : '0',
                            ':hover': {
                                backgroundColor: currentColors.hoverBg
                            }
                        }}
                    >
                        <Iconos.anchor width="30" height="30" stroke={currentColors.iconColor} style={{ stroke: currentColors.iconColor }} />
                        {isOpen && (
                            <span style={{ 
                                color: currentColors.activeTextColor, 
                                marginLeft: '12px', 
                                fontWeight: 'bold', 
                                fontSize: '1.1rem'
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
                        alignItems: 'center'
                    }}>
                        {mainItems.map((item) => (
                            <li
                                key={item.name}
                                onClick={(e) => handleItemClick(item.name, item.href, e)}
                                style={getItemStyle(activeItem === item.name)}
                                onMouseEnter={() => !isOpen && setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <a href={item.href} style={{ 
                                    textDecoration: 'none', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: 'inherit',
                                    justifyContent: isOpen ? 'flex-start' : 'center',
                                    width: '100%'
                                }}>
                                    <span style={{ marginRight: isOpen ? '12px' : '0' }}>
                                        {React.cloneElement(item.icon, { 
                                            width: "20", 
                                            height: "20",
                                            stroke: activeItem === item.name ? currentColors.activeTextColor : currentColors.iconColor
                                        })}
                                    </span>
                                    {isOpen && <span>{item.name}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <ul style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        {profileItems.map((item) => (
                            <li
                                key={item.name}
                                onClick={(e) => item.onClick ? item.onClick(e) : handleItemClick(item.name, item.href, e)}
                                style={getItemStyle(activeItem === item.name)}
                                onMouseEnter={() => !isOpen && setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <a href={item.href} style={{ 
                                    textDecoration: 'none', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: 'inherit',
                                    justifyContent: isOpen ? 'flex-start' : 'center',
                                    width: '100%'
                                }}>
                                    <span style={{ marginRight: isOpen ? '12px' : '0' }}>
                                        {React.cloneElement(item.icon, { 
                                            width: "20", 
                                            height: "20",
                                            stroke: activeItem === item.name ? currentColors.activeTextColor : currentColors.iconColor
                                        })}
                                    </span>
                                    {isOpen && <span>{item.name}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Tooltips */}
            {!isOpen && hoveredItem && (
                <div style={{
                    position: 'fixed',
                    left: '88px',
                    backgroundColor: currentColors.hoverTooltip,
                    color: currentColors.textColor,
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    zIndex: 9999,
                    boxShadow: currentColors.shadow
                }}>
                    {hoveredItem}
                </div>
            )}
        </>
    );
}