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

  describe("newBidder", function() {
    var toaster;
    beforeEach(function() {
      toaster = new Auction();
    });

    it("expects 3 numbers", function() {
      var bidder = toaster.newBidder(30, 'fish', 3);
      expect(bidder).toBe(null);
    });

    it("returns an object if the first 3 parameters passed in are numbers", function(){
      var bidder = toaster.newBidder(30, 50, 3);
      expect(typeof bidder).toBe('object');
    });

    it("returns an objects with the 3 properties, startingBid, maximumBid, and automaticIncrementAmount and the parameters passed into it", function() {
      var bidder = toaster.newBidder(30, 50, 3);

      expect(bidder.startingBid).toBe(30);
      expect(bidder.maximumBid).toBe(50);
      expect(bidder.automaticIncrementAmount).toBe(3);
    });

    it("stores the instance on the new bidder on the on its instance off Auction", function() {
      var bidder = toaster.newBidder(30, 50, 3);
      expect(toaster.$$biddersCollection[0]).toBe(bidder);
    });
   

  });

  
});
