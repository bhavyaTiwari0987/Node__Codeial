const gulp = require('gulp');
const {src, dest , series, watch, parallel} = require('gulp');
const concat = require('gulp-concat');
const terser  = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const rev = require('gulp-rev');


const jsPath = 'assets/js/**/*.js';
const cssPath = 'assets/css/**/*.css';


function jsTask(){
   return src(jsPath)
   // .pipe(sourcemaps.init())
   .pipe(terser())
   // .pipe(sourcemaps.write('.'))
   .pipe(rev())
   .pipe(dest('public/assets/js'))
   .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
   .pipe(gulp.dest('public/assets/js'));

}

function cssTask (){
   return src(cssPath)
   // .pipe(sourcemaps.init())
   .pipe(postcss([autoprefixer() , cssnano()]))
   // .pipe(sourcemaps.write('.'))
   .pipe(rev())
   .pipe(dest('public/assets/css'))
   .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
   .pipe(gulp.dest('public/assets'));
  
}

function watchTask (){
   watch([cssPath , jsPath] , {interval: 1000} , parallel(cssTask , jsTask));
}

exports.jsTask = jsTask;
exports.cssTask = cssTask;
exports.default = series(parallel(jsTask , cssTask) , watchTask);
// exports.default = parallel(jsTask , cssTask); 

