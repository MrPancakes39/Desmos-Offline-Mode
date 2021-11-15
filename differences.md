# Differences

Below are list of differences between Desmos Offline Mode and Desmos Web Version:

- Desmos Offline Mode uses API v1.6, web version uses API v1.7.
- There is no support for different languages only english.
- There is no printing in the desktop app (only web app).
- Ctrl+Shift+O toggles the options for the focused expression instead of only showing it.
- New methods and variables have been added.

# Original to App

Public methods are expected for user use.  
Private methods are not for user use only internal use.

## Public:

### Variables:
&#x1F537; **Default settings**:  
Calc.default\_settings is the default settings initialized from web versions.

&#x1F537; **Color Rotation**:  
Calc.colorRotation is the default color rotation in desmos.

### Methods:
&#x1F537; **Get Selected Item**:  
Calc.getSelectedItem() is used to get the current selected/focused expression.  
It returns an expression with same format returned from Calc.getExpressions().

&#x1F537; **Set Item Color**:  
Calc.setItemColor() is used to set the selected/focused expression's color.

&#x1F537; **Get Next Color**:  
Calc.getNextColor() is used to get next color in desmos color rotation.

&#x1F537; **Set Next Color**:  
Calc.setNextColor() is used to set next coloe in desmos color rotation.


## Private:

### Variables:
&#x1F537; **New File**:  
Calc.\_newFile is used to track if it's a new unsaved file.

### Methods:
&#x1F537; **Toggle Options**:  
Calc.\_toggleOptions() is used to toggle the options for an expression.

&#x1F537; **Add**:  
Calc.\_add() is used to add new expression.  
Takes the following as parameter:
- "expression"
- "table"
- "text"
- "note" alias for "text"
- "folder"
- "image"
- "simulation"

&#x1F537; **hasUnsavedChanges**:  
Calc.\_hasUnsavedChanges() is used to see if there is some unsaved changes.
