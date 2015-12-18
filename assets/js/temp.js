// obsolete?
      checkBust: function(player) {
        var total = 0;
        player.hand.forEach(function(a) {
          if(a.value === "K" || a.value === "Q" || a.value === "J") {
            total += 10;
          } else if(a.value === true) {
            total += 11;
          } else if(a.value === false) {
            total += 1;
          } else {
            total += a.value
          }
        });
        if(total > 21) {
          newMsg(player.name + " bust with " +total);
          console.log(player.name + " bust with " +total);
          player.bust = true;
          // hide buttons
          $("#hit").hide();
          $("#stand").hide();
          // end game or some shit
        }
      },

      play: function() {
        var userTotal = 0;
        game.user.hand.forEach(function(a) {
          if(a.value === "K" || a.value === "Q" || a.value === "J") {
            userTotal += 10;
          } else if(a.value === true) {
            userTotal += 11;
          } else if(a.value === false) {
            userTotal += 1;
          } else {
            userTotal += a.value
          }
        });
        var houseTotal = 0;
        game.house.hand.forEach(function(a) {
          if(a.value === "K" || a.value === "Q" || a.value === "J") {
            houseTotal += 10;
          } else if(a.value === true) {
            userTotal += 11;
          } else if(a.value === false) {
            userTotal += 1;
          } else {
            houseTotal += a.value
          }
        });

        if(userTotal > houseTotal) {
          console.log("Player wins!");
        } else if(userTotal < houseTotal) {
          console.log("The house always wins.");
        } else if(userTotal == houseTotal) {
          console.log("Push")
        }
      },


      // if total still more then 21, bust
      if(runningTotal > 21) {
        newMsg(player.name + " bust with " +runningTotal);
        console.log(player.name + " bust with " +runningTotal);
        player.bust = true;
        // hide buttons
        $("#hit").hide();
        $("#stand").hide();
      }