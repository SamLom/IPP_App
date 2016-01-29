        var food_items = {};
        var selected_food_items = {};
        var calories = 0;
        var keys =[];
        var nr_food_items;

       

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
                alert(item[0]);
                food_items[item[0]] = [item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9], item[10]];

                food_items[item[0]].push(parseInt(item[8]));  //food_items...[10] enhält Summe kcal
                food_items[item[0]].push(parseInt(item[1])); //selected_food_items...[11] enhält Summe Menge
                if(food_items[item[0]][0].indexOf("g") > -1){                //selected_food_items...[13] enhält g / ml
                  food_items[item[0]].push("g")}
                else{
                  food_items[item[0]].push("ml")
                }
                food_items[item[0]].push(false);                            //selected_food_items...[13] enhält expanded true/false
                 
                //food_items[item[0]] = item[8];
              keys.push(item[0]);
                $("<div></div>").attr('id', 'wrp_nnn' + i).appendTo('#abcd');
                
                $("<div>" + item[0] + " " + item[1] + " " + item[8] + " " + item[9] + "</div>")
                   .val(item[0]).attr('class', 'food-list-btn col-md-10 col-xs-10 btn btn-default').attr('id', 'nnn' + i).appendTo('#wrp_nnn' + i)
                   .click(function () {show_details($(this) ,food_items[$(this).val()]); });
                
                $("<div>" +  "</div>")
                   .val(item[0]).attr('class', 'plus-button col-xs-2 food-list-btn btn btn-default').attr('id', 'nnnn' + i).appendTo('#wrp_nnn' + i)
                   .click(function () {button_selected($(this))  });
                   $("<i>" + "</i>").attr('class', 'glyphicon glyphicon-plus').appendTo('#nnnn' + i);
                
                
             
                
                
                
                  

            }

        };

         function add_food_item(x) {
          alert("add_food_item");
        };

// Funktion Button selected!


            function button_selected(x) {
              //  alert(x.text() + " hinzugefügt");
              //  alert(x.val());
              if(selected_food_items[x.val()] == undefined){
                selected_food_items[x.val()] = food_items[x.val()];
     
                $("<div></div>").attr('id', 'wrpdiv_'+x.val()).attr('class', 'col-xs-12 col-md-12').appendTo('#mealsDiv');
                //$("<div>" + x.val() + " " + food_items[x.val()][0]+" "+food_items[x.val()][8]+" "+food_items[x.val()][7] + " kcal" + "</div>")
                //  .attr('id', x.val()).appendTo('#wrpdiv_' + x.val());

                $("<div>" + x.val() + " " + food_items[x.val()][0]+" "+food_items[x.val()][8]+" "+food_items[x.val()][7] + " kcal" + "</div>").val(x.val())
                  .attr('id', x.val()).attr('class', 'col-xs-11 col-md-10 btn btn-default meal_item').appendTo('#wrpdiv_' + x.val())
                  .click(function() {show_details($(this) ,selected_food_items[$(this).val()]); });
                

                $("<div>" + "</div>").attr('id', 'btn_' + x.val()).attr('class', 'div-button').val(x.val())
                  .appendTo('#wrpdiv_' + x.val()).click(function() {remove_food_item($(this)); });
                $("<button>" + "</button>").attr('class', 'col-xs-2 glyphicon glyphicon-trash btn btn-default trash-button').appendTo('#btn_' + x.val());
                

              }
              else {
                selected_food_items[x.val()][10] += parseInt(food_items[x.val()][7]);
                selected_food_items[x.val()][11] += parseInt(food_items[x.val()][0])
                $("#"+x.val()).text(x.val() + " " + selected_food_items[x.val()][11]+food_items[x.val()][12]+" "+ selected_food_items[x.val()][10] + " kcal");
                 //$("#"+x.val()).text("teste");
             } 
             var tmp_cals = 0;
             for(food_name in selected_food_items){
               tmp_cals += selected_food_items[food_name][10];
             }
             calories = tmp_cals;
             $('#calorieSum').text(calories.toString() + " kcal");
  
                // actualize char data
             var nr_wkci_items = localStorage.getItem('$fap_nowkcis$');
             var key = "$fap_wkci" + (nr_wkci_items).toString() + "$";
	           var item = JSON.parse(localStorage.getItem(key));
             d=new Date();
             today=new Date(d.getFullYear(),d.getMonth(),d.getDate());
             today_new=JSON.parse(JSON.stringify(today));
             alert(item['date'] + '  '  + today_new);
             if(item['date'] == today_new) {
               alert('heuties Datum gefunden');
               item['volume'] += food_items[x.val()[7]];
               alert('item gefunden');
             } 
             else{
               key = "$fap_wkci" + (parseInt(nr_wkci_items)+1).toString() + "$"; 
               localStorage.setItem('$fap_nowkcis$',JSON.stringify(parseInt(nr_wkci_items)+1));
               alert(key);
               chartData_new = {
                 date: today,
                 //volume: parseInt(food_items[x.val()][7]);
                 volume: calories
                };
                localStorage.setItem(key, JSON.stringify(chartData_new));
                generateChartData();
                createStockChart();
                   
            };
                
            $("<div> bsbsbsbs</div>")
               .val(item[0]).attr('class', 'alert alert-sucess').attr('id', 'add_alert').appendTo('#wrp_nnn')
               .click(function () {button_selected($(this))  });

            calc_progress_bar();
         };



// Funktion show details of food item
function show_details(x, elected_food_item) {
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