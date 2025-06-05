import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Embarcaciones() {
    // Estados principales
    const [embarcaciones, setEmbarcaciones] = useState([]);
    const [currentEmbarcacion, setCurrentEmbarcacion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
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
        foto_embarcacion: null,
        // Documentación
        permiso_turismo_nautico: null,
        permiso_pesca_deportiva: null,
        permiso_balandra_conanp: null,
        permiso_espiritu_santo_conanp: null,
        permiso_tiburon_ballena_dgvs: null,
        registro_nacional_turismo: null,
        registro_nacional_embarcaciones: null,
        constancia_residencia_acta_nacimiento: null,
        carta_verdad_propia_oficina: null,
        carta_verdad_trabajado_zona_malecon: null,
        carta_no_concesion_playa_zofemat: null,
        permiso_uso_muelle_fiscal_api: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    // Servicios disponibles
    const servicios = [
        "Nado con el Tiburón Ballena (1 de octubre a 30 abril)",
        "Paseo de día y 'snorkel' a la Isla Espirítu Santo",
        "Paseo de día y 'snorkel' a Balandra",
        "Pesca deportiva"
    ];

    // Obtener todas las embarcaciones
    const fetchEmbarcaciones = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/embarcaciones/data');
            setEmbarcaciones(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar las embarcaciones');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmbarcaciones();
    }, []);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejar cambios en archivos
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        
        if (name === 'foto_embarcacion' && files[0]) {
            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(files[0]);
        }
        
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };

    // Abrir modal para nueva embarcación
    const openNewModal = () => {
        setCurrentEmbarcacion(null);
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
            foto_embarcacion: null,
            // Documentación
            permiso_turismo_nautico: null,
            permiso_pesca_deportiva: null,
            permiso_balandra_conanp: null,
            permiso_espiritu_santo_conanp: null,
            permiso_tiburon_ballena_dgvs: null,
            registro_nacional_turismo: null,
            registro_nacional_embarcaciones: null,
            constancia_residencia_acta_nacimiento: null,
            carta_verdad_propia_oficina: null,
            carta_verdad_trabajado_zona_malecon: null,
            carta_no_concesion_playa_zofemat: null,
            permiso_uso_muelle_fiscal_api: null
        });
        setPreviewImage(null);
        setIsModalOpen(true);
    };

    // Abrir modal para editar embarcación
    const openEditModal = (embarcacion) => {
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
            // Documentación - inicializamos como null, se manejarán por separado
            permiso_turismo_nautico: null,
            permiso_pesca_deportiva: null,
            permiso_balandra_conanp: null,
            permiso_espiritu_santo_conanp: null,
            permiso_tiburon_ballena_dgvs: null,
            registro_nacional_turismo: null,
            registro_nacional_embarcaciones: null,
            constancia_residencia_acta_nacimiento: null,
            carta_verdad_propia_oficina: null,
            carta_verdad_trabajado_zona_malecon: null,
            carta_no_concesion_playa_zofemat: null,
            permiso_uso_muelle_fiscal_api: null
        });
        setPreviewImage(embarcacion.foto_embarcacion || null);
        setIsModalOpen(true);
    };

    // Abrir modal de confirmación para eliminar
    const openDeleteModal = (embarcacion) => {
        setCurrentEmbarcacion(embarcacion);
        setIsDeleteModalOpen(true);
    };

    // Cerrar modales
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentEmbarcacion(null);
        setPreviewImage(null);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCurrentEmbarcacion(null);
    };

    // Enviar formulario (crear o actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        // Verificación básica de campos requeridos
        if (!formData.foto_embarcacion && !currentEmbarcacion) {
            setError('La foto de la embarcación es requerida');
            return;
        }
    
        try {
            const formDataToSend = new FormData();
            
            console.log('Datos a enviar:', formData); // Para depuración
            
            // Agrega todos los campos al FormData
            for (const key in formData) {
                if (formData[key] !== null && formData[key] !== undefined) {
                    formDataToSend.append(key, formData[key]);
                }
            }
    
            // Verifica el FormData antes de enviar
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ', pair[1]);
            }
    
            let response;
            if (currentEmbarcacion) {
                response = await axios.post(`/embarcaciones/update/${currentEmbarcacion.id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post('/embarcaciones/registro', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            
            // ... resto del código
        } catch (err) {
            console.error('Error detallado:', err.response);
            if (err.response?.data?.errors) {
                // Mostrar errores de validación de Laravel
                const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
                setError(errorMessages);
            } else {
                setError(err.response?.data?.message || 'Error al procesar la solicitud');
            }
        }
    };

    // Eliminar embarcación
    const handleDelete = async () => {
        try {
            await axios.delete(`/embarcaciones/delete/${currentEmbarcacion.id}`);
            setSuccess('Embarcación eliminada correctamente');
            fetchEmbarcaciones();
            closeDeleteModal();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la embarcación');
        }
    };

    // Exportar a CSV
    const exportToCSV = async () => {
        try {
            const response = await axios.get('/embarcaciones/csv', {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'embarcaciones-registradas.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError('Error al exportar a CSV');
        }
    };

    // Exportar a Excel
    const exportToExcel = async () => {
        try {
            const response = await axios.get('/embarcaciones/excel', {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `embarcaciones-registradas-${new Date().toISOString().slice(0,10)}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError('Error al exportar a Excel');
        }
    };

    // Estilos
    const styles = {
        container: {
            width: '100%',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        },
        header: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '20px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
        },
        tableContainer: {
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            overflowX: 'auto'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px',
            textAlign: 'left'
        },
        td: {
            padding: '12px',
            borderBottom: '1px solid #ddd'
        },
        trHover: {
            '&:hover': {
                backgroundColor: '#f5f5f5'
            }
        },
        button: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '5px',
            marginBottom: '10px'
        },
        buttonDanger: {
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '5px'
        },
        modal: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000'
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            width: '80%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
        },
        select: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
        },
        previewImage: {
            maxWidth: '200px',
            maxHeight: '200px',
            marginTop: '10px'
        },
        error: {
            color: 'red',
            margin: '10px 0'
        },
        success: {
            color: 'green',
            margin: '10px 0'
        },
        loading: {
            textAlign: 'center',
            padding: '20px'
        },
        actionButtons: {
            display: 'flex',
            gap: '5px'
        },
        documentIcon: {
            color: '#f44336',
            marginRight: '5px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Panel de Control de Embarcaciones</h1>
                <p>Administra el registro de embarcaciones y su documentación</p>
            </div>

            {error && <div style={styles.error}>{error}</div>}
            {success && <div style={styles.success}>{success}</div>}

            <div>
                <button style={styles.button} onClick={openNewModal}>
                    Nueva Embarcación
                </button>
                <button style={styles.button} onClick={exportToCSV}>
                    Exportar a CSV
                </button>
                <button style={styles.button} onClick={exportToExcel}>
                    Exportar a Excel
                </button>
            </div>

            <div style={styles.tableContainer}>
                {loading ? (
                    <div style={styles.loading}>Cargando embarcaciones...</div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Número</th>
                                <th style={styles.th}>Nombre</th>
                                <th style={styles.th}>Permisionario</th>
                                <th style={styles.th}>Capacidad</th>
                                <th style={styles.th}>Servicio</th>
                                <th style={styles.th}>Carrusel</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {embarcaciones.map(embarcacion => (
                                <tr key={embarcacion.id} style={styles.trHover}>
                                    <td style={styles.td}>{embarcacion.numero_embarcacion}</td>
                                    <td style={styles.td}>{embarcacion.nombre_embarcacion}</td>
                                    <td style={styles.td}>{embarcacion.nombre_permisionario}</td>
                                    <td style={styles.td}>{embarcacion.capacidad_pasajeros}</td>
                                    <td style={styles.td}>{embarcacion.servicio_ofrecido}</td>
                                    <td style={styles.td}>{embarcacion.carrusel}</td>
                                    <td style={styles.td}>
                                        <div style={styles.actionButtons}>
                                            <button 
                                                style={{...styles.button, backgroundColor: '#2196F3'}}
                                                onClick={() => openEditModal(embarcacion)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                style={styles.buttonDanger}
                                                onClick={() => openDeleteModal(embarcacion)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal para crear/editar embarcación */}
            {isModalOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>{currentEmbarcacion ? 'Editar Embarcación' : 'Nueva Embarcación'}</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{display: 'flex', gap: '20px'}}>
                                <div style={{flex: 1}}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Número de Embarcación</label>
                                        <input
                                            type="text"
                                            name="numero_embarcacion"
                                            value={formData.numero_embarcacion}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Nombre de Embarcación</label>
                                        <input
                                            type="text"
                                            name="nombre_embarcacion"
                                            value={formData.nombre_embarcacion}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Número de Permiso Náutico</label>
                                        <input
                                            type="text"
                                            name="numero_permiso_nautico"
                                            value={formData.numero_permiso_nautico}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Nombre del Permisionario</label>
                                        <input
                                            type="text"
                                            name="nombre_permisionario"
                                            value={formData.nombre_permisionario}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Nombre del Representante (opcional)</label>
                                        <input
                                            type="text"
                                            name="nombre_representante"
                                            value={formData.nombre_representante}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Capacidad de Pasajeros</label>
                                        <input
                                            type="number"
                                            name="capacidad_pasajeros"
                                            value={formData.capacidad_pasajeros}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Turno de Salida</label>
                                        <input
                                            type="text"
                                            name="turno_salida"
                                            value={formData.turno_salida}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{flex: 1}}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Hora de Salida</label>
                                        <input
                                            type="time"
                                            name="hora_salida"
                                            value={formData.hora_salida}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Teléfono de Contacto</label>
                                        <input
                                            type="tel"
                                            name="telefono_contacto"
                                            value={formData.telefono_contacto}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Email de Contacto</label>
                                        <input
                                            type="email"
                                            name="email_contacto"
                                            value={formData.email_contacto}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Servicio Ofrecido</label>
                                        <select
                                            name="servicio_ofrecido"
                                            value={formData.servicio_ofrecido}
                                            onChange={handleInputChange}
                                            style={styles.select}
                                            required
                                        >
                                            <option value="">Seleccione un servicio</option>
                                            {servicios.map((servicio, index) => (
                                                <option key={index} value={servicio}>{servicio}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Vigencia Certificado de Seguridad</label>
                                        <input
                                            type="date"
                                            name="vigencia_certificado_seguridad"
                                            value={formData.vigencia_certificado_seguridad}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Número de Póliza de Seguro</label>
                                        <input
                                            type="text"
                                            name="numero_poliza_seguro"
                                            value={formData.numero_poliza_seguro}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Teléfono para Siniestros</label>
                                        <input
                                            type="tel"
                                            name="telefono_siniestros"
                                            value={formData.telefono_siniestros}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Carrusel</label>
                                        <select
                                            name="carrusel"
                                            value={formData.carrusel}
                                            onChange={handleInputChange}
                                            style={styles.select}
                                            required
                                        >
                                            <option value="A">Carrusel A</option>
                                            <option value="B">Carrusel B</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop: '20px'}}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Foto de la Embarcación</label>
                                    <input
                                        type="file"
                                        name="foto_embarcacion"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png,image/jpg"
                                        style={styles.input}
                                        required={!currentEmbarcacion}
                                    />
                                    {previewImage && (
                                        <div>
                                            <p>Vista previa:</p>
                                            <img 
                                                src={previewImage} 
                                                alt="Preview" 
                                                style={styles.previewImage}
                                            />
                                        </div>
                                    )}
                                </div>

                                <h3>Documentación</h3>
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px'}}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Permiso Turismo Náutico (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="permiso_turismo_nautico"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Permiso Pesca Deportiva (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="permiso_pesca_deportiva"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Permiso Balandra CONANP (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="permiso_balandra_conanp"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Permiso Espíritu Santo CONANP (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="permiso_espiritu_santo_conanp"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Permiso Tiburón Ballena DGVS (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="permiso_tiburon_ballena_dgvs"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Registro Nacional Turismo (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="registro_nacional_turismo"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Registro Nacional Embarcaciones (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="registro_nacional_embarcaciones"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Constancia Residencia/Acta Nacimiento (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="constancia_residencia_acta_nacimiento"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Carta Verdad Propia Oficina (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="carta_verdad_propia_oficina"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Carta Verdad Trabajado Zona Malecón (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="carta_verdad_trabajado_zona_malecon"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Carta No Concesión Playa ZOFEMAT (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="carta_no_concesion_playa_zofemat"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <span style={styles.documentIcon}>📄</span>
                                            Permiso Uso Muelle Fiscal API (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="permiso_uso_muelle_fiscal_api"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            style={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                                <button 
                                    type="button" 
                                    style={styles.buttonDanger}
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    style={styles.button}
                                >
                                    {currentEmbarcacion ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmación para eliminar */}
            {isDeleteModalOpen && (
                <div style={styles.modal}>
                    <div style={{...styles.modalContent, width: '400px'}}>
                        <h2>Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que deseas eliminar la embarcación {currentEmbarcacion?.nombre_embarcacion}?</p>
                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px'}}>
                            <button 
                                style={styles.button}
                                onClick={closeDeleteModal}
                            >
                                Cancelar
                            </button>
                            <button 
                                style={styles.buttonDanger}
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}