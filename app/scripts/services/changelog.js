'use strict';

/**
 * @ngdoc service
 * @name angularHereMapsApp.ChangelogFactory
 * @description
 * # ChangelogFactory
 * Factory in the angularHereMapsApp.
 */
angular.module('angularHereMapsApp')
  .factory('ChangelogFactory', function ($http, $q, $log) {
    var changelogUrl = 'changelog.json',
      deferred = $q.defer();

    $http({
      method: 'GET',
      url: changelogUrl
    }).then(function(res) {
      deferred.resolve(res.data);
    }, function(error) {
      $log.error('could not get /changelog.json', error);
      deferred.reject(error);
    });

    return deferred.promise;
  });
