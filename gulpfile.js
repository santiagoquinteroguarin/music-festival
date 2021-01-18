const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');

// función que compila SASS
function css() {
    // src --> busca el archivo a compilar
    return src('src/scss/app.scss')
        // compilar a sass
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        // dest --> lugar donde va guardar lo compilado
        .pipe( dest('./build/css'))
}

function minificarcss() {
    return src('src/scss/app.scss')
        // compilar a sass
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        // dest --> lugar donde va guardar lo compilado
        .pipe( dest('./build/css'))
}

// minificar imagenes
function images() {
    return src('./src/img/**/*')
        .pipe(imagemin())
        // destino donde van a quedar las imagenes minificadas
        .pipe(dest('./build/img'))
        // notifica
        .pipe(notify({message: 'Imagen minificada'}));
}

// escucha los cambios que van teniendo los archivos
function watchFiles() {
    // * = la carpeta actual
    // ** = todos los archivos con esas extensión
    watch('src/scss/**/*.scss', css);
}

exports.watchFiles = watchFiles;
exports.css = css;
exports.minificarcss = minificarcss;
exports.images = images;
exports.default = series( css, images, watchFiles);
