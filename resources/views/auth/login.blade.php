@extends('layouts.app')

@section('content')

<div class="login-container">

    <!-- Mensaje de error temporal (ahora fuera del card) -->
    @if($errors->any())
        <div class="error-message-container">
            <div class="error-message-content text-center">
                <strong>No se pudo iniciar sesión. <br>
                    Verifica tus credenciales.
                </strong>
                <div class="error-timer-bar"></div>
            </div>
        </div>
    @endif

    <!-- Icono y título fuera y encima del card -->
    <div class="login-title-container">
        <svg class="title-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />  
            <circle cx="12" cy="6" r="3" />
        </svg>
        <h1 class="login-title">Turismo Nautico</h1>
    </div>
    
    
    
    <div class="login-card">
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

    // Ocultar mensaje de error después de 2 segundos
    document.addEventListener('DOMContentLoaded', function() {
        const errorMessage = document.querySelector('.error-message-container');
        if (errorMessage) {
            setTimeout(() => {
                errorMessage.style.opacity = '0';
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 500);
            }, 2000);
        }
    });
</script>

<style>
    /* Estilos generales */
    :root {
        --primary-color: #168284;
        --primary-dark: #0e5e60;
        --error-color: #e74c3c;
        --text-color: #fff;
        --light-gray: rgba(255, 255, 255, 0.1);
        --border-color: #168284;
        --svg-color: #fff;
        --icon-color: #fff;
        --card-bg: rgb(255, 255, 255);
    }
    
    .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        position: relative;
        overflow: hidden;
        background-color: #168284;
    }

    /* Fondo con iconos dispersos en blanco */
    .login-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2' /%3E%3Ccircle cx='12' cy='6' r='3' /%3E%3C/svg%3E");
        background-size: 20px 20px;
        background-repeat: repeat;
        opacity: 0.2;
        z-index: 0;
    }
    
    /* Contenedor del título e icono */
    .login-title-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        z-index: 1;
    }
    
    .title-icon {
        width: 40px;
        height: 40px;
        color: white;
        margin-right: 15px;
    }
    
    .login-title {
        color: white;
        font-size: 1.8rem;
        font-weight: bold;
        margin: 0;
    }
    
    /* Mensaje de error (ahora fuera del card) */
    .error-message-container {
        width: 100%;
        max-width: 500px;
        padding: 10px;
        margin-bottom: 15px;
        background-color: var(--error-color);
        color: white;
        border-radius: 5px;
        transition: opacity 0.5s ease;
        z-index: 1;
        opacity: 0.9;
    }
    
    .error-message-content {
        position: relative;
    }
    
    .error-timer-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: rgba(255, 255, 255, 0.5);
        animation: timerBar 2s linear forwards;
    }
    
    @keyframes timerBar {
        from { width: 100%; }
        to { width: 0%; }
    }
    
    .login-card {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 500px;
        background-color: var(--card-bg);
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        transition: transform 0.3s ease;
        opacity: 0.9;
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
        color: var(--primary-color);
    }
    
    .login-description {
        margin: 0;
        color: var(--primary-color);
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
        color: var(--primary-color);
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
    
    .input-icon, .toggle-password {
        position: absolute;
        left: 15px;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        height: 100%;
        z-index: 2;
    }
    
    /* Estilos para los inputs */
    .form-input {
        width: 100%;
        padding: 10px 15px 10px 45px;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        background-color: rgba(255, 255, 255, 0.6);
        color: #333;
    }
    
    .form-input:focus {
        border-color: var(--primary-dark);
        outline: none;
        box-shadow: 0 0 0 3px rgba(22, 130, 132, 0.2);
        background-color: white;
    }
    
    .form-input.is-invalid {
        border-color: var(--error-color);
        background-color: rgba(231, 76, 60, 0.1);
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
        color: var(--primary-color);
    }
    
    /* Responsive */
    @media (max-width: 576px) {
        
        .title-icon {
            width: 30px;
            height: 30px;
        }
        
        .login-title {
            font-size: 1.5rem;
        }
        
        .login-container {
            padding: 0;
        }
    }
</style>

@endsection