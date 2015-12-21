// $('#blah').animate({
//   'top': '400px',
//   'left':'400px'
// })


// positions = {
//   '1':'400,400',
//   '2':'400,600'
//   '3':'400,800'
//   '4':'400,1000'
// }

// 1 = '400,400'

// 1.splt(',')

// 1[0] = 400
// 1[1] = 400

// $('#blah').animate({
//   'top': 1[0],
//   'left':1[1]
// })



function move() {
  for(var i=0; i<10; i++) {
      setTimeout(function() {
    (function(i) {
        var newCard = $("<div class='card'>")
        $("#deck").append(newCard)
        var x = $("#deck").children()[i]
        $(x).animate({'top':i,'left':i})
    })(i);
      }, 2000)
  }
}

var showCards = function(player) {
  var playArea = player.area;
  // playArea.children().remove();
  var currentCards = playArea.children();
  player.hand.forEach(function(val, index) {
    var newCard = $("<div class='card'>");
    newCard.addClass('played');
    newCard.append($("<div class='suit'>").addClass(val.suit));
    if(val.value === true || val.value === false) {
      newCard.append($("<div class='card_number'>").text('A'));
    } else {
      newCard.append($("<div class='card_number'>").text(val.value));
    }

    if(!$(currentCards[index]).hasClass('played')) {
      console.log("yay!")
    }

    // add the card to the board
    newCard.addClass('transitioning');
    playArea.append(newCard);
    setTimeout(function(){newCard.removeClass('transitioning')})
    // check if the dealer has more then one card out and don't show the number
    if(player.name === "The House" && playArea.children().length >= 1) {
      var flip = $("#house_cards .card .card_number");
      for(var i = 1; i<= flip.length; i++) {
        $(flip[i]).addClass('flipped');
      }
    }
  })

}
