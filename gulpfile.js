const {
  src,
  dest,
  watch
} = require('gulp')

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')

// FILE PATH
const sassPath = './app/sass/**/*.sass'
const jsPath = './app/js/**/*.js'
const cssPath = './dist/css'
const imgSource = './app/images/**/*.*'
const imgDest = './dist/img'

// SASS TASK
//COMPILE SASS TO CSS
function sassTask() {

  //Were is the SASS FILE
  return src(sassPath)
    // SOURCE MAP
    .pipe(sourcemaps.init())
    // Compile the SASS FILE TO CSS
    .pipe(sass().on('error', sass.logError))
    // AUTOPREFIXER AND CSS NANO
    .pipe(postcss([autoprefixer, cssnano]))
    // WRITE SOURCE MAP
    .pipe(sourcemaps.write('.'))
    // DESTINATION file css
    .pipe(dest(cssPath))

    // STREAM CHANGES TO ALL BROWSERS
    .pipe(browserSync.stream())
}

// Image Compression
function imgCompr() {

  return src(imgSource)
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(dest(imgDest));
};



function compile() {
  //Initialize BrowserSync --- Base Directory './'
  browserSync.init({

    browser: "firefox",

    server: {
      baseDir: './dist'
    }
  });

  //Watch the SASS Directory and run Style Function
  watch('./app/sass/**/*.sass', sassTask);

  //Watch the HTML Files and Reload BrowserSync
  watch('./dist/*.html').on('change', browserSync.reload);

  //Watch the Images to Minify
  // watch('./app/images/*', imgCompr);

  //Watch the JS Files and Reload BrowserSync
  //  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}


exports.default = compile;
exports.imgCompr = imgCompr;