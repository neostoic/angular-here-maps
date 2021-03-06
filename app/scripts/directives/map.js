'use strict';

/**
 * @ngdoc directive
 * @name angularHereMapsApp.directive:map
 * @description
 * # map
 */
angular.module('angular-here-maps')
  .directive('map', function (MapConfig, $document, $compile) {
    return {
      template: '<div class="here-map"><div ng-transclude></div></div>',
      restrict: 'EA',
      transclude: true,
      replace: true,
      controller: function($scope, $element, $attrs) {
        var defaultLayers,
          modules,
          behavior,
          marker,
          markerWindow;

        $scope.zoom = $scope.helpers.useDotNotation($scope, $attrs.zoom);
        $scope.center = $scope.helpers.useDotNotation($scope, $attrs.center);

        if (MapConfig.libraries()) {
          modules = MapConfig.libraries().split(',');
        }

        $scope.refreshMarkers = function() {
          var allIcons = [];
          var templateMarkers = $document.find('template-marker');
          var mapIcons = $document.find('marker-icon');

          allIcons.push(templateMarkers, mapIcons);

          _.each(allIcons, function(mapIcon) {
            $compile(mapIcon)($scope);
          });
          $scope.$apply();
        };

        var platform = new H.service.Platform({
          'app_id': MapConfig.appId(),
          'app_code': MapConfig.appCode()
        });

        defaultLayers = platform.createDefaultLayers(512, MapConfig.pixelPerInch());

        this.map = new H.Map(
          $element[0],
          defaultLayers.normal.map,
          {
            pixelRatio: MapConfig.pixelRatio()
          }
        );

        if ($scope.zoom) {
          this.map.setZoom($scope.zoom);
        }

        if ($scope.center) {
          this.map.setCenter($scope.center);
        }

        window.addEventListener('resize', function () {
          this.map.getViewPort().resize();
        }.bind(this));

        _.each(modules, function(module) {
          if (module === 'ui') {
            this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          }
          if (module === 'pano') {
            platform.configure(H.map.render.panorama.RenderEngine);
          }
          if (module === 'mapevents') {
            behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          }
        }.bind(this));

        this.createMapMarker = function(group, coordinates, icon, id) {
          var markerTemplate,
            events,
            idAttr = '';

          if (id) {
            idAttr = 'id=' + id;
          }

          if (icon && icon.events) {
            events = icon.events;
          }

          if (icon) {
            if (icon.template || icon.templateUrl) {
              if (icon.templateUrl) {
                markerTemplate = '<template-marker ng-cloak ' + idAttr + ' templateurl="' + icon.templateUrl + '"></template-marker>';
              } else {
                markerTemplate = '<marker-icon ' + idAttr + '>' + icon.template + '</marker-icon>';
              }
              var markerIcon = new H.map.DomIcon(markerTemplate);
              marker = new H.map.DomMarker(coordinates, {
                icon: markerIcon
              });
            } else {
              marker = new H.map.Marker(coordinates);
            }

            group.addEventListener('tap', function() {
              if (events) {
                events.tap(coordinates);
              }
            }.bind(this, coordinates), false);
            
          }

          return {
            markerTemplate: markerTemplate
          };
        };

        var createMarkerEvents = function(windowTemplate, group, coordinates) {

          $scope.removeBubble = function() {
            markerWindow.close();
          };

          group.addEventListener('tap', function() {
            if (markerWindow) {
              this.ui.removeBubble(markerWindow);
            }
            var newTemplate = windowTemplate;
            newTemplate = $compile(newTemplate)($scope);
            $scope.$apply();

            if (windowTemplate) {
              markerWindow = new H.ui.InfoBubble(coordinates, {
                content: newTemplate[0]
              });
              this.ui.addBubble(markerWindow);
            }
          }.bind(this, coordinates), false);
        }.bind(this);

        this.createMarkerWindows = function(group, coordinates, icon) {
          var windowTemplate;

          if (icon && icon.window) {
            if (icon.window.templateUrl) {
              windowTemplate = '<template-window templateurl=' + icon.window.templateUrl + '></template-window>';
            } else {
              windowTemplate = '<marker-window>' + icon.window.template + '</marker-window>';
            }
            if (icon.window.template || icon.window.templateUrl) {
              createMarkerEvents(windowTemplate, group, coordinates);
            }
          }

          return windowTemplate;
        };

        this.getCurrentIcon = function(defaultIcon, currentIcon) {

          var icon = angular.copy(defaultIcon);

          if (currentIcon && currentIcon.template) {
            delete icon.templateUrl;
            icon.template = currentIcon.template;
          }

          if (currentIcon && currentIcon.templateUrl) {
            delete icon.template;
            icon.templateUrl = currentIcon.templateUrl;
          }

          if (currentIcon && currentIcon.window && currentIcon.window.template) {
            delete icon.window.templateUrl;
            icon.window.template = currentIcon.window.template;
          }

          if (currentIcon && currentIcon.window && currentIcon.window.templateUrl) {
            delete icon.window.template;
            icon.window.templateUrl = currentIcon.window.templateUrl;
          }

          return icon;
        };

        this.addMarkerToMap = function(coordinates, defaultIcon, currentIcon, id) {
          var group = new H.map.Group();

          var icon = this.getCurrentIcon(defaultIcon, currentIcon);

          this.createMapMarker(group, coordinates, icon, id);
          this.createMarkerWindows(group, coordinates, icon);

          this.map.addObject(group);
          if (marker) {
            group.addObject(marker);
          }
        };

        this.map.addEventListener('mapviewchangeend', function() {
          $scope.refreshMarkers();
        });
      }
    };
  });
