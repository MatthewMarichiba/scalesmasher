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
         
        boxCode += "<div id='" + this._emitDivId(scaleNum, noteNum) + "' class='notebox " + isEnabled + "'></div>";
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

    this.renderHTML = function() {
        var scale = 0;
        var code = "";
        for (var i=0; i < 12; i++) {
            code += this._emitScaleNoteOnOffBox(scale, i);
        }
        this.innerHTML = code;
    }   // renderHTML

    this.renderAndActivateHTML = function() {
        var scale = 0;  // TODO: Expand this to iterate through all scales. 
        var code = "";
        
        // First, emit the HTML for the note on/off buttons.
        for (var i=0; i < 12; i++) {
            code += this._emitScaleNoteOnOffBox(scale, i);
        }

        // Second, insert the HTML into the DOM
        var newElement = document.createElement("div");
        newElement.id = "scale_notes";
        newElement.innerHTML = code;
        document.getElementById('scalesmasher_controls').appendChild(newElement);

        // Third, add click event handlers for each new on/off box.
        for (var i=0; i < 12; i++) {
            this._activateScaleNoteOnOffBox(scale, i);
        }

    }   // renderAndActivateHTML


}   // MasherPanel
