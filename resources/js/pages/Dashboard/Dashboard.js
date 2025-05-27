import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import UserState from "../../context/User/UserState";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";

import DashboardHome from "./DashboardHome";
import Registros from "./Registros";
import Oradores from "./Oradores";

export default function Dashboard() {
    let token = null;
    const [user_data, setUserData] = useState(null);
    const checkUser = async () => {
        await axios
            .get("/user")
            .then((response) => {
                token = response.config.headers["X-XSRF-TOKEN"];
                // console.log(response.data.user);
                setUserData(response.data.user);
            })
            .catch((error) => console.log(error));
    };
    useLayoutEffect(() => {
        checkUser();
    }, []);

    return (
        <>
            <UserState>
                <Router basename="/dashboard">
                    <nav className="aside-links " id="dashboard-aside-links">
                        <span className="dash-toggler">
                            <span className="icon">
                                <i className="fas fa-angle-right"></i>
                            </span>
                        </span>
                        <div className="dashboardnavwrapper">
                            <div className="logo py-3 px-3">
                                <a
                                    className="navbar-brand"
                                    href="/"
                                    title="Página inicial"
                                >
                                    <img
                                        src="/assets/images/ideas.png"
                                        alt="logo"
                                    />
                                </a>
                                <span>
                                    <span>Emprendedores</span>
                                </span>
                            </div>
                            <div
                                id="dashboardNavigation"
                                className="dash-navigation py-5"
                            >
                                <a
                                    className="navbar-brand"
                                    href="/"
                                    title="Página inicial"
                                >
                                    <i className="fas fa-home"></i> Inicio
                                </a>
                                {/* <NavLink
                                    to="/"
                                    title="Registros Expo Emprendedores"
                                >
                                    <i className="fas fa-tachometer-alt"></i>{" "}
                                    Dashboard
                                </NavLink> */}
                                <NavLink
                                    to="/registros/expo"
                                    title="Registros Expo Emprendedores"
                                >
                                    <i className="fas fa-file-invoice"></i>{" "}
                                    Registros Expo
                                </NavLink>
                                <NavLink
                                    to="/registros/foro"
                                    title="Registros Expo Emprendedores"
                                >
                                    <i className="fas fa-file-invoice"></i>{" "}
                                    Registros Foro
                                </NavLink>
                                {/* <NavLink to="/" title="Oradores Expo Emprendedores">Oradores</NavLink> */}
                            </div>
                        </div>
                    </nav>
                    <main>
                        <div className="top-right_info">
                            {user_data && (
                                <span className="user_info">
                                    {user_data.name}
                                </span>
                            )}
                            <a href="/logout" className="cerrar_sesion">
                                Cerrar Sesión
                            </a>
                        </div>

                        <Routes>
                            {/* <Route path="/" exact element={<DashboardHome />} /> */}
                            {/* <Route
                                path="/:page_name"
                                element={<InternalPage />}
                            /> */}
                            <Route path="registros">
                                <Route path="expo" element={<Registros eventType="expo" />} />
                                <Route path="foro" element={<Registros eventType="foro" />} />
                            </Route>
                            <Route path="/oradores" element={<Oradores />} />
                        </Routes>
                    </main>
                </Router>
            </UserState>
        </>
    );
}

$(document).ready(() => {
    if (document.getElementById("dashboard-aside-links")) {
        $("#dashboard-aside-links .dash-toggler").on("click", () => {
            $("#dashboard-aside-links").toggleClass("show-side-bar");
            $(".dashboard-layout > nav.aside-links .dash-toggler").toggleClass(
                "dash-sidebar-open"
            );
        });
    }
});
if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
