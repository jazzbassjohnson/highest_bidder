/* jshint globalstrict: true*/
/* global Auction: false*/

'use strict';

describe("Auction", function() {
  it("constructs and passes an $$biddersCollection object to each instance", function() {
    var boatAuction = new Auction();
    // $$biddersCollection is an object on the constructor
    // using an object here, gives us the ability to easily
    // check for potential ties before they happen. (yes, like magic)
    expect(typeof boatAuction.$$biddersCollection).toBe('object');
  });

  // the significance of this function is that it transforms the bidderCollection object into an array
  describe("biddersCollection", function() {
    it("returns an array of the current bidder collection", function() {
      var boatAuction = new Auction();
      var biddersCollection = boatAuction.$biddersCollection();
      
      expect(biddersCollection).toEqual([]);
    })
  });

  describe("newBidder", function() {
    it("added a bidder to the biddersCollecton", function() {
      var boatAuction = new Auction();
      var alice = boatAuction.newBidder(2500, 3000, 500);

      expect(boatAuction.$biddersCollection()).toEqual([alice])
    });

    it("does not add the bidder to the collecton if there was previously a bidder with the same maximum bid", function() {
      var boatAuction = new Auction();
      var alice = boatAuction.newBidder(2500, 3000, 500);
      var aaron = boatAuction.newBidder(2500, 3000, 500);
      var biddersCollection = boatAuction.$biddersCollection();

      expect(biddersCollection.length).toBe(1);
    });

    it(" expects the maximumBid to be greater than both the startingBid and automaticIncrementAmount", function() {
      var boatAuction = new Auction();
      expect(function() { var alice = boatAuction.newBidder(2500, 300, 500); }).toThrow();
    });

    it("throws an error if the bidder's data is not a number", function() {
      var boatAuction = new Auction();
      expect(function() {var alice = boatAuction.newBidder(2500, 'fish', 500);}).toThrow();
    });
  });

  describe("$adjustMaximumBid", function() {
    it("adjusts the bidder's maximum bid based on their specifications", function() {
      var boatAuction = new Auction();
      var adjustedMaximum = boatAuction.$adjustMaximumBid(2500, 3100, 500);
      expect(adjustedMaximum).toBe(3000);
    });
  });

  describe("$serialize", function() {
    it("returns unique id numbers to each bidder", function() {
      var boatAuction = new Auction();
      var alice = boatAuction.newBidder(2500, 3000, 500);
      var aaron = boatAuction.newBidder(2800, 3100, 201);
      var amanda = boatAuction.newBidder(2501, 3200, 247);

      expect(alice.bidder_id).toBe(0);
      expect(aaron.bidder_id).toBe(1);
      expect(amanda.bidder_id).toBe(2);
    });
  });

  describe("placeBids", function() {
    it("throws an error if there have been no bidders collected", function() {
      var boatAuction = new Auction();

      expect(function() { return boatAuction.placeBids();}).toThrow();
    });
    it("returns the bidders startingBid if there was only one bidder in the auction", function() {
      var boatAuction = new Auction();
      var alice = boatAuction.newBidder(2500, 3000, 500);
      var winner = boatAuction.placeBids();

      expect(winner.winning_bid).toBe(2500);
    });
  });

  describe("$findHighestBidder", function() {
    it("returns the highest bidder after the maximum bids have been adjusted", function() {
      var boatAuction = new Auction();
      var alice = boatAuction.newBidder(2500, 3000, 500);
      var aaron = boatAuction.newBidder(2800, 3100, 201);
      var amanda = boatAuction.newBidder(2501, 3200, 247);
      var biddersCollection = boatAuction.$biddersCollection();

      expect( boatAuction.$findHighestBidder(biddersCollection) ).toBe(aaron);//
    });
  });

  describe("$findSecondHighestBidder", function() {
    it("returns the second highest bidder after the maximum bids have been adjusted", function() {
      var boatAuction = new Auction();
      var alice = boatAuction.newBidder(2500, 3000, 500);
      var aaron = boatAuction.newBidder(2800, 3100, 201); // after adjustments, aaron has the largest maximum bid
      var amanda = boatAuction.newBidder(2501, 3200, 247);
      var biddersCollection = boatAuction.$biddersCollection();

      expect( boatAuction.$findSecondHighestBidder(biddersCollection, aaron.maximumBid) ).toBe(alice);
    });
  });

  describe("$findWinningBid", function() {
    it("takes the two highest bidders and returns the lowest bid needed to win the auction", function() {
      var boatAuction = new Auction();
      var alice = boatAuction.newBidder(2500, 3000, 500); // after adjustments, alice has the second largest maximum bid
      var aaron = boatAuction.newBidder(2800, 3100, 201); // after adjustments, aaron has the largest maximum bid
      var winning_bid = boatAuction.$findWinningBid(alice, aaron)

      expect(winning_bid).toBe(3001);
    });
  });
});


/* ******  Poshly's Tests  ****** */

describe("do the intended auction", function() {
      it("bycycle auction", function() {
        var bicycleAuction = new Auction();
        var alice = bicycleAuction.newBidder(50, 80, 3);
        var aaron = bicycleAuction.newBidder(60, 82, 2);
        var amanda = bicycleAuction.newBidder(55, 85, 5);

        var winner = bicycleAuction.placeBids();
        expect(winner.bidder_id).toBe(amanda.bidder_id);
        expect(winner.winning_bid).toBe(85);
      });
      it("scooter auction", function() {
        var scooterAuction = new Auction();
        var alice = scooterAuction.newBidder(700, 725, 2);
        var aaron = scooterAuction.newBidder(599, 725, 15);
        var amanda = scooterAuction.newBidder(625, 725, 8);
 
        var winner = scooterAuction.placeBids();
        expect(winner.bidder_id).toBe(alice.bidder_id);
        expect(winner.winning_bid).toBe(722);
      });
      it("boat auction", function() {
        var boatAuction = new Auction();
        var alice = boatAuction.newBidder(2500, 3000, 500);
        var aaron = boatAuction.newBidder(2800, 3100, 201);
        var amanda = boatAuction.newBidder(2501, 3200, 247);

        var winner = boatAuction.placeBids();
        expect(winner.bidder_id).toBe(aaron.bidder_id);
        expect(winner.winning_bid).toBe(3001);
      });
      it("boat auction x 2", function() {
        var boatAuction = new Auction();
        var alice = boatAuction.newBidder(2500, 3000, 500);
        var aaron = boatAuction.newBidder(2800, 3100, 201);
        var amanda = boatAuction.newBidder(2501, 3200, 247);

        var winner = boatAuction.placeBids();
        expect(winner.bidder_id).toBe(aaron.bidder_id);
        expect(winner.winning_bid).toBe(3001);
      });
  }); 