import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Divider, Button, Table, Input, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Option } = Select;

const giros_comerciales = [
    { name: "Artesanías.", id: 0 },
    { name: "Agricultura, Ganadería, Pesca, Caza y Minería.", id: 1 },
    { name: "Comercio.", id: 2 },
    { name: "Estudiante.", id: 3 },
    { name: "Información en medios masivos (tecnológicos).", id: 4 },
    { name: "Servicios Financieros y de Seguros.", id: 6 },
    { name: "Servicios Inmobiliarios.", id: 7 },
    { name: "Servicios Profesionales, Científicos y Técnicos.", id: 8 },
    { name: "Servicios Educativos.", id: 10 },
    { name: "Servicios de Salud y Assistencia Social.", id: 11 },
    { name: "Servicios de Esparcimiento, Cultural y Deportivo.", id: 12 },
    { name: "Servicios de Alojamiento Temporal y de Preparación de Alimentos y Bebidas.", id: 13 },
    { name: "Otros.", id: 14 },
];

export default function RegistrosDashboard({ eventType = 'expo' }) {
    const [stats, setStats] = useState({ expo: { total: 0 }, foro: { total: 0 } });
    const [registros, setRegistros] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [selectedYear, setSelectedYear] = useState(null);
    const params = useParams();
    const tipo = params.eventType || eventType;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre_empresa',
            key: 'nombre',
        },
        {
            title: 'Correo',
            dataIndex: 'correo',
            key: 'correo',
        },
        {
            title: 'Télefono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Giro',
            key: 'giro',
            render: (text, record) => {
                const giro = giros_comerciales.find(g => Number(record.giro) === g.id);
                return <span>{giro ? giro.name : 'Desconocido'}</span>;
            },
        },
        {
            title: 'Fecha de creación',
            dataIndex: 'created_at_formatted',
            key: 'created_at',
            render: (date) => {
                const options = {
                    timeZone: 'America/Mexico_City',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                return new Date(date).toLocaleDateString('es-MX', options);
            }
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [totalRes, registrosRes] = await Promise.all([
                    axios.get(tipo === 'foro' 
                        ? '/dashboard_get_registrados_totales_foro' 
                        : '/dashboard_get_registrados_totales_expo'),
                    axios.get(tipo === 'foro' 
                        ? '/dashboard_get_registrados_foro' 
                        : '/dashboard_get_registrados_expo')
                ]);

                setStats(prev => ({
                    ...prev,
                    [tipo]: { total: totalRes.data }
                }));

                const dataWithKeys = registrosRes.data
                    .map(r => ({ 
                        ...r, 
                        key: r.id,
                        created_at_formatted: r.created_at_formatted || new Date().toISOString()
                    }))
                    .sort((a, b) => b.id - a.id);
                
                setRegistros(dataWithKeys);
                setFilteredData(dataWithKeys);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tipo]);

    useEffect(() => {
        applyFilters();
    }, [searchText, selectedYear, registros]);

    const applyFilters = () => {
        let filtered = [...registros];

        // Filtro por texto
        if (searchText) {
            filtered = filtered.filter(item =>
                item.nombre_empresa.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Filtro por año (usando created_at_formatted)
        if (selectedYear) {
            filtered = filtered.filter(item => {
                try {
                    const fecha = new Date(item.created_at_formatted);
                    return fecha.getFullYear() === parseInt(selectedYear);
                } catch (e) {
                    console.error('Error al parsear fecha:', item.created_at_formatted);
                    return false;
                }
            });
        }

        setFilteredData(filtered);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    // Generar años del 2000 al 2025
    const generateYears = () => {
        const years = [];
        for (let year = 2025; year >= 2000; year--) {
            years.push(year.toString());
        }
        return years;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Panel de control - {tipo === 'foro' ? 'Foro' : 'Expo'} Emprendedores</h1>
            <Divider />
            
            <Descriptions title={`Estadísticas ${tipo === 'foro' ? 'Foro' : 'Expo'} Emprendedores`} bordered>
                <Descriptions.Item label="Personas registradas">
                    {stats[tipo].total}
                </Descriptions.Item>
                <Descriptions.Item label="Descargar registros">
                    <Button 
                        href={tipo === 'foro' 
                            ? '/dashboard_get_registrados_csv_foro' 
                            : '/dashboard_get_registrados_csv_expo'}
                        type="primary"
                        style={{ marginRight: 8 }}
                    >
                        Descargar CSV
                    </Button>
                </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <Space>
                    <Input
                        placeholder="Buscar por nombre"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <Select
                        placeholder="Filtrar por año"
                        style={{ width: 150 }}
                        onChange={handleYearChange}
                        value={selectedYear}
                        allowClear
                    >
                        {generateYears().map(year => (
                            <Option key={year} value={year}>{year}</Option>
                        ))}
                    </Select>
                </Space>
            </div>

            <Table 
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered
                title={() => <h3>Registros completos ({filteredData.length} resultados)</h3>}
            />
        </div>
    );
}