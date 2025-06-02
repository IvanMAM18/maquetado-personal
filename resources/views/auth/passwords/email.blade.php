@extends('layouts.app')

@section('content')

<div class="login-container">
    <div class="login-card">
        <div class="login-header">
            <h2>{{ __('Reset Password') }}</h2>
            <p class="login-description">Ingresa tu correo para recibir el enlace de restablecimiento</p>
        </div>

        <div class="login-body">
            @if (session('status'))
                <div class="alert-message success">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('password.email') }}">
                @csrf

                <div class="form-group">
                    <label for="email" class="sr-only">{{ __('Email Address') }}</label>
                    <div class="input-with-icon">
                        <span class="input-icon">
                            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </span>
                        <input id="email" type="email" class="form-input @error('email') is-invalid @enderror" 
                               name="email" value="{{ old('email') }}" 
                               required autocomplete="email" autofocus placeholder="{{ __('Email Address') }}">
                    </div>
                    @error('email')
                        <span class="error-message">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="form-actions">
                    <button type="submit" class="login-button">
                        {{ __('Send Password Reset Link') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    /* Estilos generales (consistentes con los anteriores) */
    :root {
        --primary-color: #168284;
        --primary-dark: #0e5e60;
        --error-color: #e74c3c;
        --success-color: #28a745;
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
        background-color: var(--light-gray);
    }

    .login-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23168284' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2' /%3E%3Ccircle cx='12' cy='6' r='3' /%3E%3C/svg%3E");
        background-size: 40px 40px;
        background-repeat: repeat;
        opacity: 0.05;
        z-index: 0;
    }
    
    .login-card {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 500px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
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
    
    .alert-message {
        padding: 12px 15px;
        margin-bottom: 20px;
        border-radius: 5px;
        font-size: 0.95rem;
    }
    
    .alert-message.success {
        background-color: rgba(40, 167, 69, 0.1);
        color: var(--success-color);
        border: 1px solid rgba(40, 167, 69, 0.2);
    }
    
    .form-group {
        margin-bottom: 1.5rem;
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
    
    .form-input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background-color: transparent;
    }
    
    .form-input:focus {
        border-color: var(--primary-color);
        outline: none;
        box-shadow: 0 0 0 3px rgba(22, 130, 132, 0.2);
        background-color: white;
    }
    
    .form-input.is-invalid {
        border-color: var(--error-color);
    }
    
    .error-message {
        display: block;
        margin-top: 0.5rem;
        color: var(--error-color);
        font-size: 0.875rem;
    }
    
    .form-actions {
        margin-top: 2rem;
    }
    
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
    
    @media (max-width: 576px) {
        .login-card {
            border-radius: 0;
            box-shadow: none;
        }
        
        .login-container {
            padding: 0;
        }
    }
</style>

@endsection
