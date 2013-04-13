"use strict"; 
// var myMasher = new Masher;
// var myInstrument = new MasherInstrument(6, "E", ["P4","P4","P4","M3","P4"], "Shredding Guitar");
// var myScale = new MasherScale("A", myMasher.scales.majorPenta, "sharps", "Ionian Scale in E");
// var myFretboard = new MasherFretboard(myInstrument, myScale, 0, 10);
// var fretboardElement = document.getElementById("scalesmasher");
// fretboardElement.innerHTML = myFretboard.innerHTML;

var hovermenus = new Hovermenu();
//var menuElement = document.getElementById("hovermenu_test");
var menuElement = $("#hovermenu_test");
var code = "";

// Clear the smPanel
menuElement.html(code);

// Render & activate scales
var scale = 0;  // TODO: Expand this to iterate through all scales. 

// Emit the HTML for the hovermenu
var menuName = "notes";
var menuItems = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]; 
var initItem = "Boo!";

// Add menu 1
hovermenus.addMenu(menuName, menuItems, initItem, "grid_3");
// code += hovermenus.getHTML(menuName);
// console.log("Here's what getHTML returned:");
// console.log(code);
menuElement.append(hovermenus.getHTML(menuName));
hovermenus.activateMenu(menuName, function () {} );


// Add menu 2
var x;
x = hovermenus.addMenu("menu2", menuItems, "Yall!", "grid_2", processTestmenuClick);
menuElement.append(x = hovermenus.getHTML("menu2") );
hovermenus.activateMenu("menu2", processTestmenuClick );

/*
// Add menu 3
x = hovermenus.addMenu("menu3", menuItems, "menu3!", "grid_2", processTestmenuClick);
menuElement.append(x = hovermenus.getHTML("menu3") );
hovermenus.activateMenu("menu3", processTestmenuClick );
*/

// Add menu 4
x = hovermenus.addMenu("menu4", ["One", "Two", "Three"], "menu4!", "grid_2", processTestmenuClick);
menuElement.append(x = hovermenus.getHTML("menu4") );
hovermenus.activateMenu("menu4", processTestmenuClick );

// Add menu 5
x = hovermenus.addMenu("menu5", ["four", "five", "siz", "seven"], "menu5!", "grid_2", processTestmenuClick);
menuElement.append(x = hovermenus.getHTML("menu5") );
hovermenus.activateMenu("menu5", processTestmenuClick );

/*
// Add menu 6
var x;
x = hovermenus.addMenu("menu6", ["eight", "nine"], "menu6!", "grid_2", processTestmenuClick);
menuElement.append(x = hovermenus.getHTML("menu6") );
hovermenus.activateMenu("menu6", processTestmenuClick );
*/

menuElement.append("<br class='clear'>");

var checkBoxes = new OnOffBox();
var boxName;
for (var i = 0; i < 10; i++) {
    boxName = "testbox"+i;
    checkBoxes.addBox(boxName, i, "on", "testclass bestclass", processBoxClick);    
    menuElement.append(checkBoxes.getHTML(boxName));
    checkBoxes.activateBox(boxName);
}


/**
 * Application-specific function to process what to do when an item is clicked. 
 * @param menuName  the hovermenu name string
 * @param itemNum  the index of the item clicked
 * @param itemName  the text of the item clicked
 */
function processTestmenuClick(menuName, itemNum, itemName) {
    // 1. Change the value of the current item in the fretboard Scale for a particular scaleNum.
    // 2. Re-compute finger decorators.

    console.log("Click processor: hovermenu_item_" + menuName + "_" + itemNum + ": " + itemName);
//    self.fretboard.scales[0].tonic(itemName); //TODO: Write some accessor functions to change data structure automatically.
//    self.displayFretboard();
    return itemName;
}

function processBoxClick(boxName, newState) {
    console.log(boxName + " was clicked making it " + newState);
}

/*
this._activateHoverMenu(menuName);        

// Emit the HTML for the note on/off buttons.
code = "";
for (var i=0; i < 12; i++) {
    code += this._emitScaleNoteOnOffBox(scale, i);
}
smPanel.append(code);
*/
