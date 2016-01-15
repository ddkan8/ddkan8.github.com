// 引入gulp和插件
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    livereload = require('gulp-livereload');

// Styles任务
gulp.task('styles', function() {
    //编译sass
    return gulp.src('src/styles/main.scss')
    .pipe(sass())
    //添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest('dist/assets/css'))
    //给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    //压缩样式文件
    .pipe(minifycss())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('dist/assets/css'))
    //提醒任务完成
    .pipe(notify({ message: 'Styles任务完成' }));
});

// // Styles任务
// gulp.task('styles', function() {
//   //编译sass
//   return gulp.src('src/styles/main.scss')
//     .pipe(sass({ style: 'expanded' }))
//     //添加前缀
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     //保存未压缩文件到我们指定的目录下面
//     .pipe(gulp.dest('dist/assets/css'))
//     //给文件添加.min后缀
//     .pipe(rename({suffix: '.min'}))
//     //压缩样式文件
//     .pipe(minifycss())
//     //输出压缩文件到指定目录
//     .pipe(gulp.dest('dist/assets/css'))
//     //提醒任务完成
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// gulp.task('styles', function() {
//   return sass('src/styles/main.scss', { style: 'expanded' })
//     .pipe(autoprefixer('last 2 version'))
//     .pipe(gulp.dest('dist/assets/css'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(minifycss())
//     .pipe(gulp.dest('dist/assets/css'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// Scripts任务
gulp.task('scripts', function() {
  //js代码校验
  return gulp.src('src/scripts/**/*.js')
    //.pipe(jshint('.jshintrc'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    //js代码合并
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    //给文件添加.min后缀
    .pipe(rename({suffix: '.min'}))
    //压缩脚本文件
    .pipe(uglify())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('dist/assets/js'))
    //提醒任务完成
    .pipe(notify({ message: 'Scripts任务完成' }));
});

// 图片压缩
gulp.task('images', function() {  
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'images任务完成' }));
});

// 编译Jade
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('views/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      // html不压缩
      pretty: true
    }))
    .pipe(gulp.dest('dist/assets/html'))
    .pipe(notify("Templates任务完成"))
});
// gulp.task('jade', function() {
//   return gulp.src('views/**/*.jade')
//     .pipe(jade({ pretty: true }))
//     .pipe(gulp.dest('dist/assets/html'))
//     .pipe(notify({ message: 'jade任务完成' }));
// });

// 清除文件
// gulp.task('clean', function() {  
//   return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
//     .pipe(clean());
// });
gulp.task('clean',function(cb){
  del(['dist'],cb)
})

// 默认任务
gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts', 'images', 'templates');
});

// 监听文件变化
gulp.task('watch', function() {

  // 监听所有.scss
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // 监听所有.js
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // 监听所有图片
  gulp.watch('src/images/**/*', ['images']);

  gulp.watch('views/**/*.jade',['templates']);
  // gulp.watch('views/**/*.jade', ['jade']);

  livereload.listen();

  gulp.watch(['dist/**']).on('change', livereload.changed);

});

// gulp.task('watch', function() {

//   // 建立实时刷新服务器
//   var server = livereload();

//   // 监听所有在 dist/  目录下的文件，一旦有更新，便进行刷新
//   gulp.watch(['dist/**']).on('change', function(file) {
//     server.changed(file.path);
//   });

// });
