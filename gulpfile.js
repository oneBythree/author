let gulp = require('gulp');


gulp.task("scss", function() {
    return gulp.src("frontend/app/script/**/*.js")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("static/js/"));
});


gulp.task("js", function() {
    return gulp.src("frontend/app/script/**/*.js")
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest("static/js/"));
});


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
    return gulp.src('frontend/app/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dest/'));
})


