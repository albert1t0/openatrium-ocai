$(document).ready(function(){
  $('table.itu-attachment-list .mime').html('\xa0');
  //$(".logo").before('<button class="collapse-menu">V</button>');
  $(".collapse-menu").click(function(){
    console.log($("#menu-hideable"));
    $(".menu-hideable , .breadcrumb").toggle("1000");
  });
  var mql = window.matchMedia("screen and (max-width:43.75em)");
  mql.addListener(function(mql) {
    if(mql.matches){
      //console.log("Small screen!");
    }
    else{ 
      //console.log("Big screen again!");
      //$(".menu-hideable .breadcrumb").show();
    }
  });
});
