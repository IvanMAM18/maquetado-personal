import React, { useState } from 'react';

const Formulario = ({ initialValues, onSubmit, onCancel, servicios, darkMode }) => {
    const [formData, setFormData] = useState(initialValues);

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
        
        // Asegúrate de incluir todos los campos requeridos
        const fields = [
            'numero_embarcacion', 'nombre_embarcacion', 'numero_permiso_nautico',
            'nombre_permisionario', 'nombre_representante', 'capacidad_pasajeros',
            'turno_salida', 'hora_salida', 'telefono_contacto', 'email_contacto',
            'servicio_ofrecido', 'vigencia_certificado_seguridad', 'numero_poliza_seguro',
            'telefono_siniestros', 'carrusel'
        ];
    
        fields.forEach(field => {
            if (formData[field] !== null && formData[field] !== undefined) {
                data.append(field, formData[field]);
            }
        });
    
        // Manejo especial para la foto
        if (formData.foto_embarcacion instanceof File) {
            data.append('foto_embarcacion', formData.foto_embarcacion);
        } else if (typeof formData.foto_embarcacion === 'string' && formData.id) {
            // Si es una edición y no se cambió la foto, no enviar nada
        }
    
        // Incluir el ID si es una edición
        if (formData.id) {
            data.append('_method', 'PUT'); // Importante para Laravel
        }
    
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Puedes mostrar un mensaje de error al usuario aquí
        }
    };

    // Estilos comunes
    const styles = {
        modalOverlay: {
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
        },
        modalContent: {
            backgroundColor: darkMode ? '#2d3748' : 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            color: darkMode ? 'white' : 'inherit'
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginBottom: '15px',
            backgroundColor: darkMode ? '#4a5568' : 'white',
            color: darkMode ? 'white' : 'inherit'
        },
        button: {
            padding: '8px 15px',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '15px'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: '500',
            color: darkMode ? '#e2e8f0' : '#666'
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px'
        },
        icon: {
            width: '20px',
            height: '20px',
            marginRight: '8px',
            color: '#168284'
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2 style={{ color: darkMode ? 'white' : '#168284', marginBottom: '20px' }}>
                    {initialValues.id ? 'Editar Embarcación' : 'Agregar Embarcación'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Número de Embarcación:</label>
                            <input
                                type="text"
                                name="numero_embarcacion"
                                value={formData.numero_embarcacion}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre de Embarcación:</label>
                            <input
                                type="text"
                                name="nombre_embarcacion"
                                value={formData.nombre_embarcacion}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Número de Permiso Náutico:</label>
                            <input
                                type="text"
                                name="numero_permiso_nautico"
                                value={formData.numero_permiso_nautico}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre del Permisionario:</label>
                            <input
                                type="text"
                                name="nombre_permisionario"
                                value={formData.nombre_permisionario}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre del Representante:</label>
                            <input
                                type="text"
                                name="nombre_representante"
                                value={formData.nombre_representante}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Capacidad de Pasajeros:</label>
                            <input
                                type="number"
                                name="capacidad_pasajeros"
                                value={formData.capacidad_pasajeros}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                                min="1"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Turno de Salida:</label>
                            <input
                                type="text"
                                name="turno_salida"
                                value={formData.turno_salida}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Hora de Salida:</label>
                            <input
                                type="time"
                                name="hora_salida"
                                value={formData.hora_salida}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                                step="1"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Teléfono de Contacto:</label>
                            <input
                                type="tel"
                                name="telefono_contacto"
                                value={formData.telefono_contacto}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                                pattern="[0-9]{10}"
                                title="Ingrese un número de teléfono válido (10 dígitos)"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email de Contacto:</label>
                            <input
                                type="email"
                                name="email_contacto"
                                value={formData.email_contacto}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Servicio Ofrecido:</label>
                            <select
                                name="servicio_ofrecido"
                                value={formData.servicio_ofrecido}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            >
                                <option value="">Seleccionar servicio</option>
                                {servicios.map(servicio => (
                                    <option key={servicio} value={servicio}>{servicio}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Vigencia Certificado Seguridad:</label>
                            <input
                                type="date"
                                name="vigencia_certificado_seguridad"
                                value={formData.vigencia_certificado_seguridad}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Número Póliza Seguro:</label>
                            <input
                                type="text"
                                name="numero_poliza_seguro"
                                value={formData.numero_poliza_seguro}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Teléfono Siniestros:</label>
                            <input
                                type="tel"
                                name="telefono_siniestros"
                                value={formData.telefono_siniestros}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                                pattern="[0-9]{10}"
                                title="Ingrese un número de teléfono válido (10 dígitos)"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Carrusel:</label>
                            <select
                                name="carrusel"
                                value={formData.carrusel}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                            >
                                <option value="A">Carrusel A</option>
                                <option value="B">Carrusel B</option>
                            </select>
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Foto de Embarcación:</label>
                            <input
                                type="file"
                                name="foto_embarcacion"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ 
                                    width: '100%', 
                                    padding: '8px',
                                    color: darkMode ? 'white' : 'inherit'
                                }}
                            />
                            {formData.foto_embarcacion && typeof formData.foto_embarcacion === 'string' && (
                                <div style={{ marginTop: '10px' }}>
                                    <img 
                                        src={formData.foto_embarcacion} 
                                        alt="Preview" 
                                        style={{ 
                                            maxWidth: '100%', 
                                            maxHeight: '150px',
                                            borderRadius: '8px'
                                        }} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div style={styles.buttonGroup}>
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                ...styles.button,
                                background: '#ff4d4f'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                background: '#168284'
                            }}
                        >
                            {initialValues.id ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Formulario;