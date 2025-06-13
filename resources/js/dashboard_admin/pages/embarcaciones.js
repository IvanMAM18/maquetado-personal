import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import axios from 'axios';

export default function Embarcaciones({ darkMode }) {
    const [embarcaciones, setEmbarcaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEmbarcacion, setCurrentEmbarcacion] = useState(null);
    const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchActive, setSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        carrusel: '',
        servicio: ''
    });
    
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
        fetchEmbarcaciones();
    }, []);

    useEffect(() => {
        if (embarcaciones.length > 0 && !selectedEmbarcacion) {
            setSelectedEmbarcacion(embarcaciones[0]);
        }
    }, [embarcaciones]);

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
                console.log(data);
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
            id: embarcacion.id // Asegúrate de pasar el ID para edición
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
                    setSelectedEmbarcacion(embarcaciones.length > 1 ? embarcaciones[0] : null);
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

    // Filtrado y búsqueda
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

    // Estadísticas
    const totalEmbarcaciones = filteredEmbarcaciones.length;
    const totalCarruselA = filteredEmbarcaciones.filter(e => e.carrusel === 'A').length;
    const totalCarruselB = filteredEmbarcaciones.filter(e => e.carrusel === 'B').length;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmbarcaciones.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEmbarcaciones.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Estilos comunes
    const styles = {
        icon: {
            width: '20px',
            height: '20px',
            marginRight: '8px',
            color: '#168284'
        },
        button: {
            padding: '10px 15px',
            background: darkMode ? '#2d3748' : 'white',
            color: darkMode ? 'white' : 'inherit',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        card: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            backgroundColor: '#f5f5f5'
        },
        selectedCard: {
            border: '2px solid #168284',
            backgroundColor: '#e6f7ff'
        },
        statsCard: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: darkMode ? '#2d3748' : 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginRight: '10px'
        }
    };

    const containerStyle = {
        width: '100%', 
        padding: '20px',
        position: 'relative',
        minHeight: '84vh',
        backgroundColor: darkMode ? '#1a202c' : '#f0f2f5',
        color: darkMode ? 'white' : 'inherit',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    };

    const contentStyle = {
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ color: darkMode ? 'white' : '#168284', marginBottom: '20px' }}>Bandeja de Entrada</h1>
            
            {/* Barra de estadísticas */}
            <div style={{ 
                display: 'flex',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <div style={styles.statsCard}>
                    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" />
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
                    </svg>
                    <div>
                        <div>Total: {totalEmbarcaciones}</div>
                    </div>
                </div>
                <div style={styles.statsCard}>
                    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" />
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
                    </svg>
                    <div>
                        <div>Carrusel A: {totalCarruselA}</div>
                    </div>
                </div>
                <div style={styles.statsCard}>
                    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" />
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
                    </svg>
                    <div>
                        <div>Carrusel B: {totalCarruselB}</div>
                    </div>
                </div>
            </div>

            {/* Barra de acciones */}
            <div style={{ 
                marginBottom: '20px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                        onClick={() => setSearchActive(!searchActive)}
                        style={styles.button}
                    >
                        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        {searchActive && (
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    marginLeft: '10px',
                                    backgroundColor: darkMode ? '#2d3748' : 'white',
                                    color: darkMode ? 'white' : 'inherit'
                                }}
                            />
                        )}
                    </button>
                    
                    <button 
                        onClick={() => {
                            resetForm();
                            setModalVisible(true);
                        }}
                        style={styles.button}
                    >
                        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        Añadir Embarcación
                    </button>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                        </svg>
                        <span>Filtrar:</span>
                    </div>
                    <select
                        value={filters.carrusel}
                        onChange={(e) => setFilters({...filters, carrusel: e.target.value})}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            backgroundColor: darkMode ? '#2d3748' : 'white',
                            color: darkMode ? 'white' : 'inherit'
                        }}
                    >
                        <option value="">Todos los carruseles</option>
                        <option value="A">Carrusel A</option>
                        <option value="B">Carrusel B</option>
                    </select>
                    
                    <select
                        value={filters.servicio}
                        onChange={(e) => setFilters({...filters, servicio: e.target.value})}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            backgroundColor: darkMode ? '#2d3748' : 'white',
                            color: darkMode ? 'white' : 'inherit'
                        }}
                    >
                        <option value="">Todos los servicios</option>
                        {servicios.map(servicio => (
                            <option key={servicio} value={servicio}>{servicio}</option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={downloadExcel}
                        style={styles.button}
                    >
                        <svg style={styles.icon} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />  
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  
                            <line x1="12" y1="11" x2="12" y2="17" />  
                            <polyline points="9 14 12 17 15 14" />
                        </svg>
                        Exportar a Excel
                    </button>
                </div>
            </div>

            {/* Contenido principal */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div style={{ 
                    display: 'flex',
                    gap: '20px',
                    flex: 1,
                    overflow: 'hidden'
                }}>
                    {/* Lista de embarcaciones */}
                    <div style={{ 
                        width: '300px',
                        overflowY: 'auto',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '10px',
                        backgroundColor: darkMode ? '#2d3748' : 'white'
                    }}>
                        {currentItems.map(embarcacion => (
                            <div 
                                key={embarcacion.id} 
                                style={{
                                    ...styles.card,
                                    ...(selectedEmbarcacion && selectedEmbarcacion.id === embarcacion.id ? styles.selectedCard : {}),
                                    backgroundColor: darkMode ? '#4a5568' : '#f5f5f5'
                                }}
                                onClick={() => setSelectedEmbarcacion(embarcacion)}
                            >
                                <div style={{ 
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 15px'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: 'bold' }}>{embarcacion.nombre_embarcacion}</span>
                                        <span style={{ fontSize: '0.8em' }}>Turno: {embarcacion.turno_salida}</span>
                                        <span style={{ fontSize: '0.8em' }}>Carrusel: {embarcacion.carrusel}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {filteredEmbarcaciones.length === 0 && !loading && (
                            <div style={{ 
                                textAlign: 'center', 
                                padding: '20px',
                                color: '#666'
                            }}>
                                No hay embarcaciones que coincidan con los filtros
                            </div>
                        )}
                    </div>
                    
                    {/* Detalle de la embarcación seleccionada */}
                    {selectedEmbarcacion && (
                        <div style={{ 
                            flex: 1,
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            backgroundColor: darkMode ? '#2d3748' : 'white',
                            overflowY: 'auto'
                        }}>
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px',
                                marginBottom: '20px'
                            }}>
                                <button 
                                    onClick={() => handleEdit(selectedEmbarcacion)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '5px'
                                    }}
                                    title="Editar"
                                >
                                    <svg style={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </button>
                                
                                <button 
                                    onClick={() => handleDelete(selectedEmbarcacion.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '5px'
                                    }}
                                    title="Eliminar"
                                >
                                    <svg style={{...styles.icon, color: '#ff4d4f'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                {selectedEmbarcacion.foto_embarcacion && (
                                    <div style={{ textAlign: 'center' }}>
                                        <img 
                                            src={selectedEmbarcacion.foto_embarcacion} 
                                            alt={selectedEmbarcacion.nombre_embarcacion}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '300px',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </div>
                                )}
                                
                                <div style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: '15px'
                                }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Número de Embarcación</h4>
                                        <p>{selectedEmbarcacion.numero_embarcacion}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Permiso Náutico</h4>
                                        <p>{selectedEmbarcacion.numero_permiso_nautico}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Permisionario</h4>
                                        <p>{selectedEmbarcacion.nombre_permisionario}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Representante</h4>
                                        <p>{selectedEmbarcacion.nombre_representante}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Capacidad</h4>
                                        <p>{selectedEmbarcacion.capacidad_pasajeros} pasajeros</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Hora de Salida</h4>
                                        <p>{selectedEmbarcacion.hora_salida}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Teléfono</h4>
                                        <p>{selectedEmbarcacion.telefono_contacto}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Email</h4>
                                        <p>{selectedEmbarcacion.email_contacto}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Servicio</h4>
                                        <p>{selectedEmbarcacion.servicio_ofrecido}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Vigencia Seguridad</h4>
                                        <p>{selectedEmbarcacion.vigencia_certificado_seguridad}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Póliza Seguro</h4>
                                        <p>{selectedEmbarcacion.numero_poliza_seguro}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Teléfono Siniestros</h4>
                                        <p>{selectedEmbarcacion.telefono_siniestros}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* Pagination */}
            {filteredEmbarcaciones.length > 0 && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    marginTop: '20px'
                }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            style={{
                                margin: '0 5px',
                                padding: '5px 10px',
                                background: currentPage === number ? '#168284' : (darkMode ? '#4a5568' : 'white'),
                                color: currentPage === number ? 'white' : (darkMode ? 'white' : '#333'),
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {number}
                        </button>
                    ))}
                </div>
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
                                // Mostrar error al usuario
                            }
                        } catch (error) {
                            console.error('Error saving embarcacion:', error.response?.data || error.message);
                            // Mostrar detalles del error 422 si existen
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
        </div>
    );
}