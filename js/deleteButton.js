$("button").click(function(){
  if($(this).hasClass("samilpaken")){
    $(this).addClass("done");
    $("span").text("Удалено");
  } else {
    $(this).addClass("samilpaken");
    $("span").text("Ты уверен?");
  }
});

// Reset
$("button").on('mouseout', function(){
  if($(this).hasClass("samilpaken") || $(this).hasClass("done")){
    setTimeout(function(){
      $("button").removeClass("samilpaken").removeClass("done");
      $("span").text("Удалить");
    }, 3000);
  }
});