'use strict';

/**
 * @ngdoc service
 * @name beneyluFootApp.clubService
 * @description
 * # clubService
 * Factory in the beneyluFootApp.
 */
angular
  .module('beneyluFootApp')
  .factory('clubService', clubService);

clubService.$inject = ['$http', '$q', 'playerService'];

function clubService($http, $q, playerService) {

  let clubList = [];

  let service = {
    getClubList: getClubList,
    getClubListByPlayer: getClubListByPlayer,
    clubTransfer: clubTransfer,
    getClubById: getClubById
  };

  return service;

  
  /**
   * Return the club list
   * There is the case of first load of json
   * @return {Promise}
   */
  function getClubList() {
    if (clubList.length > 0) {
      //console.log('clubs.json already load once');
      let deferred = $q.defer();
      deferred.resolve(clubList);
      return deferred.promise;
    }
    else {
      //console.log('First load of clubs.json');
      return $http.get('clubs.json').then(function (data) {
        //console.log(data.data);
        data.data.forEach(function (club) {
          //console.log(club);
          clubList.push(club);
        });
        return clubList;
      });
    }
  }

  /**
   * Return the club of the player
   * @param {string} playerId 
   * @return {Promise}
   */
  function getClubListByPlayer(playerId) {

    let clubListByPlayer = [];
    let player = null;

    return playerService.getPlayerById(playerId)
      .then(arrayOfResults => {
        if (arrayOfResults.length === 1) return player = arrayOfResults[0];
      })
      .then(player => {
        let clubByPlayer = clubList.filter(item => { return item.id !== +player.club && item.budget > +player.price });
        clubByPlayer.forEach(club => {
          //console.log(club);
          clubListByPlayer.push(club);
        });
        return clubListByPlayer;
      })

    // return playerService.getPlayerById(playerId).then(function (player) {
    //   let clubByPlayer = clubList.filter((item) => { return item.id !== +player.club && item.budget > +player.price });
    //   clubByPlayer.forEach(function (club) {
    //     //console.log(club);
    //     clubListByPlayer.push(club);
    //   });
    //   return clubListByPlayer;
    // });
  }

  /**
   * Return club by id
   * @param {string} clubId
   * @return {Promise} 
   */
  function getClubById(clubId) {
    // let deferred = $q.defer();
    // clubList.forEach(club => {
    //   if (club.id === +clubId) {
    //     deferred.resolve(club);
    //   };
    // });
    // return deferred.promise;

    return Promise.all(clubList.filter(club => club.id === +clubId));
  }

  /**
   * Transfer of player between two clubs
   * Current club of player : add budget + remove player
   * New club : minus budget + add the player
   * @param {string} playerId 
   * @param {string} clubTransferId 
   * @return {Promise}
   */
  function clubTransfer(playerId, clubTransferId) {
    let clubUpdate = [];
    let player = null;
    return playerService.getPlayerById(playerId)
      .then(arrayOfResults => {
        if (arrayOfResults.length === 1) return player = arrayOfResults[0];
      })
      .then(player => {
        clubList.forEach(club => {
          //current club : add budget + remove player
          if (club.id === +player.club) {
            club.budget += player.price;
            club.players = club.players.filter((id) => id !== +playerId);
            clubUpdate.push(club);
          }
          //new club : minus budget + add player
          if (club.id === +clubTransferId) {
            club.budget -= player.price;
            club.players.push(+playerId);
            clubUpdate.push(club);
          }
        })
        return clubUpdate;
      });
  }
};
