<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
</head>

<body>
    <div id="app">
        <div id="app_layout">
            <div id="header_app"></div>
            <main class="main-content">
                <div class="content-container">
                    @yield('content')
                </div>
            </main>
            <div id="footer_app"></div>
        </div>
    </div>
    <!-- Scripts al final del body -->
    @include('includes.scripts')
    <script src="{{ mix('js/components/layouts/Header.js') }}"></script>
    <script src="{{ mix('js/components/layouts/Footer.js') }}"></script>
</body>

</html>

<style>
  .header-container {
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .header-banner {
    width: 100%;
    height: 25vw; /* Altura relativa al viewport width */
    background-image: url('{{ asset("assets/images/foro2025/CINTILLO-WEB.jpg") }}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .main-content {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .content-container {
    width: 90%;
    max-width: 1200px;
    margin: 10vw auto;
  }
  
  @media (max-width: 768px) {
    .header-banner {
      height: 85vh;
      width: 100%;
      background-image: url('{{ asset("assets/images/foro2025/TABLOIDE FORO DEL EMPRENDEDOR 2025.jpg") }}');
    }
    
    .content-container {
      width: 95%;
      padding: 100px 10px;
    }
  }
</style>