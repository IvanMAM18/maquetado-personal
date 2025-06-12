import React, { useState, useEffect } from 'react';

const Formulario = ({ initialValues, onSubmit, onCancel, servicios }) => {
    const [formValues, setFormValues] = useState({
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
        carrusel: 'A'
    });
    
    const [files, setFiles] = useState({});
    const [documentos, setDocumentos] = useState({});

    // Establecer valores iniciales si estamos editando
    useEffect(() => {
        if (initialValues) {
            setFormValues({
                numero_embarcacion: initialValues.numero_embarcacion,
                nombre_embarcacion: initialValues.nombre_embarcacion,
                numero_permiso_nautico: initialValues.numero_permiso_nautico,
                nombre_permisionario: initialValues.nombre_permisionario,
                nombre_representante: initialValues.nombre_representante || '',
                capacidad_pasajeros: initialValues.capacidad_pasajeros,
                turno_salida: initialValues.turno_salida,
                hora_salida: initialValues.hora_salida,
                telefono_contacto: initialValues.telefono_contacto,
                email_contacto: initialValues.email_contacto,
                servicio_ofrecido: initialValues.servicio_ofrecido,
                vigencia_certificado_seguridad: initialValues.vigencia_certificado_seguridad.split(' ')[0], // Solo la fecha
                numero_poliza_seguro: initialValues.numero_poliza_seguro,
                telefono_siniestros: initialValues.telefono_siniestros,
                carrusel: initialValues.carrusel
            });

            if (initialValues.documentacion) {
                setDocumentos(initialValues.documentacion);
            }
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target;
        if (fileList.length > 0) {
            setFiles(prev => ({ ...prev, [name]: fileList[0] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues, files);
    };

    // Función para mostrar si un documento está subido (en modo edición)
    const tieneDocumento = (nombreDocumento) => {
        return documentos && documentos[nombreDocumento] && documentos[nombreDocumento] !== 'No subido';
    };

    return (
        <div style={{ 
            background: '#f9f9f9', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginTop: 0 }}>{initialValues ? 'Editar Embarcación' : 'Registrar Nueva Embarcación'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {/* Columna 1 */}
                    <div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Número de Embarcación:*</label>
                            <input
                                type="text"
                                name="numero_embarcacion"
                                value={formValues.numero_embarcacion}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre de Embarcación:*</label>
                            <input
                                type="text"
                                name="nombre_embarcacion"
                                value={formValues.nombre_embarcacion}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Número de Permiso Náutico:*</label>
                            <input
                                type="text"
                                name="numero_permiso_nautico"
                                value={formValues.numero_permiso_nautico}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Permisionario:*</label>
                            <input
                                type="text"
                                name="nombre_permisionario"
                                value={formValues.nombre_permisionario}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Representante:</label>
                            <input
                                type="text"
                                name="nombre_representante"
                                value={formValues.nombre_representante}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Capacidad de Pasajeros:*</label>
                            <input
                                type="number"
                                name="capacidad_pasajeros"
                                value={formValues.capacidad_pasajeros}
                                onChange={handleChange}
                                min="1"
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>
                    </div>

                    {/* Columna 2 */}
                    <div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Turno de Salida:*</label>
                            <input
                                type="text"
                                name="turno_salida"
                                value={formValues.turno_salida}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hora de Salida:*</label>
                            <input
                                type="time"
                                name="hora_salida"
                                value={formValues.hora_salida}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teléfono de Contacto:*</label>
                            <input
                                type="text"
                                name="telefono_contacto"
                                value={formValues.telefono_contacto}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email de Contacto:*</label>
                            <input
                                type="email"
                                name="email_contacto"
                                value={formValues.email_contacto}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Servicio Ofrecido:*</label>
                            <select
                                name="servicio_ofrecido"
                                value={formValues.servicio_ofrecido}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            >
                                <option value="">Seleccione un servicio</option>
                                {servicios.map((servicio, index) => (
                                    <option key={index} value={servicio}>{servicio}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Carrusel:*</label>
                            <select
                                name="carrusel"
                                value={formValues.carrusel}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            >
                                <option value="A">Carrusel A</option>
                                <option value="B">Carrusel B</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Documentos y foto */}
                <div style={{ marginTop: '20px' }}>
                    <h3>Documentación</h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Foto de la Embarcación (JPEG/PNG, max 2MB):*
                            {initialValues && tieneDocumento('foto_embarcacion') && (
                                <span style={{ color: 'green', marginLeft: '10px', fontWeight: 'normal' }}>
                                    (Documento ya subido)
                                </span>
                            )}
                        </label>
                        <input
                            type="file"
                            name="foto_embarcacion"
                            onChange={handleFileChange}
                            accept="image/jpeg,image/png,image/jpg"
                            required={!initialValues}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Vigencia Certificado de Seguridad:*</label>
                        <input
                            type="date"
                            name="vigencia_certificado_seguridad"
                            value={formValues.vigencia_certificado_seguridad}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Número de Póliza de Seguro:*</label>
                        <input
                            type="text"
                            name="numero_poliza_seguro"
                            value={formValues.numero_poliza_seguro}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teléfono Siniestros:*</label>
                        <input
                            type="text"
                            name="telefono_siniestros"
                            value={formValues.telefono_siniestros}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            required
                        />
                    </div>

                    <h4>Documentos Adicionales (PDF, max 2MB):</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Permiso Turismo Náutico
                                    {initialValues && tieneDocumento('permiso_turismo_nautico') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="permiso_turismo_nautico"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Permiso Pesca Deportiva
                                    {initialValues && tieneDocumento('permiso_pesca_deportiva') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="permiso_pesca_deportiva"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Permiso Balandra CONANP
                                    {initialValues && tieneDocumento('permiso_balandra_conanp') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="permiso_balandra_conanp"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Permiso Espíritu Santo CONANP
                                    {initialValues && tieneDocumento('permiso_espiritu_santo_conanp') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="permiso_espiritu_santo_conanp"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Permiso Tiburón Ballena DGVS
                                    {initialValues && tieneDocumento('permiso_tiburon_ballena_dgvs') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="permiso_tiburon_ballena_dgvs"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Registro Nacional Turismo
                                    {initialValues && tieneDocumento('registro_nacional_turismo') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="registro_nacional_turismo"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Registro Nacional Embarcaciones
                                    {initialValues && tieneDocumento('registro_nacional_embarcaciones') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="registro_nacional_embarcaciones"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Constancia Residencia/Acta Nacimiento
                                    {initialValues && tieneDocumento('constancia_residencia_acta_nacimiento') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="constancia_residencia_acta_nacimiento"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Carta Verdad Propia Oficina
                                    {initialValues && tieneDocumento('carta_verdad_propia_oficina') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="carta_verdad_propia_oficina"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Carta Verdad Trabajado Zona Malecón
                                    {initialValues && tieneDocumento('carta_verdad_trabajado_zona_malecon') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="carta_verdad_trabajado_zona_malecon"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Carta No Concesión Playa ZOFEMAT
                                    {initialValues && tieneDocumento('carta_no_concesion_playa_zofemat') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="carta_no_concesion_playa_zofemat"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Permiso Uso Muelle Fiscal API
                                    {initialValues && tieneDocumento('permiso_uso_muelle_fiscal_api') && (
                                        <span style={{ color: 'green', marginLeft: '10px' }}>(Documento ya subido)</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="permiso_uso_muelle_fiscal_api"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        style={{ 
                            padding: '10px 20px', 
                            background: '#1890ff', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer'
                        }}
                    >
                        {initialValues ? 'Actualizar Embarcación' : 'Registrar Embarcación'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{ 
                            padding: '10px 20px', 
                            background: '#f0f0f0', 
                            color: '#333', 
                            border: '1px solid #d9d9d9', 
                            borderRadius: '4px', 
                            cursor: 'pointer'
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Formulario;