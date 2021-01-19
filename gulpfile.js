const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Utilidades CSS 
// agregar prefijos
const autoprefixer = require('autoprefixer');
// agregar procesamiento a nuestro css 
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    images: './src/img/**/*',
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
}

// función que compila SASS
function css() {
    // src --> busca el archivo a compilar
    return src(paths.scss)
        .pipe(sourcemaps.init())
        // compilar a sass
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        // autoprefixer - realizar mejoras
        .pipe(postcss(autoprefixer(), cssnano()))
        // crear un mapa en un nuevo archivo para saber en que archivos debemos hacer cambios futuros
        .pipe(sourcemaps.write('.'))
        // dest --> lugar donde va guardar lo compilado
        .pipe( dest('./build/css'))
}

function minificarcss() {
    return src(paths.scss)
        // compilar a sass
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        // dest --> lugar donde va guardar lo compilado
        .pipe( dest('./build/css'))
}

// JS --> concat sirve para compilar todos los archivos js juntos
function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        // codigo optimizado para producción
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./build/js'));
}

// minificar imagenes
function images() {
    return src(paths.images)
        .pipe(imagemin())
        // destino donde van a quedar las imagenes minificadas
        .pipe(dest('./build/img'))
        // notifica
        .pipe(notify({message: 'Imagen minificada'}));
}

// webp -- convertir las images a webp
function versionWebp() {
    return src(paths.images)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Versión webp lista'}));
}

// escucha los cambios que van teniendo los archivos
function watchFiles() {
    // * = la carpeta actual
    // ** = todos los archivos con esas extensión
    watch(paths.scss, css);
    watch(paths.js, javascript);
}

exports.watchFiles = watchFiles;
exports.css = css;
exports.minificarcss = minificarcss;
exports.images = images;
exports.default = series( css, javascript, images, versionWebp, watchFiles);
