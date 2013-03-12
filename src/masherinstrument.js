"use strict"; 
/**
 * MasherInstrument class defines an instrument. 
 * The properties of a MasherInstrument object are set and managed by the MasherPanel class.
 * @param  numStrings  the number of strings on the instrument, e.g., 6
 * @param  lowStringNote  the note name of the low string, e.g., "E"
 * @param  stringIntervals  an array of the intervals between strings, low to high. e.g., ["P4","P4","P4","M3","P4"]
 * @param  name  a name for the instrument, e.g., "guitar"
 * @return  nothing
 */
function MasherInstrument(numStrings, lowStringNote, stringIntervals, name) {
    // This function encapsulates object state by defining function that return 
    // private variable values, rather than allowing outsiders to access the variables directly.   

    // TODO: Test that all args have aren't null. Assign a default value, if they do. 
    this.numStrings = function() {return numStrings;} ;
    this.lowStringNote = function() {return lowStringNote;} ;
    this.stringIntervals = function() {return stringIntervals;} ;
    this.name = function() {return name;} ;
}