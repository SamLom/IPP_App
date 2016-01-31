        var food_items = {};
        var selected_food_items = {};
        var calories = 0;
        var keys =[];
        var nr_food_items;
        var food_add_button;

       

        function load_foodItems() {

          //  alert("load_foodItems!!");
            //test for firefox 3.6 see if it works
            //with this way of iterating it
            // Anzahl der food items
            nr_food_items = parseInt(localStorage.getItem("$fap_nofis$"));
            // Schleife geht Länge der Tabelle durch
            for (var i = 1, len = nr_food_items; i < len; i++) {
                var key = "$fap_fi" + (i).toString() + "$";
              //  console.log(key);
                // food item wird wieder zum Array umgewandelt und in das Objekt food_items reingeschrieben (Key=Name)
                var item = JSON.parse(localStorage.getItem(key));
                //alert(item[0]);
                food_items[item[0]] = [item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9], item[10]];

                food_items[item[0]].push(parseInt(item[8]));  //food_items...[10] enhält Summe kcal
                food_items[item[0]].push(parseInt(item[1])); //selected_food_items...[11] enhält Summe Menge
                if(food_items[item[0]][0].indexOf("g") > -1){                //selected_food_items...[12] enhält g / ml
                  food_items[item[0]].push("g")}
                else{
                  food_items[item[0]].push("ml")
                }
                food_items[item[0]].push(false);                            //selected_food_items...[13] enhält expanded true/false
                food_items[item[0]].push(parseInt(item[1]));  // selected_food_items...[14]    hier steht die Input Menge aus Deteils
                food_items[item[0]].push(parseInt(item[8]));  // selected_food_items...[15]    hier steht der zur Menge passende kcal Wert
                
                //Lebensmittel[key], Menge[0] ,Eiweiß[1], Fett[2],Kohlenhydrate[3], davon Zucker[4], Ballaststoffe[5], Alkohol[6], 
                // Kalorien[7], "kcal"[8], Energiedichte[9],,,, Summe kcal[10], Summe Menge [11], g/ml [12] , true/false [13], 
                // Menge  aus Details [14], kcal aus berechneter Menge aus Details [15]
              
                keys.push(item[0]);
                $("<div></div>").attr('id', 'wrp_nnnn' + i).appendTo('#abcd');
                
                $("<div>" + item[0] + " " + item[1] + " " + item[8] + " " + item[9] + "</div>")
                   .val(item[0]).attr('class', 'food-list-btn col-md-9 col-xs-9 btn btn-default').attr('id', 'd_nnnn' + i).appendTo('#wrp_nnnn' + i)
                   .click(function () {show_details($(this) ,food_items[$(this).val()]); });
                
                $("<div>" +  "</div>")
                   .val(item[0]).attr('class', 'plus-button col-xs-3 food-list-btn btn btn-default').attr('id', 'nnnn' + i).appendTo('#wrp_nnnn' + i)
                   .click(function () {button_selected($(this))  });
                   $("<i>" + "</i>").attr('class', 'glyphicon glyphicon-plus').appendTo('#nnnn' + i);
                 

            }

        };

        

