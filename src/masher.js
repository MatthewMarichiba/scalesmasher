"use strict"; 
/**
 * Masher is a helper class for the ScalesMasher library, 
 * providing standard objects and values which can be used
 * by multiple classes.  
 */
function Masher() {
   // Masher constructor function is null, because Masher objects simply inherit static properties.
   // Just access the properties of Masher directly. 
}

Masher.prototype.flatNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
Masher.prototype.sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
Masher.prototype.intervalNotes = ["P1", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"];
Masher.prototype.intervalNotesIndex = {P1:0, m2:1, M2:2, m3:3, M3:4, P4:5, d5:6, P5:7, m6:8, M6:9, m7:10, M7:11};

Masher.prototype.scales = {
    //           1   2   3 4   5   6   7 
    ionian:     [1,0,1,0,1,1,0,1,0,1,0,1],  // I (Major)
    dorian:     [1,0,1,1,0,1,0,1,0,1,1,0],  // II
    phrygian:   [1,1,0,1,0,1,0,1,1,0,1,0],  // III
    lydian:     [1,0,1,0,1,0,1,1,0,1,0,1],  // IV
    mixolydian: [1,0,1,0,1,1,0,1,0,1,1,0],  // V
    aeolian:    [1,0,1,1,0,1,0,1,1,0,1,0],  // VI (Minor)
    locrian:    [1,1,0,1,0,1,1,0,1,0,1,0],  // VII
    
    majorPenta: [1,0,1,0,1,0,0,1,0,1,0,0],
    minorPenta: [1,0,0,1,0,1,0,1,0,0,1,0],
}

