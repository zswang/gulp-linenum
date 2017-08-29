# gulp-linenum [![Build Status](https://img.shields.io/travis/zswang/gulp-linenum/master.svg)](https://travis-ci.org/zswang/gulp-linenum) [![NPM version](https://img.shields.io/npm/v/gulp-linenum.svg)](http://badge.fury.io/js/gulp-linenum)

> Code block processing with [linenum](https://github.com/zswang/linenum).

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-linenum`

## Usage

```js
var linenum = require('gulp-linenum');

gulp.task('dist', function() {
  return gulp.src('lib/*.js')
    .pipe(linenum())
    .pipe(gulp.dest('dist'));
});
```

## Options

- `pattern`

	pattern default `"^linenum"`

- `prefix`

	prefix, default <filename>:

- `suffix`

	suffix

- `offset`

	offset, default 1

MIT © [zswang](http://weibo.com/zswang)