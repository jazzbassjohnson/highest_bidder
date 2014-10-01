/* jshint globalstrict: true */

'use strict';

function Auction() {
  
}

Auction.prototype.$newEntry = function(nameOfItem,  startingPrice) {
    var entry = {};
    entry.nameOfItem = nameOfItem;
    entry.startingPrice = startingPrice;

    return entry;
};