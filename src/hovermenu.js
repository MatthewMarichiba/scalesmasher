/**
 * @author mmarichiba
 */
"use strict"; 
/**
 * Provides an easy-access menu UI. 
 * Hovermenu class implements a pop-up menu that opens(/closes) on mouse-in(/out). 
 * One HoverMenu object can control any number of menus, and can emit HTML for them all. 
 * HTML elements are tagged with a specific class & id format, so users can apply custom event handlers and CSS.  
 * @param  none  The constructor function doesn't take parameters.
 * @return      nothing
 */
function Hovermenu() {
    var self = this;
    self.menus = []; // An array to hold objects that define menu details, one entry per menu.  

    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 
    // &&&&&&&&&&&&&&&& Define Hovermenu Class Methods &&&&&&&&&&&&&&& 
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 

    /**
     * Generates the HTML for a hovermenu of given name and stores the result to that menu's innerHTML property.
     * @param menuName  the name of the hovermenu.
     * @param initItem  the text to display initially as the selected item. 
     * @param classText  text to insert in class for hovermenu elements.  
     * @return self
     */
    this._generateHTML = function(menuName, initItem, classText) {
        // Form:
        // <div id="hovermenu_<menu_name>" class="hovermenu_trigger <classText>">
        //   <p>Current item</p>
        //   <ul id="hovermenu_list_<menu_name>" class="hovermenu_list <classText>">
        //     <li id="hovermenu_item_<menu_name>_<#>" class="hovermenu_item hovermenu_item_<menu_name>">Menu item #</li>
        //     ...
        //   </ul>
        // </div>

        if (!classText) {classText = "";}
        if (!initItem) {initItem = "";}  

        var code = '<div id="hovermenu_' + menuName + '" class="hovermenu_trigger ' + classText + '"><p>' + initItem + '</p>';
        code += '<ul id="hovermenu_list_' + menuName + '" class="hovermenu_list ' + classText + '">';
        for (var i = 0; i < self.menus[menuName].menuItems.length; i++) {
            code += '<li id="hovermenu_item_' + menuName + "_" + i + '" class="hovermenu_item hovermenu_item_' + menuName + '">' + self.menus[menuName].menuItems[i] + '</li>';
        }
        code += '</ul></div>';
        
        self.menus[menuName].innerHTML = code;
        return self;
    }

    /**
     * Adds the specified menu and generates the HTML for it.
     * @param menuName  the menu name. menuName is used as the unique identifier for the menu. 
     * @param menuItems  an array of the strings to display as items in the menu.
     * @param initItem  the initial menu item to display.
     * @param classText  text to append to the hovermenu item's class, to allow CSS to target a specific menu.  
     * @param processClick  the function to call when a hovermenu item is clicked. 
     * @return false if the particular menuName already exists, otherwise true. 
     */
    this.addMenu = function(menuName, menuItems, initItem, classText, processClick) {
        if (self.menus[menuName]) {return false;}
        
        if (!processClick) {processClick = function(){} }
        self.menus[menuName] = {"menuName": menuName, "menuItems": menuItems, "processClick": processClick};
        self._generateHTML(menuName, initItem, classText);
        
        return true;
    }

    /**
     * @param menuName  the menu to remove.
     * @return the menu object removed, or NULL if it doesn't exist. 
     */
    this.removeMenu = function(menuName) {
        if (self.menus[menuName]) {
            var theMenu = self.menus[menuName];
            delete self.menus[menuName]; 
            return theMenu;
        } else {
            return null;
        }
    } 

    /**
     * @param menuName  the menu in question.
     * @return the HTML for this hovermenu. 
     */
    this.getHTML = function(menuName) {
        return self.menus[menuName].innerHTML;
    } 
 
 
    /**
     * Get the hovermenu name from the id of a clicked item in the menu.
     * Ex: hovermenu_item_notes_4  --> "notes"
     * @param id  the id from the HTML element
     * @return the menuName portion of the id string, or null.
     */ 
    this.getMenuName = function(id) {
        var regex = /_([a-zA-Z0-9]+)_\d+$/;
        return id.match(regex)[1];
    }

    /**
     * Get the item number from the id of a clicked item in the menu.
     * Ex: hovermenu_item_notes_12  --> 12
     * @param id  the id from the HTML element
     * @return the itemNum portion of the id string, or null.
     */ 
    this.getItemNum = function(id) {
        var regex = /_(\d+$)/;
        return id.match(regex)[1];
    }

    /**
     * Handle a click event on a hovermenu item.
     * @param event  the click event
     */
    this._handleClick = function (event) {
        // 1. Get menuName from ID -- Figure out which menu was clicked.
        var menuName = hovermenus.getMenuName(event.target.id);
        console.log("here's the menuname:");
        console.log(menuName);
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
    }
    
    /**
     * Activates hovermenu HTML
     * @param menuName  the name string for the menu. This string shows up in HTML.
     * @param handleClick  a function to call when an item in the hovermenu is clicked
     * @return self 
     */
    this.activateMenu = function(menuName) {
        var hovermenuList = $('#hovermenu_list_'+menuName);

        // Hide the hovermenu_list to start
        hovermenuList.hide();

        // Show the hovermenu_list when mouse enters the hovermenu_trigger, or when it's clicked
        $('#hovermenu_'+menuName + ' p')
            .mouseenter(function() {
                hovermenuList.show();
            })
            .click(function() {
                hovermenuList.show();
            });

        
        // Hide the hovermenu_list when mouse leaves the hovermenu_trigger
        // (Note that the trigger area includes the menu when it's expanded.)
        $('#hovermenu_'+menuName).mouseleave(function() {
            hovermenuList.hide();
        });


        console.log("Activating click handlers:");
        // Set click behavior on each menu item
        for (var i = 0; i < self.menus[menuName].menuItems.length; i++) {
            $('#hovermenu_item_'+menuName+'_'+i).click(self._handleClick);
            console.log('#hovermenu_item_'+menuName+"_"+i);              
        }
        
        return self;
    }


}   // Hovermenu
