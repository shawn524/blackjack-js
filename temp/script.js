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

