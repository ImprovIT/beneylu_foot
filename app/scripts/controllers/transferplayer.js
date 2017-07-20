'use strict';

/**
 * @ngdoc function
 * @name beneyluFootApp.controller:TransferplayerCtrl
 * @description
 * # TransferplayerCtrl
 * Controller of the beneyluFootApp
 */
angular
  .module('beneyluFootApp')
  .controller('TransferplayerCtrl', TransferplayerCtrl);

TransferplayerCtrl.$inject = ['$scope', '$routeParams', '$location', '$timeout', 'clubService', 'transferService', 'playerService'];

function TransferplayerCtrl($scope, $routeParams, $location, $timeout, clubService, transferService, playerService) {


  //validation form html display
  $scope.validationFailed = false;
  //get url param playerId
  let playerId = $routeParams.playerId;
  //console.log(`Player id : ${playerId}`)

  //TO DO : temporary we need to reload clubs and players in case of page refresh
  clubService.getClubList()
    .then(() => playerService.getPlayerList())
    .then(() => clubService.getClubListByPlayer(playerId))
    .then(clubs => {
      $scope.data = {
        model: null,
        availableClubs: clubs
      }
    });

  // function to submit the form after all validation has occurred			
  $scope.submitForm = function () {
    // check to make sure the form is completely valid
    if ($scope.transferForm.$valid) {
      $scope.validationFailed = false;
      transferService.transferPlayer(playerId, $scope.data.model)
        .then(player => {
          console.log(`Le joueur ${player[0].name} ${player[0].firstname} a changé de club pour un montant de ${player[0].price} € !`);
          $timeout(() => $location.path('/players'));
        });
    } else {
      $scope.validationFailed = true;
    }
  };
};
