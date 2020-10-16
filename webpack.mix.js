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
    .sourceMaps()
    .sass('resources/sass/app.scss', 'public/css');
/*con esto puedo acceder a las proppiedades de browsersync con el cual podemos agregar contnido sin que se tenga
que actualizar constantmente*/
mix.browserSync('http://localhost:8000');


mix.copy('node_modules/bootstrap4-toggle/js/bootstrap4-toggle.min.js', 'public/js')
mix.copy('node_modules/bootstrap4-toggle/css/bootstrap4-toggle.min.css', 'public/css')

mix.copy('vendor/tinymce/tinymce/tinymce.min.js', 'public/js/tinymce');
mix.copy('vendor/tinymce/tinymce/themes', 'public/js/tinymce/themes');
mix.copy('vendor/tinymce/tinymce/skins', 'public/js/tinymce/skins');
mix.copy('vendor/tinymce/tinymce/plugins', 'public/js/tinymce/plugins');
mix.copy('vendor/tinymce/tinymce/icons', 'public/js/tinymce/icons');