const gulp    = require('gulp');
const sass          = require('gulp-sass');
const browserSync   = require('browser-sync').create();


//COMPILE SASS TO CSS
function style () {

    //Were is the SASS FILE
    return gulp.src('./app/sass/**/*.sass')
    // Compile the SASS FILE TO CSS
    .pipe(sass())
    // DESTINATION file css
    .pipe( gulp.dest('./dist/css'))

    // STREAM CHANGES TO ALL BROWSERS
    .pipe(browserSync.stream())

}

function watch() {
    //Initialize BrowserSync --- Base Directory './'
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    //Watch the SASS Directory and run Style Function
    gulp.watch('./app/sass/**/*.sass', style);

    //Watch the HTML Files and Reload BrowserSync
    gulp.watch('./*.html').on('change', browserSync.reload);

     //Watch the JS Files and Reload BrowserSync
    //  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;