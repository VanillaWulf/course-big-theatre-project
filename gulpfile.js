const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('./scss/style.scss')
   .pipe(sass())
   .pipe(gulp.dest("./css"))
});

 gulp.task('server', function () {
   browserSync.init({   
        server: {  baseDir: "./"  }   
   });
});

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('webp', function () {
    return gulp.src('img/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
});

gulp.watch("scss/**/*.{scss,sass}", gulp.series('css', 'reload'));

gulp.task('start', gulp.series('css', 'server'));

gulp.task('img', gulp.series('webp'));
