import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Divider, Button, Tabs } from 'antd';
import axios from 'axios';

const { TabPane } = Tabs;

export default function DashboardHome({ eventType = 'expo' }) {
    const [stats, setStats] = useState({
        expo: { total: 0 },
        foro: { total: 0 }
    });
    const [activeTab, setActiveTab] = useState(eventType);

    useEffect(() => {
        // Cargar datos para ambos eventos
        const fetchData = async () => {
            try {
                const [expoRes, foroRes] = await Promise.all([
                    axios.get('/dashboard_get_registrados_totales_expo'),
                    axios.get('/dashboard_get_registrados_totales_foro')
                ]);
                
                setStats({
                    expo: { total: expoRes.data },
                    foro: { total: foroRes.data }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Panel de control</h1>
            <Divider />
            
            <Tabs 
                activeKey={activeTab} 
                onChange={handleTabChange}
                centered
            >
                <TabPane tab="Expo Emprendedores" key="expo">
                    <Descriptions title="Estadísticas Expo Emprendedores" bordered>
                        <Descriptions.Item label="Personas registradas">
                            {stats.expo.total}
                        </Descriptions.Item>
                        <Descriptions.Item label="Descargar registros">
                            <Button 
                                href='/dashboard_get_registrados_csv_expo'
                                type="primary"
                                style={{ marginRight: 8 }}
                            >
                                Descargar CSV
                            </Button>
                            <Button 
                                href='/registros/expo'
                                type="default"
                            >
                                Ver registros
                            </Button>
                        </Descriptions.Item>
                    </Descriptions>
                </TabPane>
                
                <TabPane tab="Foro Emprendedores" key="foro">
                    <Descriptions title="Estadísticas Foro Emprendedores" bordered>
                        <Descriptions.Item label="Personas registradas">
                            {stats.foro.total}
                        </Descriptions.Item>
                        <Descriptions.Item label="Descargar registros">
                            <Button 
                                href='/dashboard_get_registrados_csv_foro'
                                type="primary"
                                style={{ marginRight: 8 }}
                            >
                                Descargar CSV
                            </Button>
                            <Button 
                                href='/registros/foro'
                                type="default"
                            >
                                Ver registros
                            </Button>
                        </Descriptions.Item>
                    </Descriptions>
                </TabPane>
            </Tabs>
            
            <Divider />
            <p style={{ textAlign: 'center', color: '#888' }}>
                Selecciona la pestaña para ver las estadísticas de cada evento
            </p>
        </div>
    );
}