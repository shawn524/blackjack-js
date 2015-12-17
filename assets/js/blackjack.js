// $(document).ready(function() {
  console.log("ready");

  // deck
  var mainDeck = [];
  var test = [];

  function createDeck(deck) {
    for(var i=0;i<52;i++) {
      var suit = Math.floor(i / 13);
      var value = i % 13;
      if(suit === 0) suit = "heart";
      if(suit === 1) suit = "diamond";
      if(suit === 2) suit = "club";
      if(suit === 3) suit = "spade";
      
      deck.push({'value': value, 'suit': suit});
    }
  }

  var game = {
      user: {
        name: 'Player',
        hand: [],
        bust: false,
      },
      house: {
        name: "The House",
        hand: [],
        bust: false,
      },

      deal: function(deck, player) {
        if(player.name === "The House") {
          var houseTotal = 0;
          while(houseTotal < 17) {
            var rand = Math.floor(Math.random() * deck.length);
            var card = deck.splice(rand,1);
            player.hand.push(card[0]);
            player.hand.forEach(function(a) {
              houseTotal += a.value
            })
          }
        } else {
          for(var i = 0; i<2; i++) {
            var rand = Math.floor(Math.random() * deck.length);
            var card = deck.splice(rand,1);
            player.hand.push(card[0]);
          }
        }
      },

      hit: function(deck, player) {
        var rand = Math.floor(Math.random() * deck.length);
        var card = deck.splice(rand,1);
        player.hand.push(card[0]);
        // ace check?
        game.checkBust(player);
      },

      checkBust: function(player) {
        var total = 0;
        for(var i in player.hand) {
          total += player.hand[i].value;
        }
        if(total > 21) {
          console.log(player.name + " bust with " +total)
          player.bust = true;
          // hide buttons
          // end game or some shit
        }
      },

      play: function() {
        var userTotal = 0;
        game.user.hand.forEach(function(a) {
            userTotal += a.value
        });
        var houseTotal = 0;
        game.house.hand.forEach(function(a) {
            houseTotal += a.value
        });

        console.log(userTotal, houseTotal)

        if(userTotal > houseTotal) {
          console.log("Player wins!");
        } else if(userTotal < houseTotal) {
          console.log("The house always wins.");
        } else if(userTotal == houseTotal) {
          console.log("Push")
        }
      },




  } // game ends

  createDeck(mainDeck)
  game.deal(mainDeck, game.user)
  game.deal(mainDeck, game.house)


// })