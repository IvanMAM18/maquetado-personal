import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';

export default function DocumentacionEmbarcacion() {

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <h1>Panel de documentacion embarcacion</h1>
            <p style={{ textAlign: 'center', color: '#888' }}>
                Selecciona la pestaña para ver las estadísticas de cada evento
            </p>
        </div>
    );
}