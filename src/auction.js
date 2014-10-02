/* jshint globalstrict: true */

'use strict';

var Auction = function(sellerPrice) {
    this.$$sellerPrice = sellerPrice || null;
    this.$$biddersCollection = [];
};

Auction.prototype.newBidder = function(startingBid, maximumBid, automaticIncrementAmount) {
    if(typeof startingBid !== 'number' || typeof maximumBid !== 'number' || typeof automaticIncrementAmount !== 'number') {
        return null;
    }
    var self = this;
    var bidder = {
        startingBid: startingBid,
        maximumBid: maximumBid,
        automaticIncrementAmount: automaticIncrementAmount,
        bidder_id: self.serialize()
    };

    this.$$biddersCollection.push(bidder);
    return bidder;
};

Auction.prototype.serialize = function(){
    return this.$$biddersCollection.length;
};

