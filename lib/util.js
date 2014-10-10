module.exports = function (grunt) {
  var request = require('request');
  var Q = require('q');
  var _ = require('lodash');
  var fs = require('fs');

  return {
    buildUrl: function (cfg) {
      if (!_.all([cfg.url, cfg.repository, cfg.group_id, cfg.name, cfg.ext, cfg.path], _.isString)) {
        grunt.fail.warn('Mandatory options missed. List of mandatory options: url, repository, group_id, name, ext, path.');
      }

      var urlParts = [cfg.url, cfg.base_path, cfg.repository].concat(cfg.group_id.split('.'));
      var nameParts = [cfg.name];

      if (cfg.version && _.isString(cfg.version)) {
        urlParts.push(cfg.name);
        urlParts.push(cfg.version);
        nameParts.push(cfg.version);
      }

      if (cfg.classifier && _.isString(cfg.classifier)) {
        nameParts.push(cfg.classifier);
      }

      return urlParts.join('/') + '/' + nameParts.join('-') + '.' + cfg.ext;
    },

    fetch: function (cfg) {
      var deferred = Q.defer();
      var url = this.buildUrl(cfg);

      grunt.log.writeln('Fetching ' + url);

      var file = request.get(url, function (err, res) {
        if (err) {
          deferred.reject({message: 'Error making http request: ' + err});
        } else if (res.statusCode !== 200) {
          deferred.reject({message: 'Request received invalid status code: ' + res.statusCode});
        } else {
          grunt.verbose.writeln('Fetched');
        }

        file.end();
      }).pipe(fs.createWriteStream(cfg.path));

      file.on('close', function () {
        deferred.resolve();
      });

      grunt.verbose.writeln('Fetching ...');

      return deferred.promise;
    }
  }
};
