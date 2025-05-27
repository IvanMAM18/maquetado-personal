<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Ayuntamiento') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Fonts -->
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
        
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/antd.css') }}" rel="stylesheet">
    
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm"style="display: none;">
            <div class="container" >
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            @if (Route::has('login'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                            @endif

                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
        <div id="app_layout" >
        <header>

                <nav class="navbar navbar-expand-md navbar-light ">
                    <div class="logo">
                        <a class="navbar-brand" href="{{ url('/') }}">
                        <img src="{{ asset('assets/images/updates/expo-logo.png') }}" alt="{{ config('app.name', 'Ayuntamiento') }}">
                        </a>
                        <span>
                            <span>H.XII Ayuntamiento de La Paz</span>
                            <span>Baja California Sur</span>
                        </span>
                    </div>
                    <div class="right-content py-4 px-1">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <!--li class="nav-item">
                                    <a class="nav-link" href="#seccion-cabildo">Cabildo</a>
                                </li>
                                <li-- class="nav-item">
                                    <a class="nav-link" href="#seccion-servicios">Trámites y servicios</a>
                                </li-->
                                <!--li class="nav-item">
                                    <a class="nav-link" href="/departamentos">Departamentos</a>
                                </li-->

                                @if (Route::has('login'))
                                    @auth
                                    <!--li class="nav-item">
                                        <a href="{{ url('/home') }}" class="nav-link">Panel de control</a>
                                    </li-->
                                    @else
                                    <!--li class="nav-item">
                                        <a href="{{ route('login') }}" class="nav-link">Iniciar Sesión</a>
                                    </li-->
                                    @if (Route::has('register'))
                                    <!--li class="nav-item">
                                        <a href="{{ route('register') }}" class="nav-link">Registrarse</a>
                                    </li-->
                                    @endif
                                    @endauth
                                @endif
                            </ul>
                        </div>
                    </div>

                </nav>         
            </header>
            <main class="py-4">
                @yield('content')
            </main>
            <footer>
                @include('includes.footer')
            </footer>
        </div>
    </div>
</body>
</html>
