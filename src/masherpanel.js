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


    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 
    // &&&&&&&&&&&&&&&& Define MasherPanel Class Methods &&&&&&&&&&&&& 
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 

    // TODO: Javadoc
    this.displayFretboard = function() {
        self.fretboard.renderHTML();
        var fretboardElement = document.getElementById("scalesmasher");
        fretboardElement.innerHTML = self.fretboard.innerHTML;
//        self.panelDivElement.innerHTML = self.fretboard.innerHTML;
        console.log("Does the HTML match the fretboard state: " + (fretboardElement.innerHTML == self.fretboard.innerHTML));
    }    

    // TODO: Javadoc
    this._emitDivId = function(scaleNum, noteNum) {
        if ((scaleNum == null) || (noteNum == null)) {
            console.log("_emitDivId: Invalid scaleNum or noteNum");
            return "scalesmasher_unknown_div";
        }
        return "s" + scaleNum + "n" + noteNum;
    }

    // TODO: Javadoc
    this._emitScaleNoteOnOffBox = function(scaleNum, noteNum) {
    // 1. look up existing state in instrument
    // 2. emit div code, substituting: scaleNum, noteNum, and state
    // 3. return HTML
    
        var boxCode = "";
        var isEnabled;
        if (this.fretboard.scales[scaleNum].notesToShow()[noteNum]) {
            isEnabled = "enabled";
        } else {
            isEnabled = "disabled";
        }
         
        boxCode += "<div id='" + this._emitDivId(scaleNum, noteNum) + "' class='notebox scale1 " + isEnabled + "'>";
        boxCode += Masher.prototype.intervalNotes[noteNum];
        boxCode += "</div>";
        console.log(boxCode); // DEBUG
        return boxCode;
    }
    
    // TODO: Javadoc
    this._getScaleNum = function(id) {
        return id.match(/s(.*)n/)[1];
    }
    
    // TODO: Javadoc
    this._getNoteNum = function(id) {
        return id.match(/n(.*)/)[1];
    }
    
    // TODO: Javadoc
    this._handleScaleNoteOnOffEvent = function(event) {
        $(this).toggleClass("disabled");
        $(this).toggleClass("enabled");
        var targetId = event.target.id;
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
    }
    
    // TODO: Javadoc
    this._activateScaleNoteOnOffBox = function(scaleNum, noteNum) {
    // 1. Look up DOM element for the box.
    // 2. Set onclick action for the box.
    // 3. return ___?
    
        var divId = this._emitDivId(scaleNum, noteNum);
        console.log("activating: " + divId);
        return $("#"+divId).click(this._handleScaleNoteOnOffEvent);
    }

    // TODO: Javadoc
    this._emitHoverMenu = function(menuName, menuItems, initItem) {
        // Form:
        // <div id="hovermenu_<menu_name>" class="hovermenu_trigger">
        //   <p>Current item</p>
        //   <ul id="hovermenu_items_<menu_name>" class="hovermenu_items">
        //     <li id="hovermenu_item_<menu_name>_<#>" class="hovermenu_item hovermenu_item_<menu_name>">Menu item #</li>
        //     ...
        //   </ul>
        // </div>
        self.menustate[menuName] = menuItems;
        var code = '<div id="hovermenu_' + menuName + '" class="hovermenu_trigger"><p>' + initItem + '</p>';
        code += '<ul id="hovermenu_items_' + menuName + '" class="hovermenu_items">';
        for (var i = 0; i < menuItems.length; i++) {
            code += '<li id="hovermenu_item_' + menuName + "_" + i + '" class="hovermenu_item hovermenu_item_' + menuName + '">' + menuItems[i] + '</li>';
        }
        code += '</ul></div>';
        return code;
    }

    // Get the hovermenu id from the id of a clicked item in the menu
    // Ex: hovermenu_item_notes_4  --> "notes"
    // TODO: Javadoc
    this._getMenuNameFromHovermenuId = function(id) {
        var regex = /_([a-zA-Z0-9]+)_\d+$/;
        return id.match(regex)[1];
    }

    // Get the item number from the id of a clicked item in a hovermenu
    // Ex: hovermenu_item_notes_12  --> 12
    // TODO: Javadoc
    this._getItemNumFromHovermenuId = function(id) {
        var regex = /_(\d+$)/;
        return id.match(regex)[1];
    }

    // TODO: Javadoc
    this._handleHovermenuItemClick = function(event) {
        // 1. Get menuName from ID -- Figure out which menu was clicked.
        // 2. Get the <li> value from the DOM -- Actually, it's the innerHTML of the item clicked.
        // 3. Find the index value in the item list. -- it's the number at the end of the id.
        // 4. De-select all other entries (or at least the previously selected item) in the list.
        // 5. Highlight the new item in the list. 
        // 6. Change the value of the current item in the fretboard Scale for a particular scaleNum.
        // 7. Re-compute finger decorators.

        var menuName = self._getMenuNameFromHovermenuId(event.target.id);
        var itemNum = self._getItemNumFromHovermenuId(event.target.id);
        var itemName = event.target.innerHTML;
        
        console.log("Hi! It's hovermenu_item_" + menuName + "_" + itemNum + ": " + itemName);
        console.log("Here's the event object for this click:");
        console.log(event);
        
        // 4. De-select all other entries (or at least the previously selected item) in the list.
        $(".hovermenu_item_"+menuName).removeClass("hovermenu_item_active");

        // 5. Highlight the new item in the list. 
        $(this).addClass("hovermenu_item_active");
        $("#hovermenu_"+menuName+" p").html(itemName);  // Dipslay it in the currently-selected slot.
        $("#hovermenu_items_"+menuName).hide();    // Hide the hovermenu now that user has made a selection. 

        // 6. Process the item: Change the value of the current item in the fretboard Scale for a particular scaleNum.
        self.fretboard.scales[0].tonic(itemName); //TODO: Write some accessor functions to change data structure automatically.
        self.displayFretboard();
    }

    // TODO: Javadoc
    /**
     * Activates hovermenu HTML
     * @param menuName  the name string for the menu. This string shows up in HTML.
     * @param handleClick  a 
     */
    this._activateHoverMenu = function(menuName, handleClick) {
        var hovermenuItems = $('#hovermenu_items_'+menuName);

        // Hide the hovermenu_items list to start
        hovermenuItems.hide();

        // Show the hovermenu_items when mouse enters the hovermenu_trigger, or when it's clicked
        $('#hovermenu_'+menuName)
            .mouseenter(function() {
                hovermenuItems.show();
            })
            .click(function() {
                hovermenuItems.show();
            });

        
        // Hide the hovermenu_items when mouse leaves the movermenu_items
//        var hovermenuItems = $('#hovermenu_items_'+menuName);
        hovermenuItems.mouseleave(function() {
            $(hovermenuItems).hide();
        });


        // Set click behavior on each menu item
        for (var i = 0; i < self.menustate[menuName].length; i++) {
            $('#hovermenu_item_'+menuName+"_"+i).click(self._handleHovermenuItemClick);              
        }
    }

    this.renderAndActivateHTML = function() {
        var smPanel = $('#scalesmasher_controls');
        var code = "";
        
        // Clear the smPanel
        smPanel.html(code);

        // Render & activate the instrument controls
        // TODO: do this once I have the controls developed.

        // Render & activate scales
        var scale = 0;  // TODO: Expand this to iterate through all scales. 

        // Emit the HTML for the hovermenu
        var menuName = "scale"+scale;
        var menuItems = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]; //TODO: Add this string literal to the Masher class, or better yet the MasherPanel class.
        var initItem = self.fretboard.scales[0].tonic();
                
        code = this._emitHoverMenu(menuName, menuItems, initItem);
        smPanel.append(code);

        this._activateHoverMenu(menuName);        
        
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
