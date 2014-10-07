The Highest Bidder (Quick Bids)

This is a light weight API for developers interested in the concept of emotionless auctions.  Given a single item, interested bidders pass all of their cards to the dealer so to speak.  When all bidders are collected and the bidder's specifications are in and the auction starts, the winner is presented in a flash.

Below is an example of how to use this api:

// Initialize the auctions by calling the Auction constructor and assign that instance to a variable

var bicycleAuction = new Auction();

// Add bidders to the Auction instance by using the newBidder method available on the instance

// newBidder expects 3 input values; the bidder's starting bid, their maximum bid and the amount they they wish to increment by, each round of the auction

var startingBid = 50;
var maximumBid = 80;
var automaticIncrementAmount = 3;

var alice = bicycleAuction.newBidder(startingBid, maximumBid, automaticIncrementAmount);

// Add multiple bidders...
var alice = bicycleAuction.newBidder(50, 80, 3);
var aaron = bicycleAuction.newBidder(60, 82, 2);
var amanda = bicycleAuction.newBidder(55, 85, 5);

// then call the placeBids method on the Auction instance
// the placeBids method returns an object with the id (bidder_id) of the bidder and the winnging bid (winning_bid).

var winner = bicycleAuction.placeBids();

Example winner:
{
  winning_bid: 3001,
  bidder_id: 2
}

Calling the placeBids method with only one bidder in the auction will result in the bidder's starting price as the winning_bid.