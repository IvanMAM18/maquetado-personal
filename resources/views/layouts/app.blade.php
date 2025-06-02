<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
</head>

<body>
    <div id="app">
        <div id="app_layout">

            <!-- <div id="header_app"></div> -->

            <main class="main-content">
                <div class="content-container">
                    @yield('content')
                </div>
            </main>
            
            <!-- <div id="footer_app"></div> -->
            
        </div>
    </div>
</body>

</html>

@include('includes.scripts')
<script src="{{ mix('js/components/layouts/Header.js') }}" defer></script>
<script src="{{ mix('js/components/layouts/Footer.js') }}" defer></script>

