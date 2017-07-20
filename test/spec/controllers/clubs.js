'use strict';

describe('Controller: ClubsCtrl', function () {

  // load the controller's module
  beforeEach(module('beneyluFootApp'));

  var ClubsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClubsCtrl = $controller('ClubsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClubsCtrl.awesomeThings.length).toBe(3);
  });
});
