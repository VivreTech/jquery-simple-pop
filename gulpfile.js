var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var browserSync     = require('browser-sync').create();






// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: "google chrome",
        notify: false,
        ghostMode: false
    });
});


gulp.task('compress', function() {
    gulp.src('./src/js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
});



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 12 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'browser-sync'], function() {
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("**/*.html", browserSync.reload)
    gulp.watch("src/js/*.js", ['compress', browserSync.reload])
});