// Funktion Button selected!


            function button_selected(x) {
                //Lebensmittel[key], Menge[0] ,Eiweiß[1], Fett[2],Kohlenhydrate[3], davon Zucker[4], Ballaststoffe[5], Alkohol[6], 
                // Kalorien[7], "kcal"[8], Energiedichte[9],,,, Summe kcal[10], Summe Menge [11], g/ml [12] , true/false [13], 
                // Menge  aus Details [14], kcal aus berechneter Menge aus Details [15]
         
               if(selected_food_items[x.val()] == undefined){
                var tmp=[];
                tmp = food_items[x.val()];
                selected_food_items[x.val()]=[];  
                for(ix=0;ix<tmp.length;ix++){  
                  selected_food_items[x.val()].push(tmp[ix]);
                }
                selected_food_items[x.val()][10] = parseInt(food_items[x.val()][15]);
                selected_food_items[x.val()][11] = parseInt(food_items[x.val()][14]);
                selected_food_items[x.val()][13] = false;
     
                $("<div></div>").attr('id', 'wrpdiv_'+x.val()).attr('class', 'col-xs-12 col-md-12').appendTo('#mealsDiv');
                //$("<div>" + x.val() + " " + food_items[x.val()][0]+" "+food_items[x.val()][8]+" "+food_items[x.val()][7] + " kcal" + "</div>")
                //  .attr('id', x.val()).appendTo('#wrpdiv_' + x.val());

                $("<div>" + x.val() + " " + selected_food_items[x.val()][11]+" "+ selected_food_items[x.val()][12]+" "
                  + selected_food_items[x.val()][10] + " kcal" + "</div>").val(x.val())
                  .attr('id', x.val()).attr('class', 'col-xs-10 col-md-10 btn btn-default meal_item').appendTo('#wrpdiv_' + x.val())
                  .click(function() {show_details($(this) ,selected_food_items[$(this).val()]); });
                

                $("<div>" + "</div>").attr('id', 'btn_' + x.val()).attr('class', 'div-button').val(x.val())
                  .appendTo('#wrpdiv_' + x.val()).click(function() {remove_food_item($(this)); });
                $("<button>" + "</button>").attr('class', 'col-xs-2 glyphicon glyphicon-trash btn btn-default trash-button').appendTo('#btn_' + x.val());
                

              }
              else {
                selected_food_items[x.val()][10] += parseInt(food_items[x.val()][15]);
                selected_food_items[x.val()][11] += parseInt(food_items[x.val()][14]);
                $("#"+x.val()).text(x.val() + " " + selected_food_items[x.val()][11]+selected_food_items[x.val()][12]+" "+ selected_food_items[x.val()][10] 
                  + " kcal");
                 
             } 
             var tmp_cals = 0;
             for(food_name in selected_food_items){
               tmp_cals += selected_food_items[food_name][10];
             }
             calories = tmp_cals;
             $('#calorieSum').text(calories.toString() + " kcal/2000 kcal");
  
                // actualize char data
             var nr_wkci_items = localStorage.getItem('$fap_nowkcis$');
             var key = "$fap_wkci" + (nr_wkci_items).toString() + "$";
	           var item = JSON.parse(localStorage.getItem(key));
             d=new Date();
             today=new Date(d.getFullYear(),d.getMonth(),d.getDate());
             today_new=JSON.parse(JSON.stringify(today));
             //alert(item['date'] + '  '  + today_new);
             if(item['date'] == today_new) {
               //alert('heuties Datum gefunden');
               item['volume'] += food_items[x.val()[7]];
               //alert('item gefunden');
             } 
             else{
               key = "$fap_wkci" + (parseInt(nr_wkci_items)+1).toString() + "$"; 
               localStorage.setItem('$fap_nowkcis$',JSON.stringify(parseInt(nr_wkci_items)+1));
               //alert(key);
               chartData_new = {
                 date: today,
                 //volume: parseInt(food_items[x.val()][7]);
                 volume: calories
                };
                localStorage.setItem(key, JSON.stringify(chartData_new));
                generateChartData();
                createStockChart();
                   
            };


            //calc_progress_bar();
            //<div class="alert alert-info fade in">
            // <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
            //</div>
            $("<div>" + "hinzugefügt!" +  "</div>").attr('class', 'info-added').attr('id', 'alert_' + x.val()).hide().fadeIn(20).delay(2000).fadeOut(2000)
            .appendTo("#"+x.attr("id"));
                
         };



// Funktion show details of food item
function show_details(x, elected_food_item) {
  //alert(x.attr("id"));
  food_add_button = x;
$("#dialog" ).dialog( "open",x );
$("#dialog").html(x.val() + " " + elected_food_item[11]+elected_food_item[12]+" "+ elected_food_item[10] + " kcal" 
      +"</br> 100g enthalten:"
      +"</br> Eiweiss:"+ elected_food_item[1]
      +", Fett:"+ elected_food_item[2]
      +", Kohlehydrate:"+ elected_food_item[3]
      +", Balaststoffe:"+ elected_food_item[1]
      +", kcal:"+ elected_food_item[7]);
 $("</br><label for=\"name\">Menge</label>").attr('class', 'info-added').attr('id','menge_label').appendTo("#dialog");
$("<input type=\"text\" name=\"menge\" value=" + parseInt(elected_food_item[14]) + ">").attr('id','menge').appendTo("#dialog");

};


// Funktion show details of food item
function show_details_old(x, elected_food_item) {
  //alert(x.attr("id"));
  if (elected_food_item[13]) {
    $("#"+x.attr("id")).html(x.val() + " " + elected_food_item[11]+elected_food_item[12]+" "+ elected_food_item[10] + " kcal");
    elected_food_item[13] = false;
  }
  else{
    $("#"+x.attr("id")).html(x.val() + " " + elected_food_item[11]+elected_food_item[12]+" "+ elected_food_item[10] + " kcal" 
      +"</br> Eiweiss: "+ elected_food_item[1]
      +" Fett: "+ elected_food_item[2]
      +" Kohlehydrate: "+ elected_food_item[3]
      +" Balaststoffe: "+ elected_food_item[1]
      +" kcal: "+ elected_food_item[7]);
    elected_food_item[13] = true;
  }
             
};




// Funktion scroll list to entered letter
        
        $("#search_bar").keyup(function(){
        var value = $( this ).val();
          vx='-'+value+'-';

          //alert(vx);
          //alert(String.fromCharCode(e.which));
          for(var i=0; i<nr_food_items; i++){
            var n = keys[i].indexOf(value);
            //alert(keys[i]);
            if(n == 0){
              var hight = $("#abcd").prop('scrollHeight');
              var pos = Math.floor(hight / nr_food_items * i);
              //alert(pos);
              //alert(keys[i]);
              //alert(i);
              $( "#abcd" ).scrollTop(pos);
              return;
            }
            //alert(keys[nritems-1]);

         }
        });
        
