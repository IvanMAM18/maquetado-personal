<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
</head>

<body class="antialiased">
    <h1>Holaaaa blade</h1>
    @include('includes.scripts')
    <div id="homeEmbarcaciones"></div>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ mix('/js/dashboard_admin/pages/embarcaciones.js') }}"></script>
</body>

</html>