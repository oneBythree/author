 'use strict';

 let gulp = require('gulp');

 let babel = require('gulp-babel');
 let sass = require('gulp-sass');

 let minifyCSS = require('gulp-minify-css'); //压缩样式
 let cssVer = require('gulp-make-css-url-version');

 let imagemin = require('gulp-imagemin'); //图片压缩

 let uglify = require('gulp-uglify'); //压缩js

 let concat = require('gulp-concat'); //文件合并

 let rename = require('gulp-rename'); //文件更名

 let htmlmin = require('gulp-htmlmin'); //压缩html

 let server = require('gulp-express');

 var gutil = require('gulp-util')

 //样式原始路径
 let oldStylesDir = "frontend/app/sass/**/*";
 //最新路径
 let newStylesDir = "static/css/";

 gulp.task("scss", function() {
     return gulp.src(oldStylesDir + ".scss")
         .pipe(sass().on("error", sass.logError))
         .pipe(minifyCSS({ compatibility: 'ie8' }))
         .pipe(gulp.dest(newStylesDir));
 });

 gulp.task("css", function() {
     return gulp.src(oldStylesDir + ".css")
         .pipe(cssVer())
         .pipe(minifyCSS({ compatibility: 'ie8' }))
         .pipe(gulp.dest(newStylesDir));
 })

 gulp.task("image", function() {
     return gulp.src("frontend/app/images/**/*.{png,jpg,gif,ico}")
         .pipe(imagemin())
         .pipe(gulp.dest("static/images"));
 })

 gulp.task("copy", function() {
     gulp.src("frontend/app/sass/*{eot,woff,svg,ttf}")
         .pipe(gulp.dest('static/css/'));
     gulp.src("frontend/app/font/*{eot,woff,svg,ttf}")
         .pipe(gulp.dest('static/font'));
 })


 gulp.task('concat', function() {
     gulp.src(["frontend/app/script/newindex/address.js", "frontend/app/script/newindex/login.js", "frontend/app/script/newindex/new-index.js"])
         .pipe(babel({ presets: ['es2015'] }))
         .pipe(concat('main.js'))
         .pipe(uglify().on('error', function(err) {
             gutil.log(err);
             this.emit('end');
         }))
         .pipe(gulp.dest('static/js/newindex/'));
 })

 gulp.task("html", function() {
     var options = {
         collapseWhitespace: true,
         collapseBooleanAttributes: true,
         removeComments: true,
         removeEmptyAttributes: true,
         removeScriptTypeAttributes: true,
         removeStyleLinkTypeAttributes: true,
         minifyJS: true,
         minifyCSS: true
     };
     return gulp.src('frontend/app/views/*.html')
         .pipe(htmlmin(options))
         .pipe(gulp.dest('static/views/'));
 })


 gulp.task("server", function() {
     server.run("app.js");
     gulp.watch('frontend/app/sass/**/*.scss', ['scss']);
     gulp.watch('frontend/app/script/newindex/**/*.js', ['concat']);
     gulp.watch('frontend/app/**/*.html', ['html']);
     gulp.watch("frontend/app/images/**/*.{png,jpg,gif,ico}", ['image']);
 })
