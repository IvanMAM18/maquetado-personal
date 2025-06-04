import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default function Embarcaciones() {
    const [userData, setUserData] = useState(null);
    return (
            <div style={{ width: '100%', padding: '20px', background: 'green' }}>
                <h1>Panel de control EMbarcaciones</h1>
                <p style={{ textAlign: 'center', color: '#888' }}>
                    Selecciona la pestaña para ver las estadísticas de cada evento
                </p>
            </div>
    );
}

