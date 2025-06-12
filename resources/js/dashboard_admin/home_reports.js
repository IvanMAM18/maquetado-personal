import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import DashboardHome from "./pages/dashboardHome";
import Embarcaciones from "./pages/embarcaciones";
import EmbarcacionesCarruselA from "./pages/embarcacionesCarruselA";
import EmbarcacionesCarruselB from "./pages/embarcacionesCarruselB";
import Perfil from "./pages/perfil";
import Usuarios from "./pages/usuarios";

// Componente para obtener el título de la página actual
function PageTitle() {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('embarcaciones')) return 'Embarcaciones';
    if (path.includes('embarcacionesCarruselA')) return 'Embarcaciones Carrusel A';
    if (path.includes('embarcacionesCarruselB')) return 'Embarcaciones Carrusel B';
    if (path.includes('usuarios')) return 'Usuarios';
    if (path.includes('perfil')) return 'Perfil';
    return 'Inicio';
  };

  return <span style={{ marginRight: '15px', fontWeight: '500' }}>BIenvenido a {getPageTitle()}</span>;
}

export default function CardReports() {
    const [userData, setUserData] = useState(null);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    
    const checkUser = async () => {
        try {
            const response = await axios.get("/user");
            setUserData(response.data.user);
        } catch (error) {
            console.error("Error fetching user:", error);
            if (error.response?.status === 401) {
                window.location = '/entrar';
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const handleMenuToggle = (collapsed) => {
        setIsMenuCollapsed(collapsed);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: darkMode ? '#121212' : '#f5f7fa',
                color: darkMode ? '#fff' : '#333'
            }}>
                Cargando dashboard...
            </div>
        );
    }

    return (
        <Router basename="/home">
            <div style={{ 
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: darkMode ? '#121212' : '#f5f7fa',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Fondo con patrón SVG similar al login */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='${darkMode ? '%23ffffff' : '%23000000'}' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2' /%3E%3Ccircle cx='12' cy='6' r='3' /%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px',
                    backgroundRepeat: 'repeat',
                    opacity: 0.05,
                    zIndex: 0
                }}></div>
                
                {/* SVG central animado */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity: 0.1
                }}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" strokeWidth="3" 
                         stroke={darkMode ? '#ffffff' : '#000000'} fill="none" 
                         style={{ animation: 'pulse 15s infinite alternate' }}>
                        <path stroke="none" d="M0 0h24v24H0z"/>  
                        <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />  
                        <circle cx="12" cy="6" r="3" />
                    </svg>
                </div>
                
                {/* Contenido principal */}
                <div style={{ 
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    width: '100%'
                }}>
                    <MenuBar userData={userData} onToggle={handleMenuToggle} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    
                    <div style={{ 
                        flex: 1,
                        padding: '20px',
                        width: '100%',
                        transition: 'margin-left 0.3s ease',
                        overflowX: 'hidden',
                    }}>
                        {/* Barra superior */}
                        <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 20px',
                            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            marginBottom: '20px',
                            color: darkMode ? '#fff' : '#333'
                        }}>
                            <PageTitle />
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <button onClick={toggleDarkMode} style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    color: darkMode ? '#fff' : '#333'
                                }}>
                                    {darkMode ? (
                                        <>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            Modo claro
                                        </>
                                    ) : (
                                        <>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                            Modo oscuro
                                        </>
                                    )}
                                </button>
                                
                                {userData && (
                                    <span style={{ 
                                        color: darkMode ? '#fff' : '#333',
                                        fontWeight: '500'
                                    }}>
                                        {userData.name}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Contenedor de rutas */}
                        <div style={{
                            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            padding: '20px',
                            width: '100%',
                            minHeight: '90vh',
                            color: darkMode ? '#fff' : '#333'
                        }}>
                            <Routes>
                                <Route path="/" element={<Embarcaciones darkMode={darkMode} />} />
                                <Route path="/embarcaciones_carrusel_A" element={<EmbarcacionesCarruselA darkMode={darkMode} />} />
                                <Route path="/embarcaciones_carrusel_B" element={<EmbarcacionesCarruselB darkMode={darkMode} />} />
                                <Route path="/perfil" element={<Perfil darkMode={darkMode} />} />
                                <Route path="/usuarios" element={<Usuarios darkMode={darkMode} />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                
                {/* Estilos CSS para la animación */}
                <style>
                    {`
                    @keyframes pulse {
                        0% {
                            opacity: 0.05;
                            transform: translate(-50%, -50%) rotate(0deg);
                        }
                        100% {
                            opacity: 0.15;
                            transform: translate(-50%, -50%) rotate(5deg);
                        }
                    }
                    `}
                </style>
            </div>
        </Router>
    );
}

if (document.getElementById("cardReports")) {
    ReactDOM.render(<CardReports />, document.getElementById("cardReports"));
}