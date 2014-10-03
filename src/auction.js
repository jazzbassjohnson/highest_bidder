/* jshint globalstrict: true */

'use strict';

var Auction = function(sellerPrice) {
    this.$$sellerPrice = sellerPrice || null;
    this.$$biddersCollection = [];
};

Auction.prototype.newBidder = function(startingBid, maximumBid, automaticIncrementAmount) {
    if(typeof startingBid !== 'number' || typeof maximumBid !== 'number' || typeof automaticIncrementAmount !== 'number') {
        throw "Error: User data invalid";
    }
    var self = this;
    
    var BidderConstructor = function() {};
    BidderConstructor.prototype = this;
    
    var bidder = new BidderConstructor();
    bidder.startingBid = startingBid;
    bidder.maximumBid = maximumBid;
    bidder.automaticIncrementAmount = automaticIncrementAmount;
    bidder.bidder_id = self.serialize();
    bidder.auctionRoom = this;

    this.$$biddersCollection.push(bidder);
    return bidder;
};

Auction.prototype.removeBid = function() {
    var siblings = this.auctionRoom.$$biddersCollection;
  var indexOfThis = siblings.indexOf(this);
  if(indexOfThis >= 0) {
    siblings.splice(indexOfThis, 1);
  }
};

Auction.prototype.serialize = function(){
    return this.$$biddersCollection.length;
};

Auction.prototype.placeBids = function() {
    var biddersCollection = this.$$biddersCollection;
    var collectionLength = biddersCollection.length;
    if(!collectionLength) {
        throw "There are no bidders for this entry... :/";
    }
    if(collectionLength === 1) {
        return {
            winning_bid: this.$$sellerPrice,
            bidder_id: 0
        };
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