"use strict"; 
/**
 * MasherScale class defines an scale. 
 * The properties of a MasherScale object are set and managed by the MasherPanel class.
 * @param  tonic  the tonic note name, e.g., "C"
 * @param  notesToShow  an array of which of the 11 chromatic notes to show, e.g., [1,0,1,0,1,1,0,1,0,1,0,1] for a Major scale.
 * @param  accidentals  "sharps", "flats", or "intervals"
 * @param  name  a name for the scale, e.g., "Ionian"
 * @return      nothing
 */
function MasherScale(tonic, notesToShow, accidentals, name) {
    // This function encapsulates object state by defining function that return 
    // private variable values, rather than allowing outsiders to access the variables directly.   

    // TODO: Test that all args have aren't null. Assign a default value, if they do. 
    this.tonic = function() {return tonic;}
    this.notesToShow = function() {return notesToShow;}
    this.accidentals = function() {return accidentals;}
    this.name = function() {return name;}
}
