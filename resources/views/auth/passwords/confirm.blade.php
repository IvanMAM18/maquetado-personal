@extends('layouts.app')

@section('content')

<div class="login-container">
    <div class="login-card">
        <div class="login-header">
            <h2>{{ __('Confirm Password') }}</h2>
            <p class="login-description">{{ __('Please confirm your password before continuing.') }}</p>
        </div>

        <div class="login-body">
            <form method="POST" action="{{ route('password.confirm') }}">
                @csrf

                <div class="form-group">
                    <label for="password" class="sr-only">{{ __('Password') }}</label>
                    <div class="input-with-icon">
                        <span class="input-icon">
                            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </span>
                        <input id="password" type="password" class="form-input @error('password') is-invalid @enderror" 
                               name="password" required autocomplete="current-password" placeholder="{{ __('Password') }}">
                        <span class="toggle-password" onclick="togglePasswordVisibility('password')">
                            <svg class="icon eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                            </svg>
                        </span>
                    </div>
                    @error('password')
                        <span class="error-message">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="form-actions">
                    <button type="submit" class="login-button">
                        {{ __('Confirm Password') }}
                    </button>
                    
                    @if (Route::has('password.request'))
                        <a class="forgot-password-link" href="{{ route('password.request') }}">
                            {{ __('Forgot Your Password?') }}
                        </a>
                    @endif
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    function togglePasswordVisibility(fieldId) {
        const passwordInput = document.getElementById(fieldId);
        const eyeIcon = passwordInput.parentElement.querySelector('.eye-icon');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>';
        }
    }
</script>

<style>
    /* Estilos generales consistentes */
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
        text-align: center;
    }
    
    .login-body {
        padding: 30px;
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
    
    .toggle-password {
        position: absolute;
        right: 15px;
        cursor: pointer;
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
    
    .error-message {
        display: block;
        margin-top: 0.5rem;
        color: var(--error-color);
        font-size: 0.875rem;
    }
    
    .form-actions {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
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
    
    .forgot-password-link {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.875rem;
        text-align: center;
        transition: color 0.2s ease;
    }
    
    .forgot-password-link:hover {
        text-decoration: underline;
        color: var(--primary-dark);
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
        
        .form-actions {
            gap: 0.5rem;
        }
    }
</style>

@endsection
