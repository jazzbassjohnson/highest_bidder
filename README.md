The Highest Bidder (Quick Bids)

This is a light weight API for developers interested in the concept of emotionless auctions.  Given a single item, interested bidders pass all of their cards to the dealer so to speak.  When all bidders are collected and the bidder's specifications are in and the auction starts, the winner is presented in a flash.

This is how it works:

// the Auction constructor expects the seller's asking price for a single enrty (as a number primitive).

var toaster = new Auction(40);

// interested bidders added to a collection of bidders, one by one
// and they are expected to provide three parameters to this API
// Their startingBid, maximumBid, and automaticIncrementAmount

var bidder_1 = toaster.newBidder(30, 40, 5); // (startingBid, maximumBid, automaticIncrementAmount)
var bidder_2 = toaster.newBidder(40, 62, 5);
var bidder_3 = toaster.newBidder(50, 100, 5);

Each call to the newBidder method returns a reference to the the way the bidder is stored in memory.

bidder_1 is equal to:
{
  startingBid: 30,
  maximumBid: 40,
  automaticIncrementAmount: 5,
  bidder_id: 0
}

Once all of the bids are in place and the auction is ready to start, just call the "placeBids" method on the auction entry and the an object will be returned with the id of the winner along with their winning bid.

var winner = toaster.placeBids();

winner is equal to:

{
  winner_id: 2,
  winning_bid: 65
}

Its that simple:)