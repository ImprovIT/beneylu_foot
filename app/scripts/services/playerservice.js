'use strict';

/**
 * @ngdoc service
 * @name beneyluFootApp.playerService
 * @description
 * # playerService
 * Factory in the beneyluFootApp.
 */
angular
  .module('beneyluFootApp')
  .factory('playerService', playerService);

playerService.$inject = ['$http', '$q'];


function playerService($http, $q) {

  let playerList = [];

  let service = {
    getPlayerList: getPlayerList,
    getPlayerById: getPlayerById,
    setPlayerClub: setPlayerClub
  }

  return service;

  /**
   * Return the list of players
   * Case of first json load
   * Case of clubId in url param
   * @param {string} clubId 
   * @return {Promise}
   */
  function getPlayerList(clubId) {
    if (playerList.length > 0) {
      let deferred = $q.defer();
      //console.log('players.json already load once');
      if (clubId !== undefined) {
        //console.log('Filtre sur le club');
        let playerByClub = playerList.filter(item => { return item.club === +clubId });
        deferred.resolve(playerByClub);
      } else {
        deferred.resolve(playerList);
      }
      return deferred.promise;
    } else {
      //console.log('First load of players.json');
      return $http.get('players.json').then(data => {
        //console.log(data.data);
        // if clubId is define in url param
        if (clubId !== undefined) {
          //filter the data
          let playerByClub = data.data.filter(item => { return item.club === +clubId });
          //console.log(playerByClub);
          playerByClub.forEach(player => { playerList.push(player) });
        } else {
          //return all players
          data.data.forEach(player => {
            //console.log(player);
            playerList.push(player);
          });
        }
        return playerList;
      });
    }
  }

  /**
   * Return the player by id
   * @param {string} playerId
   * @return {Promise} 
   */
  function getPlayerById(playerId) {

    // let deferred = $q.defer();

    // playerList.forEach(function (player) {
    //   if (player.id === +playerId) {
    //     //console.log("player found");
    //     deferred.resolve(player);
    //   };
    // });
    // return deferred.promise;

    return Promise.all(playerList.filter(player => player.id === +playerId));
  }

  /**
   * Set the new club of the player
   * @param {string} playerId 
   * @param {string} newClubId 
   * @return {Promise}
   */
  function setPlayerClub(playerId, newClubId) {

    let setPlayerClub = playerList
      .filter(player => player.id === +playerId)
      .map(player => {
        let playerIndex = playerList.findIndex(player => player.id === +playerId);
        const club = { club: +newClubId }
        return playerList[playerIndex] = Object.assign({}, player, club);
      });
    return Promise.all(setPlayerClub);

    // let deferred = $q.defer();
    // playerList.forEach(player => {
    //   if (player.id === +playerId) {
    //     //console.log("player to change club found");
    //     player.club = +newClubId;
    //     deferred.resolve(player);
    //     console.log(playerList);
    //   };
    // });
    // return deferred.promise;
  }
};

