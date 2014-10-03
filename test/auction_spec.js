/* jshint globalstrict: true*/
/* global Auction: false*/

'use strict';

describe("Auction", function() {
  var auctionInstance;
  it("can be constructed and used as an object", function() {
    auctionInstance = new Auction();
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
    var toaster, startingBid, maximumBid, automaticIncrementAmount;
    beforeEach(function() {
      startingBid = 30;
      maximumBid = 50;
      automaticIncrementAmount = 3;
      toaster = new Auction(40);
    });

    it("expects 3 numbers and throws in error if either of the parameters passed in is invalid", function() {
      expect(function(){
        toaster.newBidder(startingBid, 'fish', automaticIncrementAmount);
      }).toThrow();
    });

    it("returns an object if the first 3 parameters passed in are numbers", function(){
      var bidder = toaster.newBidder(startingBid, maximumBid, automaticIncrementAmount);
      expect(typeof bidder).toBe('object');
    });

    it("returns an objects with the 3 properties, startingBid, maximumBid, and automaticIncrementAmount and the parameters passed into it", function() {
      var bidder = toaster.newBidder(startingBid, maximumBid, automaticIncrementAmount);
      expect(bidder.startingBid).toBe(30);
      expect(bidder.maximumBid).toBe(50);
      expect(bidder.automaticIncrementAmount).toBe(3);
    });

    it("stores the instance on the new bidder on the on its instance off Auction", function() {
      var bidder = toaster.newBidder(startingBid, maximumBid, automaticIncrementAmount);
      expect(toaster.$$biddersCollection[0]).toBe(bidder);
    });

    it("gives each bidder a unique bidder_id", function() {
      var bidder1 = toaster.newBidder(startingBid, maximumBid, automaticIncrementAmount);;
      var bidder2 = toaster.newBidder(40, 60, 5);
      expect(bidder1.bidder_id).toBe(0);
      expect(bidder2.bidder_id).toBe(1);
    });
  });
  describe("placeBids", function() {
    var toaster;
    beforeEach(function() {
      toaster = new Auction(40);
    });

    it("throws an error if there was no bidders added to collection", function() {
      expect(function() { toaster.placeBids(); }).toThrow();
    });

    it("returns an object", function() {
      var bidder = toaster.newBidder(30, 50, 3);
      var winner = toaster.placeBids();
      expect(typeof winner).toBe('object');
    });

    it("returns a bidder's winning bid as the amount of the seller's price", function() {
      var bidder = toaster.newBidder(30, 50, 3);
      var winner = toaster.placeBids();
      expect(winner.winning_bid).toBe(40);
    });
  });
  describe("$findHighestBidder", function() {
    var toaster, lowestBidder, middleBidder, highestBidder;
    beforeEach(function() {
      toaster = new Auction(40);
      lowestBidder = toaster.newBidder(30, 40, 5);
      middleBidder = toaster.newBidder(40, 60, 5);
      highestBidder = toaster.newBidder(50, 100, 5);
    });

    it("returns the highestBidder from collection of bidders", function() {
      var result = toaster.$findHighestBidder([lowestBidder, middleBidder, highestBidder]);
      expect(result).toBe(highestBidder);
    });
  });
  describe("$findSecondHighestBidder", function() {
    var toaster, lowestBidder, middleBidder, highestBidder;
    beforeEach(function() {
      toaster = new Auction(40);
      lowestBidder = toaster.newBidder(30, 40, 5);
      middleBidder = toaster.newBidder(40, 60, 5);
      highestBidder = toaster.newBidder(50, 100, 5);
    });

    it("returns the second highest bidder from collection of bidders", function() {
      var result = toaster.$findSecondHighestBidder([lowestBidder, middleBidder, highestBidder], highestBidder.maximumBid);
      expect(result).toBe(middleBidder);
    });
  });
  describe("$findwinner", function() {
    var toaster;
    beforeEach(function() {
      toaster = new Auction(40);
    });

    it("returns the winning bid amount", function() {
      //expects second highest bid, highest bidder's automaticIncrementAmount, and the highest bidder's startingBid
      var lowestBidder = toaster.newBidder(30, 40, 5);
      var middleBidder = toaster.newBidder(40, 62, 5);
      var highestBidder = toaster.newBidder(50, 100, 5);
      
      var winning_bid = toaster.$findWinner(middleBidder.maximumBid, highestBidder.automaticIncrementAmount, highestBidder.startingBid);

      expect(winning_bid).toBe(65);
    });

    it("returns the the the highest bidder's starting bid if it's greater than the maximum bid of the second highest bidder", function() {
      var secondHighestBidder = toaster.newBidder(40, 60, 5);
      var highestBidder = toaster.newBidder(70, 100, 5);

      var winner_bid = toaster.$findWinner(secondHighestBidder.maximumBid, highestBidder.automaticIncrementAmount, highestBidder.startingBid);

      expect(winner_bid).toBe(70);
    });
  });
  describe("$adjustStartingBid", function() {
    var toaster, lowestBidder, middleBidder, highestBidder;
    beforeEach(function() {
      toaster = new Auction(40);
      lowestBidder = toaster.newBidder(30, 40, 5);
      middleBidder = toaster.newBidder(40, 62, 5);
      highestBidder = toaster.newBidder(50, 100, 5);
    });

    it("increments a bidder's startingBid until it is no longer less that the seller's starting prices", function() {
      //expects startingBid and automaticIncrementAmount
      var adjustedStartBid = toaster.$adjustStartingBid(lowestBidder.startingBid, lowestBidder.automaticIncrementAmount);
      expect(adjustedStartBid).toBe(40);
    });
  });
  
});
