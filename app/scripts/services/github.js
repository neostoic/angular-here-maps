'use strict';

/**
 * @ngdoc service
 * @name angularHereMapsApp.Github
 * @description
 * # Github
 * Factory in the angularHereMapsApp.
 */
angular.module('angularHereMapsApp')
  .factory('GithubFactory', function ($resource) {
    var apiUrl = 'https://api.github.com/:query/:user/:repo/:spec/';

    var github = $resource(apiUrl, {
      'query': 'repos',
      'user':'lukemarsh',
      'repo': 'angular-here-maps',
      'spec': 'contributors',
      'callback': 'JSON_CALLBACK',
      'per_page': 100
    }, {
      'get': {
        'method': 'JSONP'
      }
    });

    return github;
  });
