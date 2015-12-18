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
        bank: 500
      },
      house: {
        name: "The House",
        hand: [],
        bust: false,
        area: $("#house_cards"),
      },
      currentBet: 0,

      deal: function(deck, player) {
        if(deck.length > 0) {
          for(var i = 0; i<2; i++) {
            var rand = Math.floor(Math.random() * deck.length);
            var card = deck.splice(rand,1);
            player.hand.push(card[0]);
          }
        } else {
          newMsg("Empty deck.");
          newMsg("Game over.");
          $("#hit").hide();
          $("#stand").hide();
          $("#new").hide();
          $('.bet').hide();
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
        // if greater then 21, run again and check for aces
        // if aces found, set to false, run again
        if(runningTotal > 21) {
          player.hand.forEach(function(a) {
            if(a.value === true) {
              a.value = false
            }
          })
          runningTotal = 0;

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
        }
        if(runningTotal > 21) {
          if(player.name === "The House") {
            game.user.bank += game.currentBet*2;
            newMsg("Player won $"+game.currentBet*2)
          }
          newMsg(player.name + " bust with " +runningTotal);
          // currently unused
          player.bust = true;
          // hide buttons
          $("#hit").hide();
          $("#stand").hide();
          $("#new").show();
        } else {
          return runningTotal;
        }

        
      },

      stand: function() {
          var houseTotal = 0;

          while(houseTotal < 17) {
            var rand = Math.floor(Math.random() * mainDeck.length);
            var card = mainDeck.splice(rand,1);
            game.house.hand.push(card[0]);
            game.house.hand.forEach(function(a) {
              if(a.value === "K" || a.value === "Q" || a.value === "J") {
                houseTotal += 10;
              } else if(a.value === true) {
                houseTotal += 11;
              } else if(a.value === false) {
                houseTotal += 1;
              } else {
                houseTotal += a.value
              }
            });
          }

          game.showCards(game.house);
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

      bet: function(bet) {
        if(bet > game.user.bank) {
          newMsg("Funds too low");
        } else {
          game.user.bank -= bet;
          game.currentBet = bet;
          newMsg("Player bet "+bet)
          $("#player_bank").text("$"+game.user.bank);
        }
      },
  } // game obj ends

  function newMsg(msg) {
    var msg = $("<li>").text(msg)
    $(".message").append(msg)
  }

  function start() {
    $("#start").click(function() {
      createDeck(mainDeck);
      game.deal(mainDeck, game.user);
      game.deal(mainDeck, game.house);
      // $("#hit").show();
      // $("#stand").show();
      game.showCards(game.house);
      game.showCards(game.user);
      $("#player_bank").show();
      $(".bet").show();
      $(this).hide();
    })
  }

  function newGame() {
    $("#new").click(function() {
      game.user.hand = [];
      game.house.hand = [];
      game.deal(mainDeck, game.user);
      game.deal(mainDeck, game.house);
      // $("#hit").show();
      // $("#stand").show();
      $(".bet").show();
      game.showCards(game.user);
      game.showCards(game.house);
      $("#player_bank").text("$"+game.user.bank);
      $(this).hide();
    })
  }

  function stand() {
    $("#stand").click(function() {
      game.stand();
      var playerTotal = game.checkTotal(game.user);
      var houseTotal = game.checkTotal(game.house);
      if(playerTotal > houseTotal) {
        game.user.bank += game.currentBet*2;
        newMsg("Player won $"+game.currentBet*2);
        game.currentBet = 0;
        $("#player_bank").text("$"+game.user.bank);
      } else if(playerTotal < houseTotal) {
        newMsg("The House always wins");
      }
      $("#hit").hide();
      $("#stand").hide();
      $(".bet").hide();
      $("#new").show();
    })
  }

  function playerHit() {
    $("#hit").click(function() {
      game.hit(mainDeck, game.user);
      game.checkTotal(game.user);
      game.showCards(game.user);
      // $(".bet").hide();
    })
  }

  function playerBet() {
    $("#bet_25").click(function() {
      game.bet(25);
      $(".bet").hide();
      $("#hit").show();
      $("#stand").show();
    });
    $("#bet_50").click(function() {
      game.bet(50);
      $(".bet").hide();
      $("#hit").show();
      $("#stand").show();
    });
    $("#bet_all").click(function() {
      game.bet(game.user.bank);
      $(".bet").hide();
      $("#hit").show();
      $("#stand").show();
    });
    $("#player_bank").text("$"+game.user.bank);
  }

  function eventListener() {
    start();
    playerHit();
    stand();
    newGame();
    playerBet();
  }

  $("#player_bank").text("$"+game.user.bank);
  $("#hit").hide();
  $("#stand").hide();
  $("#new").hide();
  $(".bet").hide();
  eventListener()


// })