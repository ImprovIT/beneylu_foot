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

'use strict';

/**
 * @ngdoc function
 * @name beneyluFootApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beneyluFootApp
 */
angular.module('beneyluFootApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name beneyluFootApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beneyluFootApp
 */
angular.module('beneyluFootApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

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
