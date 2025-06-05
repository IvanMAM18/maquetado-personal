import React from 'react';

const EmbarcacionModal = ({
  currentEmbarcacion,
  formData,
  loading,
  handleChange,
  handleFileChange,
  handleSubmit,
  setModalOpen
}) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {currentEmbarcacion ? (
              <>
                <svg style={styles.editIcon} viewBox="0 0 24 24" fill="none" stroke="#4a6cf7">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar Embarcación
              </>
            ) : (
              <>
                <svg style={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="#10b981">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                Nueva Embarcación
              </>
            )}
          </h2>
        </div>

        <div style={styles.modalContent}>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Primera sección - Datos básicos */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Información Básica</h3>
              <div style={styles.twoColumnGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Número Embarcación*</label>
                  <input
                    type="text"
                    name="numero_embarcacion"
                    value={formData.numero_embarcacion}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Nombre Embarcación*</label>
                  <input
                    type="text"
                    name="nombre_embarcacion"
                    value={formData.nombre_embarcacion}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Número Permiso Náutico*</label>
                  <input
                    type="text"
                    name="numero_permiso_nautico"
                    value={formData.numero_permiso_nautico}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Nombre Permisionario*</label>
                  <input
                    type="text"
                    name="nombre_permisionario"
                    value={formData.nombre_permisionario}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Nombre Representante</label>
                  <input
                    type="text"
                    name="nombre_representante"
                    value={formData.nombre_representante}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Capacidad Pasajeros*</label>
                  <input
                    type="number"
                    name="capacidad_pasajeros"
                    value={formData.capacidad_pasajeros}
                    onChange={handleChange}
                    min="1"
                    required
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Segunda sección - Horarios y contacto */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Horarios y Contacto</h3>
              <div style={styles.twoColumnGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Turno de Salida*</label>
                  <select
                    name="turno_salida"
                    value={formData.turno_salida}
                    onChange={handleChange}
                    required
                    style={styles.select}
                  >
                    <option value="">Seleccione un turno</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Nocturno">Nocturno</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Hora de Salida*</label>
                  <input
                    type="time"
                    name="hora_salida"
                    value={formData.hora_salida}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Teléfono Contacto*</label>
                  <input
                    type="tel"
                    name="telefono_contacto"
                    value={formData.telefono_contacto}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Contacto*</label>
                  <input
                    type="email"
                    name="email_contacto"
                    value={formData.email_contacto}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Tercera sección - Servicios y seguros */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Servicios y Seguros</h3>
              <div style={styles.twoColumnGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Servicio Ofrecido*</label>
                  <select
                    name="servicio_ofrecido"
                    value={formData.servicio_ofrecido}
                    onChange={handleChange}
                    required
                    style={styles.select}
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="Nado con el Tiburón Ballena (1 de octubre a 30 abril)">Nado con el Tiburón Ballena</option>
                    <option value="Paseo de día y 'snorkel' a la Isla Espirítu Santo">Paseo a Isla Espíritu Santo</option>
                    <option value="Paseo de día y 'snorkel' a Balandra">Paseo a Balandra</option>
                    <option value="Pesca deportiva">Pesca deportiva</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Carrusel*</label>
                  <select
                    name="carrusel"
                    value={formData.carrusel}
                    onChange={handleChange}
                    required
                    style={styles.select}
                  >
                    <option value="A">Carrusel A</option>
                    <option value="B">Carrusel B</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Vigencia Certificado Seguridad*</label>
                  <input
                    type="date"
                    name="vigencia_certificado_seguridad"
                    value={formData.vigencia_certificado_seguridad}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Número Póliza Seguro*</label>
                  <input
                    type="text"
                    name="numero_poliza_seguro"
                    value={formData.numero_poliza_seguro}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Teléfono Siniestros*</label>
                  <input
                    type="tel"
                    name="telefono_siniestros"
                    value={formData.telefono_siniestros}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Cuarta sección - Foto */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Foto de la Embarcación</h3>
              <div style={styles.inputGroup}>
                {currentEmbarcacion?.foto_embarcacion && (
                  <div style={styles.currentFile}>
                    <p style={styles.currentFileLabel}>Imagen actual:</p>
                    <img 
                      src={currentEmbarcacion.foto_embarcacion} 
                      alt="Foto actual de la embarcación"
                      style={styles.currentImage}
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="foto_embarcacion"
                  onChange={handleFileChange}
                  accept="image/*"
                  required={!currentEmbarcacion}
                  style={styles.fileInput}
                />
              </div>
            </div>

            {/* Quinta sección - Documentación */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Documentación Requerida</h3>
              <div style={styles.twoColumnGrid}>
                {renderDocumentInput('permiso_turismo_nautico', 'Permiso Turismo Náutico')}
                {renderDocumentInput('permiso_pesca_deportiva', 'Permiso Pesca Deportiva')}
                {renderDocumentInput('permiso_balandra_conanp', 'Permiso Balandra CONANP')}
                {renderDocumentInput('permiso_espiritu_santo_conanp', 'Permiso Espíritu Santo CONANP')}
                {renderDocumentInput('permiso_tiburon_ballena_dgvs', 'Permiso Tiburón Ballena DGVS')}
                {renderDocumentInput('registro_nacional_turismo', 'Registro Nacional Turismo')}
                {renderDocumentInput('registro_nacional_embarcaciones', 'Registro Nacional Embarcaciones')}
                {renderDocumentInput('constancia_residencia_acta_nacimiento', 'Constancia Residencia/Acta Nacimiento')}
                {renderDocumentInput('carta_verdad_propia_oficina', 'Carta Verdad Propia Oficina')}
                {renderDocumentInput('carta_verdad_trabajado_zona_malecon', 'Carta Verdad Trabajado Zona Malecón')}
                {renderDocumentInput('carta_no_concesion_playa_zofemat', 'Carta No Concesión Playa ZOFEMAT')}
                {renderDocumentInput('permiso_uso_muelle_fiscal_api', 'Permiso Uso Muelle Fiscal API')}
              </div>
            </div>

            {/* Botones de acción */}
            <div style={styles.actionButtons}>
              <button 
                type="button" 
                onClick={() => setModalOpen(false)}
                style={styles.cancelButton}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={loading}
                style={loading ? styles.submitButtonDisabled : styles.submitButton}
              >
                {loading ? (
                  <>
                    <svg style={styles.spinnerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <svg style={styles.saveIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Guardar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function renderDocumentInput(name, label) {
    return (
      <div style={styles.inputGroup}>
        <label style={styles.label}>{label}</label>
        {currentEmbarcacion?.documentacion?.[name] && (
          <div style={styles.currentFile}>
            <a 
              href={currentEmbarcacion.documentacion[name]} 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.documentLink}
            >
              <svg style={styles.downloadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Ver documento actual
            </a>
          </div>
        )}
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          accept=".pdf"
          style={styles.fileInput}
        />
      </div>
    );
  }
};

// Estilos separados para mejor organización
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
    zIndex: 1000,
    padding: '20px'
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '900px',
    maxHeight: '90vh',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  modalHeader: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f8fafc'
  },
  modalTitle: {
    margin: 0,
    color: '#1e293b',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  editIcon: {
    width: '24px',
    height: '24px'
  },
  addIcon: {
    width: '24px',
    height: '24px'
  },
  modalContent: {
    overflowY: 'auto',
    padding: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  section: {
    padding: '15px',
    borderRadius: '6px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0'
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '15px',
    color: '#334155',
    fontSize: '1.2rem',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '8px'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  inputGroup: {
    marginBottom: '10px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#475569',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
    backgroundColor: 'white',
    ':focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
    }
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    ':focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
    }
  },
  fileInput: {
    width: '100%',
    padding: '8px 0',
    fontSize: '14px',
    cursor: 'pointer'
  },
  currentFile: {
    marginBottom: '10px'
  },
  currentFileLabel: {
    marginBottom: '5px',
    fontSize: '13px',
    color: '#64748b'
  },
  currentImage: {
    maxWidth: '100%',
    maxHeight: '150px',
    borderRadius: '4px',
    border: '1px solid #e2e8f0'
  },
  documentLink: {
    color: '#3b82f6',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  downloadIcon: {
    width: '14px',
    height: '14px'
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#e2e8f0'
    }
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#2563eb'
    }
  },
  submitButtonDisabled: {
    padding: '10px 20px',
    backgroundColor: '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  saveIcon: {
    width: '16px',
    height: '16px'
  },
  spinnerIcon: {
    width: '16px',
    height: '16px',
    animation: 'spin 1s linear infinite'
  }
};

export default EmbarcacionModal;