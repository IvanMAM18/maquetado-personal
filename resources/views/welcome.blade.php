<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @include('includes.head')
    </head>
    <body class="antialiased">
    <div id="expo-emprendedores-spa">
    </div>
        @include('includes.scripts')
        <script src="{{ mix('js/app.js') }}" defer></script>
        <script src="{{ mix('js/ExpoEmprendedores.js') }}" defer></script>
    </body>
</html>
