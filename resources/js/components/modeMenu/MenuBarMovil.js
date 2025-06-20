import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Iconos from "../Iconos";
import axios from "axios";

export default function MenuBarMovil({ userData, currentPath, darkMode }) {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

    const colors = {
        light: {
            menuBackground: 'rgba(255, 255, 255, 0.95)',
            textColor: '#168284',
            activeTextColor: '#168284',
            activeBg: '#C9DFE1',
            hoverBg: 'rgba(22, 130, 132, 0.08)',
            shadow: '0 -2px 8px rgba(0,0,0,0.1)',
            buttonCancel: '#e0e0e0',
            buttonConfirm: '#ff6b6b',
            iconColor: '#168284' // Color específico para iconos en modo claro
        },
        dark: {
            menuBackground: 'rgba(30, 30, 30, 0.95)',
            textColor: 'rgba(255, 255, 255, 0.8)',
            activeTextColor: '#ffffff',
            activeBg: 'rgba(255, 255, 255, 0.2)',
            hoverBg: 'rgba(255, 255, 255, 0.1)',
            shadow: '0 -2px 5px rgba(0,0,0,0.2)',
            buttonCancel: '#424242',
            buttonConfirm: '#d32f2f',
            iconColor: 'rgba(255, 255, 255, 0.8)' // Color específico para iconos en modo oscuro
        }
    };

    const currentColors = darkMode ? colors.dark : colors.light;

    const [activeItem, setActiveItem] = useState(() => {
        if (currentPath.includes('usuarios')) return 'Usuarios';
        if (currentPath.includes('perfil')) return 'Perfil';
        return 'Inicio';
    });

    const handleItemClick = (itemName, href) => {
        setActiveItem(itemName);
        navigate(href);
    };

    const handleLogout = async () => {
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

    const items = [
        { name: "Inicio", icon: <Iconos.anchor />, href: "/" },
        { name: "Usuarios", icon: <Iconos.users />, href: "/usuarios" },
        { name: "Perfil", icon: <Iconos.profile />, href: "/perfil" },
        { name: "Cerrar", icon: <Iconos.logout />, onClick: () => setShowLogoutConfirm(true) }
    ];

    return (
        <>
            <div style={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                right: '0',
                backgroundColor: currentColors.menuBackground,
                boxShadow: currentColors.shadow,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '15px 0',
                zIndex: 100,
                borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                height: '60px', // Altura fija para el menú
                marginTop: '60px'
                }}>
                {items.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => item.onClick ? item.onClick() : handleItemClick(item.name, item.href)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            backgroundColor: activeItem === item.name ? currentColors.activeBg : 'transparent',
                            transition: 'all 0.2s ease',
                            width: '44px',
                            height: '44px',
                            justifyContent: 'center',
                            ':hover': {
                                backgroundColor: currentColors.hoverBg
                            }
                        }}
                    >
                        {React.cloneElement(item.icon, {
                            width: "24",
                            height: "24",
                            style: {
                                ...item.icon.props.style, // Conserva los estilos originales si los hay
                                stroke: activeItem === item.name ? currentColors.activeTextColor : currentColors.iconColor,
                                transition: 'stroke 0.2s ease' // Opcional: para una transición suave
                            }
                        })}
                    </div>
                ))}
            </div>

            {/* Confirmación de logout */}
            {showLogoutConfirm && (
                <div style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    backgroundColor: currentColors.menuBackground,
                    boxShadow: currentColors.shadow,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '12px 0',
                    zIndex: 100,
                    borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px'
                  }}>
                    <h3 style={{ marginBottom: '20px', color: currentColors.textColor }}>
                        ¿Está seguro de cerrar sesión?
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button 
                            onClick={() => setShowLogoutConfirm(false)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: currentColors.buttonCancel,
                                color: darkMode ? currentColors.textColor : '#333',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: currentColors.buttonConfirm,
                                color: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}