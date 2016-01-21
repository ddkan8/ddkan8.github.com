// npm install --save-dev gulp gulp-less gulp-autoprefixer gulp-cssnano gulp-jshint gulp-uglify gulp-imagemin gulp-tinypng gulp-jade gulp-rename gulp-concat gulp-rev gulp-notify gulp-plumber gulp-cache del browser-sync browsersync-ssi gulp-zip

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
    rev = require('gulp-rev'),                     // 给文件加版本号, 如 'script-$version$.js'
    notify = require('gulp-notify'),               // 任务更改提醒
    plumber = require('gulp-plumber'),             // 错误提示
    cache = require('gulp-cache'),                 // 图片缓存，只有图片替换了才压缩
    del = require('del'),                          // 删除文件和文件夹
    browserSync = require('browser-sync'),         // 自动刷新页面
    SSI = require('browsersync-ssi'),              // .shtml文件解析
    zip = require('gulp-zip');                     // 打包压缩

var path_src = {
        // JADA : "src/jade/**/*.jade",
        HTML : "src/html/**/*.html",
        LESS : "src/less/**/*.less",
        JS   : "src/js/**/*.js",
        IMG  : "src/img/**/*"
    };

var path_dist = {
        HTML : "dist/html",
        CSS : "dist/css",
        JS   : "dist/js",
        IMG  : "dist/img"
    };

// 编译Jade
// gulp.task('jade', function() {
//     var YOUR_LOCALS = {};
 
//     gulp.src(path_src.JADE)
//         .pipe(jade({
//             locals: YOUR_LOCALS,
//             // html不压缩
//             pretty: true
//         }))
//     .pipe(gulp.dest(path_dist.HTML))
//     // .pipe(notify("Jade任务完成"))
//     .pipe(browserSync.stream());
// });

// html任务
gulp.task("html", function() {
    return gulp.src(path_src.HTML)
    .pipe(plumber())
    .pipe(gulp.dest(path_dist.HTML))
    .pipe(browserSync.stream());
})

// less任务
gulp.task("less", function() {
    // 编译sass
    return gulp.src(path_src.LESS)
    .pipe(plumber())
    .pipe(less())
    // 添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // 保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest(path_dist.CSS))
    // 给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    // 压缩样式文件
    .pipe(cssnano())
    .pipe(rev())
    // 输出压缩文件到指定目录
    .pipe(gulp.dest(path_dist.CSS))
    // 提醒任务完成
    // .pipe(notify({ message: 'Styles任务完成' }))
    .pipe(browserSync.stream());
});

// scripts任务
gulp.task('scripts', function() {
    // js代码校验
    return gulp.src(path_src.JS)
    .pipe(plumber())
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    // js代码合并
    // .pipe(concat('global.js'))
    .pipe(gulp.dest(path_dist.JS))
    // 给文件添加.min后缀
    .pipe(rename({suffix: '.min'}))
    // 压缩脚本文件
    .pipe(uglify())
    .pipe(rev())
    // 输出压缩文件到指定目录
    .pipe(gulp.dest(path_dist.JS))
    // 提醒任务完成
    // .pipe(notify({ message: 'Scripts任务完成' }))
    .pipe(browserSync.stream());
});

// images任务
gulp.task('images', function() {  
    return gulp.src(path_src.IMG)
    .pipe(plumber())
    // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(path_dist.IMG))
    // .pipe(notify({ message: 'images任务完成' }))
    .pipe(browserSync.stream());
});

// tinypng任务
gulp.task('tinypng', function () {
    return gulp.src(['src/**/*.png','src/**/*.jpg'])
    .pipe(plumber())
    .pipe(tinypng('2oC5A6LlO0mnj3CQ-WhKDyZ6CoFlLUtp'))
    .pipe(gulp.dest(path_dist.IMG))
    .pipe(browserSync.stream());
});

// clean任务
gulp.task('clean',function(cb){
  del(['dist'],cb)
})

// release
gulp.task('release', function(){
    return gulp.src('dist/**/*')
    .pipe(plumber())
    .pipe(zip('release.zip'))
    .pipe(rev())
    .pipe(gulp.dest('release'));
});

gulp.task("serve", ["html", "less", "scripts", "images"], function() {
    browserSync.init({
        // server : "./"
        server : {
            baseDir : ["./dist"],
            middleware : SSI({
                baseDir : './dist',
                ext : '.shtml',
                version : '2.10.0'
            })
        }
    });

    gulp.watch(path_src.HTML, ["html"]);
    gulp.watch(path_src.LESS, ["less"]);
    gulp.watch(path_src.JS, ["scripts"]);
    gulp.watch(path_src.IMG, ["images"]);
    gulp.watch(path_dist.HTML).on("change", function() {
        browserSync.reload;
    });
});

// 默认任务
gulp.task('default', ['serve']);

// 帮助提示
gulp.task('help',function () {
    console.log('----------------- 开发环境 -----------------');
    console.log('gulp default       开发环境（默认任务）');
    console.log('gulp html      HTML处理');
    console.log('gulp less      样式处理');
    console.log('gulp scripts        JS文件压缩&重命名');
    console.log('gulp images        图片压缩');
    console.log('---------------- 发布环境 -----------------');
    console.log('gulp release       打包发布');
    console.log('gulp clean     清理文件');
    console.log('---------------------------------------------');
});
