/**
 * @file gulp-linenum
 *
 * A plugin for gulp to replace line number.
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.1
 * @date 2017-08-29
 */
var path = require('path');
var linenum = require('linenum');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = require('gulp-util/lib/PluginError');
var pluginName = 'gulp-linenum';
/**
 * 创建异常对象
 *
 * @param {GulpFile} file 当前文件对象
 * @param {string} err 异常信息
 * @return {PluginError} 返回异常对象
 */
function createError(file, err) {
  return new PluginError(pluginName, file.path + ': ' + err, {
    fileName: file.path,
    showStack: false
  });
}
/**
 * 处理 linenum 任务
 *
 * @param {Object} options 配置项
 * @return {Object} 返回 gulp 任务处理器对象
 */
function gulpLinenum(options) {
  options = options || {};
  return through.obj(function (file, enc, callback) {
    if (file.isStream()) {
      return callback(createError(file, 'Streaming not supported'));
    }
    if (file.isBuffer()) {
      file.contents = new Buffer(linenum.replace(file.contents, {
        pattern: options.pattern,
        prefix: typeof options.prefix === 'undefined' ? path.relative(file.base, file.path) + ':' : options.prefix,
        suffix: options.suffix,
        offset: options.offset,
      }));
    }
    return callback(null, file);
  });
}
module.exports = gulpLinenum;