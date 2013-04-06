/**
 * @author mmarichiba
 */
"use strict"; 
/**
 * MasherPanel class provides a UI to manage the state of a MasherFretboard object. 
 * @param  fretboard  the fretboard object to control
 * @return      nothing
 */
function MasherPanel(fretboard, panelDivElement) {
    // TODO: Add error checking for valid fretboard values.
    this.fretboard = fretboard;
    this.panelDivElement = panelDivElement;
    this.menustate = [];    // This is a hash to store state variables for the menus on the MasherPanel UI.
    var self = this;
    

    this.innerHTML = "The MasherPanel object has been initialized."; //TODO: Remove this note later.

    // &&&&&&&&&&&&&&&& Define MasherPanel Class Methods &&&&&&&&&&&&& 
    this.displayFretboard = function() {
        self.fretboard.renderHTML();
        var fretboardElement = document.getElementById("scalesmasher");
        fretboardElement.innerHTML = self.fretboard.innerHTML;
//        self.panelDivElement.innerHTML = self.fretboard.innerHTML;
        console.log("Does the HTML match the fretboard state: " + (fretboardElement.innerHTML == self.fretboard.innerHTML));
    }    

    this._emitDivId = function(scaleNum, noteNum) {
        if ((scaleNum == null) || (noteNum == null)) {
            console.log("_emitDivId: Invalid scaleNum or noteNum");
            return "scalesmasher_unknown_div";
        }
        return "s" + scaleNum + "n" + noteNum;
    }

    this._emitScaleNoteOnOffBox = function(scaleNum, noteNum) {
    // 1. look up existing state in instrument
    // 2. emit div code, substituting: scaleNum, noteNum, and state
    // 3. return HTML
    
        var boxCode = "";
    //    var divId = this._emitDivId(scaleNum, noteNum);
        var isEnabled;
        if (this.fretboard.scales[scaleNum].notesToShow()[noteNum]) {
            isEnabled = "enabled";
        } else {
            isEnabled = "disabled";
        }
         
        boxCode += "<div id='" + this._emitDivId(scaleNum, noteNum) + "' class='notebox scale1 " + isEnabled + "'>";
        // boxCode += "<div id='" + this._emitDivId(scaleNum, noteNum) + "' class='notedecorator " + isEnabled + "'>";
        boxCode += Masher.prototype.intervalNotes[noteNum];
        boxCode += "</div>";
        console.log(boxCode); // DEBUG
        return boxCode;
        
        //var code = "";
        //code += "<div id='" + id + "' class='checkbox " + state + "'></div>";
        //return code;    
    }
    
    this._getScaleNum = function(id) {
        return id.match(/s(.*)n/)[1];
    }
    
    this._getNoteNum = function(id) {
        return id.match(/n(.*)/)[1];
    }
    
    this._handleScaleNoteOnOffEvent = function(event) {
        $(this).toggleClass("disabled");
        $(this).toggleClass("enabled");
        // console.log($(this));
        // console.log(this);
        // console.log(event.target.id);
        var targetId = event.target.id;
        // console.log(self._getScaleNum(targetId));
        console.log(self._getNoteNum(targetId));
        var scaleNum = self._getScaleNum(targetId);
        var noteNum = self._getNoteNum(targetId);
        var notesArray = self.fretboard.scales[scaleNum].notesToShow(); // Read out the current state of the scale's notes.
        console.log("Scale " + scaleNum + ", Note " + noteNum + ", Current state: " + notesArray);
        if ($(this).hasClass("enabled")) {  // Set the note in question according to the enabled/disabled state of the checkbox. 
            notesArray[noteNum] = 1;
        } else {
            notesArray[noteNum] = 0;
        }
        self.fretboard.scales[scaleNum].notesToShow(notesArray);    // Write the notes back into the fretboard.
        console.log("state in notesArray: " + notesArray);
        console.log("state in fretboard properties: " + self.fretboard.scales[scaleNum].notesToShow());    
        
        self.displayFretboard();
    /*
       var checkboxIndex = $(this).prop("id");
        if (checkboxVals[checkboxIndex] == "disabled") {
            checkboxVals[checkboxIndex] = "enabled";
        } else {
            checkboxVals[checkboxIndex] = "disabled";
        }
        console.log(checkboxVals);        
    */
    }
    
    this._activateScaleNoteOnOffBox = function(scaleNum, noteNum) {
    // 1. Look up DOM element for the box.
    // 2. Set onclick action for the box.
    // 3. return ___?
    
        var divId = this._emitDivId(scaleNum, noteNum);
        console.log("activating: " + divId);
        return $("#"+divId).click(this._handleScaleNoteOnOffEvent);
    }

    this._emitHoverMenu = function(menu_hash, menu_items, init_item) {
        // Form:
        // <div id="hovermenu_<menu_name>" class="hovermenu_trigger">
        //   <p>Current item</p>
        //   <div id="hovermenu_<menu_name>" class="hovermenu_items">
        //     <ul id="hovermenu_items_<menu_name>" class="hovermenu_items">
        //       <li id="hovermenu_item_<menu_name><#>" class="hovermenu_item hovermenu_item_<menu_name>">Menu item #</li>
        //       ...
        //     </ul>
        //   </div>
        // </div> 
        self.menustate[menu_hash] = menu_items;
        var code = '<div id="hovermenu_' + menu_hash + '" class="hovermenu_trigger"><p>' + init_item + '</p>';
        code += '<ul id="hovermenu_items_' + menu_hash + '" class="hovermenu_items">';
        for (var i = 0; i < menu_items.length; i++) {
            code += '<li id="hovermenu_item_' + menu_hash + "_" + i + '" class="hovermenu_item hovermenu_item_' + menu_hash + '">' + menu_items[i] + '</li>';
        }
        code += '</ul></div></div>';
        return code;
    }

    // Get the hovermenu id from the id of a clicked item in the menu
    // Ex: hovermenu_item_notes_2  --> "notes"
    this._getMenuNameFromHovermenuId = function(id) {
        var regex = /_([a-zA-Z0-9]+)_\d+$/;
        return id.match(regex)[1];
    }

    // Get the item number from the id of a clicked item in a hovermenu
    // Ex: hovermenu_item_notes_12  --> 12
    this._getItemNumFromHovermenuId = function(id) {
        var regex = /_(\d+$)/;
        return id.match(regex)[1];
    }

/*
    this._getSelectionFromHovermenuId = function(id) {
        var regex = menu_hash + "(.*)";
        return id.match(regex)[1];
    }
*/

    this._handleHovermenuItemClick = function(event) {
        // 1. Get menu_hash from ID -- Figure out which menu was clicked.
        // 2. Get the <li> value from the DOM -- Actually, it's the innerHTML of the item clicked.
        // 3. Find the index value in the item list. -- it's the number at the end of the id.
        // 4. De-select all other entries (or at least the previously selected item) in the list.
        // 5. Highlight the new item in the list. 
        // 6. Change the value of the current item in the fretboard Scale for a particular scaleNum.
        // 7. Re-compute finger decorators.

        var item = {}; // Object to hold properties: menuName, menuItem, num & selection 
        var regex;
        
        item.menuName = self._getMenuNameFromHovermenuId(event.target.id);
        item.num = self._getItemNumFromHovermenuId(event.target.id);
//        item.itemName = self._getSelectionFromHovermenuId(event.target.id);
        item.selection = event.target.innerHTML;
        
        console.log("Hi! It's hovermenu_item_" + item.menuName + item.num + ": " + item.selection);
        console.log("Here's the event object for this click:");
        console.log(event);
        
        // 4. De-select all other entries (or at least the previously selected item) in the list.
        $(".hovermenu_item_"+item.menuName).removeClass("hovermenu_item_active");

        // 5. Highlight the new item in the list. 
        $(this).addClass("hovermenu_item_active");
        $("#hovermenu_"+item.menuName+" p").html(item.selection);  // Dipslay it in the currently-selected slot.
        $("#hovermenu_items_"+item.menuName).hide();    // Hide the hovermenu now that user has made a selection. 

        // 6. Change the value of the current item in the fretboard Scale for a particular scaleNum.
        self.fretboard.scales[0].tonic(item.selection); //TODO: Write some accessor functions to change data structure automatically.
        self.displayFretboard();
//        self.fretboard.renderHTML();
//        var smElement = document.getElementById("scalesmasher");
//        smElement.innerHTML = self.fretboard.innerHTML;

 
    }

    this._activateHoverMenu = function(menu_hash) {
        // Show the hovermenu_items when mouse enters the hovermenu_trigger
        $('#hovermenu_'+menu_hash).mouseenter(function() {
            $('#hovermenu_items_'+menu_hash).show();
        });
        
        // Hide the hovermenu_items when mouse leaves the movermenu_items
        var hovermenu_items = $('#hovermenu_items_'+menu_hash);
        hovermenu_items.mouseleave(function() {
            $(hovermenu_items).hide();
        });


        for (var i = 0; i < self.menustate[menu_hash].length; i++) {
            // Set click behavior on each menu item
            $('#hovermenu_item_'+menu_hash+"_"+i).click(self._handleHovermenuItemClick);              
//            $('#hovermenu_item_'+menu_hash+i).click(function(event) {
//                console.log("Hi! It's hovermenu_item_" + menu_hash + self._getItemNumFromHovermenuId(event.target.id, menu_hash));
//            });
        }
    }

    this.renderAndActivateHTML = function() {
        var code = "";
        var smPanel = $('#scalesmasher_controls');

        // Render & activate the instrument controls
        // TODO: do this once I have the controls developed.

        // Render & activate scales
        var scale = 0;  // TODO: Expand this to iterate through all scales. 

        // Emit the HTML for the hovermenu
        var menu_hash = "notes";
        var menu_items = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]; //TODO: Add this string literal to the Masher class, or better yet the MasherPanel class.
        var menu_text = "Note";
                
        code = this._emitHoverMenu(menu_hash, menu_items, menu_text);
        smPanel.append(code);

        // <div id="hovermenu_<hash>" class="hovermenu_trigger">  -- ex: menus["notes"] = ["C", "C#/Db", "D", "D#/Eb", ...];
        //   <div class="hovermenu_items"> -- Default CSS is hidden.
        //     <ul  id="hovermenu_items_<hash>" class="hovermenu_items">
        //       <li id="hovermenu_item_<hash>0" class="hovermenu_item">menus[hash][0]</li>
        //       <li id="hovermenu_item_<hash>1" class="hovermenu_item">menus[hash][1]</li>
        //       <li id="hovermenu_item_<hash>2 class="hovermenu_item">menus[hash][2]</li>
        //          ...

        this._activateHoverMenu(menu_hash);        
        
        // Emit the HTML for the note on/off buttons.
        code = "";
        for (var i=0; i < 12; i++) {
            code += this._emitScaleNoteOnOffBox(scale, i);
        }
        smPanel.append(code);

        // Second, insert the HTML into the DOM
/* This bit grabs the elemnt with raw JS 
        var newElement = document.createElement("div");
        newElement.id = "scale_notes";
        newElement.innerHTML = code;
        document.getElementById('scalesmasher_controls').appendChild(newElement);
*/

/* PROTOYPE: This is an example of 1) Inserting new code into the DOM and chaingin onto it, 
 * and 2) how to store a jquery selection to be used later.
        var new_code_element = $('#scalesmasher_controls').append(code).hide();
        alert("Hold please");
        new_code_element.show();
*/

        // Third, add click event handlers for each new on/off box.
        for (var i=0; i < 12; i++) {
            this._activateScaleNoteOnOffBox(scale, i);
        }

    }   // renderAndActivateHTML


}   // MasherPanel
