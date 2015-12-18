$(document).ready(function(){
  $("[type=range]").change(function(){
    var newval=$(this).val();
    $("p").text(newval);
  });
});

<input type="range" class="btn" id="bet_slide" value="0" min="25" max="200"><span>0</span>

