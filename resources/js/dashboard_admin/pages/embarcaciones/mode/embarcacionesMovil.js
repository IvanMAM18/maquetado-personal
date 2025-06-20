import React, { useState, useEffect } from 'react';
import Iconos from '../../../../components/Iconos';
import Formulario from '../../../components/Formulario';
import axios from 'axios';

export default function EmbarcacionesMovil({ darkMode, embarcaciones, loading, fetchEmbarcaciones }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEmbarcacion, setCurrentEmbarcacion] = useState(null);
    const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        carrusel: '',
        servicio: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
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

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmbarcaciones.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEmbarcaciones.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Estadísticas
    const totalEmbarcaciones = filteredEmbarcaciones.length;
    const totalCarruselA = filteredEmbarcaciones.filter(e => e.carrusel === 'A').length;
    const totalCarruselB = filteredEmbarcaciones.filter(e => e.carrusel === 'B').length;

    // Toggle filter
    const toggleFilter = (type, value) => {
        if (filters[type] === value) {
            setFilters({...filters, [type]: ''});
        } else {
            setFilters({...filters, [type]: value});
        }
    };

    // Estilos
    const containerStyle = {
        width: '100%', 
        position: 'relative',
        minHeight: '84vh',
        backgroundColor: 'transparent',
        color: darkMode ? 'white' : 'inherit',
        overflow: 'hidden',
        padding: '20px'
    };

    const headerActionsStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    };
    
    const buttonGroupStyle = {
        display: 'flex',
        gap: '10px', // Espacio entre los botones
        marginLeft: 'auto', // Esto empuja el grupo a la derecha
    };

    const titleStyle = {
        color: darkMode ? 'white' : '#168284',
        margin: '0px 0px 15px 0px',
    };

    const statsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '10px'
    };

    const statItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        flex: 1,
        textAlign: 'center'
    };

    const statIconStyle = {
        width: '30px',
        height: '30px',
        marginBottom: '10px',
        color: '#168284'
    };

    const statLabelStyle = {
        fontSize: '0.8em',
        color: darkMode ? '#a0aec0' : '#666',
        marginBottom: '5px'
    };

    const statValueStyle = {
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: darkMode ? 'white' : '#333'
    };

    const actionButtonStyle = {
        padding: '10px',
        background: 'transparent',
        color: darkMode ? 'white' : '#168284',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#168284'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s'
    };

    const searchContainerStyle = {
        position: 'relative',
        width: '100%',
        marginBottom: '20px'
    };

    const searchInputStyle = {
        padding: '12px 15px 12px 40px',
        borderRadius: '8px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#ddd'}`,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'white',
        color: darkMode ? 'white' : '#333',
        width: '100%',
        fontSize: '1em'
    };

    const searchIconStyle = {
        position: 'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: darkMode ? 'white' : '#168284',
        width: '20px',
        height: '20px'
    };

    const filtersContainerStyle = {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        paddingBottom: '10px',
        marginBottom: '20px',
        WebkitOverflowScrolling: 'touch'
    };

    const filterButtonStyle = (active) => ({
        padding: '8px 12px',
        borderRadius: '4px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#ddd'}`,
        backgroundColor: active ? (darkMode ? 'rgba(255, 255, 255, 0.2)' : '#e6f7ff') : 'transparent',
        color: darkMode ? 'white' : '#333',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        whiteSpace: 'nowrap',
        flexShrink: 0
    });

    const embarcacionItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s'
    };

    const selectedEmbarcacionItemStyle = {
        ...embarcacionItemStyle,
        borderLeft: `4px solid #168284`,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#e6f7ff'
    };

    const detailContainerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        zIndex: 1000,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
    };

    const closeButtonStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1001,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    };

    const imageContainerStyle = {
        width: '100%',
        height: '250px',
        position: 'relative'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    };

    const imageOverlayStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'
    };

    const overlayButtonStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s'
    };

    const infoContainerStyle = {
        padding: '20px'
    };

    const infoTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: darkMode ? 'white' : '#333'
    };

    const infoGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px'
    };

    const infoItemStyle = {
        marginBottom: '10px'
    };

    const infoLabelStyle = {
        fontSize: '0.8rem',
        color: darkMode ? '#a0aec0' : '#666',
        marginBottom: '5px'
    };

    const infoValueStyle = {
        fontSize: '1rem',
        color: darkMode ? 'white' : '#333'
    };

    const listContainerStyle = {
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'white',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: 'auto',
        overflowY: 'auto',
        width: '100%',
        marginBottom: '20px'
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        gap: '5px'
    };

    const pageButtonStyle = {
        padding: '5px 10px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.3)' : '#ddd'}`,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'white',
        color: darkMode ? 'white' : '#333',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const activePageButtonStyle = {
        ...pageButtonStyle,
        backgroundColor: '#168284',
        color: 'white',
        borderColor: '#168284'
    };

    const emptyStateStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        color: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#999'
    };

    const emptyIconStyle = {
        width: '80px',
        height: '80px',
        marginBottom: '20px',
        color: darkMode ? 'rgba(255, 255, 255, 0.3)' : '#ddd'
    };

    return (
        <div style={containerStyle}>
            {/* Contenido principal - se oculta cuando hay una embarcación seleccionada */}
            {!selectedEmbarcacion ? (
                <>
                    <div style={headerActionsStyle}>
                        
                        <div style={buttonGroupStyle}>
                            <button 
                                onClick={() => {
                                    resetForm();
                                    setModalVisible(true);
                                }}
                                style={actionButtonStyle}
                                title="Añadir embarcación"
                            >
                                <Iconos.add style={{ width: '20px', height: '20px' }} />
                            </button>
                            
                            <button 
                                onClick={downloadExcel}
                                style={actionButtonStyle}
                                title="Exportar a Excel"
                            >
                                <Iconos.excel style={{ width: '20px', height: '20px' }} />
                            </button>
                        </div>
                    </div>
                    <h1 style={titleStyle}>Bandeja de Entrada</h1>
                    {/* Estadísticas */}
                    <div style={statsContainerStyle}>
                        <div style={statItemStyle}>
                            <Iconos.stats style={statIconStyle} />
                            <div style={statLabelStyle}>Total</div>
                            <div style={statValueStyle}>{totalEmbarcaciones}</div>
                        </div>
                        <div style={statItemStyle}>
                            <Iconos.stats style={statIconStyle} />
                            <div style={statLabelStyle}>Carrusel A</div>
                            <div style={statValueStyle}>{totalCarruselA}</div>
                        </div>
                        <div style={statItemStyle}>
                            <Iconos.stats style={statIconStyle} />
                            <div style={statLabelStyle}>Carrusel B</div>
                            <div style={statValueStyle}>{totalCarruselB}</div>
                        </div>
                    </div>
                    
                    {/* Buscador */}
                    <div style={searchContainerStyle}>
                        <Iconos.search style={searchIconStyle} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={searchInputStyle}
                        />
                    </div>
                    
                    {/* Filtros */}
                    <div style={filtersContainerStyle}>
                        <button 
                            style={filterButtonStyle(filters.carrusel === 'A')}
                            onClick={() => toggleFilter('carrusel', 'A')}
                        >
                            <Iconos.filter style={{ width: '16px', height: '16px' }} />
                            Carrusel A
                        </button>
                        
                        <button 
                            style={filterButtonStyle(filters.carrusel === 'B')}
                            onClick={() => toggleFilter('carrusel', 'B')}
                        >
                            <Iconos.filter style={{ width: '16px', height: '16px' }} />
                            Carrusel B
                        </button>
                        
                        {servicios.map(servicio => (
                            <button 
                                key={servicio}
                                style={filterButtonStyle(filters.servicio === servicio)}
                                onClick={() => toggleFilter('servicio', servicio)}
                            >
                                <Iconos.filter style={{ width: '16px', height: '16px' }} />
                                {servicio}
                            </button>
                        ))}
                    </div>

                    {/* Lista de embarcaciones */}
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <div>
                            <div style={listContainerStyle}>
                                {currentItems.map(embarcacion => (
                                    <div 
                                        key={embarcacion.id} 
                                        style={embarcacionItemStyle}
                                        onClick={() => setSelectedEmbarcacion(embarcacion)}
                                    >
                                        <Iconos.stats style={{ width: '20px', height: '20px', marginRight: '10px', color: '#168284' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 'bold' }}>{embarcacion.nombre_embarcacion}</div>
                                            <div style={{ fontSize: '0.8em' }}>{embarcacion.servicio_ofrecido}</div>
                                            <div style={{ fontSize: '0.8em' }}>Turno: {embarcacion.turno_salida} | Carrusel: {embarcacion.carrusel}</div>
                                        </div>
                                    </div>
                                ))}
                                
                                {filteredEmbarcaciones.length === 0 && !loading && (
                                    <div style={emptyStateStyle}>
                                        <Iconos.anchor style={emptyIconStyle} />
                                        <div>Sin embarcaciones</div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Paginación */}
                            {filteredEmbarcaciones.length > itemsPerPage && (
                                <div style={paginationStyle}>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            style={currentPage === number ? activePageButtonStyle : pageButtonStyle}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            ):(
                <>
                    {/* Contenido de la embarcación */}
                    <div style={{ 
                        maxWidth: '800px', 
                        width: '100%', 
                        margin: '0 auto',
                    }}>
                        {/* Imagen */}
                        <div style={{ 
                            ...imageContainerStyle, 
                            height: '300px',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}>
                            {selectedEmbarcacion.foto_embarcacion ? (
                                <img 
                                    src={selectedEmbarcacion.foto_embarcacion} 
                                    alt={selectedEmbarcacion.nombre_embarcacion}
                                    style={imageStyle}
                                />
                            ) : (
                                <div style={{ 
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#999'
                                }}>
                                    <Iconos.image style={{ width: '80px', height: '80px' }} />
                                </div>
                            )}
                            
                            {/* Botones de acción */}
                            <div style={imageOverlayStyle}>
                                {/* Botón de cerrar a la izquierda */}
                                <button 
                                    onClick={() => setSelectedEmbarcacion(null)}
                                    style={{ 
                                        ...overlayButtonStyle,
                                    }}
                                    title="Cerrar"
                                >
                                    <Iconos.boat style={{ width: '24px', height: '24px' }} />
                                </button>
                                
                                {/* Grupo de botones de acción a la derecha */}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(selectedEmbarcacion);
                                        }}
                                        style={{ 
                                            ...overlayButtonStyle,
                                            backgroundColor: '#168284'
                                        }}
                                        title="Editar"
                                    >
                                        <Iconos.edit style={{ width: '20px', height: '20px' }} />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(selectedEmbarcacion.id);
                                        }}
                                        style={{ 
                                            ...overlayButtonStyle, 
                                            backgroundColor: '#ff4d4f'
                                        }}
                                        title="Eliminar"
                                    >
                                        <Iconos.delete style={{ width: '20px', height: '20px' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Información */}
                        <div style={{ 
                            ...infoContainerStyle,
                            backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '12px',
                            marginTop: '20px'
                        }}>
                            <h2 style={infoTitleStyle}>{selectedEmbarcacion.nombre_embarcacion}</h2>
                            
                            <div style={infoGridStyle}>
                                {/* Todos los campos de información de la embarcación */}
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Servicios ofrecidos</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.servicio_ofrecido}</div>
                                </div>
                                
                                <div style={infoGridStyle}>
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Servicios ofrecidos</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.servicio_ofrecido}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Turno y Carrusel</div>
                                    <div style={infoValueStyle}>
                                        {selectedEmbarcacion.turno_salida} | {selectedEmbarcacion.carrusel}
                                    </div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Número de Embarcación</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.numero_embarcacion}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Permiso Náutico</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.numero_permiso_nautico}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Permisionario</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.nombre_permisionario}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Representante</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.nombre_representante}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Capacidad</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.capacidad_pasajeros} pasajeros</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Hora de Salida</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.hora_salida}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Teléfono</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.telefono_contacto}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Email</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.email_contacto}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Vigencia Seguridad</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.vigencia_certificado_seguridad}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Póliza Seguro</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.numero_poliza_seguro}</div>
                                </div>
                                
                                <div style={infoItemStyle}>
                                    <div style={infoLabelStyle}>Teléfono Siniestros</div>
                                    <div style={infoValueStyle}>{selectedEmbarcacion.telefono_siniestros}</div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal del formulario */}
            {modalVisible && (
                <Formulario 
                    initialValues={formData}
                    onSubmit={handleSubmit}
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
