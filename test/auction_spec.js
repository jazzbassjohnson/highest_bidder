/* jshint globalstrict: true*/
/* global Auction: false*/

'use strict';

describe("Auction", function() {

  it("can be constructed and used as an object", function() {
    var auctionInstance = new Auction();
    auctionInstance.aProperty = 1;
    expect(auctionInstance.aProperty).toBe(1);
  });

  it("gives each instance a property called $$sellerPrice", function() {
    var auctionInstance = new Auction();
    expect(auctionInstance.hasOwnProperty('$$sellerPrice')).toBe(true);
  });

  it("can take a seller's price and update the $$sellerPrice property", function() {
    var toaster = new Auction(40);

    expect(toaster.$$sellerPrice).toBe(40);

  });

  
});
