The Highest Bidder

Implement a solution to the following problem using the latest released version of Javascript and 

what ever tool or framework you prefer - as long as there are some basic instructions to get it 

running. Your project should include unit tests, again using a tool or pattern of your choosing. The 

program should be an object-oriented API and should not include a user interface of any kind. 

There is no need to provide any form of data persistence. 

We are looking for clean, well-factored, structured code that has accompanying unit tests.

Here are the requirements: 

Consider a new and different computerized auction site where a seller can offer an item up for sale 

and people can bid against each other to buy the item. The company building this site has asked 

you to come up with the algorithm to automatically determine the winning bid after all bidders have 

entered their information on the site. Your API will be integrated into the site by other developers 

working on the project. 

The site will allow each bidder to enter three parameters: 

Starting bid - The first and lowest bid the buyer is willing to offer for the item. 

Max bid - This maximum amount the bidder is willing to pay for the item. 

Auto-increment amount - A dollar amount that the computer algorithm will add to the bidder's 

current bid each time the bidder is in a losing position relative to the other bidders. The algorithm 

should never let the current bid exceed the Max bid. The algorithm should only allow increments of 

the exact auto-increment amount. 

Here is the data to use for your testing. In each case the algorithm should determine the winning 

bidder and the amount of the winning bid. The bidders are listed in the order they entered their 

information on the site. If there is a tie between two or more bidders, the first person that entered 

their information wins. The amount of the winner's bid should be the lowest amount possible (given 

all the previous rules) that will win the auction.