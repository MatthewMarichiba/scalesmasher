"use strict"; 

var checkboxVals = [];
var id_base = "check";

function emitCheckboxHTML(id, state) {
    var code = "";
    code += "<div id='" + id + "' class='checkbox " + state + "'></div>";
    return code;
}

function toggleCheckbox(event) {
//    console.log(event);
    console.log(event.target);
//    console.log(event.target.classList);
//    console.log(event.target.className);

    $(this).toggleClass("disabled");
    $(this).toggleClass("enabled");
    
    var checkboxIndex = $(this).prop("id");
    if (checkboxVals[checkboxIndex] == "disabled") {
        checkboxVals[checkboxIndex] = "enabled";
    } else {
        checkboxVals[checkboxIndex] = "disabled";
    }
    console.log(checkboxVals);    
}


$(document).ready(function() {
    var panel_code = "";
    var id_base = "check";
    var states = ["enabled", "disabled", "disabled"];
    console.log(states);
    for (var i = 0; i < 12; i++) {
        panel_code += emitCheckboxHTML( (id_base + i), states[(i%states.length)]);
        checkboxVals[(id_base + i)] = states[(i%states.length)];
    }

    // Insert the panel HTML into the DIV element
    $("#scalesmasher_controls").html(panel_code);

    // Add a click action to each checkbox in the HTML. 
    for (var i = 0; i < 12; i++) {
        $("#"+id_base+i).click(toggleCheckbox);
    }
     
});
