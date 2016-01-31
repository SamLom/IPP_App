$(document).ready(function(){
    $("#overview").hide();
    $("#add").hide();
   // $("#rel_prg").hide(); 
    init_localStor_foodItems();
    init_localStor_chartData();
    load_foodItems();
    //setze höhe des scrollable divs der food item liste in der add section
    var wh = $(window).height();
    var fisheigh  = Math.round(wh-wh/4)
    $("#abcd").height(fisheigh);

    $("#overviewbutton").click(function(){
        $("#home").hide();
        $("#overview").show();
        $("#add").hide();

    });
    $("#homebutton").click(function(){
        $("#home").show();
        $("#overview").hide();
        $("#add").hide();
        calc_progress_bar();
        
    });
    $("#addbutton").click(function(){
        $("#add").show();
        $("#overview").hide();
        $("#home").hide();
        
    });
    
});

$( window ).resize(function() {
  console.log( $(window).height() );
  console.log( $(document).height() );
});
