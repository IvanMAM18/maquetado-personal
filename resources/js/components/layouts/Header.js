import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Header() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        
        // Limpiar el event listener al desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageUrl = windowWidth <= 768 
        ? "assets/images/foro2025/TABLOIDE FORO DEL EMPRENDEDOR 2025.jpg"
        : "assets/images/foro2025/CINTILLO-WEB.jpg";

    return (
        <>
        <div style={{ 
            width: "100%", 
            height: "20vh",
            background: "red",
            margin: 0, 
            padding: 0,
            position: "relative"
        }}>
            {/* <img
                src={imageUrl}
                alt="Foro emprendedores 2025"
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block"
                }}
            /> */}
        </div>
        </>
    );
}
if (document.getElementById("header_app")) {
    ReactDOM.render(<Header />, document.getElementById("header_app"));
}
