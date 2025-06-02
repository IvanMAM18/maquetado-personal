@extends('layouts.app')

@section('content')


@if(Auth::user())
    @php
        header("Location: " . URL::to('/dashboard'), true, 302);
        exit();
    @endphp
@endif

<div class="login-container">
    <div class="login-card">
        <!-- Contenedor del SVG de fondo -->
        <div class="background-svg-container">
            <svg class="background-svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>  
                <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />  
                <circle cx="12" cy="6" r="3" />
            </svg>
        </div>
        
        <div class="login-header">
            <h2>{{ __('Iniciar Sesión') }}</h2>
            <p class="login-description">Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <div class="login-body">
            <form method="POST" action="{{ route('entrar') }}">
                @csrf

                <div class="form-group">
                    <label for="login" class="sr-only">
                        {{ __('Nombre de usuario o Correo electrónico') }}
                    </label>
                    
                    <div class="input-with-icon">
                        <span class="input-icon">
                            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </span>
                        <input id="login" type="text" placeholder="Nombre de usuario o Correo electrónico"
                            class="form-input{{ $errors->has('name') || $errors->has('email') ? ' is-invalid' : '' }}"
                            name="login" value="{{ old('name') ?: old('email') }}" required autofocus>
                    </div>
                
                    @if ($errors->has('name') || $errors->has('email'))
                        <span class="error-message">
                            <strong>Hubo un error con el nombre de usuario o el correo</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group">
                    <label for="password" class="sr-only">{{ __('Contraseña') }}</label>
                    
                    <div class="input-with-icon">
                        <span class="toggle-password" onclick="togglePasswordVisibility()">
                            <svg class="icon eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </span>
                        <input id="password" type="password" placeholder="Contraseña" class="form-input @error('password') is-invalid @enderror" 
                               name="password" required autocomplete="current-password">
                    </div>

                    @error('password')
                        <span class="error-message">
                            <strong>Hubo un error con la contraseña</strong>
                        </span>
                    @enderror
                </div>

                <div class="form-options">
                    <div class="remember-me">
                        <input class="form-checkbox" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label class="form-check-label" for="remember">
                            {{ __('Recordar usuario') }}
                        </label>
                    </div>
                    
                    @if (Route::has('password.request'))
                        <a class="forgot-password" href="{{ route('password.request') }}">
                            {{ __('Olvidaste tu contraseña?') }}
                        </a>
                    @endif
                </div>

                <div class="form-actions">
                    <button type="submit" class="login-button">
                        {{ __('Iniciar Sesión') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    
    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.querySelector('.eye-icon');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />';
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />';
        }
    }
</script>

<style>
    /* Estilos generales */
    :root {
        --primary-color: #168284;
        --primary-dark: #0e5e60;
        --error-color: #e74c3c;
        --text-color: #333;
        --light-gray: #f5f5f5;
        --border-color: #ddd;
        --svg-color: #168284;
        --icon-color: #168284;
    }
    
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        position: relative;
        overflow: hidden;
        background-color: white;
    }

    /* Nuevo fondo con iconos dispersos */
    .login-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23168284' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2' /%3E%3Ccircle cx='12' cy='6' r='3' /%3E%3C/svg%3E");
        background-size: 20px 20px;
        background-repeat: repeat;
        opacity: 0.1; /* Opacidad muy baja para los iconos de fondo */
        z-index: 0;
    }
    
    .login-card {
        position: relative;
        z-index: 1; /* Asegura que el contenido esté por encima del fondo */
        width: 100%;
        max-width: 500px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    /* Contenedor del SVG de fondo */
    .background-svg-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 0;
        pointer-events: none;
    }
    
    .background-svg {
        width: 100%;
        height: 100%;
        color: var(--svg-color);
        stroke-width: 3px;
        opacity: 0.1; /* Más visible pero sutil */
        animation: pulse 15s infinite alternate;
    }
    
    /* Animación sutil para el SVG */
    @keyframes pulse {
        0% {
            opacity: 0.1;
            transform: rotate(0deg);
        }
        100% {
            opacity: 0.2;
            transform: rotate(5deg);
        }
    }
    
    .login-card:hover {
        transform: translateY(-5px);
    }
    
    .login-header {
        padding: 25px 20px 15px;
        text-align: center;
        border-bottom: 1px solid var(--light-gray);
    }
    
    .login-header h2 {
        margin: 0 0 5px;
        font-size: 1.8rem;
        color: var(--text-color);
    }
    
    .login-description {
        margin: 0;
        color: #666;
        font-size: 0.95rem;
    }
    
    .login-body {
        padding: 30px;
    }
    
    /* Estilos para los elementos del formulario */
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-color);
        font-weight: 500;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
    
    .input-with-icon {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .input-icon {
        position: absolute;
        left: 15px;
        color: var(--icon-color);
        display: flex;
        align-items: center;
        height: 100%;
        z-index: 2;
    }
    
    .toggle-password {
        position: absolute;
        left: 15px; /* Cambiado a izquierda */
        cursor: pointer;
        color: var(--icon-color);
        display: flex;
        align-items: center;
        height: 100%;
        z-index: 2;
    }
    
    /* Estilos para los inputs */
    .form-input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background-color: transparent; /* Transparente por defecto */
        position: relative;
        z-index: 1;
    }
    
    .form-input:focus {
        border-color: var(--primary-color);
        outline: none;
        box-shadow: 0 0 0 3px rgba(22, 130, 132, 0.2);
        background-color: white; /* Fondo blanco al enfocar */
    }
    
    /* Estilo especial para el input de contraseña */
    .form-group:nth-child(2) .form-input {
        padding-left: 45px;
    }
    
    /* Mantener el resto de estilos igual */
    .form-input.is-invalid {
        border-color: var(--error-color);
        background-color: rgba(231, 76, 60, 0.1); /* Fondo rojo claro para inputs inválidos */
    }
    
    .error-message {
        display: block;
        margin-top: 0.5rem;
        color: var(--error-color);
        font-size: 0.875rem;
    }
    
    /* Estilos para las opciones */
    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }
    
    .remember-me {
        display: flex;
        align-items: center;
    }
    
    .form-checkbox {
        margin-right: 0.5rem;
        accent-color: var(--primary-color);
    }
    
    .forgot-password {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.875rem;
    }
    
    .forgot-password:hover {
        text-decoration: underline;
    }
    
    /* Estilos para el botón */
    .login-button {
        width: 100%;
        padding: 12px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .login-button:hover {
        background-color: var(--primary-dark);
    }
    
    .icon {
        width: 20px;
        height: 20px;
        color: var(--icon-color);
    }
    
    /* Responsive */
    @media (max-width: 576px) {
        .login-card {
            background: transparent;
            border-radius: 0;
            box-shadow: none;
            border: none; 
        }
        
        .login-container {
            padding: 0;
            background: white;
        }
        
        .background-svg {
            stroke-width: 3px; /* Un poco más fino en móviles */
        }
        
        .form-options {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .forgot-password {
            margin-top: 0.5rem;
        }
    }
</style>

@endsection
