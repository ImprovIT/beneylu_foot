'use strict';

/**
 * @ngdoc overview
 * @name beneyluFootApp
 * @description
 * # beneyluFootApp
 *
 * Main module of the application.
 */
angular
  .module('beneyluFootApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/clubs', {
        templateUrl: 'views/clubs.html',
        controller: 'ClubsCtrl',
        controllerAs: 'clubs'
      })
      .when('/players/:clubId?', {
        templateUrl: 'views/players.html',
        controller: 'PlayersCtrl',
        controllerAs: 'players'
      })
      .when('/transferPlayer/:playerId', {
        templateUrl: 'views/transferplayer.html',
        controller: 'TransferplayerCtrl',
        controllerAs: 'transferPlayer'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
