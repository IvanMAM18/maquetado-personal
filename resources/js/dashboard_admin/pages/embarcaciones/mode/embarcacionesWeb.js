import React from 'react';
import Iconos from '../../../../components/Iconos';

export default function EmbarcacionesWeb({
    darkMode,
    embarcaciones,
    filteredEmbarcaciones,
    loading,
    selectedEmbarcacion,
    setSelectedEmbarcacion,
    handleEdit,
    handleDelete,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    servicios,
    downloadExcel,
    resetForm,
    setModalVisible
}) {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = React.useState(1);
    
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
        padding: '40px',
        position: 'relative',
        backgroundColor: 'transparent',
        color: darkMode ? 'white' : 'inherit',
        overflow: 'hidden'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
    };

    const statsContainerStyle = {
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    };

    const statItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#ddd'}`,
        borderRadius: '8px',
        fontSize: '1em',
        backgroundColor: 'transparent'
    };

    const iconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '8px',
        color: darkMode ? 'white' : '#168284'
    };

    const actionButtonStyle = {
        padding: '8px 12px',
        background: 'transparent',
        color: darkMode ? 'white' : '#168284',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#168284'}`,
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
        marginRight: '10px',
        fontSize: '1em',
        ':hover': {
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#e6f7ff'
        }
    };

    const searchContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    };

    const searchInputStyle = {
        padding: '8px 12px 8px 32px',
        borderRadius: '4px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#ddd'}`,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'white',
        color: darkMode ? 'white' : '#168284',
        width: '200px',
        fontSize: '1em'
    };

    const searchIconStyle = {
        position: 'absolute',
        left: '10px',
        color: darkMode ? 'white' : '#168284',
        width: '16px',
        height: '16px'
    };

    const baseBorderStyle = {
    borderStyle: 'solid',
    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#ddd'
};

    const embarcacionItemStyle = {
        ...baseBorderStyle,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 15px',
        marginBottom: '10px',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        borderWidth: '1px', // Ahora sí puedes usar el shorthand
        cursor: 'pointer',
        transition: 'all 0.3s',
        ':hover': {
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f8f8f8'
        }
    };
    
    const selectedEmbarcacionItemStyle = {
        ...embarcacionItemStyle,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f0f9f9'
    };

    const detailContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent', // Fondo transparente
        borderRadius: '8px',
        padding: '20px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#ddd'}`,
        height: 'calc(80vh - 200px)',
        overflowY: 'auto'
    };

    const detailHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.3)' : '#eee'}`,
        paddingBottom: '10px'
    };

    const detailTitleStyle = {
        color: darkMode ? 'white' : '#333',
        margin: 0,
        fontSize: '1.5em'
    };

    const detailSubtitleStyle = {
        color: darkMode ? '#a0aec0' : '#666',
        margin: '5px 0 0 0',
        fontSize: '0.9em'
    };

    const detailButtonStyle = {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
        color: darkMode ? 'white' : '#333',
        transition: 'all 0.3s',
        ':hover': {
            color: '#168284'
        }
    };

    const detailContentStyle = {
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
        flexDirection: window.innerWidth <= 1715 ? 'column' : 'row'
    };

    const imageContainerStyle = {
        width: window.innerWidth <= 1715 ? '20vh' : '30vw',
        height: window.innerWidth <= 1715 ? '20vh' : '30vw',
        flexShrink: 0,
        alignSelf: window.innerWidth <= 1715 ? 'center' : 'flex-start'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '8px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.3)' : '#ddd'}`
    };

    const infoContainerStyle = {
        flex: 1,
        width: window.innerWidth <= 1715 ? '100%' : '50%',
        padding: window.innerWidth <= 1715 ? '0 0 5% 5%' : '',
    };

    const infoHeaderStyle = {
        marginBottom: '20px'
    };

    const infoTitleStyle = {
        fontSize: '1.8em',
        margin: '0 0 5px 0',
        color: darkMode ? 'white' : '#333'
    };

    const infoSubtitleStyle = {
        display: 'flex',
        gap: '15px',
        marginBottom: '15px',
        flexWrap: 'wrap'
    };

    const infoSubtitleItemStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.9em',
        color: darkMode ? '#a0aec0' : '#666'
    };

    const infoGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px'
    };

    const infoItemStyle = {
        marginBottom: '15px'
    };

    const infoLabelStyle = {
        margin: '0 0 5px 0',
        color: darkMode ? '#a0aec0' : '#666',
        fontSize: '0.9em'
    };

    const infoValueStyle = {
        margin: '0',
        fontSize: '1em',
        color: darkMode ? 'white' : '#333'
    };

    const listContainerStyle = {
        backgroundColor: 'transparent', // Fondo transparente
        borderRadius: '8px',
        padding: '20px',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#ddd'}`,
        height: 'calc(80vh - 200px)',
        overflowY: 'auto',
        width: selectedEmbarcacion ? '300px' : '100%',
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

    const actionsContainerStyle = {
        marginBottom: '20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
    };

    const filtersContainerStyle = {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        paddingBottom: '10px',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
    };

    // Fix for scrollbar warning
    const filtersContainerRef = React.useRef(null);
    React.useEffect(() => {
        if (filtersContainerRef.current) {
            filtersContainerRef.current.style.WebkitScrollbar = 'none';
        }
    }, []);

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

    return (
        <div style={containerStyle}>
            {/* Header con título y estadísticas */}
            <div style={headerStyle}>
                <h1 style={{ color: darkMode ? 'white' : '#168284', margin: 0 }}>Bandeja de Entrada</h1>
                
                <div style={statsContainerStyle}>
                    <div style={statItemStyle}>
                        <Iconos.stats style={iconStyle} />
                        <div>
                            <div>Total General: {totalEmbarcaciones}</div>
                        </div>
                    </div>
                    <div style={statItemStyle}>
                        <Iconos.stats style={iconStyle} />
                        <div>
                            <div>Carrusel A: {totalCarruselA}</div>
                        </div>
                    </div>
                    <div style={statItemStyle}>
                        <Iconos.stats style={iconStyle} />
                        <div>
                            <div>Carrusel B: {totalCarruselB}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra de acciones */}
            <div style={actionsContainerStyle}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => {
                            resetForm();
                            setModalVisible(true);
                        }}
                        style={actionButtonStyle}
                    >
                        <Iconos.add style={iconStyle} />
                        Nuevo
                    </button>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                    
                    <button 
                        onClick={downloadExcel}
                        style={actionButtonStyle}
                    >
                        <Iconos.excel style={iconStyle} />
                        Exportar a Excel
                    </button>
                </div>
            </div>

            {/* Filtros */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Iconos.filter style={iconStyle} />
                    <h3 style={{ margin: 0, color: darkMode ? 'white' : '#333' }}>Filtros</h3>
                </div>
                
                <div style={filtersContainerStyle} ref={filtersContainerRef}>
                    <button 
                        style={filterButtonStyle(filters.carrusel === 'A')}
                        onClick={() => toggleFilter('carrusel', 'A')}
                    >
                        <Iconos.filter style={iconStyle} />
                        Carrusel A
                    </button>
                    
                    <button 
                        style={filterButtonStyle(filters.carrusel === 'B')}
                        onClick={() => toggleFilter('carrusel', 'B')}
                    >
                        <Iconos.filter style={iconStyle} />
                        Carrusel B
                    </button>
                    
                    {servicios.map(servicio => (
                        <button 
                            key={servicio}
                            style={filterButtonStyle(filters.servicio === servicio)}
                            onClick={() => toggleFilter('servicio', servicio)}
                        >
                            <Iconos.filter style={iconStyle} />
                            {servicio}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenido principal */}
            {loading ? (
                <p>Cargando...</p>
            ) : selectedEmbarcacion ? (
                <div style={{ 
                    display: 'flex', 
                    gap: '20px',
                    alignItems: 'stretch'
                }}>
                    {/* Lista de embarcaciones */}
                    <div style={listContainerStyle}>
                        {filteredEmbarcaciones.map(embarcacion => (
                            <div 
                                key={embarcacion.id} 
                                style={embarcacion.id === selectedEmbarcacion.id ? selectedEmbarcacionItemStyle : embarcacionItemStyle}
                                onClick={() => setSelectedEmbarcacion(embarcacion)}
                            >
                                <Iconos.stats style={iconStyle} />
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontWeight: 'bold' }}>{embarcacion.nombre_embarcacion}</div>
                                    <div style={{ 
                                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#e6f7ff',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8em'
                                    }}>
                                        {embarcacion.carrusel}
                                    </div>
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
                    
                    {/* Detalle de la embarcación seleccionada */}
                    <div style={detailContainerStyle}>
                        {/* Barra de botones de acción */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            gap: '10px',
                        }}>
                            <button 
                                onClick={() => handleEdit(selectedEmbarcacion)}
                                style={detailButtonStyle}
                                title="Editar"
                            >
                                <Iconos.edit style={{ width: '18px', height: '18px', color: darkMode ? 'white' : '#333' }} />
                            </button>
                            
                            <button 
                                onClick={() => handleDelete(selectedEmbarcacion.id)}
                                style={{ ...detailButtonStyle, color: '#ff4d4f' }}
                                title="Eliminar"
                            >
                                <Iconos.delete style={{ width: '18px', height: '18px', color: '#ff4d4f' }} />
                            </button>

                            <button 
                                onClick={() => setSelectedEmbarcacion(null)}
                                style={detailButtonStyle}
                                title="Cerrar"
                            >
                                <Iconos.close style={{ width: '18px', height: '18px', color: darkMode ? 'white' : '#333' }} />
                            </button>
                        </div>
                        
                        {/* Contenido principal (foto + información) */}
                        <div style={detailContentStyle}>
                            {/* Foto */}
                            <div style={imageContainerStyle}>
                                {selectedEmbarcacion.foto_embarcacion ? (
                                    <img 
                                        src={selectedEmbarcacion.foto_embarcacion} 
                                        alt={selectedEmbarcacion.nombre_embarcacion}
                                        style={imageStyle}
                                    />
                                ) : (
                                    <div style={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        color: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#999'
                                    }}>
                                        <Iconos.image style={{ width: '50px', height: '50px', color: darkMode ? 'rgba(255, 255, 255, 0.3)' : '#ddd' }} />
                                        <span>No hay imagen disponible</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Información */}
                            <div style={infoContainerStyle}>
                                <div style={{ marginBottom: '15px' }}>
                                    <div style={{ 
                                        display: 'flex',
                                        gap: '15px',
                                        color: darkMode ? '#a0aec0' : '#666',
                                        fontSize: '0.9em'
                                    }}>
                                        Nombre de la embarcación
                                    </div>
                                    <h2 style={infoTitleStyle}>
                                        {selectedEmbarcacion.nombre_embarcacion}
                                    </h2>
                                </div>
                                
                                <div style={infoGridStyle}>
                                    <div style={infoItemStyle}>
                                        <div style={infoLabelStyle}>Servicio ofrecido</div>
                                        <div style={infoValueStyle}>{selectedEmbarcacion.servicio_ofrecido}</div>
                                    </div>
                                    <div style={infoItemStyle}>
                                        <div style={infoLabelStyle}>Turno</div>
                                        <div style={infoValueStyle}>{selectedEmbarcacion.turno_salida}</div>
                                    </div>
                                    <div style={infoItemStyle}>
                                        <div style={infoLabelStyle}>Carrusel</div>
                                        <div style={infoValueStyle}>{selectedEmbarcacion.carrusel}</div>
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
                </div>
            ) : (
                <div>
                    <div style={listContainerStyle}>
                        {/* Vista de lista cuando no hay selección */}
                        {currentItems.map(embarcacion => (
                            <div 
                                key={embarcacion.id} 
                                style={embarcacionItemStyle}
                                onClick={() => setSelectedEmbarcacion(embarcacion)}
                            >
                                <Iconos.stats style={iconStyle} />
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{embarcacion.nombre_embarcacion}</div>
                                        <div style={{ fontSize: '0.8em' }}>{embarcacion.servicio_ofrecido}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.8em' }}>Turno: {embarcacion.turno_salida}</div>
                                        <div style={{ fontSize: '0.8em' }}>Carrusel: {embarcacion.carrusel}</div>
                                    </div>
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
        </div>
    );
}