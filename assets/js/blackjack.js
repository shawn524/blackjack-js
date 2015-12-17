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
      if(value === 0) value = true; // true = 11 false = 1
      if(value === 11) value = 'J';
      if(value === 12) value = 'Q';
      if(value === 1) value = 'K';
      
      deck.push({'value': value, 'suit': suit});
    }
  }

  var game = {
      user: {
        name: 'Player',
        hand: [],
        bust: false,
        area: $("#player_cards"),
        bank: 100
      },
      house: {
        name: "The House",
        hand: [],
        bust: false,
        area: $("#house_cards"),
      },

      deal: function(deck, player) {
          for(var i = 0; i<2; i++) {
            var rand = Math.floor(Math.random() * deck.length);
            var card = deck.splice(rand,1);
            player.hand.push(card[0]);
          }
      },

      hit: function(deck, player) {
        var rand = Math.floor(Math.random() * deck.length);
        var card = deck.splice(rand,1);
        player.hand.push(card[0]);
      },

      checkTotal: function(player) {
        // run once and save the value
        var runningTotal = 0;
        player.hand.forEach(function(a) {
          if(a.value === "K" || a.value === "Q" || a.value === "J") {
            runningTotal += 10;
          } else if(a.value === true) {
            runningTotal += 11;
          } else if(a.value === false) {
            runningTotal += 1;
          } else {
            runningTotal += a.value
          }
        });
        console.log(runningTotal, "first")
        // if greater then 21, run again and check for aces
        // if aces found, set to false, run again
        if(runningTotal > 21) {
          player.hand.forEach(function(a) {
            if(a.value === true) {
              a.value = false
            }
          })
          runningTotal = 0;
          console.log(runningTotal, "second")

          // add up again (probably a better way of doing this)
          player.hand.forEach(function(a) {
            if(a.value === "K" || a.value === "Q" || a.value === "J") {
              runningTotal += 10;
            } else if(a.value === true) {
              runningTotal += 11;
            } else if(a.value === false) {
              runningTotal += 1;
            } else {
              runningTotal += a.value
            }
          });
          console.log(runningTotal, "third")
        }
        
        // if total still more then 21, bust
        if(runningTotal > 21) {
          newMsg(player.name + " bust with " +runningTotal);
          console.log(player.name + " bust with " +runningTotal);
          player.bust = true;
          // hide buttons
          $("#hit").hide();
          $("#stand").hide();
        }
        console.log(runningTotal, "fourth")
        
      },

      stand: function() {
          var houseTotal = 0;

          while(houseTotal < 17) {
            var rand = Math.floor(Math.random() * deck.length);
            var card = deck.splice(rand,1);
            game.house.hand.push(card[0]);
            game.house.hand.forEach(function(a) {
              if(a.value === "K" || a.value === "Q" || a.value === "J") {
                houseTotal += 10;
              } else {
                houseTotal += a.value
              }
            })
          }

          showCards(game.house);
        },

      showCards: function(player) {
        var playArea = player.area;
        playArea.children().remove()
        player.hand.forEach(function(val) {
          var newCard = $("<div class='card'>");
          newCard.append($("<div class='suit'>").addClass(val.suit));
          if(val.value === true || val.value === false) {
            newCard.append($("<div class='card_number'>").text('A'));
          } else {
            newCard.append($("<div class='card_number'>").text(val.value));
          }
          playArea.append(newCard);

        })

      },
  } // game obj ends

  function newMsg(msg) {
    var msg = $("<li>").text(msg)
    $(".message").append(msg)
  }

  $("#hit").hide();
  $("#stand").hide();

  function start() {
    $("#start").click(function() {
      createDeck(mainDeck)
      game.deal(mainDeck, game.user)
      game.deal(mainDeck, game.house)
      $("#hit").show();
      $("#stand").show();
      game.showCards(game.house);
      game.showCards(game.user);
      $(this).hide();
    })
  }

  function stand() {
    $("#stand").click(function() {

    })
  }

  function playerHit() {
    $("#hit").click(function() {
      game.hit(mainDeck, game.user);
      game.checkTotal(game.user);
      game.showCards(game.user);
    })
  }



  function eventListener() {
    start();
    playerHit();
  }
  
  eventListener()


// })