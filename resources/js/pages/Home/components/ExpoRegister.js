import React from "react";
import { NavLink } from "react-router-dom";

export default function ExpoRegister() {
    return (
        <div className="registro">
            <div className="register-button">
                <NavLink
                    to="/registro-foro-emprendedores"//Puede ser foro o expo
                    title="Registro Foro Emprendedores"
                >
                    Regístrate
                </NavLink>
                {/* <NavLink to="/#" title="Registro Expo Emprendedores">
                    Cupo agotado
                </NavLink> */}
            </div>
            <div id="time-counter2"></div>
        </div>
    );
}
