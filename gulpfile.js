const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

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

// escucha los cambios que van teniendo los archivos
function watchFiles() {
    watch('src/scss/app.scss', css)
}

exports.watchFiles = watchFiles;
exports.css = css;
exports.minificarcss = minificarcss;
