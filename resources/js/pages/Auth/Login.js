import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
        remember: false
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/entrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            
            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="fluid-container login-form">
            <div className="row justify-content-center" style={{margin: "0 auto"}}>
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
                                            className={`form-control ${errors.username || errors.email ? 'is-invalid' : ''}`}
                                            name="login" 
                                            value={loginData.login}
                                            onChange={handleChange}
                                            required 
                                            autoFocus
                                        />
                                        
                                        {(errors.username || errors.email) && (
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
                                            value={loginData.password}
                                            onChange={handleChange}
                                            required
                                        />

                                        {errors.password && (
                                            <span className="invalid-feedback">
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
                                                checked={loginData.remember}
                                                onChange={handleChange}
                                            />

                                            <label className="form-check-label" htmlFor="remember">
                                                Recordar usuario
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">s
                                        <button type="submit" className="btn btn-primary">
                                            Iniciar Sesión
                                        </button>

                                        <a className="btn btn-link" href="/password/reset">
                                            Olvidaste tu contraseña?
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

if (document.getElementById('login-root')) {
    ReactDOM.render(
        <React.StrictMode>
            <Login />
        </React.StrictMode>,
        document.getElementById('login-root')
    );
}