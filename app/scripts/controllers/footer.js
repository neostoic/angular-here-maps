'use strict';

/**
 * @ngdoc function
 * @name angularHereMapsApp.controller:FootercontrollerCtrl
 * @description
 * # FootercontrollerCtrl
 * Controller of the angularHereMapsApp
 */
angular.module('angularHereMapsApp')
  .controller('FooterController', function ($scope, GithubFactory) {
    var username = 'lukemarsh';
    var repo = 'angular-here-maps';
    // non-blocking code
    GithubFactory.get({
      'query': 'repos',
      'user': username,
      'repo': repo,
      'spec': 'contributors'
    }, function(res) {
      $scope.contributors = res.data;
    });

    GithubFactory.get({
      'query': 'repos',
      'user': username,
      'repo': repo,
      'spec': 'issues'
    }, function(res) {
      $scope.issues = res.data;
    });

    GithubFactory.get({
      'query': 'repos',
      'user': username,
      'repo': repo,
      'spec': 'events'
    }, function(res) {
      $scope.events = res.data;
    });
  });
