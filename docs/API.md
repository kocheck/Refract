# API Documentation

## Overview

The Light/Dark Mode Switcher plugin provides a comprehensive API for switching between light and dark component variants in Sketch. This document outlines all available functions, their parameters, and usage patterns.

## Core Functions

### Main Entry Points

#### `switchToDark(context)`
Switches selected layers to dark mode variants.

**Parameters:**
- `context` (Object): Sketch plugin context containing document and selection

**Example:**
```javascript
function switchToDark(context) {
  switchMode(context, MODES.DARK);
}
```

#### `switchToLight(context)`
Switches selected layers to light mode variants.

**Parameters:**
- `context` (Object): Sketch plugin context containing document and selection

#### `toggleMode(context)`
Intelligently toggles between light and dark modes based on current selection.

**Parameters:**
- `context` (Object): Sketch plugin context containing document and selection

**Behavior:**
- Detects current mode of first selected layer
- Switches all selected layers to opposite mode
- Falls back to dark mode if mode cannot be determined

#### `switchPageToDark(context)`
Switches entire current page to dark mode.

**Parameters:**
- `context` (Object): Sketch plugin context containing document and current page

#### `switchPageToLight(context)`
Switches entire current page to light mode.

**Parameters:**
- `context` (Object): Sketch plugin context containing document and current page

### Core Processing Functions

#### `switchMode(context, targetMode)`
Main mode switching function for selected layers.

**Parameters:**
- `context` (Object): Sketch plugin context
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- Displays user message with results
- Handles errors gracefully

**Example:**
```javascript
switchMode(context, 'dark');
// Result: "Switched to Dark Mode: 5 changed, 2 skipped"
```

#### `processLayer(layer, targetMode)`
Recursively processes a layer and all its children.

**Parameters:**
- `layer` (MSLayer): Sketch layer object to process
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `Object`: `{switched: number, skipped: number}`

**Behavior:**
- Processes current layer
- Recursively processes all child layers
- Accumulates switched/skipped counts

#### `processCurrentLayer(layer, targetMode)`
Processes a single layer without recursion.

**Parameters:**
- `layer` (MSLayer): Sketch layer object to process
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `Object`: `{switched: number, skipped: number}`

**Handles:**
- Symbol instances
- Shared styles (text and layer)
- Color variables (fill, border, text)

### Symbol Processing

#### `switchSymbolMode(symbolInstance, targetMode)`
Switches symbol instance to target mode variant with override preservation.

**Parameters:**
- `symbolInstance` (MSSymbolInstance): Symbol instance to switch
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `Object`: `{switched: number, skipped: number}`

**Features:**
- Preserves compatible symbol overrides
- Skips if already in target mode
- Handles missing target symbols gracefully

**Example:**
```javascript
const result = switchSymbolMode(buttonInstance, 'dark');
// Switches button/light/primary to button/dark/primary
// Preserves text and nested symbol overrides
```

### Style Processing

#### `switchLayerStyle(layer, targetMode)`
Switches shared styles (text and layer styles) to target mode variants.

**Parameters:**
- `layer` (MSLayer): Layer with shared styles
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `Object`: `{switched: number, skipped: number}`

**Handles:**
- Text styles for MSTextLayer
- Layer styles for any layer with shared style
- Maintains style properties and formatting

### Color Variable Processing

#### `switchTextColorVariable(textLayer, targetMode)`
Switches text color variables to target mode variants.

**Parameters:**
- `textLayer` (MSTextLayer): Text layer to process
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `Object`: `{switched: number, skipped: number}`

#### `switchFillVariables(layer, targetMode)`
Switches fill color variables to target mode variants.

**Parameters:**
- `layer` (MSLayer): Layer with fill styles
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `Object`: `{switched: number, skipped: number}`

**Processes:**
- All fill layers in layer style
- Multiple fills per layer
- Gradient and solid fills with color variables

#### `switchBorderVariables(layer, targetMode)`
Switches border color variables to target mode variants.

**Parameters:**
- `layer` (MSLayer): Layer with border styles
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `Object`: `{switched: number, skipped: number}`

## Utility Functions

### Mode Detection

#### `detectCurrentMode(layer)`
Analyzes layer name to detect current mode using naming convention.

**Parameters:**
- `layer` (Object): Object with `name()` method

**Returns:**
- `String`: Current mode ('light', 'dark', or null)

**Algorithm:**
```javascript
// Splits name by ' / ' separator
// Checks second part for 'light' or 'dark'
// Returns lowercase mode or null if undetermined
```

**Example:**
```javascript
const mode = detectCurrentMode({name: () => 'button / light / primary'});
// Returns: 'light'
```

### Name Processing

#### `buildTargetName(currentName, targetMode)`
Builds target component name by replacing mode in naming convention.

**Parameters:**
- `currentName` (String): Current component name
- `targetMode` (String): Target mode ('light' or 'dark')

**Returns:**
- `String`: New name with target mode

