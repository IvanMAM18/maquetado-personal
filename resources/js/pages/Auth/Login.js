import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function LoginForm () {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        remember: false
    });

    const [errors, setErrors] = useState({
        login: false,
        password: false
    });

    // Redirección si ya está autenticado
    useEffect(() => {
        if (document.getElementById('login-container')?.dataset.authenticated === 'true') {
            window.location.href = '/dashboard';
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            if (!csrfToken) throw new Error('CSRF token not found');

            const form = new FormData();
            form.append('login', formData.login);
            form.append('password', formData.password);
            form.append('remember', formData.remember);
            form.append('_token', csrfToken);

            const response = await fetch('/entrar', {
                method: 'POST',
                body: form,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.redirected) {
                window.location.href = response.url;
                return;
            }

            const data = await response.json();
            if (data.errors) {
                setErrors({
                    login: data.errors.login || false,
                    password: data.errors.password || false
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({
                login: true,
                password: true
            });
        }
    };

    return (
        <div className="fluid-container login-form">
            <div className="row justify-content-center" style={{ margin: "0 auto" }}>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Iniciar Sesión</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row mb-3">
                                    <label htmlFor="login" className="col-sm-4 col-form-label text-md-right">
                                        Nombre de usuario o Correo electrónico
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="login"
                                            type="text"
                                            className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                                            name="login"
                                            value={formData.login}
                                            onChange={handleChange}
                                            required
                                            autoFocus
                                        />
                                        {errors.login && (
                                            <span className="invalid-feedback">
                                                <strong>Hubo un error con el nombre de usuario o el correo</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">
                                        Contraseña
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.password && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>Hubo un error con la contraseña</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="remember"
                                                id="remember"
                                                checked={formData.remember}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="remember">
                                                Recordar usuario
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Iniciar Sesión
                                        </button>
                                        <a className="btn btn-link" href="/password/reset">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

if (document.getElementById('login-form-container')) {
    ReactDOM.render(<LoginForm />, document.getElementById('login-form-container'));
}
