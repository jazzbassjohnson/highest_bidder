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

    it("stores each new entry in an array on the constructor", function() {
      var item1 = "Toaster";
      var item1_price = 40;
      var item2 = "Blender";
      var item2_price = 100;

      var entry1 = auction.$newEntry(item1, item1_price);
      var entry2 = auction.$newEntry(item2, item2_price);

      expect(auction.$$entriesCollection[0].nameOfItem).toBe(entry1.nameOfItem);
      expect(auction.$$entriesCollection[0].startingPrice).toBe(entry1.startingPrice)
      
      expect(auction.$$entriesCollection[1].nameOfItem).toBe(entry2.nameOfItem);
      expect(auction.$$entriesCollection[1].startingPrice).toBe(entry2.startingPrice)
    });

  });
  
});
