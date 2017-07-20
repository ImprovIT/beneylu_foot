'use strict';

/**
 * @ngdoc service
 * @name beneyluFootApp.transferService
 * @description
 * # transferService
 * Factory in the beneyluFootApp.
 */
angular
  .module('beneyluFootApp')
  .factory('transferService', transferService);

transferService.$inject = ['$http', '$q', 'clubService', 'playerService'];


function transferService($http, $q, clubService, playerService) {

  let service = {
    transferPlayer: transferPlayer
  }

  return service;

  /**
   * Transfer the player in another club
   * @param {string} playerId 
   * @param {string} newClubId 
   */
  function transferPlayer(playerId, newClubId) {
    console.log("Service transfert joueur");
    return clubService.clubTransfer(playerId, newClubId)
      .then(clubs => clubs)
      .then(clubs => playerService.setPlayerClub(playerId, newClubId)
      );
  }
};
