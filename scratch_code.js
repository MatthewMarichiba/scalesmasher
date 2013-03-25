"use strict"; 
// function scoper(){ // This function contains all code in this file, so that all variables stay local to the file. 

var tuning = {};
//tuning.strings = {1:4, 2:4, 3:4, 4:3, 5:4, 6:null};  // What fret corresponds to the same note on the next string
tuning.nextStrings = [null, 5, 5, 5, 4, 5, null];  // What fret corresponds to the same note on the next string.
tuning.lowString = "E"; // Note of lowest open string
//tuning.numStrings = 6;
tuning.numStrings = tuning.nextStrings.length - 1;

console.log("Tuning details:");
console.log(tuning);
console.log(tuning.numStrings);

var scale = {};
// scale.fretsToShow = {0:1, 4:1, 7:1, 10:1}; // 1, 3, 5, 7b
// scale.fretsToShow = {0:1, 2:1, 4:1, 7:1, 9:1} // Maj Pentatonic
scale.fretsToShow = {0:1, 3:1, 5:1, 7:1, 10:1} // Min Pentatonic
scale.tonicOnLowString = 5;

/* debug 
for (var note in scale.notesToShow) {
    console.log("Fret: " + note);
} 
for (var i = 0; i <= 11; i++) {
    if (scale.notesToShow[i]) { console.log("Fret: " + i); }  
}
*/

function getLowStringFingering(scale, notes) { // notes isn't used in the code yet
console.log(scale);
    var lowString = [];
    var fretInQuestion = null;
    
    for (var i = 0; i < 12; i++) {
        fretInQuestion = (scale.tonicOnLowString + i) % 12;  // Octave wraps after 11th fret
        if (scale.fretsToShow[i]) {
            lowString[fretInQuestion] = notes[i]; 
            lowString[(fretInQuestion+12)] = notes[i];
//            console.log("i= " + i + ", Fret: " + fretInQuestion + ", value = " + lowString[fretInQuestion]);
        } else {
            lowString[fretInQuestion] = ""; 
            lowString[fretInQuestion+12] = "";
//            lowString[fretInQuestion] = "| "; 
//             lowString[fretInQuestion+12] = "| ";
//            console.log("i= " + i + ", Fret: " + fretInQuestion + ", value = " + lowString[fretInQuestion]);
        }
    }
    lowString[24] = lowString[0];
    return lowString;
}

var flatsScale = ["C ", "Db", "D ", "Eb", "E ", "F ", "Gb", "G ", "Ab", "A ", "Bb", "B "];
var sharpsScale = ["C ", "C#", "D ", "D#", "E ", "F ", "F#", "G ", "G#", "A ", "A#", "B "];
var numberScale = ["1 ", "2m", "2 ", "3m", "3 ", "4 ", "5d", "5 ", "6m", "6 ", "7m", "7 "];

var lowString = getLowStringFingering(scale, numberScale);
//debug: print fingerings on the lowest string
// for (var i in lowString) {
//     console.log("Fret" + i + ": " + lowString[i]);
//}

function fillStrings (lowString, tuning) {
    var stringSet = [];
    stringSet[1] = lowString;
    for (var theString = 1; theString < tuning.numStrings; theString++) {
//        console.log("String #: " + theString); 
        stringSet[theString+1] = [];
        for (var i = 0; i <= 24; i++) {
            stringSet[theString+1][i] = stringSet[theString][(i+tuning.nextStrings[theString])%24];
//            console.log(i + ", " + (i+tuning.nextStrings[theString])%24 + ": " + stringSet[theString+1][i]);
        }
    }
    return stringSet;
}

var stringSet = fillStrings(lowString, tuning);
console.log(stringSet);
printStringSet(stringSet);

function printStringSet(stringSet, scale) {
    for (var fretNum = 0; fretNum <= 24; fretNum++) {
        var thisFret = "";
//        console.log("fretNum = " + fretNum);
        var separator = " ";
        if ((fretNum == 0) || (fretNum == 12)) {
            separator = "=";
        } else if ((fretNum == 3) || (fretNum == 5) || (fretNum == 7) || (fretNum == 9) ) {
            separator = "-";
        } 

        var i, endOn;
        for (i = 1, endOn = (stringSet.length - 1); i <= endOn; i++) {
            thisFret = thisFret + stringSet[i][fretNum];
            if (i != endOn) { thisFret += separator; }
        }
        console.log(thisFret);
    }
}

