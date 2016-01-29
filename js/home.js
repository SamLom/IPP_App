function remove_food_item(rm_but) {
  /*  $('#btn_' + rm_but.val()).remove(); */
    //alert($(rm_but).attr("id"));
   // alert($(rm_but).val());
    console.log(selected_food_items[$(rm_but).val()]);
    calories -= selected_food_items[$(rm_but).val()][10];
    $('#calorieSum').text(calories.toString() + " kcal von 2000 kcal");
    
    delete selected_food_items[$(rm_but).val()];
    calc_progress_bar();
    $('#wrpdiv_'+$(rm_but).val()).remove();
    
    
}


function calc_progress_bar() {
  /*  $('#btn_' + rm_but.val()).remove(); */
  //alert("calc_progress_bar");
  
  var eiweiss = 0;
  var rel_eiweiss = 0;
  var fett = 0;
  var rel_fett = 0;
  var kohlenhydrate = 0;
  var rel_kohlenhydrate = 0;
  var empty_part = 100;
  var  kcal_prgs = 0;
    var tmp_cals = 0;
     for(food_name in selected_food_items){
        //alert(food_name);
        //$("#klhd_prgs_bar").width("70%") ;
       //<div id="klhd_prgs_bar" class="progress-bar progress-bar-success" style="width: 35%">Kohlenhydrate  3
        //<div id="pro_prgs_bar" class="progress-bar progress-bar-warning" style="width: 20%">Eiweiss   1
        //<div id="fett_prgs_bar" class="progress-bar progress-bar-danger" style="width: 10%">Fett 2
        eiweiss += parseInt(selected_food_items[food_name][1]);
        fett += parseInt(selected_food_items[food_name][2]);
        kohlenhydrate += parseInt(selected_food_items[food_name][3]);
        tmp_cals += selected_food_items[food_name][10];
        
     }
    // alert("after loop");
     gesamt_menge = eiweiss  + fett + kohlenhydrate;
     if (gesamt_menge > 0){
       $("#rel_prg").show();
       rel_eiweiss = Math.round(100 / gesamt_menge * eiweiss);
       rel_kohlenhydrate = Math.round(100 / gesamt_menge * kohlenhydrate);
       rel_fett = 100 - rel_eiweiss - rel_kohlenhydrate;
        kcal_prgs = Math.round(tmp_cals / 20); 
         empty_part = 100 - kcal_prgs;
    }
    else{
     // $("#rel_prg").hide();
    }
   //  alert("before set width");
     $("#klhd_prgs_bar").width(rel_kohlenhydrate+"%") ;
     $("#pro_prgs_bar").width(rel_eiweiss+"%") ;
     $("#fett_prgs_bar").width(rel_fett+"%") ;
     
     //$("#empty_abs_prgs_bar").width(empty_part+"%").text("");
     $("#kcal_abs_prgs_bar").width(kcal_prgs+"%");

     

     //alert("E:"+eiweiss.toString()+";RE:"+rel_eiweiss.toString() + " ;F:"+fett.toString()+ " ;RF:"+rel_fett.toString()+" ;K:"+kohlenhydrate.toString()+" ;RK:"+rel_kohlenhydrate.toString());
}