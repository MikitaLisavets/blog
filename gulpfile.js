var remote = 'https://github.com/FeelEnergyCB/blog.git',
    gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    md = require('gulp-remarkable'),
    cheerio = require('gulp-cheerio'),
    file = require('gulp-file'),
    webserver = require('gulp-webserver'),
    minifyCSS = require('gulp-minify-css'),
    git = require('gulp-git'),
    date, file, header,
    json = [];
 
  gulp.task('less', function () {
    gulp.src('assets/less/**/*.less')
      .pipe(less())
      .pipe(minifyCSS())
      .on('error', function (err) {
        console.log(err.message.toUpperCase());
      })
      .pipe(gulp.dest('assets/css/'));
  });

  gulp.task('markdown', function () {
    return gulp.src('posts/text/**/*.md')
    .pipe(md({
      preset: 'full',
      remarkableOptions: {
        html: true,
        breaks: true
      }
      }))
    .on('error', function (err) {
      console.log(err.message.toUpperCase());
    })
    .pipe(gulp.dest('posts/html'));
  });

  gulp.task('compile', ['markdown'] , function () {
    return gulp.src(['posts/html/*.html'])
      .pipe(cheerio(function ($, file) {

        date = new Date($('time').text());
        header = $('h1').text();
        if ( file.history[0].lastIndexOf('/') < 0 ) {
          path = file.history[0].slice(file.history[0].lastIndexOf('\\') + 1, -5);
        } else {
          path = file.history[0].slice(file.history[0].lastIndexOf('/') + 1, -5);
        }

        json.push({
          date: date,
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          header: header,
          path: path
        });

        $('*').removeAttr('id');
      }))
      .pipe(gulp.dest('posts/html/'));
  });


  gulp.task('json', ['compile'] , function() {
    file('data.json', JSON.stringify(json))
      .pipe(gulp.dest('assets/json'));
    json = [];
  });

  gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: true
      }));
  });

  gulp.task('add', ['json'], function(){
    return gulp.src('./')
      .pipe(git.add({args: '--all'}));
  });

  gulp.task('commit', ['add'], function(){
    return gulp.src('./')
      .pipe(git.commit('Update blog'))
      .on('error', function (err) {
      });
  });

  gulp.task('push', ['commit'], function(){
    git.push('origin', 'master', function (err) {
      if (err) git.push('origin', 'master', function(){});
    });
  });

  gulp.task('addremote', function(){
    git.addRemote('origin', remote, function (err) {
      if (err) console.log(err);
    });
  });

  gulp.task('preview', ['less', 'json', 'webserver'] , function() {

    gulp.watch('assets/less/**/*.less', ['less']);

    gulp.watch('posts/text/**/*.md', ['json']);

  });

  gulp.task('process', ['less', 'json'] , function() {

  });


  gulp.task('publish', ['process', 'push'] , function() {

  });

  gulp.task('default', ['webserver'] , function() {

    gulp.watch('assets/less/**/*.less', ['less']);

    gulp.watch('posts/text/**/*.md', ['json']);

  });
