"use strict"; 
var myMasher = new Masher;
var myInstrument = new MasherInstrument(6, "E", ["P4","P4","P4","M3","P4"], "Shredding Guitar");
var myScale = new MasherScale("A", myMasher.scales.majorPenta, "intervals", "Ionian Scale in E");
var myFretboard = new MasherFretboard(myInstrument, myScale, 0, 10);
var fretboardElement = document.getElementById("scalesmasher");
fretboardElement.innerHTML = myFretboard.innerHTML;

var myPanel = new MasherPanel(myFretboard, fretboardElement);
var panelElement = document.getElementById("scalesmasher_controls");
//myPanel.renderHTML();
//panelElement.innerHTML = myPanel.innerHTML;

myPanel.renderAndActivateHTML();
// console.log(smElement.innerHTML);

/*
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
*/