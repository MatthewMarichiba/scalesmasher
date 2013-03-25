"use strict"; 
/**
 * Masher is a helper class for the ScalesMasher library, 
 * providing standard objects and values which can be used
 * by multiple classes.  
 */

// Experiment with accessing members of the Masher class prototype
/*
console.log(Masher.prototype.intervalNotesIndex.m2);
console.log(Masher.prototype.intervalNotesIndex["M2"]);
console.log(Masher.prototype.intervalNotesIndex["M7"]);
*/

console.log("Testing the Masher class");
var myMasher = new Masher;
console.log(myMasher.intervalNotes);
console.log(Masher.prototype.scales["dorian"]);
/* Test the Masher class 
console.log(myMasher.flatNotes);
console.log(myMasher.scales["ionian"]);
console.log(myMasher.scales[0]);
console.log(myMasher.scales["majorPenta"]);
console.log(myMasher.scales["phrygian"]);
console.log(myMasher.scales["mixolydian"]);
*/

/* Test the MasherInstrument class */
console.log("Testing the MasherInstrument class");
var myInstrument = new MasherInstrument(6, "E", ["P4","P4","P4","M3","P4"], "Shredding Guitar");
// console.log(myInstrument.numStrings());
console.log(myInstrument.lowStringNote());
console.log(myInstrument.stringIntervals());
console.log(myInstrument.name());

/* Test the MasherScale class */
console.log("Testing the MasherScale class");
//var myScale = new MasherScale("E", myMasher.scales.ionian, "sharps", "Ionian Scale in E");
//var myScale = new MasherScale("E", myMasher.scales.ionian, "intervals", "Ionian Scale in E");
var myScale = new MasherScale("A", myMasher.scales.majorPenta, "intervals", "Ionian Scale in E");
console.log(myScale.tonic());
console.log(myScale.notesToShow());
console.log(myScale.name());

/* Test the MasherFretboard class */
console.log("Testing the MasherFretboard class with custom values");
var myFretboard = new MasherFretboard(myInstrument, myScale, 5, 12);
console.log(myFretboard.scales[0].notesToShow());
console.log(myFretboard.instrument.name());
console.log(myFretboard.highFret);

/* Test adding more scales to myFretboard */
/*
console.log("Testing adding new scales with addScale().");
myFretboard.addScale(new MasherScale("C", myMasher.scales.majorPenta, "intervals", "1st additional scale"), 1);
console.log(myFretboard.scales[1].notesToShow());
myFretboard.addScale(new MasherScale("A", myMasher.scales.minorPenta, "intervals", "2st additional scale"));
console.log(myFretboard.scales[2].notesToShow());
myFretboard.removeScale(2);         
// myFretboard.removeScale(0);
myFretboard.addScale(new MasherScale("A", myMasher.scales.minorPenta, "intervals", "2st additional scale"));
console.log(myFretboard.scales[0].notesToShow());
console.log(myFretboard.scales[1].notesToShow());
console.log(myFretboard.scales[2].notesToShow());
*/



/*
console.log("Testing the MasherFretboard class default values");
var myFretboardDefaults = new MasherFretboard();
console.log(myFretboardDefaults.instrument + "\n" + myFretboardDefaults.scales[0] + 
    "\nlowFret:" + myFretboardDefaults.lowFret + "\nhighFret:" + myFretboardDefaults.highFret);
*/

/* Get the scalesmasher div & substitute in rendered HTML */
console.log("Get the scalesmasher div & substitute in rendered HTML...");
var smElement = document.getElementById("scalesmasher");
console.log(smElement);
smElement.innerHTML = myFretboard.innerHTML;
// console.log(smElement.innerHTML);
alert("Up next: add a scale to slot 1 and re-render.");
myFretboard.addScale(new MasherScale("C", myMasher.scales.majorPenta, "intervals", "1st additional scale"), 1);
myFretboard.renderHTML();
smElement.innerHTML = myFretboard.innerHTML;
alert("Up next: remove a scale from slot 0 and re-render.");
myFretboard.removeScale(0);
myFretboard.renderHTML();
smElement.innerHTML = myFretboard.innerHTML;

console.log("Test changing renderings.");
// alert('Up next: myFretboard.innerHTML = "";');
// myFretboard.innerHTML = ""; // This doesn't change smElement.innerHTML DOM element. 
// alert("I just erased innerHTML. What happened?");

// alert('Up next: smElement.innerHTML = "";');
// smElement.innerHTML = "";
// myFretboard.innerHTML = "";
// alert('Up next: myFretboard.addScale(new MasherScale("C", myMasher.scales.majorPenta, "intervals", "1st additional scale"), 1);');
// myFretboard.addScale(new MasherScale("C", myMasher.scales.majorPenta, "intervals", "1st additional scale"), 1);
// myFretboard.removeScale(2);         
// myFretboard.renderHTML(); // Re-render, now that we've added a scale
// smElement.innerHTML = myFretboard.innerHTML;

console.log("Insert the controls div...");
var myMasherControls = new MasherControls(myFretboard);
var smCtrlElement = document.getElementById("scalesmasher_controls");
console.log(smCtrlElement);
smCtrlElement.innerHTML = myFretboard.innerHTML;

