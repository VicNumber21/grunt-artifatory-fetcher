module.exports = function(grunt) {
  var util = require('../lib/util')(grunt);
  var Q = require('q');
  var _ = require('lodash');

  grunt.registerMultiTask('artifactory', 'Download artifact from an artifactory', function () {
    var done = this.async();
    var options = this.options({
      url: '',
      base_path: 'artifactory',
      repository: ''
    });

    var processes = [];

    if (this.args.length > 0 && _.contains(this.args, 'fetch')) {
      _.each(options.fetch, function (cfg) {
        _.extend(cfg, options);
        processes.push(util.fetch(cfg));
      });
    }

    Q.all(processes)
      .then(function () {
        done();
      })
      .fail(function (err) {
        grunt.fail.warn(err);
      });
  });
};
