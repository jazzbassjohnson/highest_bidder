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
    bidder.root = this;
    bidder.$destroy = function() {
        var self = this;
        var indexOfSelf = self.root.$$biddersCollection.indexOf(self);
        if(indexOfSelf >=0) {
            self.root.$$biddersCollection.splice(indexOfSelf, 1);
        }

    };
    bidder.root.$$biddersCollection.push(bidder);
    return bidder;
};

