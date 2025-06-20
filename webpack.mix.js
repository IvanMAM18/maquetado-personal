const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')

    .js('resources/js/dashboard_admin/pages/embarcaciones/embarcaciones.js', 'public/js/dashboard_admin/pages/embarcaciones')
    .js('resources/js/dashboard_admin/pages/embarcaciones/mode/embarcacionesMovil.js', 'public/js/dashboard_admin/pages/embarcaciones/mode')
    .js('resources/js/dashboard_admin/pages/embarcaciones/mode/embarcacionesWeb.js', 'public/js/dashboard_admin/pages/embarcaciones/mode')


    .js('resources/js/dashboard_admin/pages/perfil.js', 'public/js/dashboard_admin/pages')
    .js('resources/js/dashboard_admin/pages/usuarios.js', 'public/js/dashboard_admin/pages')

    .js(
        "resources/js/dashboard_admin/home_reports.js",
        "public/js/dashboard_admin"
    )
    
    .js('resources/js/components/layouts/Header.js', 'public/js/components/layouts/Header.js')
    .js('resources/js/components/layouts/Footer.js', 'public/js/components/layouts/Footer.js')

    .js('resources/js/components/MenuBar.js', 'public/js/components/MenuBar.js')
    .js('resources/js/components/modeMenu/MenuBarWeb.js', 'public/js/components/modeMenu/MenuBarWeb.js')
    .js('resources/js/components/modeMenu/MenuBarMovil.js', 'public/js/components/modeMenu/MenuBarMovil.js')

    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps()
    .version();
