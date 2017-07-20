'use strict';

describe('Service: transferService', function () {

  // load the service's module
  beforeEach(module('beneyluFootApp'));

  // instantiate service
  var transferService;
  beforeEach(inject(function (_transferService_) {
    transferService = _transferService_;
  }));

  it('should do something', function () {
    expect(!!transferService).toBe(true);
  });

});
