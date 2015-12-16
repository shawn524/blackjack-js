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
      playerHand: [],
      houseHand: [],

      deal: function(deck, player) {
        for(var i = 0; i<2; i++) {
          var rand = Math.floor(Math.random() * deck.length)
          var card = deck.splice(rand,1)
          player.push(card[0])

          console.log()
        }
      },



  }

  createDeck(mainDeck)
  game.deal(mainDeck, game.playerHand)
  console.log(game.playerHand)
  // console.log(mainDeck)

// })