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
    .js('resources/js/ExpoEmprendedores.js', 'public/js')
    .js('resources/js/pages/Dashboard/Dashboard.js', 'public/js/pages/Dashboard/Dashboard.js')
    .js('resources/js/components/layouts/Header.js', 'public/js/components/layouts/Header.js')
    .js('resources/js/components/layouts/Footer.js', 'public/js/components/layouts/Footer.js')
    .js('resources/js/pages/Auth/Login.js', 'public/js/pages/Auth')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps()
    .version();
