'use strict';

describe('Service: clubService', function () {

  // load the service's module
  beforeEach(module('beneyluFootApp'));

  // instantiate service
  var clubService;
  beforeEach(inject(function (_clubService_) {
    clubService = _clubService_;
  }));

  it('should do something', function () {
    expect(!!clubService).toBe(true);
  });

});
