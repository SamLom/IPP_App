//Wenn Seite komplett geladen, wird setLocalStorage aufgerufen
// load_foodItems: food-items werden aus LocalStorage gelesen und in hash food_items gespeichert
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
        //erst wenn Homescreen sichtbar, wird progressbar befüllt, für optischen Effekt
        calc_progress_bar();
        
    });
    $("#addbutton").click(function(){
        $("#add").show();
        $("#overview").hide();
        $("#home").hide();
        
    });
    
    
    $("#heartbutton").click(function(){
        alert("Diese Seite ist leider noch nicht implementiert.");
        
    });
    
    $("#cogbutton").click(function(){
        alert("Diese Seite ist leider noch nicht implementiert.");
        
    });
});
// noch nicht implementiert
$( window ).resize(function() {
  console.log( $(window).height() );
  console.log( $(document).height() );
});

//Pop Up (nach Klick auf ein food item)
  $(function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      },
            buttons: {
                //eingegebene Menge und entsprechende Kalorien werden in food_items hash gespeichert
        "Hinzufügen": function() {
            //alert(food_add_button.val());
            //alert($("#menge").val());
            menge = parseInt($("#menge").val());
            food_items[food_add_button.val()][14] = menge;
            food_items[food_add_button.val()][15] = Math.round(menge / parseInt(food_items[food_add_button.val()][0])
               * parseInt(food_items[food_add_button.val()][7]));
            //alert(food_items[food_add_button.val()][15]);
            button_selected(food_add_button);
            $("#menge" ).val(parseInt(food_items[food_add_button.val()][0]));
            food_items[food_add_button.val()][14] = parseInt(food_items[food_add_button.val()][0]);
            food_items[food_add_button.val()][15] = parseInt(food_items[food_add_button.val()][7]);
            $("<div>" + "hinzugefügt!" +  "</div>").attr('class', 'info-added').hide().fadeIn(20).delay(2000).fadeOut(2000)
            .appendTo("#dialog");
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      input:{}
    });
 
    $( "#opener" ).click(function() {
      $( "#dialog" ).dialog( "open" );
    });
  });
 

