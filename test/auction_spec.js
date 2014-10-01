/* jshint globalstrict: true*/
/* global Scope: false*/

'use strict';

describe("Auction", function() {

  it("can be constructed and used as an object", function() {
    var auction = new Auction();
    auction.aProperty = 1;

    expect(auction.aProperty).toBe(1);
  });
  
  
});
