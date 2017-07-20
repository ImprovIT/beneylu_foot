'use strict';

/**
 * @ngdoc function
 * @name beneyluFootApp.controller:PlayersCtrl
 * @description
 * # PlayersCtrl
 * Controller of the beneyluFootApp
 */
angular
  .module('beneyluFootApp')
  .controller('PlayersCtrl', PlayersCtrl);

PlayersCtrl.$inject = ['$scope', '$routeParams', 'playerService', 'clubService']

function PlayersCtrl($scope, $routeParams, playerService, clubService) {

  //get url param clubId
  let clubId = $routeParams.clubId;
  $scope.clubDisplay = [];
  
  //TO DO : temporary we need to reload clubList in case of page refresh
  // clubService.getClubList()
  //   .then(() => playerService.getPlayerList(clubId))
  //   .then(players => $scope.playerList = players)
  //   .then(players => {
  //     players.forEach(player => {
  //       return clubService.getClubById(player.club)
  //         .then(arrayOfResults => {let club; return club = arrayOfResults[0];})
  //         .then(club => $scope.clubDisplay.push({ name: "club.name" })
  //         );
  //     });
  //   })
  //   .then((data) => console.log(data));

  //TO DO : temporary we need to reload clubList in case of page refresh
  clubService.getClubList()
    .then(() => playerService.getPlayerList(clubId))
    .then(players => $scope.playerList = players)
    .then(players => {
      return Promise.all(players.map(player => {
        //console.log(player);
        return clubService.getClubById(player.club);
      }));
    })
    .then((data) => data.forEach(club => $scope.clubDisplay.push(club[0])));
};
