'use strict';

/**
 * @ngdoc function
 * @name angularHereMapsApp.controller:ChangelogCtrl
 * @description
 * # ChangelogCtrl
 * Controller of the angularHereMapsApp
 */
angular.module('angularHereMapsApp')
  .controller('ChangelogController', function ($scope, changelog) {
    var cl = [];

    console.log(changelog);

    for (var tag in changelog) {
      var commits = changelog[tag];

      cl.push({
        tag: tag,
        commits: _.groupBy(commits, function (value) {
          if (value && value.author) {
            return value.author;
          }
        })
      });
    }
    $scope.changelog = cl;
  });
