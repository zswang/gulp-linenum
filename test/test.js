'use strict';

var linenum = require('../');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

function generateFile(contents) {
  contents = contents || '';

  return new gutil.File({
    path: './testfile.js',
    cwd: './',
    base: './',
    contents: new Buffer(contents)
  });
}

function expect_equals(options, input, output, done) {
  var stream = linenum(options);

  stream.on('data', function (file) {
    String(file.contents).should.equal(output);
    done();
  });

  stream.write(generateFile(input));
  stream.end();
}

describe('gulp-linenum', function () {

  it('does nothing', function (done) {
    var input = '^linenum';
    var output = 'testfile.js:1';
    expect_equals({}, input, output, done);
  });

  it('does nothing', function (done) {
    var input = '^linenum';
    var output = 'test:1';
    expect_equals({ prefix: 'test:' }, input, output, done);
  });
});

describe('Streaming not supported', function () {
  it('does nothing', function (done) {
    var file = new gutil.File({
      path: 'test/fixtures/hello.js',
      cwd: 'test',
      base: 'test/fixtures',
      contents: new fs.createReadStream('test/fixtures/hello.js')
    });
    var stream = linenum({});
    stream.on('error', function (err) {
      done();
    });
    stream.write(file);
    stream.end();
  });
});

describe('null', function () {
  it('does nothing', function (done) {
    var file = new gutil.File({
      contents: null
    });
    var stream = linenum();
    stream.on('data', function (file) {
      done();
    });
    stream.write(file);
    stream.end();
  });
});
