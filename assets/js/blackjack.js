// $(document).ready(function() {
  console.log("ready")

  // deck
  var mainDeck = []
  var test = []

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
      },
      house: {
        name: "The House",
        hand: [],
      },

      deal: function(deck, player) {
        for(var i = 0; i<2; i++) {
          var rand = Math.floor(Math.random() * deck.length)
          var card = deck.splice(rand,1)
          player.hand.push(card[0])
        }
      },

      hit: function(deck, player) {
        var rand = Math.floor(Math.random() * deck.length);
        var card = deck.splice(rand,1);
        player.hand.push(card[0])
      },

      checkBust: function(player) {
        var total = 0;
        for(var i in player.hand) {
          total += player.hand[i].value;
        }
        if(total > 21) {
          console.log(player.name + " bust with " +total)
        }
      }



  }

  createDeck(mainDeck)
  game.deal(mainDeck, game.user)
  game.deal(mainDeck, game.house)
  console.log(game.user.hand)
  // console.log(mainDeck)

// })