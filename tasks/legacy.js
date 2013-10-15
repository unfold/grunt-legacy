/*
 * grunt-legacy
 * https://github.com/unfold/grunt-legacy
 *
 * Copyright (c) 2013 Simen Brekken
 * Licensed under the MIT license.
 */

'use strict';

var legacy = require('legacy');

module.exports = function(grunt) {
  grunt.registerMultiTask('legacy', 'Grunt task for generating legacy browser style sheets', function() {
    var options = this.options({
      minWidth: 0
    });

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed));

      grunt.file.write(f.dest, legacy(src, options.minWidth));
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
