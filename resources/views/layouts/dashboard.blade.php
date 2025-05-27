
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'ForoEmprendedores') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script>
        window.csrf_token = '{{ csrf_token() }}';
    </script>

        <!-- Fonts -->
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
        
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="dashboard" class="dashboard-layout">
        <nav class="aside-links " id="dashboard-aside-links">
            <span class="dash-toggler">
                <span class="icon">
                    <i class="fas fa-angle-right"></i>
                </span>
            </span>
            <div class="dashboardnavwrapper">
                <div class="logo py-3 px-3">
                    <a class="navbar-brand" href="{{ url('/') }}">
                    <img src="{{ asset('assets/coralsoft-icon.png') }}" alt="{{ config('app.name', 'ExpoEmprendedores') }}">
                    </a>                        <span>
                                <span>Coral Soft</span>
                                <span>ExpoEmprendedores</span>
                            </span>
                </div>
                <div id="dashboardNavigation" class="dash-navigation py-5">
                    Navigation<br>
                    Links
                </div>
            </div>
        </nav>
        <main >
            <nav class="navbar navbar-expand-md navbar-light bg-white py-4">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                            <li class="nav-item">
                                <span>
                                    {{ Auth::user()->name }}
                                </span>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Cerrar sesión') }}
                                </a>
                            </li>
                            <li class="nav-item">
                                <div id="change_password_a">
                                    <a href="#" class="display-change-password-modal">{{ __('Cambiar contraseña') }}</a>
                                    <div class="change-password-modal --hidden">
                                        <form id="change_password_form">
                                            <input type="password" placeholder="Contraseña actual" id="current_password">
                                            <input type="password" placeholder="Nueva contraseña" id="new_password">
                                            <input type="password" placeholder="Confirmar" id="confirmation">
                                            <input type="submit" value="Cambiar contraseña">
                                        </form>
                                        <button id="cancel">Cancelar</button>
                                    </div>
                                </div>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </nav>
            @yield('content')
            <footer>
                <div class="logo">
                    <a class="navbar-brand" href="{{ url('/') }}">
                    <img src="{{ asset('assets/coralsoft-icon.png') }}" alt="{{ config('app.name', 'ExpoEmprendedores') }}">
                    </a>
                    <span><span>Coral Soft</span><span>ExpoEmprendedores</span></span>
                </div>
                <ul class="footer-links">
                    <li><a href="/#">Link</a></li>
                    <li><a href="/#">Link</a></li>
                    <li><a href="/#">Link</a></li>
                    <li><a href="/#">Link</a></li>
                </ul>
            </footer>
        </main>

    </div>
    @include('includes.scripts')
    <script>
        $(document).ready(()=>{
            if (document.getElementById('dashboard-aside-links')) {
                $('#dashboard-aside-links .dash-toggler').on('click', () => {
                    $('#dashboard-aside-links').toggleClass('show-side-bar');
                    $('.dashboard-layout > nav.aside-links .dash-toggler').toggleClass('dash-sidebar-open');
                });
            }
        });

    </script>
</body>
</html>
