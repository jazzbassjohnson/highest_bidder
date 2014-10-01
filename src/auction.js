/* jshint globalstrict: true */

'use strict';

function Auction() {
  this.$$entriesCollection = [];
  this.$$biddersCollection = [];
}

Auction.prototype.$newEntry = function(nameOfItem,  startingPrice) {
    var entry = {};
    entry.nameOfItem = nameOfItem;
    entry.startingPrice = startingPrice;
    this.$$entriesCollection.push(entry);

    return entry;
};

Auction.prototype.$newBidder = function(startingBid, maximumBid, automaticIncrementAmount){
    var bidder = {};
    bidder.startingBid = startingBid;
    bidder.maximumBid = maximumBid;
    bidder.automaticIncrementAmount = automaticIncrementAmount;
    this.$$biddersCollection.push(bidder);
    return bidder;
};