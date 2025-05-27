import React from "react";
import { NavLink } from "react-router-dom";

export default function ExpoConferences() {
    return (
        <div className="conferencias">
            <div className="section-header">
                <img
                    src="assets/images/2024/CONFERENCIAS.png"
                    alt="Conferencias"
                />
            </div>
            <div className="conferencias-content">
                <div>
                    <span>Emprendimiento de Mercados Emergentes</span>
                    <span> Dr. Luis Carlos Amador Betancourt</span>
                </div>
                <div>
                    <span>Resiliencia en el emprendimiento</span>
                    <span>Lic. Emanuel Singht • ICAVI México</span>
                </div>
                {/* <div>
                    <span>Marketing Experiencial</span>
                    <span></span>
                </div> */}
                <div>
                    <span>
                        Uso de las TICS y business analytics para medir el
                        servicio
                    </span>
                    <span>Dra. Mónica Adriana Carreño León • UABCS</span>
                </div>
                <div>
                    <span>Prestación de Servicio de atención al cliente</span>
                    <span>
                        Mtro. Mauricio Navarro • Centro de Evaluación y
                        capacitaciones ICAVI México
                    </span>
                </div>
                <div>
                    <span>Taller de modelos de negocios canvas</span>
                    <span>Mtro. Juan Jesús Álvarez Flores • UABCS</span>
                </div>
                <div>
                    <span>Cómo formar parte del Sector Agroindustrial con tus
                         Productos y Servicios
                    </span>
                    <span>Lic. Roxana Pratt Ceseña • Consejera Nacional de la 
                        Delegación La Paz del Sector Agroindustrial
                    </span>
                </div>
                <div>
                    <span>Dinámica y acceso al Centro de Negocios Municipal</span>
                    <span>MDE. Rosa Viridiana Angel Cota • Directora de Comercio</span>
                </div>
            </div>
            <div className="how-participate">
                <h3>
                    Descarga aquí documento del programa expo empredendor 2024
                </h3>
                <NavLink
                    to="assets/doc/ITINERARIO_EXPO_EMPRENDEDOR.pdf"
                    target="_blank"
                    download="ITINERARIO_EXPO_EMPRENDEDOR.pdf"
                >
                    Descargar
                </NavLink> 
            </div>
            <br/>
        </div>
    );
}
