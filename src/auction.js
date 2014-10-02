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

Auction.prototype.placeBids = function() {
    var biddersCollection = this.$$biddersCollection;
    if(!biddersCollection.length) {
        throw "There are no bidders for this entry... :/";
    }
    var highestBidder = this.$findHighestBidder(biddersCollection); 
    var secondHighestBid = this.$findSecondHighestBidder(biddersCollection, highestBidder.maximumBid);

    var winner = {};
    winner.bidder_id = highestBidder.bidder_id;
    winner.winning_bid = this.$findWinner(secondHighestBid, highestBidder.automaticIncrementAmount, highestBidder.startingBid);
  
    return winner;
};

Auction.prototype.$findHighestBidder = function(biddersCollection) {
  var currentHighestBidder = null;
  _.forEach(biddersCollection, function( bidder, i ) {
    if((currentHighestBidder === null) || (bidder.maximumBid > currentHighestBidder.maximumBid)) {
      currentHighestBidder = bidder;
    }
  });
  return currentHighestBidder;
};

Auction.prototype.$findSecondHighestBidder = function(biddersCollection, highestBid) {
  var secondMaxBid = null;
  _.forEach(biddersCollection, function( bidder, i ) {
    var bidderMax = bidder.maximumBid;
    if((secondMaxBid === null) || (bidderMax > secondMaxBid.maximumBid && bidderMax !== highestBid)) {
      secondMaxBid = bidder;
    }
  });
  return secondMaxBid;
};

Auction.prototype.$findWinner = function(secondHighestBid, highestBidderAutomaticIncrementAmount, highestBidderStartingBid) {
  
  var winningBid = this.$adjustStartingBid(highestBidderStartingBid, highestBidderAutomaticIncrementAmount);
  while(winningBid < secondHighestBid) {
    winningBid += highestBidderAutomaticIncrementAmount;
  }
  return winningBid;
};

Auction.prototype.$adjustStartingBid = function( startingBid, automaticIncrementAmount ) {
  while(startingBid < this.$$sellerPrice) {
    startingBid += automaticIncrementAmount;
  }
  return startingBid;
};