'use strict';

describe('Controller: TransferplayerCtrl', function () {

  // load the controller's module
  beforeEach(module('beneyluFootApp'));

  var TransferplayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransferplayerCtrl = $controller('TransferplayerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransferplayerCtrl.awesomeThings.length).toBe(3);
  });
});
