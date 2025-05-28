@if (Auth::user())
    @php
        //header("Location: " . URL::to('/dashboard'), true, 302);
    @endphp
@else
    @php
        header('Location: ' . URL::to('/'), true, 302);
        exit();
    @endphp
@endif
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
</head>

<body class="antialiased">
    <div id="dashboard" class="dashboard-layout">
    </div>
    @include('includes.scripts')
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/pages/Dashboard/Dashboard.js') }}" defer></script>
</body>

</html>
