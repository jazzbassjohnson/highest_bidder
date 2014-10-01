/* jshint globalstrict: true*/
/* global Auction: false*/

'use strict';

describe("Auction", function() {

  it("can be constructed and used as an object", function() {
    var auction = new Auction();
    auction.aProperty = 1;

    expect(auction.aProperty).toBe(1);
  });
  describe("$newEntry", function() {
    var auction;
    beforeEach(function() {
      auction = new Auction();
    });

    it("returns an object", function() {
      var entry = auction.$newEntry();

      expect(typeof entry).toBe('object');
    });

    it("take 3 parameters, startingPrice and nameOfItem, and populates an object with them", function() {
      var item = "Toaster";
      var price = 40;

      var entry = auction.$newEntry( item, price );

      expect(entry.nameOfItem).toBe(item);
      expect(entry.startingPrice).toBe(price);
    });

  });
  
});
