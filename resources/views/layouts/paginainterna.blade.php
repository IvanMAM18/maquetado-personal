<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
       @include('includes.head')
    </head>
    <body class="antialiased">
        <div id="ayuntamiento_pi" >
            <header>
                @include('includes.header')
            </header>
            <main>
                @yield('contentpi')
            </main>
            <footer>
                @include('includes.footer')
            </footer>
        </div>

        @include('includes.scripts')
        <script src="{{ asset('js/welcome.js') }}" defer></script>
    </body>
</html>
