const {src, dest, watch}        = require('gulp');
const autoprefixer              = require('autoprefixer')
const cssnano                   = require('cssnano')
const postcss                   = require('gulp-postcss')
const sourcemaps                = require('gulp-sourcemaps')
const sass                      = require('gulp-sass')
const browserSync               = require('browser-sync').create()

// FILE PATH
const sassPath      = './app/sass/**/*.sass'
const jsPath        ='./app/js/**/*.js'
const cssPath       = './dist/css'

// SASS TASK
//COMPILE SASS TO CSS
function sassTask () {

    //Were is the SASS FILE
    return src(sassPath)
    // SOURCE MAP
    .pipe(sourcemaps.init())
    // Compile the SASS FILE TO CSS
    .pipe(sass().on('error', sass.logError))
    // AUTOPREFIXER AND CSS NANO
    .pipe(postcss([ autoprefixer, cssnano ]))
    // WRITE SOURCE MAP
    .pipe(sourcemaps.write('.'))
    // DESTINATION file css
    .pipe(dest(cssPath))

    // STREAM CHANGES TO ALL BROWSERS
    .pipe(browserSync.stream())
}


function compile() {
    //Initialize BrowserSync --- Base Directory './'
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    //Watch the SASS Directory and run Style Function
    watch('./app/sass/**/*.sass', sassTask);

    //Watch the HTML Files and Reload BrowserSync
    watch('./*.html').on('change', browserSync.reload);

     //Watch the JS Files and Reload BrowserSync
    //  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}


exports.default = compile;