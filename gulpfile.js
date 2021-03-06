var remote = 'https://github.com/MikitaLisavets/MinimalistBlog.git',
    gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    md = require('gulp-remarkable'),
    cheerio = require('gulp-cheerio'),
    file = require('gulp-file'),
    clean = require('gulp-clean'),
    webserver = require('gulp-webserver'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    git = require('gulp-git'),
    lessAutoprefix = require('less-plugin-autoprefix'),
    date, file, header,
    json = [];

  function rePush(err) {
    if (err) {
      console.log('Error');
      git.push('origin', 'master', function(err) { rePush(err) } );
    }
  }

  gulp.task('less', function () {
    gulp.src('assets/styles/less/**/*.less')
      .pipe(less({
        plugins: [new lessAutoprefix({ browsers: ['last 4 versions'] })]
      }))
      .pipe(minifyCSS())
      .on('error', function (err) {
        console.log(err.message.toUpperCase());
      })
      .pipe(gulp.dest('assets/styles/css/'));
  });

  gulp.task('clear', function () {
      return gulp.src('posts/html/', {read: false})
          .pipe(clean());
  });

  gulp.task('markdown', ['clear'], function () {
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



  gulp.task('sync', ['markdown'] , function () {
    return gulp.src(['posts/html/*.html'])
      .pipe(cheerio(function ($, file) {

        time = $('time').text();
        id = +new Date(time);
        header = $('h1').text();
        preview = $('h1').next().text() + '..';
        if ( file.history[0].lastIndexOf('/') < 0 ) {
          path = file.history[0].slice(file.history[0].lastIndexOf('\\') + 1, -5);
        } else {
          path = file.history[0].slice(file.history[0].lastIndexOf('/') + 1, -5);
        }

        json.push({
          id: id,
          date: time,
          header: header,
          path: path,
          preview: preview
        });

        $('*').removeAttr('id');
      }))
      .pipe(gulp.dest('posts/html/'));
  });

  gulp.task('json', ['sync'] , function() {
    json.sort(function(a, b) {
      if (a.id > b.id) {
        return -1;
      }
      if (a.id < b.id) {
        return 1;
      }
      return 0;
    });
    file('data.json', JSON.stringify(json))
      .pipe(gulp.dest('assets/data'));
    json = [];
  });

  gulp.task('concat', function() {
    return gulp.src('assets/scripts/js/app/**/*.js')
      .pipe(concat('boundle.js', {newLine: ';'}))
      .pipe(gulp.dest('assets/scripts/js/'));
  });

  gulp.task('uglify', ['concat'], function() {
    gulp.src('assets/scripts/js/boundle.js')
      .pipe(uglify())
      .pipe(gulp.dest('assets/scripts/js/'));
  });

  gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        port: 8888,
        livereload: true,
        directoryListing: true,
        open: true
      }));
  });

  gulp.task('add', ['json'], function(){
    gulp.src('./')
      .pipe(git.add({args: '--all'}));
  });

  gulp.task('commit', ['add'], function(){
    gulp.src('./')
      .pipe(git.commit('Update blog'))
      .on('error', function (err) {
        console.log(err)
      });
  });

  gulp.task('push', ['commit'], function() {
    git.push('origin', 'gh-pages', function(err) { rePush(err) });
  });

  gulp.task('addremote', ['removeremote'], function(){
    git.addRemote('origin', remote, function (err) {
      if (err) console.log(err);
    });
  });

  gulp.task('removeremote', function(){
    git.removeRemote('origin', function (err) {
      if (err) console.log(err);
    });
  });


  gulp.task('preview', ['compile', 'webserver'] , function() {
    gulp.watch('assets/scripts/js/app/**/*.js', ['concat']);
    gulp.watch('assets/styles/less/**/*.less', ['less']);
    gulp.watch('posts/text/**/*.md', ['json']);
  });

  gulp.task('default', ['webserver'] , function() {
    gulp.watch('assets/scripts/js/app/**/*.js', ['concat']);
    gulp.watch('assets/styles/less/**/*.less', ['less']);
    gulp.watch('posts/text/**/*.md', ['json']);
  });

  gulp.task('compile', ['less', 'json', 'concat'] , function() {});

  gulp.task('config', ['addremote'] , function() {});

  gulp.task('publish', ['compile', 'push'] , function() {});
