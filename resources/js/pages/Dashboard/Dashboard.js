import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import UserState from "../../context/User/UserState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import Registros from "./Registros";
import Oradores from "./Oradores";
import MenuBar from "../../components/MenuBar";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    
    const checkUser = async () => {
        try {
            const response = await axios.get("/user");
            setUserData(response.data.user);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                window.location = '/entrar';
            }
        }
    };

    useLayoutEffect(() => {
        checkUser();
    }, []);

    return (
        <UserState>
            <Router basename="/dashboard">
                <div className="dashboard-layout">
                    {/* Menú principal moderno */}
                    <MenuBar userData={userData} />
                    
                    {/* Contenido principal */}
                    <main className="main-content">
                        {/* Barra superior con info de usuario */}
                        <div className="top-right_info">
                            {userData && (
                                <span className="user_info">
                                    {userData.name}
                                </span>
                            )}
                            <a href="/logout" className="cerrar_sesion">
                                Cerrar Sesión
                            </a>
                        </div>

                        {/* Rutas */}
                        <Routes>
                            <Route path="/" exact element={<DashboardHome />} />
                            <Route path="registros">
                                <Route path="expo" element={<Registros eventType="expo" />} />
                                <Route path="foro" element={<Registros eventType="foro" />} />
                            </Route>
                            <Route path="/oradores" element={<Oradores />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </UserState>
    );
}

if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}