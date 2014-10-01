/* jshint globalstrict: true */

'use strict';

function Auction() {
  this.$$entriesCollection = [];
}

Auction.prototype.$newEntry = function(nameOfItem,  startingPrice) {
    var entry = {};
    entry.nameOfItem = nameOfItem;
    entry.startingPrice = startingPrice;
    this.$$entriesCollection.push(entry);

    return entry;
};