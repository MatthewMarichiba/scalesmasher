"use strict"; 
/**
 * MasherFretboard holds a particular rendering of the fretboard, 
 * which is a function of a MasherInstrument and one or more MasherScales overlaid on it. 
 * @param  instrument  an instance of MasherInstrument
 * @param  scale  an instance of MasherScale
 * @param  lowFret  the lowest fret to show, default is 0 (the nut) 
 * @param  highFret  the highest fret to show, default is 12 (1 octave from the nut) 
 * @return  rendered HTML 
 */
function MasherFretboard(instrument, scale, lowFret, highFret) {
    // TODO: Test that all args have aren't null. Assign a default value, if they do. 

    
/************* Define local properties that are used by local methods ************/
    // scaleNoteSets is an array of stringSets. Form: scaleNoteSets[scale][string][fret]
    // Each string set represents the frets on each string where decorators will appear. 
    this.scaleNoteSets = []; //TODO: DOcument. Rename to "_scaleNoteSets"?


/************* Define operator methods **************/
    this.addScale = function(theScale, scaleNum) {
        if (scaleNum!==undefined) { // if scaleNum was provided, use it
            this.scales[scaleNum] = theScale;
            // var returnVal = theScale;
        } else { // else find the lowest slot in scales[] that is open
            var i = 0;
            while (this.scales[i]) {i++;}
            this.scales[i] = theScale;
            scaleNum = i;
        }
        this._populateStringDecorators(this, scaleNum);  
        return scaleNum;
    }
    this.removeScale = function(scaleNum) {
        delete this.scales[scaleNum];
        delete this.scaleNoteSets[scaleNum];
    }
    this.setLowFret = function(fretNum) {}  // TODO: Fill out a function that error checks for frets in range.
    this.setHighFret = function(fretNum) {} // TODO: Fill out a function that error checks for frets in range.
/*
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
 */

// TODO: Touch up JavaDoc
/**
 * renderHTML() renders the HTML for all scales overlaid on the instrument.
 */
    this.renderHTML = function() {
        // Update decorators for all scales
        var i = 0;
        while (this.scales[i]) {    // TODO: Make this pick the scales that are selected, not just the first 3
            this._populateStringDecorators(this, i);
            i++;
        }

        var stringsHTML = '<div id="fretboardcontainer" class="container_32">'; 

        if (this.lowFret != 0) { // If we're not starting from the nut, top the fretboard with a fret divider. 
            stringsHTML += '<div class="grid_6 fretdivider">&nbsp;</div>';
            stringsHTML += '<div class="clear"></div>';
        }
        for (var fretNum = this.lowFret; fretNum <= this.highFret; fretNum++) {
            stringsHTML += this._renderFret(fretNum);            
        }

        stringsHTML += '</div>'; // END of fretboardcontainer
        this.innerHTML = stringsHTML;
    }
    /* Fretboard DIV structure:
        <div id="fretboardcontainer" class="container_32">
            <div id="" class="grid_6 nut">&nbsp;</div>
            <div class="clear"></div>
            <div id="" class="grid_7 fingerboxcontainer">
                <div id="" class="grid_1 fingerbox leftedge thickstring">
                    <div class="notedecorator decorator1">P1</div>
                </div>
            </div>
        <div class="clear"></div>
    */

// TODO: Touch up JavaDoc
/**
 * _renderFret() renders the HTML for a single fret on the instrument.
 */
    this._renderFret = function(fretNum) {
        var thisFret = '<div id="" class="grid_8 fingerboxcontainer">';
        var lastString = (this.instrument.numStrings()-1);
        for (var i = 0; i <= lastString; i++) { //TODO: rename "i" to "stringNum" for clarity
            thisFret += '<div id="" class="grid_1 thinstring ';  // START of fingerbox div
            // TODO: Update to adjust string thickness based on string number
            if (fretNum == 0) { // Fret 0 is above the nut and gets different CSS class.
                thisFret += 'abovenut ';
            } else {
                thisFret += 'fingerbox ';
                if (i==0) {thisFret += 'leftedge ';}
                if (i==lastString) {thisFret += 'rightedge ';}
            }
            thisFret +='">'; //  fingerbox div
            thisFret += this._renderDecorators(i, fretNum);
            thisFret += '</div>'; // CLOSE fingerbox DIV
            // console.log(thisFret);  // DEBUG
        }
        if (fretNum != 0) { // display the fret number for all frets, except above the nut
            thisFret += '<div class="grid_1 fretnumber">' + (fretNum) + '</div>';
        }
        thisFret += '</div>'; // CLOSE fingerboxcontainer DIV
        thisFret += '<div class="clear"></div>';
        if (fretNum == 0) { // If we're on Fret 0, render the nut too.
            thisFret += '<div id="" class="grid_6 nut">&nbsp;</div>';
            thisFret += '<div class="clear"></div>';
        } // if
        return thisFret;
    } // this._renderFret()
        
/**
 * _renderDecorators() renders the HTML for the deoorator(s) 
 * on a particular string a particular fret.
 */
    this._renderDecorators = function(stringNum, fretNum) {
        var thisDecorator = "";
        for (var i=0; i<3; i++) { // add decorators for the lowest 3 scales
            if (this.scaleNoteSets[i] != null) {
                if (this.scaleNoteSets[i][stringNum][fretNum]) {  
                    thisDecorator += '<div class="notedecorator decorator'+(i+1) + '">' + this.scaleNoteSets[i][stringNum][fretNum] + '</div>';
                }
            } else {
                thisDecorator += '&nbsp;';
            }
        }
        return thisDecorator;
    }

    
/* *********** Start of MasherFretboard constructor code ********* */
    // initialize the fretboard properties 
    // In each case, if an arg was passed use it, else fall back on the prototype value.
    if (instrument) {this.instrument = instrument;} 
    if (scale) {
        this.scales = [];
        this.addScale(scale, 0);
    }
    if (lowFret) {this.lowFret = lowFret;}
    if (highFret) {this.highFret = highFret;}
    
    this.renderHTML(); // Populate this.innerHTML with updated code.
}

