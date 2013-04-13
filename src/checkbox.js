/**
 * @author mmarichiba
 */
"use strict"; 
/**
 * On/off check-box UI. 
 * OnOffBox class implements checkbox that toggle on click. 
 * One OnOffBox object can control any number of checkboxes, and emits HTML for them all. 
 * HTML elements are tagged with a specific class & id format, so users can apply custom event handlers and CSS.  
 * @param  none  The constructor function doesn't take parameters.
 * @return      nothing
 */
function OnOffBox() {
    var self = this;
    self.boxes = []; // An array to hold objects that define menu details, one entry per menu.  

    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 
    // &&&&&&&&&&&&&&&& Define OnOffBox Class Methods &&&&&&&&&&&&&&& 
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 

    /**
     * Generates the HTML for a onOffBox of given name and stores the result to that menu's innerHTML property.
     * @param boxName  the name of the onoffbox. Must be unique among all boxes for this onOffBox object.
     * @param boxLabel  text to display inside the box.
     * @param initState  "on" or "off". Defaults to "off" if not "on". 
     * @param classText  text to insert in class for onoffbox elements.  
     * @return self
     */
    this._generateHTML = function(boxName, boxLabel, initState, classText) {
        // Form:
        // <div id="onoffbox_<boxname>" class="onoffbox <classText> <on/off state>"> 
        //    boxLabel 
        // </div>

        if (!classText) {classText = "";}
        if (!(initState != "on") {initState = "off";}  
        if (!boxLabel) {boxLabel = "";}

        var boxCode += "<div id='" + boxName + "' class='onoffbox " + classText;
        if (initState == "on") {boxCode += " box_on";}
        boxCode += "'>" + boxLabel;
        boxCode += "</div>";

        self.boxes[boxName].innerHTML = code;
        return self;
    }



    /**
     * Adds the specified box and generates the HTML for it.
     * @param boxName  the name of the onoffbox. Must be unique among all boxes for this onOffBox object.
     * @param boxLabel  text to display inside the box.
     * @param initState  "on" or "off". Defaults to "off" if not "on". 
     * @param classText  text to insert in class for onoffbox elements.  
     * @param processClick  a function to call when the box is clicked. 
     * @return false if the particular menuName already exists, otherwise true. 
     */
    this.addBox = function(boxName, boxLabel, initState, classText, processClick) {
        if (self.boxes[boxName]) {return false;}
        
        self.boxes[boxName] = {"boxName": boxName, "boxLabel": boxLabel, "processClick": processClick};
        self._generateHTML(boxName, boxLabel, initState, classText);
        
        return true;
    }

    /**
     * @param boxName  the box to remove.
     * @return the box object removed, or NULL if it doesn't exist. 
     */
    this.removeBox = function(boxName) {
        if (self.boxes[boxName]) {
            var theBox = self.boxes[boxName];
            delete self.boxes[boxName]; 
            return theBox;
        } else {
            return null;
        }
    } 

    /**
     * @param boxName  the box in question.
     * @return the HTML for this onoffbox. 
     */
    this.getHTML = function(boxName) {
        return self.boxes[boxName].innerHTML;
    } 
 
    /**
     * Get the box name from the element id.
     * Ex: onoffbox_sweet1  --> "sweet1"
     * @param id  the id from the HTML element
     * @return the name portion of the id string, or null.
     */ 
    this.getName = function(id) {
        var regex = /onoffbox_([a-zA-Z0-9]+)$/;
        return id.match(regex)[1];
    }


    /**
     * Get the item number from the id of a clicked item in the menu.
     * Ex: hovermenu_item_notes_12  --> 12
     * @param id  the id from the HTML element
     * @return the itemNum portion of the id string, or null.
     */ 
/* THIS METHOD IS NO LONGER NECESSARY.
    this.getItemNum = function(id) {
        var regex = /_(\d+$)/;
        return id.match(regex)[1];
    }
*/

    /** 
     * Get the state of an onoffbox.
     * @param boxName  name of the onoffbox to check.
     * @return true if class contains "box_on", else false.
     */
    this.isEnabled = function(boxName) {
        var classText = $("#onoffbox_" + boxName).class();
        var regex = /box_on/;
        if (classText.match(regex)[1]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Handle a click event on an onoffbox item.
     * @param event  the click event
     */
    this._handleClick = function (event) {
        // 1. Get name from ID -- Figure out which box was clicked.
        // 2. Determine if the box is enabled or not.
        // 3. Toggle "box_on" class.
        // 4. Execute the click processor, pass in box state
        // 5. Return nothing
 
        var boxName = boxes.getName(event.target.id);
        console.log("here's the boxname:");
        console.log(boxName);

        // 2. Determine if the box is enabled or not.
        var isEnabled = self.isEnabled(boxName);
        
        // 3. Toggle "box_on" class.
        $("#"+event.target.id).toggleClass("box_on");
        
        // 4. Execute the click processor, pass in box state
        self.boxes[boxName].processClick(boxName, isEnabled);
        
        // 5. Return nothing
    }   // _handleClick
/*
        // 2. Get the <li> value from the DOM -- Actually, it's the innerHTML of the item clicked.
        var itemNum = hovermenus.getItemNum(event.target.id);
        // 3. Find the index value in the item list. -- it's the number at the end of the id.
        var itemName = event.target.innerHTML;
        console.log("_handleClick: hovermenu_item_" + menuName + "_" + itemNum + ": " + itemName);
        console.log("Here's the event object for this click:");
        console.log(event);
        // 4. De-select all other entries (or at least the previously selected item) in the list.
        $(".hovermenu_item_"+menuName).removeClass("hovermenu_item_active");
        // 5. Highlight the new item in the list. 
        $("#"+event.target.id).addClass("hovermenu_item_active");
        $("#hovermenu_"+menuName+" p").html(itemName);  // Dipslay it in the currently-selected slot.
        $("#hovermenu_list_"+menuName).hide();    // Hide the hovermenu now that user has made a selection. 

        // 6. Pass control to the click processor. 
        self.menus[menuName].processClick(menuName, itemNum, itemName);
*/
    
    /**
     * Activates hovermenu HTML
     * @param menuName  the name string for the menu. This string shows up in HTML.
     * @param handleClick  a function to call when an item in the hovermenu is clicked
     * @return self 
     */
    this.activateBox = function(boxName) {
        // <div id="onoffbox_<boxname>" class="onoffbox <classText> <on/off state>"> 
        //    boxLabel 
        // </div>
        console.log("Activating click handlers. id=onoffbox_"+boxName);
        $("#onoffbox_"+boxName).click(_handleClick);

        return self;
    }

}   // Hovermenu
