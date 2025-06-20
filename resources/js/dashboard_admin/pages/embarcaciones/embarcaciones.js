import React, { useState, useEffect } from 'react';
import Iconos from '../../../components/Iconos';
import Formulario from '../../components/Formulario';
import EmbarcacionesMovil from './mode/embarcacionesMovil';
import EmbarcacionesWeb from './mode/embarcacionesWeb';
import axios from 'axios';

export default function Embarcaciones({ darkMode }) {
    const [embarcaciones, setEmbarcaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEmbarcacion, setCurrentEmbarcacion] = useState(null);
    const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        carrusel: '',
        servicio: ''
    });
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);
    
    const servicios = [
        "Nado con el Tiburón Ballena (1 de octubre a 30 abril)",
        "Paseo de día y 'snorkel' a la Isla Espirítu Santo",
        "Paseo de día y 'snorkel' a Balandra",
        "Pesca deportiva",
    ];

    const [formData, setFormData] = useState({
        numero_embarcacion: '',
        nombre_embarcacion: '',
        numero_permiso_nautico: '',
        nombre_permisionario: '',
        nombre_representante: '',
        capacidad_pasajeros: '',
        turno_salida: '',
        hora_salida: '',
        telefono_contacto: '',
        email_contacto: '',
        servicio_ofrecido: '',
        vigencia_certificado_seguridad: '',
        numero_poliza_seguro: '',
        telefono_siniestros: '',
        carrusel: 'A',
        foto_embarcacion: null
    });

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchEmbarcaciones();
    }, []);

    const fetchEmbarcaciones = async () => {
        try {
            const response = await axios.get('/embarcaciones-data');
            setEmbarcaciones(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching embarcaciones:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            foto_embarcacion: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            if (editMode && currentEmbarcacion) {
                await axios.put(`/embarcaciones-update/${currentEmbarcacion.id}`, data);
            } else {
                await axios.post('/embarcaciones-store', data);
            }
            fetchEmbarcaciones();
            setModalVisible(false);
            resetForm();
        } catch (error) {
            console.error('Error saving embarcacion:', error);
        }
    };

    const handleEdit = (embarcacion) => {
        setCurrentEmbarcacion(embarcacion);
        setFormData({
            numero_embarcacion: embarcacion.numero_embarcacion,
            nombre_embarcacion: embarcacion.nombre_embarcacion,
            numero_permiso_nautico: embarcacion.numero_permiso_nautico,
            nombre_permisionario: embarcacion.nombre_permisionario,
            nombre_representante: embarcacion.nombre_representante,
            capacidad_pasajeros: embarcacion.capacidad_pasajeros,
            turno_salida: embarcacion.turno_salida,
            hora_salida: embarcacion.hora_salida,
            telefono_contacto: embarcacion.telefono_contacto,
            email_contacto: embarcacion.email_contacto,
            servicio_ofrecido: embarcacion.servicio_ofrecido,
            vigencia_certificado_seguridad: embarcacion.vigencia_certificado_seguridad,
            numero_poliza_seguro: embarcacion.numero_poliza_seguro,
            telefono_siniestros: embarcacion.telefono_siniestros,
            carrusel: embarcacion.carrusel,
            foto_embarcacion: null,
            id: embarcacion.id
        });
        setEditMode(true);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta embarcación?')) {
            try {
                await axios.delete(`/embarcaciones-delete/${id}`);
                fetchEmbarcaciones();
                if (selectedEmbarcacion && selectedEmbarcacion.id === id) {
                    setSelectedEmbarcacion(null);
                }
            } catch (error) {
                console.error('Error deleting embarcacion:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            numero_embarcacion: '',
            nombre_embarcacion: '',
            numero_permiso_nautico: '',
            nombre_permisionario: '',
            nombre_representante: '',
            capacidad_pasajeros: '',
            turno_salida: '',
            hora_salida: '',
            telefono_contacto: '',
            email_contacto: '',
            servicio_ofrecido: '',
            vigencia_certificado_seguridad: '',
            numero_poliza_seguro: '',
            telefono_siniestros: '',
            carrusel: 'A',
            foto_embarcacion: null
        });
        setEditMode(false);
        setCurrentEmbarcacion(null);
    };

    const downloadExcel = async () => {
        try {
            window.location.href = '/embarcaciones-excel';
        } catch (error) {
            console.error('Error downloading excel:', error);
        }
    };

    const filteredEmbarcaciones = embarcaciones.filter(embarcacion => {
        const matchesSearch = searchTerm === '' || 
            Object.values(embarcacion).some(
                val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        
        const matchesFilters = 
            (filters.carrusel === '' || embarcacion.carrusel === filters.carrusel) &&
            (filters.servicio === '' || embarcacion.servicio_ofrecido === filters.servicio);
        
        return matchesSearch && matchesFilters;
    });

    return (
        <>
            {isSmallScreen ? (
                <EmbarcacionesMovil 
                    darkMode={darkMode}
                    embarcaciones={embarcaciones}
                    filteredEmbarcaciones={filteredEmbarcaciones}
                    loading={loading}
                    selectedEmbarcacion={selectedEmbarcacion}
                    setSelectedEmbarcacion={setSelectedEmbarcacion}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    servicios={servicios}
                    downloadExcel={downloadExcel}
                    resetForm={resetForm}
                    setModalVisible={setModalVisible}
                />
            ) : (
                <EmbarcacionesWeb 
                    darkMode={darkMode}
                    embarcaciones={embarcaciones}
                    filteredEmbarcaciones={filteredEmbarcaciones}
                    loading={loading}
                    selectedEmbarcacion={selectedEmbarcacion}
                    setSelectedEmbarcacion={setSelectedEmbarcacion}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    servicios={servicios}
                    downloadExcel={downloadExcel}
                    resetForm={resetForm}
                    setModalVisible={setModalVisible}
                />
            )}

            {/* Modal */}
            {modalVisible && (
                <Formulario 
                    initialValues={formData}
                    onSubmit={async (formData) => {
                        try {
                            let response;
                            if (editMode && currentEmbarcacion) {
                                response = await axios.post(`/embarcaciones-update/${currentEmbarcacion.id}`, formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                });
                            } else {
                                response = await axios.post('/embarcaciones-store', formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                });
                            }
                            
                            if (response.data.success) {
                                fetchEmbarcaciones();
                                setModalVisible(false);
                                resetForm();
                            } else {
                                console.error('Error del servidor:', response.data.error);
                            }
                        } catch (error) {
                            console.error('Error saving embarcacion:', error.response?.data || error.message);
                            if (error.response?.status === 422) {
                                console.log('Validation errors:', error.response.data.errors);
                            }
                        }
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                        resetForm();
                    }}
                    servicios={servicios}
                    darkMode={darkMode}
                />
            )}
        </>
    );
}