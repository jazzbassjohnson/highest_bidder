/* jshint globalstrict: true*/
/* global Auction: false*/

'use strict';

describe("AuctionConstructor", function() {

  it("can be constructed and used as an object", function() {
    var Auction = new AuctionConstructor();
    Auction.aProperty = 1;
    expect(Auction.aProperty).toBe(1);
  });

  it("gives each instance a property called $$sellerPrice", function() {
    var Auction = new AuctionConstructor();
    expect(Auction.hasOwnProperty('$$sellerPrice')).toBe(true);
  });

  
});
