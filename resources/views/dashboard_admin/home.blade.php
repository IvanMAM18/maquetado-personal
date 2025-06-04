<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
</head>

<body class="antialiased">
    @include('includes.scripts')
    <div id="cardReports"></div>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ mix('/js/dashboard_admin/home_reports.js') }}"></script>
</body>

</html>