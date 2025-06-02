@auth
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('includes.head')
</head>
<body class="antialiased">
    <div id="dashboard" class="dashboard-layout"></div>
    @include('includes.scripts')
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/pages/Dashboard/Dashboard.js') }}" defer></script>
</body>
</html>
@else
<script>window.location = "/";</script>
@endauth