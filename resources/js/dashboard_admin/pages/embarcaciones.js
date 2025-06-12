import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Embarcaciones() {
    const [embarcaciones, setEmbarcaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEmbarcacion, setCurrentEmbarcacion] = useState(null);
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
        
        // Append all form data to FormData object
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
            foto_embarcacion: null
        });
        setEditMode(true);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta embarcación?')) {
            try {
                await axios.delete(`/embarcaciones-delete/${id}`);
                fetchEmbarcaciones();
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

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <h1>Administración de Embarcaciones</h1>
            
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button 
                    onClick={() => {
                        resetForm();
                        setModalVisible(true);
                    }}
                    style={{
                        padding: '10px 15px',
                        background: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Agregar Embarcación
                </button>
                
                <button 
                    onClick={downloadExcel}
                    style={{
                        padding: '10px 15px',
                        background: '#52c41a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Exportar a Excel
                </button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f0f0' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Número</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Permisionario</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Capacidad</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Turno</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {embarcaciones.map(embarcacion => (
                                <tr key={embarcacion.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{embarcacion.numero_embarcacion}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{embarcacion.nombre_embarcacion}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{embarcacion.nombre_permisionario}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{embarcacion.capacidad_pasajeros}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{embarcacion.turno_salida}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <button 
                                            onClick={() => handleEdit(embarcacion)}
                                            style={{
                                                marginRight: '5px',
                                                padding: '5px 10px',
                                                background: '#faad14',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(embarcacion.id)}
                                            style={{
                                                padding: '5px 10px',
                                                background: '#ff4d4f',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalVisible && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '80%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2>{editMode ? 'Editar Embarcación' : 'Agregar Embarcación'}</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Número de Embarcación:</label>
                                <input
                                    type="text"
                                    name="numero_embarcacion"
                                    value={formData.numero_embarcacion}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Nombre de Embarcación:</label>
                                <input
                                    type="text"
                                    name="nombre_embarcacion"
                                    value={formData.nombre_embarcacion}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Número de Permiso Náutico:</label>
                                <input
                                    type="text"
                                    name="numero_permiso_nautico"
                                    value={formData.numero_permiso_nautico}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Permisionario:</label>
                                <input
                                    type="text"
                                    name="nombre_permisionario"
                                    value={formData.nombre_permisionario}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Representante:</label>
                                <input
                                    type="text"
                                    name="nombre_representante"
                                    value={formData.nombre_representante}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Capacidad de Pasajeros:</label>
                                <input
                                    type="number"
                                    name="capacidad_pasajeros"
                                    value={formData.capacidad_pasajeros}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Turno de Salida:</label>
                                <select
                                    name="turno_salida"
                                    value={formData.turno_salida}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                >
                                    <option value="">Seleccionar turno</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                    <option value="Nocturno">Nocturno</option>
                                </select>
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Hora de Salida:</label>
                                <input
                                    type="time"
                                    name="hora_salida"
                                    value={formData.hora_salida}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Teléfono de Contacto:</label>
                                <input
                                    type="tel"
                                    name="telefono_contacto"
                                    value={formData.telefono_contacto}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Email de Contacto:</label>
                                <input
                                    type="email"
                                    name="email_contacto"
                                    value={formData.email_contacto}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Servicio Ofrecido:</label>
                                <input
                                    type="text"
                                    name="servicio_ofrecido"
                                    value={formData.servicio_ofrecido}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Vigencia Certificado Seguridad:</label>
                                <input
                                    type="date"
                                    name="vigencia_certificado_seguridad"
                                    value={formData.vigencia_certificado_seguridad}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Número Póliza Seguro:</label>
                                <input
                                    type="text"
                                    name="numero_poliza_seguro"
                                    value={formData.numero_poliza_seguro}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Teléfono Siniestros:</label>
                                <input
                                    type="tel"
                                    name="telefono_siniestros"
                                    value={formData.telefono_siniestros}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Carrusel:</label>
                                <select
                                    name="carrusel"
                                    value={formData.carrusel}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                >
                                    <option value="A">Carrusel A</option>
                                    <option value="B">Carrusel B</option>
                                </select>
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Foto de Embarcación:</label>
                                <input
                                    type="file"
                                    name="foto_embarcacion"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ width: '100%', padding: '8px' }}
                                />
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    style={{
                                        padding: '8px 15px',
                                        background: '#ff4d4f',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '8px 15px',
                                        background: '#1890ff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {editMode ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}