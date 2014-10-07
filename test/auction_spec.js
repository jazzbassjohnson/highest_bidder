/* jshint globalstrict: true*/
/* global Auction: false*/

'use strict';

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
      describe("biddersCollection", function() {
        it("returns an array of the current bidder collection", function() {
          var boatAuction = new Auction();
          var alice = boatAuction.newBidder(2500, 3000, 500);
          var aaron = boatAuction.newBidder(2800, 3100, 201);
          var amanda = boatAuction.newBidder(2501, 3200, 247);

          var biddersCollection = boatAuction.biddersCollection();
          
          expect(biddersCollection[0]).toBe(alice);
          expect(biddersCollection[1]).toBe(aaron);
          expect(biddersCollection[2]).toBe(amanda);

        })
      });
      describe("newBidder", function() {
        it("does not add the bidder to the collecton if there was previously a bidder with the same maximum", function() {
          var boatAuction = new Auction();
          var alice = boatAuction.newBidder(2500, 3000, 500);
          var aaron = boatAuction.newBidder(2500, 3000, 500);
          
          var biddersCollection = boatAuction.biddersCollection();

          expect(biddersCollection.length).toBe(1);

        });

      });

      describe("adjustMaximumBid", function() {
        it("adjusts the bidder's maximum bid based on their specifications", function() {
        var boatAuction = new Auction();
        var alice = boatAuction.newBidder(2500, 3100, 500);
        expect(alice.maximumBid).toBe(3000);
        });
      });


  }); 