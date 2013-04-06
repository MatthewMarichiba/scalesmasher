"use strict"; 
var myMasher = new Masher;
var myInstrument = new MasherInstrument(6, "E", ["P4","P4","P4","M3","P4"], "Shredding Guitar");
var myScale = new MasherScale("A", myMasher.scales.majorPenta, "sharps", "Ionian Scale in E");
var myFretboard = new MasherFretboard(myInstrument, myScale, 0, 10);
var fretboardElement = document.getElementById("scalesmasher");
fretboardElement.innerHTML = myFretboard.innerHTML;

var myPanel = new MasherPanel(myFretboard, fretboardElement);
var panelElement = document.getElementById("scalesmasher_controls");
//myPanel.renderHTML();
//panelElement.innerHTML = myPanel.innerHTML;

myPanel.renderAndActivateHTML();
// console.log(smElement.innerHTML);

