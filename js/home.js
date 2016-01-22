function remove_food_item(rm_but) {
  /*  $('#btn_' + rm_but.val()).remove(); */
    alert($(rm_but).attr("id"));
    $('#' + $(rm_but).attr("id")).parent().remove();
    //$('#' + $(rm_but).attr("id")).remove();
    
}