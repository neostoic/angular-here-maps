'use strict';

/**
 * @ngdoc function
 * @name angularHereMapsApp.controller:MainController
 * @description
 * # MainController
 * Controller of the angularHereMapsApp
 */
angular.module('angularHereMapsApp')
  .controller('MainController', function ($scope) {
    $scope.map = {
      zoom : 14,
      center : { 
        lng: -0.135559,
        lat: 51.513872
      }
    };
  });
