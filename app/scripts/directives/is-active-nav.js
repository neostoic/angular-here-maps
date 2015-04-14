'use strict';

/**
 * @ngdoc directive
 * @name angularHereMapsApp.directive:isActiveNav
 * @description
 * # isActiveNav
 */
angular.module('angularHereMapsApp')
  .directive('isActiveNav', function ($location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.location = $location;
        scope.$watch('location.path()', function(currentPath) {
          if('#' + currentPath === element[0].attributes.href.nodeValue) {
            element.parent().addClass('active');
          } else {
            element.parent().removeClass('active');
          }
        });
      }
    };
  });
