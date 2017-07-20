'use strict';

/**
 * @ngdoc function
 * @name beneyluFootApp.controller:ClubsCtrl
 * @description
 * # ClubsCtrl
 * Controller of the beneyluFootApp
 */
angular
  .module('beneyluFootApp')
  .controller('ClubsCtrl', ClubsCtrl);

ClubsCtrl.$inject = ['$scope', 'clubService', 'playerService']

function ClubsCtrl($scope, clubService, playerService) {
  //TO DO : temporary we need to reload clubList and playerList in case of page refresh
  clubService.getClubList()
    .then(clubs => $scope.clubList = clubs)
    .then(playerService.getPlayerList());
  ;
};
