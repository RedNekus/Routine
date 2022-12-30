const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); //Подключаем Sass пакет

gulp.task('sass', () => { // Создаем таск "sass"
    return gulp.src('scss/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
});

gulp.task('watch', function() {
    gulp.watch('scss/*.scss', gulp.parallel('sass'));
});