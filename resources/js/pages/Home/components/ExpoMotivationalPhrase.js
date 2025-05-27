import React from "react";
import { NavLink } from "react-router-dom";

export default function ExpoMotivationalPhrase() {
    return (
        <div className="frase-motivacional">
            <div className="steve-photo">
                <img src="assets/images/2024/FRASE-DE-EXITO.png" alt="éxito" />
            </div>
            
            <div>
                <div id="time-counter2"></div>
                <NavLink
                    to="/registro-foro-emprendedores"//Puede ser foro o expo
                    title="Registro Foro Emprendedores"
                >
                    Regístrate
                </NavLink>
            </div>
            <p>Si lo dejas una vez, se convierte en un hábito. No lo dejes nunca.</p>
            <p>No lo dejes nunca.</p>
        </div>
    );
}
