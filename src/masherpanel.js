/**
 * @author mmarichiba
 */
"use strict"; 
/**
 * MasherPanel class provides a UI control settings on a MasherFretboard object. 
 * @param  fretboard  the fretboard object to control
 * @param  notesToShow  an array of which of the 11 chromatic notes to show, e.g., [1,0,1,0,1,1,0,1,0,1,0,1] for a Major scale.
 * @param  accidentals  "sharps", "flats", or "intervals"
 * @param  name  a name for the scale, e.g., "Ionian"
 * @return      nothing
 */
function MasherPanel(fretboard) {
    // TODO: Add error checking for valid fretboard values.
    this.fretboard = fretboard;
}
