@extends('layouts.app')

@section('content')

@if(Auth::user())
    @php
        header("Location: " . URL::to('/dashboard'), true, 302);
        exit();
    @endphp
@endif

<div class="fluid-container login-form">
    <div class="row justify-content-center"  style="margin:0 auto">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Iniciar Sesión') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('entrar') }}">
                        @csrf

                        <div class="form-group row mb-3" >
                            <label for="login" class="col-sm-4 col-form-label text-md-right">
                                {{ __('Nombre de usuario o Correo electrónico') }}
                            </label>
                        
                            <div class="col-md-6">
                                <input id="login" type="text"
                                    class="form-control{{ $errors->has('username') || $errors->has('email') ? ' is-invalid' : '' }}"
                                    name="login" value="{{ old('username') ?: old('email') }}" required autofocus>
                        
                                @if ($errors->has('username') || $errors->has('email'))
                                    <span class="invalid-feedback">
                                        <!--strong>{{ $errors->first('username') ?: $errors->first('email') }}</!--strong-->
                                        <strong>Hubo un error con el nombre de usuario o el correo</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row  mb-3"  >
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Contraseña') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <!--strong>{{ $message }}</strong-->
                                        <strong>Hubo un error con la contraseña</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row  mb-3"  >
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Recordar usuario') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0 " >
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Iniciar Sesión') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Olvidaste tu contraseña?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