/******** Other properties and methods used by MasherFretboard **********/
// Set default values for the fretboard
MasherFretboard.prototype.instrument = new MasherInstrument(6, "E", ["P4","P4","P4","M3","P4"], "Default Guitar");
MasherFretboard.prototype.scales = [new MasherScale("C", [1,0,1,0,1,1,0,1,0,1,0,1], "Ionian Scale at C")];
MasherFretboard.prototype.lowFret = 0;
MasherFretboard.prototype.highFret = 24;
MasherFretboard.prototype.innerHTML = "Practice your scales at <a href='http://www.scalesmasher.com'>ScalesMasher.com!</a>";
// MasherFretboard.prototype.scaleNoteSets = []; // An array of arrays representing the string decorators for each scale.

MasherFretboard.prototype._populateStringDecorators = function(fretBoard, scaleNum) {
        fretBoard._fillLowStringNotes(fretBoard, scaleNum);
        fretBoard._fillHigherStringNotes(fretBoard, scaleNum);
};

MasherFretboard.prototype._fillLowStringNotes = function(fretBoard, scalesIndex) {
    var scale = fretBoard.scales[scalesIndex]; 
    console.log("Low string tonic: "+scale.tonic());
    var lowString = [];
    var fretInQuestion = null;  // TODO: "= null" might not be necessary.

    // Get the note index of the scale tonic
    var tonicIndex = Masher.prototype.flatNotes.indexOf(scale.tonic()); // See if the scale tonic fits in the flat scale first
    if (tonicIndex < 0) {tonicIndex = Masher.prototype.sharpNotes.indexOf(scale.tonic());} // If no match, see if it fits in the sharp scale
    if (tonicIndex < 0) {throw new Error("Invalid tonic note:" + scale.tonic());} // If still no match, error. Otherwise, we have our tonic.
    // TODO: Flesh out the exception handling.

    // Get the note index of the string's open tone
    var openStringIndex = Masher.prototype.flatNotes.indexOf(fretBoard.instrument.lowStringNote()); // See if the note fits in the flat scale first
    if (openStringIndex < 0) {openStringIndex = Masher.prototype.sharpNotes.indexOf(fretBoard.instrument.lowStringNote() );} // If no match, see if it fits in the sharp scale
    if (openStringIndex < 0) {throw new Error("Invalid note for lowest string:" + fretBoard.instrument.lowStringNote() );} // If still no match, error. Otherwise, we have our tonic.
    // TODO: Flesh out the exception handling.

    var fretShift = tonicIndex - openStringIndex;
    if (fretShift < 0) {fretShift += 12;}
    console.log("tonicIndex="+tonicIndex+", openStringIndex="+openStringIndex+", fretShift="+fretShift);
    
    var decorator; 
    for (var i = 0; i < 12; i++) { // cycle through 12 diatonic notes, starting from the tonic.
        fretInQuestion = (fretShift + i) % 12;  // Octave wraps after 11th fret
        var decorator;
        if (scale.notesToShow()[i]) {
            if (scale.accidentals() == "sharps") {
                decorator = Masher.prototype.sharpNotes[(i+tonicIndex)%12];
            } else if (scale.accidentals() == "flats") {
                decorator = Masher.prototype.flatNotes[(i+tonicIndex)%12];
            } else {
                decorator = Masher.prototype.intervalNotes[i];
            }
            lowString[fretInQuestion] = lowString[fretInQuestion+12] = decorator; 
//            lowString[(fretInQuestion+12)] = scale.notesToShow()[i];
            // TODO: Update this code to assign the decorator values directly to lowString.
            console.log("i= " + i + ", Fret: " + fretInQuestion + ", value = " + lowString[fretInQuestion]);
        } 
    }
    lowString[24] = lowString[0];

    fretBoard.scaleNoteSets[scalesIndex] = []; // Create an array at this scale index
    fretBoard.scaleNoteSets[scalesIndex][0] = lowString; // assign the string we just built to the lowest string on the scaleIndex scale.
    console.log("lowString = " + lowString);
    console.log("fretBoard.scaleNoteSets[scalesIndex][0] = "+fretBoard.scaleNoteSets[scalesIndex][0]);
    // TODO: Refactor the code to operate direcly on the fretboard.scales object.
    return;
};

/** 
 * Iterates through each scale in the scales array and fills in the notes that belong on the strings.  
 */
MasherFretboard.prototype._fillHigherStringNotes = function(fretBoard, scalesIndex) {
    var intervalToNextString;
    for (var theString = 0; theString < (fretBoard.instrument.numStrings() - 1); theString++) {
        intervalToNextString = Masher.prototype.intervalNotes.indexOf(fretBoard.instrument.stringIntervals()[theString]);
        if (intervalToNextString < 0) {
            throw new Error("String interval:" + fretBoard.instrument.stringIntervals()[theString]);
        } 
        fretBoard.scaleNoteSets[scalesIndex][theString+1] = [];
        console.log("String #: " + (theString+1)); 
        for (var i = 0; i <= 24; i++) {
            fretBoard.scaleNoteSets[scalesIndex][theString+1][i] = fretBoard.scaleNoteSets[scalesIndex][theString][(i+intervalToNextString)%12];
            console.log("Fret "+i+": " + fretBoard.scaleNoteSets[scalesIndex][theString+1][i]);
        }
    }
};

