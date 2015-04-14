'use strict';

/**
 * @ngdoc overview
 * @name angularHereMapsApp
 * @description
 * # angularHereMapsApp
 *
 * Main module of the application.
 */
angular
  .module('angularHereMapsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-here-maps'
  ])
  .config(function ($routeProvider, MapConfigProvider) {
    MapConfigProvider.setOptions({
      appId: 'Q4azLpJlFAp5pkcEbagu',
      appCode: 'WT6i13vXvx1JbFky92wqjg',
      libraries: 'ui,mapevents,pano',
      pixelRatio: 2,
      pixelPerInch: 320
    });
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/install', {
        templateUrl: 'views/install.html',
        controller: 'InstallController'
      })
      .when('/changelog', {
        templateUrl: 'views/changelog.html',
        controller: 'ChangelogController',
        resolve: {
          changelog: function (ChangelogFactory) {
            return ChangelogFactory.then(function(result) {
              return result;
            });
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
