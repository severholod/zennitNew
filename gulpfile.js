'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const autoprefixer = require('gulp-autoprefixer');
const remember = require('gulp-remember');
const path = require('path');
const cached = require('gulp-cached');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;
const cssnano = require('gulp-cssnano');
//const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant = require('imagemin-pngquant');
var critical = require('critical');
var includer = require('gulp-x-includer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('save', function() {
  return gulp.src('dev/**/*.*')
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlbuild', function(){
  return gulp.src('dev/html/*.html')
        .pipe(includer())
        .pipe(gulp.dest('dist'));
});
gulp.task('libs-js', function() {
  return combiner(
    gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/owl.carousel/dist/owl.carousel.min.js',
      'node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js',
      'node_modules/fancybox/dist/js/jquery.fancybox.pack.js',
      // 'node_modules/bootstrap/dist/js/bootstrap.min.js',
      //'node_modules/jquery.maskedinput.min.js',
      'dev/vendor/jquery.mb-comingsoon/jquery.mb-comingsoon.min.js',
      'node_modules/jquery-ui-dist/jquery-ui.js',
      'node_modules/readmore-js/readmore.min.js',
    ]),
    cached('libs-js'),
    sourcemaps.init(),
    remember('libs-js'),
    concat('libs.js'),
    uglify(),
    rename({suffix: '.min'}),
    sourcemaps.write('.'),
    gulp.dest('dist/js')
  ).on('error', notify.onError(function(err) {
    return {
      title: 'libs.js',
      message: err.message
    }  
  }));
});

gulp.task('js', function() {
  return combiner(
    gulp.src('dev/js/**/*.js'),
    cached('js'),
    sourcemaps.init(),
    remember('js'),
    concat('all.js'),
    uglify(),
    rename({suffix: '.min'}),
    sourcemaps.write('.'),
    gulp.dest('dist/js')
  ).on('error', notify.onError(function(err) {
    return {
      title: 'js',
      message: err.message
    }  
  }));
});

gulp.task('sass', function() {
  return combiner(
    gulp.src('dev/sass/main.sass'),
    sourcemaps.init(),
    sass(),
    autoprefixer(),
    concat('all.css'),
    cssnano(),
    rename({suffix: '.min'}),
    sourcemaps.write('.'),
    gulp.dest('dist/css')
  ).on('error', notify.onError(function(err) {
    return {
      title: 'sass',
      message: err.message
    }  
  }));
});

gulp.task('assets', function() {
  return combiner(
    gulp.src('dev/assets/**/*.*'),
    cached('assets'),
    newer('dist'),
    gulp.dest('dist')
  ).on('error', notify.onError(function(err) {
    return {
      title: 'assets',
      message: err.message
    }  
  }));
});

gulp.task('imagemin', function() {
  return combiner(
    gulp.src('dev/assets/img/**/*.*'),
    cached('image'),
    imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imageminJpegRecompress({
        loops: 5,
        min: 75,
        max: 90,
        quality: 'high'
      }),
      imagemin.svgo(),
      imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: [0.75, 0.9], speed: 5})
    ],{
      verbose: true
    }),
    newer('dist'),
    gulp.dest('dist/img')
  ).on('error', notify.onError(function(err) {
    return {
      title: 'imagemin',
      message: err.message
    }  
  }));
});

gulp.task('critical', function () {
  return combiner(
    gulp.src('dist/*.html'),
    critical({
      base: 'dist/',
      inline: true,
      minify: true
      //css: ['dist/styles/components.css','dist/styles/main.css']
    }),
    gulp.dest('dist')
  ).on('error', notify.onError(function(err) {
    return {
      title: 'critical',
      message: err.message
    }
  }));
});

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('libs', gulp.parallel('libs-js'));

gulp.task('build', gulp.series('clean', gulp.parallel('libs', 'sass', 'js', 'assets', 'htmlbuild')/*, 'imagemin'*/));

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    host: '192.168.1.45'
  });

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch(['dev/sass/**/*.sass', 'dev/vendor/**/*.css'], gulp.series('sass'));
  gulp.watch('dev/js/**/*.js', gulp.series('js')).on('unlink', function(filepath) {
    remember.forget('js', path.resolve(filepath));
    delete cached.caches.js[path.resolve(filepath)];
  });
  gulp.watch('dev/assets/**/*.*', gulp.series('assets')).on('unlink', function(filepath) {
    delete cached.caches.assets[path.resolve(filepath)];
  });
  gulp.watch('dev/html/**/*.html', gulp.series('htmlbuild'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));