**Example:**
```javascript
const newName = buildTargetName('button / light / primary', 'dark');
// Returns: 'button / dark / primary'
```

### Document Search Functions

#### `findSymbolByName(document, symbolName)`
Finds symbol by exact name match in document.

**Parameters:**
- `document` (MSDocument): Sketch document object
- `symbolName` (String): Exact symbol name to find

**Returns:**
- `MSSymbolMaster` or `null`: Found symbol or null if not found

#### `findTextStyleByName(document, styleName)`
Finds text style by exact name match in document.

**Parameters:**
- `document` (MSDocument): Sketch document object
- `styleName` (String): Exact style name to find

**Returns:**
- `MSSharedStyle` or `null`: Found style or null if not found

#### `findLayerStyleByName(document, styleName)`
Finds layer style by exact name match in document.

**Parameters:**
- `document` (MSDocument): Sketch document object
- `styleName` (String): Exact style name to find

**Returns:**
- `MSSharedStyle` or `null`: Found style or null if not found

#### `findVariableByName(document, variableName)`
Finds color variable by exact name match in document.

**Parameters:**
- `document` (MSDocument): Sketch document object
- `variableName` (String): Exact variable name to find

**Returns:**
- `MSVariable` or `null`: Found variable or null if not found

#### `findVariableByID(document, variableID)`
Finds color variable by unique ID in document.

**Parameters:**
- `document` (MSDocument): Sketch document object
- `variableID` (String): Unique variable ID to find

**Returns:**
- `MSVariable` or `null`: Found variable or null if not found

### User Interface

#### `showMessage(context, message)`
Displays message to user in Sketch interface.

**Parameters:**
- `context` (Object): Sketch plugin context
- `message` (String): Message text to display

**Features:**
- Graceful error handling
- Non-blocking user notification
- Consistent messaging format

## Constants

### Mode Constants
```javascript
const MODES = {
  LIGHT: 'light',
  DARK: 'dark'
};
```

### Naming Convention
```javascript
const NAMING_SEPARATOR = ' / ';
```

## Error Handling Patterns

### Try-Catch Wrapper
All functions use consistent error handling:

```javascript
try {
  // Main logic
  return result;
} catch (error) {
  console.error(`Error in [functionName]: ${error.message}`);
  return defaultResult;
}
```

### Graceful Degradation
- Functions continue processing remaining items on errors
- Partial successes are reported accurately
- Users receive meaningful error messages
- Console logs provide detailed debugging info

## Performance Considerations

### Optimization Strategies
- **Early Exit**: Skip processing if already in target mode
- **Batch Processing**: Accumulate results to minimize UI updates
- **Recursive Limits**: Handle deeply nested structures efficiently
- **Memory Management**: Clean up references to prevent leaks

### Recommended Usage Patterns
- Use selection-based switching for targeted changes
- Use page-level switching sparingly on large documents
- Process in reasonable batches (< 1000 components)
- Test performance with realistic document sizes

## Integration Examples

### Custom Menu Integration
```javascript
// Add to manifest.json commands array
{
  "name": "Custom Switch Action",
  "identifier": "customSwitch",
  "script": "script.js",
  "handler": "customSwitchHandler"
}

// Implement in script.js
function customSwitchHandler(context) {
  const targetMode = determineCustomMode(context);
  switchMode(context, targetMode);
}
```

### Programmatic Usage
```javascript
// Process specific layers programmatically
function processSpecificLayers(context, layerNames, targetMode) {
  const page = context.document.currentPage();
  const layers = page.layers();

  for (let i = 0; i < layers.count(); i++) {
    const layer = layers.objectAtIndex(i);
    if (layerNames.includes(layer.name())) {
      processLayer(layer, targetMode);
    }
  }
}
```

### Batch Processing
```javascript
// Process multiple pages
function processMultiplePages(context, targetMode) {
  const pages = context.document.pages();

  for (let i = 0; i < pages.count(); i++) {
    const page = pages.objectAtIndex(i);
    // Set as current page and process
    context.document.setCurrentPage(page);
    switchEntirePage(context, targetMode);
  }
}
```

## Extension Points

### Custom Mode Types
The plugin can be extended to support additional modes:

```javascript
const EXTENDED_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high-contrast',
  REDUCED_MOTION: 'reduced-motion'
};
```

### Custom Naming Conventions
Override separator and parsing logic:

```javascript
const CUSTOM_SEPARATOR = '-';
const CUSTOM_MODE_POSITION = 2; // Third part instead of second

function detectCustomMode(layer) {
  const parts = layer.name().split(CUSTOM_SEPARATOR);
  if (parts.length > CUSTOM_MODE_POSITION) {
    return parts[CUSTOM_MODE_POSITION].toLowerCase();
  }
  return null;
}
```

### Additional Layer Types
Extend processing for custom layer types:

```javascript
function processCustomLayer(layer, targetMode) {
  if (layer.class() === CustomLayerType) {
    // Custom processing logic
    return customSwitchLogic(layer, targetMode);
  }
  return {switched: 0, skipped: 0};
}
```
