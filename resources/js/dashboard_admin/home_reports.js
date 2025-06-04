import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Verifica que estos componentes existan en las rutas especificadas
import MenuBar from "../components/MenuBar"; // Asegura esta ruta
import DashboardHome from "./pages/dashboardHome";
import Embarcaciones from "./pages/embarcaciones";
import Perfil from "./pages/perfil";
import Usuarios from "./pages/usuarios";

export default function CardReports() {
    
    const [userData, setUserData] = useState(null);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const checkUser = async () => {
        try {
            const response = await axios.get("/user"); // Cambiado a /api/user
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

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f7fa'
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
                backgroundColor: '#f5f7fa',
                width: '100%'
            }}>
                <MenuBar userData={userData} onToggle={handleMenuToggle} />
                
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
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        padding: '10px 20px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        marginBottom: '20px'
                    }}>
                        {userData && (
                            <span style={{ 
                                marginRight: '15px',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                {userData.name}
                            </span>
                        )}
                        <a href="/logout" style={{
                            color: '#e74c3c',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            ':hover': {
                                textDecoration: 'underline'
                            }
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">  
                                <path stroke="none" d="M0 0h24v24H0z"/>  
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  
                                <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                            </svg>
                            Cerrar Sesión
                        </a>
                    </div>
                    
                    {/* Contenedor de rutas */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        padding: '20px',
                        width: '100%',
                        minHeight: '90vh'
                    }}>
                        <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="/embarcaciones" element={<Embarcaciones />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        {/* Maneja rutas no encontradas */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

if (document.getElementById("cardReports")) {
    ReactDOM.render(<CardReports />, document.getElementById("cardReports"));
}

