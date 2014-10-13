/* jshint globalstrict: true */

'use strict';

// This is the Auction constructor

// it contains an object we will store our bidder collection
// plus a counter that keeps count of the bidders in the collection
// $$bidderCount is updated every time the serialize function is called
var Auction = function() {
    this.$$biddersCollection = {};
    this.$$bidderCount = 0;
};

// returns the collection of bidders as an array
Auction.prototype.$biddersCollection = function() {
  var biddersCollection = [];
  for(var key in this.$$biddersCollection) {
    biddersCollection.push(this.$$biddersCollection[key]);
  }
  return biddersCollection;
};

// creates a new bidder object and if the bidder's maximum bid is unique, the bidder is stored in a collection
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

// gives each bidder a unique id number
Auction.prototype.$serialize = function(){
    var id = this.$$bidderCount;
    this.$$bidderCount++;
    return id;
};

// returns a winner object after comparing the bidders in the bidderCollection
Auction.prototype.placeBids = function() {
    // convert object to an array
    var biddersCollection = this.$biddersCollection();

    var collectionLength = biddersCollection.length;
    if(!collectionLength) {
        throw "There are no bidders for this entry... :/";
    }

    if(collectionLength === 1) {
        return {
            winning_bid: biddersCollection[0].startingBid,
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

// returns the bidder object with the highest maximumbid
Auction.prototype.$findHighestBidder = function(biddersCollection) {
  var sortedCollection = biddersCollection.sort(function(a,b){return a.maximumBid - b.maximumBid;});
  var currentHighestBidder = sortedCollection[sortedCollection.length - 1];

  return currentHighestBidder;
};

// returns the bidder object with the second highest maximumbid
Auction.prototype.$findSecondHighestBidder = function(biddersCollection, highestBid) {
  var sortedCollection = biddersCollection.sort(function(a,b){return a.maximumBid - b.maximumBid;});
  
  // iterate over the collection and determine the bideer with the highest
  // maximum bid as long as it isn't the first highest bid
  for(var i = biddersCollection.length-1; i >= 0; i--) {
    if(sortedCollection[i].maximumBid !== highestBid) {
      return sortedCollection[i];
    }
  }
  return null;
};

// compares secondhighest bidder and the highest bidder to determine the amount of the winning bid (returns the winngin bid)
Auction.prototype.$findWinningBid = function(secondHighestBidder, highestBidder) {
  var result = highestBidder.maximumBid;
  var secondMaxBid = secondHighestBidder.maximumBid;

  // if the first highest bidder was entered into the auction first, the first highest bidder wins in the case of a tie
  var tie = highestBidder.bidder_id < secondHighestBidder.bidder_id;
  
  var automaticIncrementAmount = highestBidder.automaticIncrementAmount;
  
  while((result - automaticIncrementAmount) > secondMaxBid) {
    result -= highestBidder.automaticIncrementAmount;
  }
  if((result - automaticIncrementAmount === secondMaxBid) && tie)  {
    result -= highestBidder.automaticIncrementAmount;
  }
  return result;
};