function buildStringsElement(stringSet, scale) {
    var stringsHTML = "<pre>";
    for (var fretNum = 0; fretNum <= 24; fretNum++) {
        var thisFret = "";
//        console.log("fretNum = " + fretNum);
        var separator = " ";
        if ((fretNum == 0) || (fretNum == 12)) {
            separator = "=";
        } else if ((fretNum == 3) || (fretNum == 5) || (fretNum == 7) || (fretNum == 9) ) {
            separator = "-";
        } 

        var i, endOn;
        for (i = 1, endOn = (stringSet.length - 1); i <= endOn; i++) {
            thisFret = thisFret + stringSet[i][fretNum];
            if (i != endOn) { thisFret += separator; }
        }
        console.log(thisFret);
        stringsHTML += thisFret + "<br />";
    }
    return stringsHTML + "</pre>";
}

// printStringSet(stringSet); 

var ssElem = document.getElementById("scalesmasher");
console.log(ssElem);
// console.log(document);

//ssElem.innerHTML = buildStringsElement(stringSet);
ssElem.innerHTML = buildFretboardHTML(stringSet, {}, 0, 24);
console.log(ssElem.innerHTML);

function buildFretboardHTML(instrument, scale, lowFret, highFret) {
    if (lowFret > highFret) {
        return "Invalid fret range.";
    }
    if (lowFret < 0) { // Make sure lowFret is > 0 and is an integer.
        lowFret = 0;
  	} else {
  	    lowFret = Math.floor(lowFret);
  	}
    if (highFret > 24) { // Make sure highFret is <= 24 and is integer.
        highFret = 24;
    } else {
        highFret = Math.floor(highFret);
    }
	   
    var stringsHTML = '<div id="fretboardcontainer" class="container_32">'; 
    
    if (lowFret == 0) { // Display the nut if we're showing Fret 0, else just a fret. 
        stringsHTML += '<div id="" class="grid_6 nut">&nbsp;</div>';
    } else {
        stringsHTML += '<div class="grid_6 fretdivider">&nbsp;</div>';
    }
    stringsHTML += '<div class="clear"></div>';

    for (var fretNum = lowFret; fretNum <= highFret; fretNum++) {
        var thisFret = "";
//        console.log("fretNum = " + fretNum);
        thisFret += '<div id="" class="grid_8 fingerboxcontainer">';
        var i, endOn;
        for (i = 1, endOn = (stringSet.length - 1); i <= endOn; i++) {
            thisFret += '<div id="" class="grid_1 fingerbox thinstring ';  // START of fingerbox div
            // TODO: Update to adjust string thickness based on string number
            if (i==1) {thisFret += 'leftedge ';}
            if (i==endOn) {thisFret += 'rightedge ';}
            thisFret +='">'; //  fingerbox div
            if (stringSet[i][fretNum]) {
                thisFret += '<div class="notedecorator decorator1">' + stringSet[i][fretNum] + '</div>';
                // TODO: Update this to display any number of decorators.
            } else {
                thisFret += '&nbsp;';
            }
            thisFret += '</div>'; // CLOSE fingerbox DIV
            console.log(thisFret);  // DEBUG
        }
        thisFret += '<div class="grid_1 fretnumber">' + (fretNum+1) + '</div>';
        thisFret += '</div>'; // CLOSE fingerboxcontainer DIV
        thisFret += '<div class="clear"></div>';
        stringsHTML += thisFret;
    }
    stringsHTML += '</div>'; // END of fretboardcontainer
    return stringsHTML;
}
/* The structure:
x     	<div id="fretboardcontainer" class="container_32">
x     		<div id="" class="grid_6 nut">&nbsp;</div>
x     		<div class="clear"></div>
x 			<div id="" class="grid_7 fingerboxcontainer">
x 				<div id="" class="grid_1 fingerbox leftedge thickstring">
x 					<div class="notedecorator decorator1">P1</div>
x   			</div>
x  			</div>
x             <div class="clear"></div>
*/


// END OF CODE FOR THIS FILE.
// }
// scoper(); // Call the scoper function to run all code in the file.

/* Scratch 
var flatsScale = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
var sharpsScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var numberScale = ["1", "2m", "2", "3m", "3", "4", "5d", "5", "6m", "6", "7m", "7"];

var test = [4, 4, 4, 3, 4, null];
var testlen = test.length;
console.log(testlen);

*/