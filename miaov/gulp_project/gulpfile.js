// npm install --save-dev gulp gulp-less gulp-autoprefixer gulp-cssnano gulp-jshint gulp-uglify gulp-imagemin imagemin-pngquant gulp-tinypng gulp-jade gulp-rename gulp-concat gulp-rev gulp-notify gulp-plumber gulp-cache del browser-sync browsersync-ssi gulp-zip

// 引入gulp和插件
var gulp = require('gulp'),                        // 主程序
    less = require('gulp-less'),                   // 将less编译成css文件
    autoprefixer = require('gulp-autoprefixer'),   // 添加CSS前缀
    cssnano = require('gulp-cssnano'),             // CSS压缩
    jshint = require('gulp-jshint'),               // 检查js
    uglify = require('gulp-uglify'),               // js压缩
    imagemin = require('gulp-imagemin'),           // 图片压缩
    pngquant = require('imagemin-pngquant'),       // 图片深度压缩
    tinypng = require('gulp-tinypng'),             // https://tinypng.com/ png和jpg图片压缩
    jade = require('gulp-jade'),                   // 将jade编译成html文件
    rename = require('gulp-rename'),               // 重命名
    concat = require('gulp-concat'),               // 合并文件
    rev = require('gulp-rev'),                     // 给文件加版本号, 如 'script-$version$.js'
    notify = require('gulp-notify'),               // 任务更改提醒
    plumber = require('gulp-plumber'),             // 任务错误中断自动重传
    cache = require('gulp-cache'),                 // 图片缓存，只有图片替换了才压缩
    del = require('del'),                          // 删除文件和文件夹
    browserSync = require('browser-sync'),         // 自动刷新页面
    SSI = require('browsersync-ssi'),              // .shtml文件解析
    zip = require('gulp-zip');                     // 打包压缩
// 源文件路径
var pathApp = {
        // JADA : "app/jade/**/*.jade",
        HTML : "app/html/**/*.html",
        LESS : "app/less/**/*.less",
        JS   : "app/js/**/*.js",
        IMG  : "app/img/**/*.{png,jpg,jpeg,gif,ico}"
    };
// 开发路径
var pathDev = {
        HTML : "build/develop",
        CSS : "build/develop/css",
        JS   : "build/develop/js",
        IMG  : "build/develop/img"
    }; 
// 发布路径
var pathPro = {
        HTML : "build/production",
        CSS : "build/production/css",
        JS   : "build/production/js",
        IMG  : "build/production/img"
    };

// 编译Jade
// gulp.task('jade', function() {
//     var YOUR_LOCALS = {};
 
//     gulp.src(pathApp.JADE)
//         .pipe(jade({
//             locals: YOUR_LOCALS,
//             // html不压缩
//             pretty: true
//         }))
//     .pipe(gulp.dest(pathDev.HTML))
//     .pipe(gulp.dest(pathPro.HTML))
//     // .pipe(notify("Jade任务完成"))
//     .pipe(browserSync.stream());
// });

// html任务
gulp.task("html", function() {
    return gulp.src(pathApp.HTML)
    .pipe(plumber())
    .pipe(gulp.dest(pathDev.HTML))
    .pipe(gulp.dest(pathPro.HTML))
    .pipe(browserSync.stream());
})

// less任务
gulp.task("less", function() {
    // 编译sass
    return gulp.src(pathApp.LESS)
    .pipe(plumber())
    .pipe(less())
    // 添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // 保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest(pathDev.CSS))
    // 给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    // 压缩样式文件
    .pipe(cssnano())
    // .pipe(rev())
    // 输出压缩文件到指定目录
    .pipe(gulp.dest(pathPro.CSS))
    // 提醒任务完成
    // .pipe(notify({ message: 'Styles任务完成' }))
    .pipe(browserSync.stream());
});

// scripts任务
gulp.task('scripts', function() {
    // js代码校验
    return gulp.src(pathApp.JS)
    .pipe(plumber())
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    // js代码合并
    // .pipe(concat('global.js'))
    .pipe(gulp.dest(pathDev.JS))
    // 给文件添加.min后缀
    .pipe(rename({suffix: '.min'}))
    // 压缩脚本文件
    .pipe(uglify())
    // .pipe(rev())
    // 输出压缩文件到指定目录
    .pipe(gulp.dest(pathPro.JS))
    // 提醒任务完成
    // .pipe(notify({ message: 'Scripts任务完成' }))
    .pipe(browserSync.stream());
});

// images任务
gulp.task('images', function() {  
    return gulp.src(pathApp.IMG)
    .pipe(plumber())
    // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(cache(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        // optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
        // progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
        // interlaced: true, // 类型：Boolean 默认：false 隔行扫描gif进行渲染
        // multipass: true, // 类型：Boolean 默认：false 多次优化svg直到完全优化
        use: [pngquant()] // 使用pngquant来压缩png图片
        // use: [pngquant({quality: '65-80'})]
    })))
    .pipe(gulp.dest(pathDev.IMG))
    .pipe(gulp.dest(pathPro.IMG))
    // .pipe(notify({ message: 'images任务完成' }))
    .pipe(browserSync.stream());
});

// tinypng任务
gulp.task('tinypng', function () {
    return gulp.src('app/img/**/*.{png,jpg,jpeg}')
    .pipe(plumber())
    .pipe(tinypng('2oC5A6LlO0mnj3CQ-WhKDyZ6CoFlLUtp'))
    .pipe(gulp.dest(pathDev.IMG))
    .pipe(gulp.dest(pathPro.IMG))
    .pipe(browserSync.stream());
});

// clean任务
gulp.task('clean',function(cb){
  del(['build'],cb)
})

// release
gulp.task('release', function(){
    return gulp.src('build/production/**/*')
    .pipe(plumber())
    .pipe(zip('release.zip'))
    // .pipe(rev())
    .pipe(gulp.dest('release'));
});

// releaseDev
gulp.task('releaseDev', function(){
    return gulp.src('build/develop/**/*')
    .pipe(plumber())
    .pipe(zip('releaseDev.zip'))
    .pipe(rev())
    .pipe(gulp.dest('release'));
});

gulp.task("serve", ["html", "less", "scripts", "images"], function() {
    browserSync.init({
        // server : "./"
        server : {
            baseDir : ["./build/develop"],
            middleware : SSI({
                baseDir : './build/develop',
                ext : '.shtml',
                version : '2.10.0'
            })
        }
    });

    gulp.watch(pathApp.HTML, ["html"]);
    gulp.watch(pathApp.LESS, ["less"]);
    gulp.watch(pathApp.JS, ["scripts"]);
    gulp.watch(pathApp.IMG, ["images"]);
    gulp.watch(pathPro.HTML).on("change", function() {
        browserSync.reload;
    });
});

// 默认任务
gulp.task('default', ['serve', 'html']);