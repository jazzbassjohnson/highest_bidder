/* jshint globalstrict: true */

'use strict';

var Auction = function(sellerPrice) {
    this.$$biddersCollection = {};
    this.$$bidderCount = 0;
};

// returns the collection of bidders as an array
Auction.prototype.biddersCollection = function() {
  var biddersCollection = [];
  for(var key in this.$$biddersCollection) {
    biddersCollection.push(this.$$biddersCollection[key]);
  }
  return biddersCollection;
};

Auction.prototype.newBidder = function(startingBid, maximumBid, automaticIncrementAmount) {
    // check for valid input parameters
    if(typeof startingBid !== 'number' || typeof maximumBid !== 'number' || typeof automaticIncrementAmount !== 'number') {
        throw "Error: User data invalid";
    }
    if(startingBid>maximumBid || automaticIncrementAmount > maximumBid) {
      throw "Error: User data invalid";
    }

    var bidder = {};
    bidder.startingBid = startingBid;
    bidder.maximumBid = this.$adjustMaximumBid(startingBid, maximumBid, automaticIncrementAmount);
    bidder.automaticIncrementAmount = automaticIncrementAmount;
    bidder.bidder_id = this.$serialize();

    
    if(!this.$$biddersCollection[bidder.maximumBid]) {
      this.$$biddersCollection[bidder.maximumBid] = bidder;
    }

    return bidder;
};

// adjusts the maximum bid for each bidder based on their specifications
Auction.prototype.$adjustMaximumBid = function(startingBid, maximumBid, automaticIncrementAmount) {
  return maximumBid - ((maximumBid - startingBid ) % automaticIncrementAmount);
};


Auction.prototype.$serialize = function(){
    var id = this.$$bidderCount;
    this.$$bidderCount++;
    return id;
};

Auction.prototype.placeBids = function() {
    // convert object to an array
    var biddersCollection = this.biddersCollection();

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

    var secondHighestBidder = this.$findSecondHighestBidder(biddersCollection, highestBidder.maximumBid);

    var winner = {};
    winner.bidder_id = highestBidder.bidder_id;
    winner.winning_bid = this.$findWinningBid(secondHighestBidder, highestBidder);
  
    return winner;
};

Auction.prototype.$findHighestBidder = function(biddersCollection) {
  var sortedCollection = biddersCollection.sort(function(a,b){return a.maximumBid - b.maximumBid;});
  var currentHighestBidder = sortedCollection[sortedCollection.length - 1];

  return currentHighestBidder;
};

Auction.prototype.$findSecondHighestBidder = function(biddersCollection, highestBid) {
  var sortedCollection = biddersCollection.sort(function(a,b){return a.maximumBid - b.maximumBid;});
  
  for(var i = biddersCollection.length-1; i >= 0; i--) {
    if(sortedCollection[i].maximumBid !== highestBid) {
      return sortedCollection[i];
    }
  }
  return null;
};

Auction.prototype.$findWinningBid = function(secondHighestBidder, highestBidder) {
  var result = highestBidder.maximumBid;
  var secondMaxBid = secondHighestBidder.maximumBid;

  var tie = highestBidder.bidder_id > secondHighestBidder.bidder_id;
  var automaticIncrementAmount = highestBidder.automaticIncrementAmount;
  
  while((result - automaticIncrementAmount) > secondMaxBid) {
    result -= highestBidder.automaticIncrementAmount;
  }
  if((result - automaticIncrementAmount === secondMaxBid) && tie)  {
    result -= highestBidder.automaticIncrementAmount;
  }
  return result;
};

