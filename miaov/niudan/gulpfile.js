// 引入gulp和插件
var gulp = require('gulp'),                        // 主程序
    less = require('gulp-less'),                   // 将less编译成css文件
    autoprefixer = require('gulp-autoprefixer'),   // 添加CSS前缀
    cssnano = require('gulp-cssnano'),             // CSS压缩
    jshint = require('gulp-jshint'),               // 检查js
    uglify = require('gulp-uglify'),               // js压缩
    imagemin = require('gulp-imagemin'),           // 图片压缩
    tinypng = require('gulp-tinypng'),             // https://tinypng.com/ png和jpg图片压缩
    jade = require('gulp-jade'),                   // 将jade编译成html文件
    rename = require('gulp-rename'),               // 重命名
    concat = require('gulp-concat'),               // 合并文件
    notify = require('gulp-notify'),               // 任务更改提醒
    cache = require('gulp-cache'),                 // 图片缓存，只有图片替换了才压缩
    del = require('del'),                          // 删除文件和文件夹
    browserSync = require('browser-sync'),         // 自动刷新页面
    path = {
        HTML : "Wechat/public/html/weShop/*.html",
        LESS : "Wechat/public/style/less/*.less",
        CSS : "Wechat/public/style/css"
    };

// Styles任务
gulp.task('styles', function() {
    //编译sass
    return gulp.src('src/css/**/*.less')
    .pipe(less())
    //添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest('dist/content/css'))
    //给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    //压缩样式文件
    .pipe(cssnano())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('dist/content/css'))
    //提醒任务完成
    .pipe(notify({ message: 'Styles任务完成' }));
});

// Scripts任务
gulp.task('scripts', function() {
  //js代码校验
  return gulp.src('src/js/**/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint())
    //.pipe(jshint.reporter('default'))
    //js代码合并
    //.pipe(concat('global.js'))
    .pipe(gulp.dest('dist/content/js'))
    //给文件添加.min后缀
    .pipe(rename({suffix: '.min'}))
    //压缩脚本文件
    .pipe(uglify())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('dist/content/js'))
    //提醒任务完成
    .pipe(notify({ message: 'Scripts任务完成' }));
});

// 图片压缩
gulp.task('images', function() {  
  return gulp.src('src/img/**/*')
    // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/content/img'))
    .pipe(notify({ message: 'images任务完成' }));
});

gulp.task('tinypng', function () {
    gulp.src(['src/**/*.png','src/**/*.jpg'])
        .pipe(tinypng('2oC5A6LlO0mnj3CQ-WhKDyZ6CoFlLUtp'))
        .pipe(gulp.dest('dist/content/img'));
});

// // 编译Jade
// gulp.task('jade', function() {
//   var YOUR_LOCALS = {};
 
//   gulp.src('views/**/*.jade')
//     .pipe(jade({
//       locals: YOUR_LOCALS,
//       // html不压缩
//       pretty: true
//     }))
//     .pipe(gulp.dest('dist/assets/html'))
//     .pipe(notify("Jade任务完成"))
// });

// HTML处理
gulp.task('html', function() {
    var htmlSrc = 'views/**/*.html',
        htmlDst = 'dist';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst))
        .pipe(notify({ message: 'html任务完成' }));
});

gulp.task('clean',function(cb){
  del(['dist'],cb)
})

gulp.task('browser-sync', function() {
  browserSync({
    files: "**",
    server: {
        baseDir: "./"
    }
  });
});

// 默认任务
gulp.task('default', ['watch', 'browser-sync'], function() {  
    gulp.start('styles', 'scripts', 'images', 'html');
});

// 监听文件变化
gulp.task('watch', function() {

  // 监听所有.scss
  gulp.watch('src/css/**/*.less', ['styles']);

  // 监听所有.js
  gulp.watch('src/js/**/*.js', ['scripts']);

  // 监听所有图片
  gulp.watch('src/img/**/*', ['images']);

  gulp.watch('views/**/*.html', ['html']);


});
